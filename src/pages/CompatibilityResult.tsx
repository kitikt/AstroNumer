import React from "react";
import { useNavigate } from "react-router-dom";

const CompatibilityResultPage: React.FC = () => {
  const navigate = useNavigate();
  let result: any = null;
  try {
    result = JSON.parse(localStorage.getItem("compatibilityResult") || "null");
  } catch {
    result = null;
  }
  let data = result?.Data;
  if (typeof data === "string") {
    try {
      const cleaned = data.replace(/^```json\s*|```\s*$/g, "").trim();
      data = JSON.parse(cleaned);
    } catch {
      data = null;
    }
  }

  if (!result || !result.Success || !data) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          borderRadius: 24,
          padding: 32,
          maxWidth: 600,
          margin: "0 auto",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          color: "red",
          textAlign: "center",
        }}
      >
        <div>
          Không có dữ liệu kết quả hoặc có lỗi xảy ra!
          <div style={{ marginTop: 24 }}>
            <button
              onClick={() => {
                localStorage.removeItem("compatibilityResult");
                navigate("/form/compatibility");
              }}
              style={{
                padding: "12px 24px",
                background: "#7c2d12",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                marginTop: 8,
              }}
            >
              Nhập lại dữ liệu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        borderRadius: 24,
        padding: 32,
        maxWidth: 600,
        margin: "0 auto",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
      }}
    >
      <div style={{ width: "100%" }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 16,
            color: "#7c2d12",
          }}
        >
          Kết Quả Phân Tích Tương Hợp
        </h1>
        <div style={{ marginBottom: 16 }}>
          <b>Cặp số:</b>{" "}
          {Array.isArray(data["cặp"]) ? data["cặp"].join(" - ") : ""}
        </div>
        <div style={{ marginBottom: 16 }}>
          <b>Điểm số:</b> {data["điểm_số"]} / 100
        </div>
        <div style={{ marginBottom: 16 }}>
          <b>Cấp độ:</b> {data["cấp_độ"]}
        </div>
        <div style={{ marginBottom: 16 }}>
          <b>Tóm tắt:</b> {data["tóm_tắt"]}
        </div>
        <div style={{ marginBottom: 16 }}>
          <b>Phần trăm tổng quát:</b>
          <ul>
            {data["phần_trăm_tổng_quát"] &&
              Object.entries(data["phần_trăm_tổng_quát"]).map(([k, v]) => (
                <li key={k}>
                  {k.replace(/_/g, " ")}: {v}
                </li>
              ))}
          </ul>
        </div>
        <div style={{ marginBottom: 16 }}>
          <b>Phân tích tương hợp:</b>
          <ul>
            {data["phân_tích_tương_hợp"] &&
              Object.entries(data["phân_tích_tương_hợp"]).map(([k, v]) => (
                <li key={k}>
                  <b>{k.replace(/_/g, " ")}:</b> {v}
                </li>
              ))}
          </ul>
        </div>
        <div style={{ marginBottom: 16 }}>
          <b>Điểm mạnh:</b>
          <ul>
            {data["điểm_mạnh"]?.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <b>Thách thức:</b>
          <ul>
            {data["thách_thức"]?.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div style={{ marginBottom: 16 }}>
          <b>Kết nối cảm xúc:</b>
          <ul>
            {data["kết_nối_cảm_xúc"] &&
              Object.entries(data["kết_nối_cảm_xúc"]).map(([k, v]) => (
                <li key={k}>
                  <b>{k.replace(/_/g, " ")}:</b> {v}
                </li>
              ))}
          </ul>
        </div>
        <div style={{ marginBottom: 16 }}>
          <b>Tiềm năng phát triển:</b>
          <ul>
            {data["tiềm_năng_phát_triển"] &&
              Object.entries(data["tiềm_năng_phát_triển"]).map(([k, v]) => (
                <li key={k}>
                  <b>{k.replace(/_/g, " ")}:</b> {v}
                </li>
              ))}
          </ul>
        </div>
        <div style={{ marginBottom: 16 }}>
          <b>Lời khuyên thực tế:</b>
          <ul>
            {data["lời_khuyên_thực_tế"]?.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div style={{ marginTop: 16, fontStyle: "italic", color: "#7c2d12" }}>
          <b>Câu trích dẫn nổi bật:</b> {data["câu_trích_dẫn_nổi_bật"]}
        </div>
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <button
            onClick={() => {
              localStorage.removeItem("compatibilityResult");
              navigate("/form/compatibility");
            }}
            style={{
              padding: "12px 24px",
              background: "#7c2d12",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              marginTop: 8,
            }}
          >
            Nhập lại dữ liệu
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityResultPage;
