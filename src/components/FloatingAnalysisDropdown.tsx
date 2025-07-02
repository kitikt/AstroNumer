import React, { useState, useEffect, useRef } from "react";

interface DataItem {
  Id: number;
  Description: string;
  LifePathNumber: number;
  DestinyNumber: number;
  SoulUrgeNumber: number;
  PersonalityNumber: number;
  BirthdayNumber: number;
  MaturityNumber: number;
}

type AnalysisKey =
  | "LifePathNumber"
  | "DestinyNumber"
  | "SoulUrgeNumber"
  | "PersonalityNumber"
  | "BirthdayNumber"
  | "MaturityNumber";

const typeConfig: Record<AnalysisKey, { label: string; emoji: string }> = {
  LifePathNumber: { label: "Số Đường Đời", emoji: "🛣️" },
  DestinyNumber: { label: "Số Định Mệnh", emoji: "⭐" },
  SoulUrgeNumber: { label: "Số Linh Hồn", emoji: "❤️" },
  PersonalityNumber: { label: "Số Nhân Cách", emoji: "👤" },
  BirthdayNumber: { label: "Số Ngày Sinh", emoji: "🎂" },
  MaturityNumber: { label: "Số Trưởng Thành", emoji: "🌱" },
};

const FloatingAnalysisDropdown: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<AnalysisKey>("LifePathNumber");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, []);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token") || "";
    fetch("https://astronumer.info.vn/api/v1/numerology/list-all-analysis", {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => setData(json.Data ?? []))
      .catch(() => setError("Không thể tải dữ liệu."))
      .finally(() => setLoading(false));
  }, []);

  const handleClickItem = async (item: DataItem) => {
    const core = {
      LifePathNumber: item.LifePathNumber,
      DestinyNumber: item.DestinyNumber,
      SoulUrgeNumber: item.SoulUrgeNumber,
      PersonalityNumber: item.PersonalityNumber,
      BirthdayNumber: item.BirthdayNumber,
      MaturityNumber: item.MaturityNumber,
    };
    localStorage.setItem("numerologyData", JSON.stringify(core));

    try {
      const token = localStorage.getItem("token") || "";
      const vipOld: Record<number, string> = JSON.parse(
        localStorage.getItem("numerologyVipAnalysis") || "{}"
      );

      await Promise.all(
        [...Array(7).keys()].map(async (idx) => {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/v1/numerology/analyze?TypeName=${idx}&UserNumerologyAnalysisId=${item.Id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (res.ok) {
            const j = await res.json();
            vipOld[idx] = j.Data;
          }
        })
      );

      localStorage.setItem("numerologyVipAnalysis", JSON.stringify(vipOld));
    } catch {}

    setOpen(false);
    window.location.reload();
  };

  return (
    <div ref={wrapperRef} className="!fixed !top-6 !left-6 !z-[1000]">
      <button
        className="!w-14 !h-14 !rounded-full !bg-gradient-to-tr !from-teal-600 !to-cyan-500 !text-white !text-2xl !shadow-xl !hover:scale-105 !transition-transform"
        onClick={() => setOpen((o) => !o)}
      >
        ☰
      </button>

      {open && (
        <div className="!absolute !top-20 !left-0 !w-80 !max-h-[400px] !bg-white/90 !backdrop-blur-md !shadow-2xl !rounded-2xl !flex !flex-col !overflow-hidden !border !border-gray-200 animate-fadeIn">
          <div className="!flex !justify-center !gap-2 !bg-gray-50 !p-2">
            {(Object.keys(typeConfig) as AnalysisKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setSelected(k)}
                className={`!text-2xl !transition-transform !duration-150 ${
                  selected === k ? "!scale-125" : "!hover:scale-110"
                }`}
              >
                {typeConfig[k].emoji}
              </button>
            ))}
          </div>

          <div className="!flex-1 !overflow-y-auto !bg-white/90">
            {loading && (
              <div className="!text-center !p-3 !text-sm !text-gray-500 animate-pulse">
                Đang tải dữ liệu…
              </div>
            )}
            {error && <div className="!text-center !p-3 !text-red-600 !text-sm">{error}</div>}
            {!loading &&
              !error &&
              data.map((it) => (
                <div
                  key={it.Id}
                  onClick={() => handleClickItem(it)}
                  className="!px-4 !py-3 !border-b !border-gray-200 !hover:bg-teal-50 !cursor-pointer !transition-all"
                >
                  <div className="!text-sm !font-bold !text-gray-800">
                    {typeConfig[selected].label}: {it[selected]}
                  </div>
                  {it.Description && (
                    <div className="!text-xs !text-gray-600 !mt-1 line-clamp-2">
                      {it.Description}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingAnalysisDropdown;
