import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { NotificationDTO, useSignalR } from '@/hooks/useSignalR';
import moment from 'moment';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  // Nhận realtime từ SignalR
  useSignalR((newNoti) => {
    setNotifications((prev) => [newNoti, ...prev]);
    setUnreadCount((prev) => prev + 1);
  });

  // Gọi API lấy thông báo & số chưa đọc
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `https://astronumer.info.vn/api/v1/notifications/user/bccf143e-55bc-4d08-b359-acc10acb30a9?type=1`
        );
        const resData = await response.json();
        const rawData = resData.Data?.Data ?? [];

        const mapped = rawData.map((item: any) => ({
          id: item.Id,
          title: item.Title,
          titleUnsign: item.TitleUnsign,
          message: item.Message,
          href: item.Href,
          type: item.Type,
          createdDate: item.CreatedDate,
          isRead: item.IsRead,
          avatar: item.Avatar || ''
        }));

        setNotifications(mapped.filter(n => n && n.id && n.title));
      } catch (error) {
        console.error('Fetch notifications failed:', error);
      }
    };

    const fetchUnreadCount = async () => {
      try {
        const res = await fetch(
          `https://astronumer.info.vn/api/v1/notifications/user/bccf143e-55bc-4d08-b359-acc10acb30a9/unread-count`
        );
        const data = await res.json();
        setUnreadCount(data.Data || 0);
      } catch (error) {
        console.error('Fetch unread-count failed:', error);
      }
    };

    fetchNotifications();
    fetchUnreadCount();
  }, []);



  // ✅ Mark từng notification là đã đọc
  const markSingleAsRead = async (id: number) => {
    try {
      await fetch(`https://astronumer.info.vn/api/v1/notifications/${id}/mark-read`, {
        method: 'PUT',
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error(`Mark notification ${id} as read failed`, error);
    }
  };

  const displayNotis =
    activeTab === 'all'
      ? notifications
      : notifications.filter((n) => !n.isRead);

  const formatTime = (dateStr: string) =>
    moment(dateStr).fromNow();

  return (
    <div className="!relative">
      <button onClick={() => setOpen(!open)} className="!relative !p-2">
        <Bell className="!w-6 !h-6 !text-gray-700" />
        {unreadCount > 0 && (
          <span className="!absolute !top-0 !right-0 !bg-red-500 !text-white !text-xs !rounded-full !w-5 !h-5 !flex !items-center !justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="!absolute !right-0 !mt-2 !w-96 !bg-white !shadow-xl !rounded-xl !z-50 !overflow-hidden !border">
          <div className="!flex !justify-between !items-center !px-4 !py-3 !border-b">
            <h2 className="!font-bold !text-lg">Thông báo</h2>
            <div className="!flex !gap-3 !text-sm">
              <button
                onClick={() => setActiveTab('all')}
                className={`!px-2 !pb-1 !border-b-2 ${
                  activeTab === 'all'
                    ? '!border-blue-500 !font-semibold'
                    : '!border-transparent !text-gray-500'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setActiveTab('unread')}
                className={`!px-2 !pb-1 !border-b-2 ${
                  activeTab === 'unread'
                    ? '!border-blue-500 !font-semibold'
                    : '!border-transparent !text-gray-500'
                }`}
              >
                Chưa đọc
              </button>
            </div>
          </div>

          {displayNotis.length === 0 ? (
            <div className="!p-4 !text-center !text-sm !text-gray-500">
              Không có thông báo
            </div>
          ) : (
            <ul className="!max-h-96 !overflow-y-auto !divide-y">
              {displayNotis.map((n, i) => (
                <li
                  key={i}
                  className={`!flex !gap-3 !px-4 !py-3 !text-sm !items-start !hover:bg-gray-50 !cursor-pointer ${
                    !n.isRead ? '!bg-gray-100' : ''
                  }`}
                >
                  {/* ✅ Checkbox chỉ xuất hiện ở tab 'all' */}
                  {activeTab === 'all' && (
                    <input
                      type="checkbox"
                      className="!mt-1 !accent-blue-500"
                      checked={n.isRead}
                      disabled={n.isRead}
                      onChange={() => markSingleAsRead(n.id)}
                    />
                  )}

                  <div className="!flex-1 !ml-2">
                    <div className={`!leading-tight ${!n.isRead ? '!font-semibold' : ''}`}>
                      {n.title}
                    </div>
                    <div className="!text-xs !text-gray-500 !mt-0.5">
                      {n.message}
                    </div>
                    <div className="!text-[11px] !text-gray-400 !mt-1">
                      {formatTime(n.createdDate)}
                    </div>
                  </div>

                  {!n.isRead && (
                    <span className="!w-2 !h-2 !bg-blue-500 !rounded-full !mt-2" />
                  )}
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
