import React, { useState } from "react";
import FeedbackForm from "./FeedbackForm";
import styles from "@/styles/FloatingFeedbackButton.module.css";

const FloatingFeedbackButton: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleFormSuccess = () => {
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className={styles.floatingButtonContainer}>
        <button
          className={styles.floatingButton}
          onClick={() => setShowForm(true)}
          title="Gửi Feedback"
        >
          <span className={styles.buttonIcon}>💬</span>
          <span className={styles.buttonText}>Feedback</span>
        </button>
      </div>

      {showForm && (
        <FeedbackForm
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}
    </>
  );
};

export default FloatingFeedbackButton;
