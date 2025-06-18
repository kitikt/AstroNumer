import React, { useState, useEffect } from "react";
import styles from "@/styles/Mbti.module.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

interface Question {
  id: number;
  question: string;
  options: Record<string, string>;
}

interface MBTIResult {
  MBTI_Type: string;
  Tổng_quan: string;
  Phân_tích_Đặc_điểm: {
    [key: string]: {
      Mô_tả: string;
      Từ_khóa: string[];
      Tỷ_lệ: number;
    };
  };
  Điểm_mạnh: string[];
  Điểm_yếu: string[];
  Phong_cách_làm_việc: string;
  Vai_trò_phù_hợp: string[];
  Nhân_vật_ESTJ_nổi_bật: {
    Tên: string;
    Loại: string;
  }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const MBTIQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [mbtiResult, setMbtiResult] = useState<MBTIResult | null>(null);

  const questionsPerPage = 5;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://astronumer.info.vn/api/v1/mbti/questions");
      const data = await response.json();
      if (data.Success) {
        setQuestions(data.Data);
      } else {
        setError("Không thể tải câu hỏi");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
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
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
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
      const requestBody = Object.entries(answers).map(([questionId, selectedOption]) => ({
        QuestionId: parseInt(questionId),
        SelectedOption: selectedOption
      }));

      const response = await fetch("https://astronumer.info.vn/api/v1/mbti/calculate", {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

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

  const getAnsweredCount = () => Object.keys(answers).length;

  const canProceed = () => getCurrentQuestions().every((q) => answers[q.id]);

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

  if (showResult && mbtiResult) {
    const traitChartData = Object.entries(mbtiResult.Phân_tích_Đặc_điểm).map(([key, value]) => ({
      name: key,
      value: value.Tỷ_lệ,
      desc: value.Mô_tả
    }));

    return (
      <div className={styles.container}>
        <div className={styles.resultContainer}>
          <div className={styles.resultCard}>
            <h1 className={styles.resultTitle}>Kết quả MBTI của bạn: {mbtiResult.MBTI_Type}</h1>
            <p className={styles.resultDescription}>{mbtiResult.Tổng_quan}</p>

            <h2 className={styles.sectionTitle}>Biểu đồ đặc điểm</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={traitChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {traitChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            {traitChartData.map((item, idx) => (
              <div key={idx} className={styles.traitCard}>
                <h3>{item.name} ({item.value}%)</h3>
                <p>{item.desc}</p>
              </div>
            ))}

            <h2 className={styles.sectionTitle}>Điểm mạnh</h2>
            <ul>
              {mbtiResult.Điểm_mạnh.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>Điểm yếu</h2>
            <ul>
              {mbtiResult.Điểm_yếu.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>Phong cách làm việc</h2>
            <p>{mbtiResult.Phong_cách_làm_việc}</p>

            <h2 className={styles.sectionTitle}>Vai trò phù hợp</h2>
            <ul>
              {mbtiResult.Vai_trò_phù_hợp.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <button className={styles.restartButton} onClick={() => {
              setAnswers({});
              setCurrentPage(0);
              setShowResult(false);
              setMbtiResult(null);
            }}>
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
        <p className={styles.subtitle}>Khám phá tính cách của bạn qua 20 câu hỏi</p>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}></div>
        </div>
        <p className={styles.progressText}>Trang {currentPage + 1} / {totalPages} • Đã trả lời: {getAnsweredCount()}/{questions.length}</p>
      </div>

      <div className={styles.questionsContainer}>
        {getCurrentQuestions().map((question, index) => (
          <div key={question.id} className={styles.questionCard}>
            <h3 className={styles.questionTitle}>Câu {currentPage * questionsPerPage + index + 1}: {question.question}</h3>
            <div className={styles.optionsContainer}>
              {Object.entries(question.options).map(([key, value]) => (
                <label key={key} className={styles.optionLabel}>
                  <input type="radio" name={`question-${question.id}`} value={key} checked={answers[question.id] === key} onChange={() => handleAnswerChange(question.id, key)} className={styles.radioInput} />
                  <span className={styles.optionText}>{value}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.navigationContainer}>
        <button className={`${styles.navButton} ${styles.prevButton} ${currentPage === 0 ? styles.disabledButton : ""}`} onClick={handlePrevious} disabled={currentPage === 0}>← Quay lại</button>
        <button className={`${styles.navButton} ${styles.nextButton} ${!canProceed() ? styles.disabledButton : ""}`} onClick={handleNext} disabled={!canProceed()}>{isLastPage ? "Xem kết quả" : "Tiếp theo"} →</button>
      </div>
    </div>
  );
};

export default MBTIQuiz;