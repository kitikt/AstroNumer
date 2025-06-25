import React from "react";
import { Link } from "react-router-dom";
import FeedbackList from "@/components/FeedbackList";
import styles from "@/styles/Home/FeedbackSection.module.css";

const FeedbackSection: React.FC = () => {
  return (
    <section className={styles.feedbackSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Đánh giá từ khách hàng</h2>
          <p className={styles.subtitle}>
            Khám phá những trải nghiệm thực tế từ khách hàng của chúng tôi
          </p>
        </div>

        <div className={styles.feedbackPreview}>
          <FeedbackList limit={3} showTitle={false} />
        </div>

        <div className={styles.ctaSection}>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>4.8</div>
              <div className={styles.statLabel}>Điểm đánh giá</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Khách hàng</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Hài lòng</div>
            </div>
          </div>

          <div className={styles.actions}>
            <Link to="/feedback" className={styles.viewAllButton}>
              Xem tất cả đánh giá
            </Link>
            <Link to="/feedback" className={styles.writeFeedbackButton}>
              Viết đánh giá
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
