/**
 * Kiểm tra xem response có phải là lỗi VIP không
 * @param response - Response từ fetch API
 * @param data - Data đã parse từ response
 * @returns true nếu là lỗi VIP, false nếu không
 */
export const isVipError = (response: Response, data: {
  StatusCode?: number;
  Message?: string;
  statusCode?: number;
  message?: string;
}): boolean => {
  return (
    !response.ok ||
    Boolean(data?.StatusCode === 404 && data?.Message?.includes("chưa mua gói")) ||
    Boolean(data?.statusCode === 404 && data?.message?.includes("chưa mua gói"))
  );
};

/**
 * Kiểm tra xem response có phải là lỗi VIP không (async version)
 * @param response - Response từ fetch API
 * @returns true nếu là lỗi VIP, false nếu không
 */
export const isVipErrorAsync = async (response: Response): Promise<boolean> => {
  try {
    const data = await response.json();
    return isVipError(response, data);
  } catch {
    return !response.ok;
  }
}; 