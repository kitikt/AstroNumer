import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { NotificationDTO, useSignalR } from '@/hooks/useSignalR';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [open, setOpen] = useState(false);

  // Setup SignalR để nhận thông báo mới
  useSignalR((newNoti) => {
    setNotifications((prev) => [newNoti, ...prev]);
  });
  // Lấy danh sách thông báo từ server
  useEffect(() => {
  const fetchNotifications = async () => {
    try {
         const Id = JSON.parse(localStorage.getItem("user") || "null");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/notifications/user/${Id}?type=1`
      );

      const resData = await response.json();

      if (!response.ok) throw new Error(resData.message || 'Lỗi khi lấy thông báo');

      const rawData = resData.Data?.Data ?? [];

      // Kiểm tra và map sang đúng DTO
      const mapped: NotificationDTO[] = rawData.map((item: NotificationDTO) => ({
        id: item.id,
        title: item.title,
        titleUnsign: item.titleUnsign,
        message: item.message,
        href: item.href,
        type: item.type,
        createdDate: item.createdDate,
        isRead: item.isRead
      }));

      setNotifications(mapped);
    } catch (error) {
      console.error('Fetch notifications failed:', error);
    }
  };

  fetchNotifications();
}, []);

  return (
    <div className="relative">
      <button onClick={() => setOpen((prev) => !prev)} className="relative p-2">
        <Bell className="w-6 h-6 text-gray-700" />
        {notifications.some((n) => !n.isRead) && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50">
          <div className="p-3 font-semibold border-b">Thông báo</div>
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Không có thông báo
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {notifications.map((n, i) => (
                <li
                  key={i}
                  className={`px-4 py-3 border-b text-sm hover:bg-gray-50 cursor-pointer ${
                    !n.isRead ? 'bg-gray-100 font-bold' : ''
                  }`}
                >
                  <div>{n.title}</div>
                  <div className="text-xs text-gray-500">{n.message}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
