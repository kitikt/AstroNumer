import React, { useState, useEffect } from "react";
import styles from "@/styles/Mbti.module.css";

interface Question {
  id: number;
  question: string;
  options: Record<string, string>;
}

const MBTIQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [mbtiResult, setMbtiResult] = useState("");

  const questionsPerPage = 5;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://astronumer.info.vn/api/v1/mbti/questions"
      );
      const data = await response.json();

      if (data.Success) {
        setQuestions(data.Data);
      } else {
        setError("Không thể tải câu hỏi");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError("Lỗi kết nối: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentQuestions = () => {
    const startIndex = currentPage * questionsPerPage;
    return questions.slice(startIndex, startIndex + questionsPerPage);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    const nextPage = currentPage + 1;
    const totalPages = Math.ceil(questions.length / questionsPerPage);

    if (nextPage < totalPages) {
      setCurrentPage(nextPage);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const calculateResult = async () => {
    try {
      setLoading(true);
      const requestBody = Object.entries(answers).map(
        ([questionId, selectedOption]) => ({
          QuestionId: parseInt(questionId),
          SelectedOption: selectedOption,
        })
      );

      const response = await fetch(
        "https://astronumer.info.vn/api/v1/mbti/calculate",
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (data.Success) {
        setMbtiResult(data.Data);
        setShowResult(true);
      } else {
        setError(data.Message || "Không thể tính kết quả MBTI");
      }
    } catch (err) {
      setError("Lỗi kết nối: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const canProceed = () => {
    const currentQuestions = getCurrentQuestions();
    return currentQuestions.every((q) => answers[q.id]);
  };

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const isLastPage = currentPage === totalPages - 1;

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Đang tải câu hỏi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Có lỗi xảy ra</h2>
          <p className={styles.errorText}>{error}</p>
          <button className={styles.retryButton} onClick={fetchQuestions}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className={styles.container}>
        <div className={styles.resultContainer}>
          <div className={styles.resultCard}>
            <h1 className={styles.resultTitle}>Kết quả MBTI của bạn</h1>
            <div className={styles.mbtiType}>{mbtiResult}</div>
            <p className={styles.resultDescription}>
              Bạn đã hoàn thành {getAnsweredCount()}/{questions.length} câu hỏi
            </p>
            <button
              className={styles.restartButton}
              onClick={() => {
                setAnswers({});
                setCurrentPage(0);
                setShowResult(false);
                setMbtiResult("");
              }}
            >
              Làm lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>TRẮC NGHIỆM MBTI</h1>
        <p className={styles.subtitle}>
          Khám phá tính cách của bạn qua 20 câu hỏi
        </p>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${((currentPage + 1) / totalPages) * 100}%`,
            }}
          ></div>
        </div>
        <p className={styles.progressText}>
          Trang {currentPage + 1} / {totalPages} • Đã trả lời:{" "}
          {getAnsweredCount()}/{questions.length}
        </p>
      </div>

      <div className={styles.questionsContainer}>
        {getCurrentQuestions().map((question, index) => (
          <div key={question.id} className={styles.questionCard}>
            <h3 className={styles.questionTitle}>
              Câu {currentPage * questionsPerPage + index + 1}:{" "}
              {question.question}
            </h3>
            <div className={styles.optionsContainer}>
              {Object.entries(question.options).map(([key, value]) => (
                <label key={key} className={styles.optionLabel}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={key}
                    checked={answers[question.id] === key}
                    onChange={() => handleAnswerChange(question.id, key)}
                    className={styles.radioInput}
                  />
                  <span className={styles.optionText}>{value}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.navigationContainer}>
        <button
          className={`${styles.navButton} ${styles.prevButton} ${
            currentPage === 0 ? styles.disabledButton : ""
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          ← Quay lại
        </button>

        <button
          className={`${styles.navButton} ${styles.nextButton} ${
            !canProceed() ? styles.disabledButton : ""
          }`}
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {isLastPage ? "Xem kết quả" : "Tiếp theo"} →
        </button>
      </div>
    </div>
  );
};

export default MBTIQuiz;
