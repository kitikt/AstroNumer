import React, { useState, useEffect } from "react";
import styles from "@/styles/Mbti.module.css";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
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
  Nhân_vật_ESTJ_nổi_bật: { Tên: string; Loại: string }[] | null;
}

const COLORS = ["#8882d4", "#60519b", "#9f83c3", "#885fc1"]; // Mảng màu cho biểu đồ

const MBTIQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [mbtiResult, setMbtiResult] = useState<MBTIResult | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    characteristics: false,
    strengths: false,
    weaknesses: false,
    workStyle: false,
    roles: false,
    notableFigures: false,
    chart: false,
  });

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

  const handleAnswerChange = (questionId: number, answer: string) => {
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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImp0aSI6ImRjYzk2NzlkLWE2NTMtNDViMi04ODkwLTdiOGExYzcxMWFjMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiYTIxMjkwYmItM2I3MS00ZWRiLWE5OTYtNDEyZDJkM2U0OTQyIiwiZXhwIjoxNzUwMjQyOTMyLCJpc3MiOiJodHRwczovL2FwaS5teWFwcC5jb20iLCJhdWQiOiJodHRwczovL3lvdXItYXBwLmNvbSJ9.kyCnuq730e89G5kBWtcyBlgZbcTEEGdlMRbrYJPdES0",
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
      setError(
        "Lỗi kết nối: " + (err instanceof Error ? err.message : "Unknown error")
      );
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

  // Tạo dữ liệu cho biểu đồ từ Phân_tích_Đặc_điểm
  const traitChartData = mbtiResult
    ? Object.entries(mbtiResult.Phân_tích_Đặc_điểm).map(([name, value]) => ({
        name: name.replace(/_/g, " "),
        value: value.Tỷ_lệ,
      }))
    : [];

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
    return (
      <div className={styles.container}>
        <div className={styles.resultContainer}>
          <div className={styles.resultCard}>
            <h1 className={styles.resultTitle}>Kết quả MBTI của bạn</h1>
            <div className={styles.mbtiType}>{mbtiResult.MBTI_Type}</div>
            <p className={styles.resultDescription}>
              Bạn đã hoàn thành {getAnsweredCount()}/{questions.length} câu hỏi
            </p>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Tổng quan</h2>
              <p className={styles.sectionText}>{mbtiResult.Tổng_quan}</p>
            </div>
            <div className={styles.section}>
              <h2
                className={`${styles.sectionTitle} ${styles.highlightedTitle}`}
                onClick={() =>
                  setExpandedSections((prev) => ({
                    ...prev,
                    characteristics: !prev.characteristics,
                  }))
                }
              >
                Phân tích Đặc điểm{" "}
                {expandedSections.characteristics ? "▼" : "▶"}
              </h2>
              {expandedSections.characteristics &&
                Object.entries(mbtiResult.Phân_tích_Đặc_điểm).map(
                  ([key, value]) => (
                    <div key={key} className={styles.characteristic}>
                      <h3 className={styles.characteristicTitle}>
                        {key.replace(/_/g, " ")}
                      </h3>
                      <p className={styles.sectionText}>{value.Mô_tả}</p>
                      <p className={styles.sectionText}>
                        <strong>Tỷ lệ:</strong> {value.Tỷ_lệ}%
                      </p>
                      <p className={styles.sectionText}>
                        <strong>Từ khóa:</strong> {value.Từ_khóa.join(", ")}
                      </p>
                    </div>
                  )
                )}
            </div>
            <div className={styles.section}>
              <h2
                className={`${styles.sectionTitle} ${styles.highlightedTitle}`}
                onClick={() =>
                  setExpandedSections((prev) => ({
                    ...prev,
                    strengths: !prev.strengths,
                  }))
                }
              >
                Điểm mạnh {expandedSections.strengths ? "▼" : "▶"}
              </h2>
              {expandedSections.strengths && (
                <ul className={styles.list}>
                  {mbtiResult.Điểm_mạnh.map((strength, index) => (
                    <li key={index} className={styles.listItem}>
                      {strength}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={styles.section}>
              <h2
                className={`${styles.sectionTitle} ${styles.highlightedTitle}`}
                onClick={() =>
                  setExpandedSections((prev) => ({
                    ...prev,
                    weaknesses: !prev.weaknesses,
                  }))
                }
              >
                Điểm yếu {expandedSections.weaknesses ? "▼" : "▶"}
              </h2>
              {expandedSections.weaknesses && (
                <ul className={styles.list}>
                  {mbtiResult.Điểm_yếu.map((weakness, index) => (
                    <li key={index} className={styles.listItem}>
                      {weakness}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={styles.section}>
              <h2
                className={`${styles.sectionTitle} ${styles.highlightedTitle}`}
                onClick={() =>
                  setExpandedSections((prev) => ({
                    ...prev,
                    workStyle: !prev.workStyle,
                  }))
                }
              >
                Phong cách làm việc {expandedSections.workStyle ? "▼" : "▶"}
              </h2>
              {expandedSections.workStyle && (
                <p className={styles.sectionText}>
                  {mbtiResult.Phong_cách_làm_việc}
                </p>
              )}
            </div>
            <div className={styles.section}>
              <h2
                className={`${styles.sectionTitle} ${styles.highlightedTitle}`}
                onClick={() =>
                  setExpandedSections((prev) => ({
                    ...prev,
                    roles: !prev.roles,
                  }))
                }
              >
                Vai trò phù hợp {expandedSections.roles ? "▼" : "▶"}
              </h2>
              {expandedSections.roles && (
                <ul className={styles.list}>
                  {mbtiResult.Vai_trò_phù_hợp.map((role, index) => (
                    <li key={index} className={styles.listItem}>
                      {role}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={styles.section}>
              <h2
                className={`${styles.sectionTitle} ${styles.highlightedTitle}`}
                onClick={() =>
                  setExpandedSections((prev) => ({
                    ...prev,
                    notableFigures: !prev.notableFigures,
                  }))
                }
              >
                Nhân vật nổi bật {expandedSections.notableFigures ? "▼" : "▶"}
              </h2>
              {expandedSections.notableFigures &&
                (mbtiResult.Nhân_vật_ESTJ_nổi_bật &&
                mbtiResult.Nhân_vật_ESTJ_nổi_bật.length > 0 ? (
                  <ul className={styles.list}>
                    {mbtiResult.Nhân_vật_ESTJ_nổi_bật.map((person, index) => (
                      <li key={index} className={styles.listItem}>
                        {person.Tên} ({person.Loại})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.sectionText}>
                    Không có thông tin về nhân vật nổi bật.
                  </p>
                ))}
            </div>
            <div className={styles.section}>
              <h2
                className={`${styles.sectionTitle} ${styles.highlightedTitle}`}
                onClick={() =>
                  setExpandedSections((prev) => ({
                    ...prev,
                    chart: !prev.chart,
                  }))
                }
              >
                Biểu đồ đặc điểm {expandedSections.chart ? "▼" : "▶"}
              </h2>
              {expandedSections.chart && (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={traitChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {traitChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <button
              className={styles.restartButton}
              onClick={() => {
                setAnswers({});
                setCurrentPage(0);
                setShowResult(false);
                setMbtiResult(null);
                setExpandedSections({
                  characteristics: false,
                  strengths: false,
                  weaknesses: false,
                  workStyle: false,
                  roles: false,
                  notableFigures: false,
                  chart: false,
                });
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
