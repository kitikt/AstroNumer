import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarMapReply from "./StarMapReply"; // Giả sử component này nằm cùng thư mục

interface StarMapData {
  Ascendant: number;
  AscendantSign: string;
  PlanetInSigns: Record<string, string>;
  PlanetInHouses: Record<string, number>;
}

const StarMapPage: React.FC = () => {
  const navigate = useNavigate();
  const [astroData, setAstroData] = useState<Partial<StarMapData> | null>(null);
  const [chatBotData, setChatBotData] = useState<string | null>(null); // Chỉ lưu tReply
  const [error, setError] = useState<string | null>(null);

  const planetSymbols = {
    Sun: "☉",
    Moon: "☽",
    Mercury: "☿",
    Venus: "♀",
    Mars: "♂",
    Jupiter: "♃",
    Saturn: "♄",
    Uranus: "♅",
    Neptune: "♆",
    Pluto: "♇",
  };

  const planetNamesVN = {
    Sun: "Mặt Trời",
    Moon: "Mặt Trăng",
    Mercury: "Thủy Tinh",
    Venus: "Kim Tinh",
    Mars: "Hỏa Tinh",
    Jupiter: "Mộc Tinh",
    Saturn: "Thổ Tinh",
    Uranus: "Thiên Vương Tinh",
    Neptune: "Hải Vương Tinh",
    Pluto: "Diêm Vương Tinh",
  };

  const zodiacSigns = [
    "Bạch Dương",
    "Kim Ngưu",
    "Song Tử",
    "Cự Giải",
    "Sư Tử",
    "Xử Nữ",
    "Thiên Bình",
    "Bọ Cạp",
    "Nhân Mã",
    "Ma Kết",
    "Bảo Bình",
    "Song Ngư",
  ];

  const zodiacSymbols = [
    "♈",
    "♉",
    "♊",
    "♋",
    "♌",
    "♍",
    "♎",
    "♏",
    "♐",
    "♑",
    "♒",
    "♓",
  ];

  const calculatePlanetPosition = (planetName: string, house: number) => {
    const baseAngle = (house - 1) * 30;
    const offset = Math.random() * 25 + 2.5;
    return baseAngle + offset;
  };

  const angleToCoordinates = (angle: number, radius: number) => {
    const radian = ((angle - 90) * Math.PI) / 180;
    return {
      x: 375 + radius * Math.cos(radian),
      y: 375 + radius * Math.sin(radian),
    };
  };

  const renderZodiacSigns = () => {
    return zodiacSigns.map((sign, index) => {
      const angle = index * 30 + 15;
      const position = angleToCoordinates(angle, 280);
      const symbolPosition = angleToCoordinates(angle, 240);

      return (
        <g key={sign}>
          <text
            x={position.x}
            y={position.y}
            style={{
              fill: "#ffffff",
              fontSize: "10px",
              fontWeight: "600",
              textAnchor: "middle",
              dominantBaseline: "middle",
              filter: "drop-shadow(0 0 3px rgba(138, 43, 226, 0.8))",
              transform: `rotate(${angle + 90}, ${position.x}, ${position.y})`,
            }}
          >
            {sign}
          </text>
          <text
            x={symbolPosition.x}
            y={symbolPosition.y}
            style={{
              fill: "#e91e63",
              fontSize: "14px",
              fontWeight: "bold",
              textAnchor: "middle",
              dominantBaseline: "middle",
              filter: "drop-shadow(0 0 5px rgba(233, 30, 99, 0.6))",
            }}
          >
            {zodiacSymbols[index]}
          </text>
        </g>
      );
    });
  };

  const renderHouseLines = () => {
    const lines: JSX.Element[] = [];
    for (let i = 0; i < 12; i++) {
      const angle = i * 30;
      const innerPos = angleToCoordinates(angle, 250);
      const outerPos = angleToCoordinates(angle, 350);

      lines.push(
        <line
          key={`house-${i}`}
          x1={innerPos.x}
          y1={innerPos.y}
          x2={outerPos.x}
          y2={outerPos.y}
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="2"
          filter="drop-shadow(0 0 2px rgba(138, 43, 226, 0.5))"
        />
      );

      const housePos = angleToCoordinates(angle + 15, 240);
      lines.push(
        <text
          key={`house-num-${i}`}
          x={housePos.x}
          y={housePos.y}
          style={{
            fill: "#ffffff",
            fontSize: "14px",
            fontWeight: "bold",
            textAnchor: "middle",
            dominantBaseline: "middle",
            filter: "drop-shadow(0 0 3px rgba(0, 0, 0, 0.8))",
          }}
        >
          {i + 1}
        </text>
      );
    }
    return lines;
  };

  const renderPlanets = () => {
    if (!astroData || !astroData.PlanetInHouses) return null;
    const colors = [
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#00bcd4",
      "#009688",
      "#4caf50",
      "#8bc34a",
      "#cddc39",
    ];

    return Object.entries(astroData.PlanetInHouses).map(
      ([planet, house], index) => {
        const angle = calculatePlanetPosition(planet, house);
        const planetPos = angleToCoordinates(angle, 190);
        const connectPos = angleToCoordinates(angle, 250);
        const planetColor = colors[index % colors.length];

        return (
          <g key={planet}>
            <line
              x1={planetPos.x}
              y1={planetPos.y}
              x2={connectPos.x}
              y2={connectPos.y}
              stroke={planetColor}
              strokeWidth="2"
              strokeDasharray="3,3"
              opacity="0.8"
              filter="drop-shadow(0 0 3px rgba(233, 30, 99, 0.5))"
            />
            <circle
              cx={planetPos.x}
              cy={planetPos.y}
              r="16"
              fill="rgba(255, 255, 255, 0.9)"
              stroke={planetColor}
              strokeWidth="3"
              filter="drop-shadow(0 0 8px rgba(233, 30, 99, 0.4))"
            />
            <text
              x={planetPos.x}
              y={planetPos.y}
              style={{
                fill: planetColor,
                fontSize: "16px",
                fontWeight: "bold",
                textAnchor: "middle",
                dominantBaseline: "middle",
              }}
            >
              {planetSymbols[planet]}
            </text>
            <text
              x={planetPos.x}
              y={planetPos.y + 28}
              style={{
                fill: "#ffffff",
                fontSize: "10px",
                fontWeight: "600",
                textAnchor: "middle",
                dominantBaseline: "middle",
                filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.8))",
              }}
            >
              {angle.toFixed(1)}°
            </text>
          </g>
        );
      }
    );
  };

  const renderAscendant = () => {
    if (!astroData || astroData.Ascendant === undefined) return null;
    const ascPos = angleToCoordinates(astroData.Ascendant, 360);
    return (
      <g>
        <line
          x1={375}
          y1={375}
          x2={ascPos.x}
          y2={ascPos.y}
          stroke="#e91e63"
          strokeWidth="4"
          filter="drop-shadow(0 0 6px rgba(233, 30, 99, 0.8))"
        />
        <circle
          cx={ascPos.x}
          cy={ascPos.y}
          r="12"
          fill="#ffffff"
          stroke="#e91e63"
          strokeWidth="3"
          filter="drop-shadow(0 0 8px rgba(233, 30, 99, 0.6))"
        />
        <text
          x={ascPos.x}
          y={ascPos.y}
          style={{
            fill: "#e91e63",
            fontSize: "10px",
            fontWeight: "bold",
            textAnchor: "middle",
            dominantBaseline: "middle",
          }}
        >
          ASC
        </text>
        <text
          x={ascPos.x}
          y={ascPos.y + 25}
          style={{
            fill: "#ffffff",
            fontSize: "11px",
            fontWeight: "600",
            textAnchor: "middle",
            filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.8))",
          }}
        >
          {astroData.Ascendant}°
        </text>
      </g>
    );
  };

  useEffect(() => {
    const storedStarMapData = localStorage.getItem("starMapData");
    const storedChatBotData = localStorage.getItem("chatBotData");

    if (!storedStarMapData) {
      setError("Không tìm thấy dữ liệu bản đồ sao. Vui lòng điền form trước!");
      return;
    }

    const starMapData: StarMapData = JSON.parse(storedStarMapData);
    setAstroData({
      Ascendant: starMapData.Ascendant,
      AscendantSign: starMapData.AscendantSign,
      PlanetInSigns: starMapData.PlanetInSigns,
      PlanetInHouses: starMapData.PlanetInHouses,
    });

    if (
      !starMapData.AscendantSign ||
      !starMapData.PlanetInSigns ||
      !starMapData.PlanetInHouses
    ) {
      setError("Dữ liệu bản đồ sao không đầy đủ!");
      return;
    }

    if (storedChatBotData) {
      setChatBotData(storedChatBotData);
    }
  }, []);

  if (error) {
    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          color: "white",
          textAlign: "center",
          padding: "50px",
        }}
      >
        <h2>{error}</h2>
        <button
          onClick={() => {
            localStorage.removeItem("starMapData");
            localStorage.removeItem("chatBotData");
            navigate("/form/starmap");
          }}
          style={{
            padding: "10px 20px",
            background: "linear-gradient(135deg, #ff5e62, #9c27b0)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Quay lại Form
        </button>
      </div>
    );
  }

  if (!astroData) {
    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          color: "white",
          textAlign: "center",
          padding: "50px",
        }}
      >
        <h2>Đang tải dữ liệu...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        background: "transparent",
        minHeight: "100vh",
        padding: "20px",
        color: "white",
        position: "relative",
        overflow: "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(233, 30, 99, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 450px",
          gap: "40px",
          alignItems: "start",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "800px",
            height: "800px",
            margin: "0 auto",
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
            borderRadius: "50%",
            padding: "20px",
            backdropFilter: "blur(10px)",
          }}
        >
          <svg
            width="800"
            height="800"
            viewBox="0 0 750 750"
            style={{
              width: "100%",
              height: "100%",
              filter: "drop-shadow(0 0 30px rgba(233, 30, 99, 0.3))",
            }}
          >
            <defs>
              <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                <stop offset="100%" stopColor="rgba(138, 43, 226, 0.05)" />
              </radialGradient>
            </defs>

            <circle
              cx="375"
              cy="375"
              r="350"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              filter="drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))"
            />
            <circle
              cx="375"
              cy="375"
              r="250"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              filter="drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))"
            />
            <circle
              cx="375"
              cy="375"
              r="60"
              fill="url(#circleGradient)"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0.8"
              filter="drop-shadow(0 0 15px rgba(233, 30, 99, 0.2))"
            />

            {renderHouseLines()}
            {renderZodiacSigns()}
            {renderPlanets()}
            {renderAscendant()}
          </svg>
        </div>

        <div
          style={{
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            padding: "30px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #e91e63, #9c27b0, #673ab7)",
              borderRadius: "none",
            }}
          />

          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "25px",
              textAlign: "center",
              background: "linear-gradient(135deg, #ffffff, #e91e63, #9c27b0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 20px rgba(233, 30, 99, 0.3)",
            }}
          >
            Bản Đồ Sao
          </div>

          <div
            style={{
              textAlign: "center",
              background:
                "linear-gradient(135deg, rgba(233, 30, 99, 0.15), rgba(156, 39, 176, 0.1))",
              padding: "20px",
              borderRadius: "15px",
              border: "1px solid rgba(233, 30, 99, 0.3)",
              marginBottom: "25px",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#ffffff",
                marginBottom: "8px",
              }}
            >
              Ascendant: {astroData.AscendantSign}
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "#e91e63",
                fontWeight: "600",
              }}
            >
              Tọa độ: {astroData.Ascendant}°
            </div>
          </div>

          <div style={{ marginBottom: "25px" }}>
            <h3
              style={{
                color: "#ffffff",
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "15px",
                borderBottom: "2px solid rgba(233, 30, 99, 0.4)",
                paddingBottom: "8px",
              }}
            >
              Vị Trí Hành Tinh Trong Cung
            </h3>
            {Object.entries(astroData.PlanetInSigns || {}).map(
              ([planet, sign]) => (
                <div
                  key={planet}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                    padding: "12px",
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))",
                    borderRadius: "10px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span
                    style={{
                      color: "wheat",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    {planetSymbols[planet]} {planetNamesVN[planet]}
                  </span>
                  <span
                    style={{
                      color: "#ffffff",
                      fontWeight: "500",
                    }}
                  >
                    {sign}
                  </span>
                </div>
              )
            )}
          </div>

          <div style={{ marginBottom: "25px" }}>
            <h3
              style={{
                color: "#ffffff",
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "15px",
                borderBottom: "2px solid rgba(156, 39, 176, 0.4)",
                paddingBottom: "8px",
              }}
            >
              Hành Tinh Trong Nhà (với tọa độ)
            </h3>
            {Object.entries(astroData.PlanetInHouses || {}).map(
              ([planet, house]) => {
                const angle = calculatePlanetPosition(planet, house);
                return (
                  <div
                    key={planet}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                      padding: "10px",
                      background: "rgba(255, 255, 255, 0.03)",
                      borderRadius: "8px",
                      fontSize: "15px",
                    }}
                  >
                    <span style={{ color: "#9c27b0", fontWeight: "600" }}>
                      {planetSymbols[planet]} {planetNamesVN[planet]}
                    </span>
                    <span style={{ color: "#ffffff", fontWeight: "500" }}>
                      Nhà {house} ({angle.toFixed(1)}°)
                    </span>
                  </div>
                );
              }
            )}
          </div>

          <div style={{ marginBottom: "25px" }}>
            <h3
              style={{
                background: "transparent !important",

                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "15px",
                borderBottom: "2px solid rgba(233, 30, 99, 0.4)",
                paddingBottom: "8px",
              }}
            >
              Phân Tích Từ ChatBot
            </h3>
            {chatBotData ? (
              <StarMapReply tReply={chatBotData} />
            ) : (
              <div
                style={{
                  padding: "24px",

                  borderRadius: "12px",
                  background: "transparent",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                Chưa có dữ liệu phân tích từ ChatBot.
              </div>
            )}
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("starMapData");
              localStorage.removeItem("chatBotData");
              navigate("/form/starmap");
            }}
            style={{
              width: "100%",
              padding: "15px",
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "12px",
              color: "white",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "10px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseOut={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = "transparent";
            }}
          >
            🔙 Nhập Lại Dữ Liệu
          </button>
        </div>
      </div>
    </div>
  );
};

export default StarMapPage;
