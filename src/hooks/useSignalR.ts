// src/hooks/useSignalR.ts
import { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
// src/types/notification.ts
export interface NotificationDTO {
  id: number;
  title: string;
  titleUnsign: string;
  message: string;
  href: string | null;
  type: number;
  createdDate: string;
  isRead: boolean;
}







export const useSignalR = (
  onReceive: (notification: NotificationDTO) => void
) => {
  useEffect(() => {
    const accessToken = localStorage.getItem('token'); // ⚠️ Đảm bảo token đã được lưu ở đây

    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7079/hub/notification', {
        accessTokenFactory: () => accessToken || ''
      })
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log('✅ SignalR Connected');
      })
      .catch(err => console.error('❌ SignalR Connection Error:', err));

    connection.on('ReceiveNotification', (data: NotificationDTO) => {
      const notification: NotificationDTO = {
        id: data.id,
        title: data.title,
        titleUnsign: data.titleUnsign,
        message: data.message,
        href: data.href,
        type: data.type,
        createdDate: data.createdDate,
        isRead: data.isRead,
      };

      console.log('📩 New notification received:', notification);
      onReceive(notification);
    });

    return () => {
      connection.stop();
    };
  }, [onReceive]);
};

