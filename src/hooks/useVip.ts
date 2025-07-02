import { useState, useEffect } from 'react';
import { checkVipStatus, VipStatus } from '@/services/vipService';

export const useVip = () => {
  const [vipStatus, setVipStatus] = useState<VipStatus>({ hasVipPackage: false });
  const [loading, setLoading] = useState(true);

  const checkVip = async () => {
    setLoading(true);
    try {
      const status = await checkVipStatus();
      setVipStatus(status);
    } catch (error) {
      console.error('Error checking VIP status:', error);
      setVipStatus({ hasVipPackage: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkVip();
  }, []);

  return {
    vipStatus,
    loading,
    checkVip,
  };
}; 