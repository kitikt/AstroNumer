import React, { useState, useEffect } from "react";
import FeedbackForm from "@/components/FeedbackForm";
import FeedbackList from "@/components/FeedbackList";
import styles from "@/styles/FeedbackPage.module.css";

interface FeedbackStats {
  totalFeedback: number;
}

const FeedbackPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState<FeedbackStats>({ totalFeedback: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbackStats();
  }, []);

  const fetchFeedbackStats = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseURL}/api/Feedback/count`);

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        console.warn("Failed to fetch feedback count, using default values");
        setStats({ totalFeedback: 500 }); // Fallback value
      }
    } catch (error) {
      console.warn("Error fetching feedback stats:", error);
      setStats({ totalFeedback: 500 }); // Fallback value
    } finally {
      setLoading(false);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    // Refresh stats after successful feedback submission
    fetchFeedbackStats();
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <div className={styles.feedbackPageContainer}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Đánh giá & Feedback</h1>
          <p className={styles.heroDescription}>
            Chia sẻ trải nghiệm của bạn để chúng tôi có thể cải thiện dịch vụ
            tốt hơn
          </p>
          <button
            className={styles.ctaButton}
            onClick={() => setShowForm(true)}
          >
            Gửi Feedback
          </button>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>4.8</div>
            <div className={styles.statLabel}>Điểm đánh giá trung bình</div>
            <div className={styles.statStars}>★★★★★</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {loading ? "..." : `${stats.totalFeedback}+`}
            </div>
            <div className={styles.statLabel}>Khách hàng đã đánh giá</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>98%</div>
            <div className={styles.statLabel}>Khách hàng hài lòng</div>
          </div>
        </div>

        <div className={styles.feedbackSection}>
          <FeedbackList limit={10} showTitle={true} />
        </div>
      </div>

      {showForm && (
        <FeedbackForm
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default FeedbackPage;
