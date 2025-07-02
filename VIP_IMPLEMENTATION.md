# VIP Implementation Documentation

## Tổng quan

Đã implement logic kiểm tra VIP status cho các tính năng VIP trong ứng dụng AstroNumer. Hệ thống sẽ kiểm tra xem người dùng có gói VIP hợp lệ không trước khi cho phép sử dụng các tính năng VIP.

## Các file đã được tạo/cập nhật

### 1. Service VIP (`src/services/vipService.ts`)

- **`checkVipStatus()`**: Hàm kiểm tra trạng thái VIP thông qua API `/api/v1/profile/transaction`
- **`VipStatus` interface**: Định nghĩa cấu trúc dữ liệu trạng thái VIP
- **`showVipRequiredModal()`**: Function deprecated, được thay thế bằng component

### 2. Hook VIP (`src/hooks/useVip.ts`)

- **`useVip()`**: Hook React để quản lý trạng thái VIP
- Tự động kiểm tra VIP status khi component mount
- Cung cấp loading state và refresh function

### 3. Component Modal (`src/components/VipRequiredModal.tsx`)

- Modal hiển thị thông báo yêu cầu VIP
- Có nút "Nâng cấp VIP" để chuyển đến trang membership
- Có nút "Đóng" để đóng modal
- Responsive và có hiệu ứng hover

## Các tính năng VIP đã được bảo vệ

### 1. Phân tích tương hợp (`src/components/ui/CompatibilityForm.tsx`)

- Kiểm tra VIP trước khi cho phép phân tích tương hợp
- Hiển thị modal yêu cầu VIP nếu chưa có gói

### 2. Bản đồ sao VIP (`src/components/StarMapForm.tsx`)

- Kiểm tra VIP khi người dùng chọn VIP package
- Hiển thị modal yêu cầu VIP nếu chưa có gói

### 3. Thần số học VIP (`src/components/ui/FormHome.tsx`)

- Kiểm tra VIP khi người dùng chọn phân tích chuyên sâu
- Hiển thị modal yêu cầu VIP nếu chưa có gói

### 4. ChatBot (Không yêu cầu VIP)

- ChatBot là tính năng miễn phí, không yêu cầu VIP
- Tất cả người dùng đều có thể sử dụng

## Logic kiểm tra VIP

### API Endpoint

```
GET /api/v1/purchased-service?page-index=1&page-size=100
Authorization: Bearer {token}
```

### Cách hoạt động

1. Gọi API để lấy danh sách gói dịch vụ đã mua
2. Kiểm tra các gói có:
   - `RemainingUsage > 0` (gói theo số lần sử dụng)
   - `ExpiredAt > now` (gói theo thời gian)
3. Trả về `hasVipPackage: true` nếu có ít nhất 1 gói hợp lệ
4. **Xử lý lỗi VIP**: Nếu API trả về lỗi 404 với message "chưa mua gói", hệ thống sẽ hiển thị modal VIP

### Response Structure

```typescript
interface VipStatus {
  hasVipPackage: boolean;
  packageName?: string;
  remainingUsage?: number;
  expiredAt?: string;
}
```

## Cách sử dụng

### Trong Component

```typescript
import { checkVipStatus } from "@/services/vipService";
import VipRequiredModal from "@/components/VipRequiredModal";

const MyComponent = () => {
  const [showVipModal, setShowVipModal] = useState(false);

  const handleVipAction = async () => {
    const vipStatus = await checkVipStatus();
    if (!vipStatus.hasVipPackage) {
      setShowVipModal(true);
      return;
    }
    // Tiếp tục logic VIP
  };

  return (
    <div>
      {/* Component content */}
      <VipRequiredModal
        isOpen={showVipModal}
        onClose={() => setShowVipModal(false)}
        title="Tính năng VIP"
        message="Mô tả tính năng VIP..."
      />
    </div>
  );
};
```

### Sử dụng Hook

```typescript
import { useVip } from "@/hooks/useVip";

const MyComponent = () => {
  const { vipStatus, loading } = useVip();

  if (loading) return <div>Đang kiểm tra...</div>;

  if (!vipStatus.hasVipPackage) {
    return <div>Cần nâng cấp VIP</div>;
  }

  return <div>Nội dung VIP</div>;
};
```

## Lưu ý

- Tất cả các tính năng VIP đều yêu cầu đăng nhập
- Modal VIP sẽ tự động chuyển đến trang `/membership` khi click "Nâng cấp VIP"
- Hệ thống hỗ trợ cả gói theo số lần sử dụng và gói theo thời gian
- Có xử lý lỗi và fallback khi API không khả dụng
