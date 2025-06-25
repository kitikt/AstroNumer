import React, { useEffect } from "react";
import styles from "@/styles/FeedbackSuccessModal.module.css";

interface FeedbackSuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const FeedbackSuccessModal: React.FC<FeedbackSuccessModalProps> = ({
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.successIcon}>✅</div>
        <h3 className={styles.title}>Cảm ơn bạn!</h3>
        <p className={styles.message}>
          Feedback của bạn đã được gửi thành công. Chúng tôi sẽ xem xét và cải
          thiện dịch vụ dựa trên ý kiến của bạn.
        </p>
        <button className={styles.closeButton} onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default FeedbackSuccessModal;
