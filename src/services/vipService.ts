export interface VipStatus {
  hasVipPackage: boolean;
  packageName?: string;
  remainingUsage?: number;
  expiredAt?: string;
}

export const checkVipStatus = async (): Promise<VipStatus> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { hasVipPackage: false };
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/api/v1/purchased-service?page-index=1&page-size=100`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    
    // Kiểm tra nếu có lỗi 404 với message về gói tương hợp
    if (!response.ok || (data.statusCode === 404 && data.message?.includes("chưa mua gói"))) {
      console.log("User doesn't have VIP package:", data.message);
      return { hasVipPackage: false };
    }
    
    if (data.Success && data.Data?.Data) {
      // Kiểm tra xem có gói VIP nào đang hoạt động không
      const activePackages = data.Data.Data.filter((pkg: {
        RemainingUsage?: number;
        ExpiredAt?: string;
        ServicePackageName?: string;
        ComboPackageName?: string;
      }) => {
        // Kiểm tra gói theo số lần sử dụng
        if (pkg.RemainingUsage && pkg.RemainingUsage > 0) {
          return true;
        }
        
        // Kiểm tra gói theo thời gian
        if (pkg.ExpiredAt) {
          const expiredAt = new Date(pkg.ExpiredAt);
          const now = new Date();
          return expiredAt > now;
        }
        
        return false;
      });

      if (activePackages.length > 0) {
        const firstPackage = activePackages[0];
        return {
          hasVipPackage: true,
          packageName: firstPackage.ServicePackageName || firstPackage.ComboPackageName,
          remainingUsage: firstPackage.RemainingUsage,
          expiredAt: firstPackage.ExpiredAt,
        };
      }
    }

    return { hasVipPackage: false };
  } catch (error) {
    console.error("Error checking VIP status:", error);
    return { hasVipPackage: false };
  }
};

// Function này đã được thay thế bằng component VipRequiredModal
// Giữ lại để tương thích ngược
export const showVipRequiredModal = () => {
  console.warn('showVipRequiredModal is deprecated. Use VipRequiredModal component instead.');
  window.location.href = "/membership";
}; 