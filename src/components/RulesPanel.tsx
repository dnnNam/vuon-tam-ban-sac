import { useState } from "react";
import { WIN_LAPS, TOTAL_TILES } from "../constants";

const RULES = [
  {
    icon: "🎯",
    text: `Đi hết ${WIN_LAPS} vòng quanh ${TOTAL_TILES} ô đầu tiên → thắng`,
  },
  { icon: "🎲", text: "Lắc xúc xắc (1–6) để di chuyển quân" },
  { icon: "❓", text: "Dừng ô câu hỏi → trả lời trắc nghiệm" },
  { icon: "🎉", text: "Trả lời đúng → được lắc xúc xắc thêm lượt" },
  {
    icon: "☠️",
    text: "Trả lời sai → lùi 2 ô (mất vòng nếu vừa qua xuất phát)",
  },
  { icon: "🚩", text: "Ô xuất phát / trạm dừng: an toàn, không bị đá" },
  { icon: "💥", text: "Giẫm ô đội khác → đội đó bị đá về xuất phát" },
  { icon: "🏁", text: "Qua vạch xuất phát → +1 vòng, câu hỏi khó hơn" },
];

export default function RulesPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex justify-center items-center gap-2 bg-gradient-to-b from-amber-400 to-amber-600 text-[#1a0504] font-bold text-sm px-4 py-2.5 rounded-full shadow-[0_4px_0_#92400e] hover:-translate-y-0.5 transition-transform"
      >
        📜 Luật chơi
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#240706] border border-[#3f1211] rounded-2xl p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-amber-400 font-black text-lg tracking-wide">
                📜 LUẬT CHƠI
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-amber-100/50 hover:text-amber-100 text-xl leading-none px-1"
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>

            <ul className="flex flex-col gap-2.5">
              {RULES.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-amber-50/90 leading-snug"
                >
                  <span className="shrink-0">{r.icon}</span>
                  <span>{r.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
