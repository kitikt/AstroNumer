import { useEffect, useState } from 'react'
import { Bell, MoreHorizontal, Check } from 'lucide-react'
import { NotificationDTO, useSignalR } from '@/hooks/useSignalR'
import { Button } from '@chakra-ui/react'

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<NotificationDTO[]>([])
  const [open, setOpen] = useState(false)
  const [filterRead, setFilterRead] = useState<'all' | 'unread'>('all')

  useSignalR((newNoti) => {
    setNotifications((prev) => [newNoti, ...prev])
  })

  const fetchNotifications = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user') || 'null')
      if (!userId) return

      const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1/notifications/user/${userId}/all?page-index=1&page-size=1000`
      const url = filterRead === 'unread' ? `${baseUrl}&isRead=false` : baseUrl

      const response = await fetch(url)
      const resData = await response.json()
      if (!response.ok) throw new Error(resData.message || 'Lỗi khi lấy thông báo')

      const rawData = resData.Data?.Data ?? []
      const mapped = rawData.map((item: any, index: number) => ({
        id: item.Id ?? `temp-${index}`,
        title: item.Title ?? '',
        titleUnsign: item.TitleUnsign ?? '',
        message: item.Message ?? '',
        href: item.Href ?? '',
        type: item.Type ?? 0,
        createdDate: item.CreatedDate ?? new Date().toISOString(),
        isRead: item.IsRead ?? false,
      })) as NotificationDTO[]

      setNotifications(mapped)
    } catch (error) {
      console.error('Fetch notifications failed:', error)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [filterRead])

  const unread = notifications.filter((n) => !n.isRead)
  const read = notifications.filter((n) => n.isRead)

 const renderNotification = (n: NotificationDTO, isRead: boolean) => (
  <div
    key={`${n.id}-${n.createdDate}`}
    className="!flex !items-start !space-x-3 !p-2 hover:!bg-gray-50 !rounded-lg !cursor-pointer"
  >
    <div className="!relative">
      <button
        className={`!absolute !-bottom-1 !-right-1 ${
          isRead
            ? '!w-6 !h-6 !bg-blue-500 !flex !items-center !justify-center'
            : '!w-4 !h-4 !bg-green-500'
        } !rounded-full !border-2 !border-white`}
        title={isRead ? 'Đã đọc' : 'Đánh dấu đã đọc'}
        disabled={isRead}
        onClick={async (e) => {
          e.stopPropagation();
          if (isRead) return;
          try {
            await fetch(
              `${import.meta.env.VITE_API_URL}/api/v1/notifications/${n.id}/mark-read`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            setNotifications((prev) =>
              prev.map((item) =>
                item.id === n.id ? { ...item, isRead: true } : item
              )
            );
          } catch (err) {
            console.error('Đánh dấu đã đọc thất bại:', err);
          }
        }}
      >
        {isRead && <Check className="!w-3 !h-3 !text-white" />}
      </button>
    </div>
    <div className="!flex-1 !min-w-0">
      <p className="!text-sm !font-semibold !text-gray-900">{n.title}</p>
      <p className="!text-sm !text-gray-700">{n.message}</p>
      <p className="!text-xs !text-gray-500 !mt-1">
        {new Date(n.createdDate).toLocaleString()}
      </p>
    </div>
  </div>
);


  return (
    <div className="!relative">
      <button onClick={() => setOpen(!open)} className="!relative !p-2">
        <Bell className="!w-6 !h-6 !text-gray-700" />
        {unread.length > 0 && (
          <span className="!absolute !-top-1 !-right-1 !bg-red-500 !text-white !text-[10px] !min-w-[18px] !h-[18px] !px-1 !flex !items-center !justify-center !rounded-full !shadow-sm">
            {unread.length}
          </span>
        )}
      </button>

      {open && (
        <div className="!absolute !right-0 !mt-2 !w-[420px] !max-h-[90vh] !bg-white !shadow-lg !rounded-lg !z-50 !overflow-auto">
          <div className="!flex !items-center !justify-between !p-4 !border-b">
            <h1 className="!text-xl !font-bold !text-gray-900">Thông báo</h1>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="!h-5 !w-5" />
            </Button>
          </div>

          <div className="!flex !border-b">
            <button
              onClick={() => setFilterRead('all')}
              className={`!flex-1 !px-4 !py-3 !text-sm !font-medium ${
                filterRead === 'all'
                  ? '!text-blue-600 !bg-blue-50 !border-b-2 !border-blue-600'
                  : '!text-gray-600 hover:!text-gray-900'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilterRead('unread')}
              className={`!flex-1 !px-4 !py-3 !text-sm !font-medium ${
                filterRead === 'unread'
                  ? '!text-blue-600 !bg-blue-50 !border-b-2 !border-blue-600'
                  : '!text-gray-600 hover:!text-gray-900'
              }`}
            >
              Chưa đọc
            </button>
          </div>

          <div className="!p-4">
            {filterRead === 'all' ? (
              <>
                {unread.length > 0 && (
                  <>
                    <h2 className="!text-base !font-semibold !text-gray-900 !mb-2">Mới</h2>
                    {unread.map((n) => renderNotification(n, false))}
                  </>
                )}
                {read.length > 0 && (
                  <>
                    <h2 className="!text-base !font-semibold !text-gray-900 !mt-4 !mb-2">
                      Trước đó
                    </h2>
                    {read.map((n) => renderNotification(n, true))}
                  </>
                )}
              </>
            ) : (
              <>
                {notifications.length === 0 ? (
                  <p className="!text-sm !text-gray-500">Không có thông báo chưa đọc.</p>
                ) : (
                  notifications.map((n) => renderNotification(n, false))
                )}
              </>
            )}
          </div>

          <Button
            variant="outline"
            className="!w-full !mt-4 !bg-gray-100 !text-gray-700 hover:!bg-gray-200 !border-gray-200"
          >
            Xem thông báo trước đó
          </Button>
        </div>
      )}
    </div>
  )
}

export default NotificationBell
