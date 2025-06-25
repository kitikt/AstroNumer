import styles from "@/styles/Home/SevenSection.module.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Feedback {
  Id: number;
  Content: string;
  Rating: number;
  PurchasedServiceId: number;
  CreatedAt: string;
  UpdatedAt?: string;
  IsDeleted?: boolean;
}

const CARD_BG = "/images/background2.png"; // Hình nền cố định cho card

const SevenSection = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseURL}/api/Feedback`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setFeedbacks(data);
          return;
        }
      }
      throw new Error("API error");
    } catch {
      setFeedbacks([
        {
          Content: "Dịch vụ rất tốt!",
          Rating: 5,
          PurchasedServiceId: 1,
          CreatedAt: "2024-06-24T08:58:49.503Z",
          Id: 1,
        },
        {
          Content: "Hài lòng!",
          Rating: 4,
          PurchasedServiceId: 2,
          CreatedAt: "2024-06-24T08:58:49.503Z",
          Id: 2,
        },
      ]);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  // Responsive: detect mobile
  const isMobile = window.innerWidth <= 600;

  // Card rendering logic
  let cardsToRender: Feedback[] = [];
  if (feedbacks.length === 1) {
    cardsToRender = [feedbacks[0]];
  } else if (feedbacks.length === 2) {
    cardsToRender = [feedbacks[0], feedbacks[1]];
  } else if (feedbacks.length >= 3) {
    if (isMobile) {
      cardsToRender = [feedbacks[currentIndex]];
    } else {
      // Show prev, current, next
      const prev =
        feedbacks[(currentIndex - 1 + feedbacks.length) % feedbacks.length];
      const current = feedbacks[currentIndex];
      const next = feedbacks[(currentIndex + 1) % feedbacks.length];
      cardsToRender = [prev, current, next];
    }
  }

  return (
    <section className={styles.sevenSection}>
      <h1 className={styles.heading}>
        CÁC KHÁCH HÀNG NÓI
        <br />
        GÌ VỀ ASTRONUMER
      </h1>
      <div className={styles.slider}>
        {feedbacks.length === 0 && (
          <div
            style={{ color: "#fff", fontSize: "1.2rem", margin: "2rem auto" }}
          >
            Chưa có feedback nào
          </div>
        )}
        <div className={styles.cardRow}>
          <AnimatePresence initial={false}>
            {cardsToRender.map((fb, idx) => {
              // Determine card style
              let cardClass = styles.sliderCard;
              if (
                feedbacks.length === 1 ||
                (feedbacks.length >= 3 && isMobile && idx === 0) ||
                (feedbacks.length >= 3 && !isMobile && idx === 1)
              ) {
                cardClass += " " + styles.activeCard;
              } else if (feedbacks.length === 2) {
                cardClass += " " + styles.sideCard;
              } else if (
                feedbacks.length >= 3 &&
                !isMobile &&
                (idx === 0 || idx === 2)
              ) {
                cardClass += " " + styles.sideCard;
              }
              return (
                <motion.div
                  key={fb.Id + "-" + idx}
                  className={cardClass}
                  initial={{ opacity: 0, scale: 0.8, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 40 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background: `url(${CARD_BG}) center/cover, rgba(0,0,0,0.7)`,
                  }}
                >
                  <div
                    className={styles.feedbackContent}
                    style={{
                      fontSize: "1.1rem",
                      marginBottom: 12,
                      fontWeight: 500,
                    }}
                  >
                    {fb.Content}
                  </div>
                  <div
                    className={styles.feedbackRating}
                    style={{
                      color: "#ffd700",
                      fontSize: "1.3rem",
                      letterSpacing: 2,
                      marginBottom: 8,
                    }}
                  >
                    {"★".repeat(fb.Rating)}
                  </div>
                  <div style={{ fontSize: "0.95rem", opacity: 0.8 }}>
                    {formatDate(fb.CreatedAt)}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className={styles.buttonWrapper}>
          <button
            onClick={handlePrev}
            className={styles.prevButton}
            disabled={feedbacks.length <= 1}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className={styles.nextButton}
            disabled={feedbacks.length <= 1}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default SevenSection;
