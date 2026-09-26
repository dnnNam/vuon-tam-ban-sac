import type { Team, Tile } from "../types";

type Props = {
  tiles: Tile[];
  teams: Team[];
  activeTeam: Team;
  diceResult: number | null;
  isRolling?: boolean;
  onRollClick?: () => void;
  rollDisabled?: boolean;
};

export default function BoardMap({
  tiles,
  teams,
  activeTeam,
  diceResult,
  isRolling,
  onRollClick,
  rollDisabled = false,
}: Props) {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-1">
      <div
        className="w-full h-full grid gap-1 lg:gap-1.5 p-2 bg-[#240706] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-[#3f1211]"
        style={{
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gridTemplateRows: "repeat(5, minmax(0, 1fr))",
        }}
      >
        {/* KHU VỰC TRUNG TÂM (Hiển thị Xúc xắc & Tên Game) */}
        <div
          className="bg-[#1a0504] rounded-xl shadow-inner flex flex-col items-center justify-center border border-[#3f1211] overflow-hidden p-3"
          style={{ gridColumn: "2 / 5", gridRow: "2 / 5" }}
        >
          <h1 className="text-sm sm:text-base lg:text-xl xl:text-2xl font-black text-amber-500 tracking-widest text-center leading-snug drop-shadow-md mb-2 px-2">
            NHÀ NƯỚC <br /> TRONG SẠCH
            <br /> VỮNG MẠNH
          </h1>

          {/* Hiển thị Xúc Xắc — đồng thời là nút để đội đang tới lượt tự bấm lắc */}
          <div className="flex flex-col items-center justify-center flex-1 min-h-0">
            <button
              type="button"
              onClick={onRollClick}
              disabled={rollDisabled || !onRollClick}
              aria-label="Lắc xúc xắc"
              className={`group flex flex-col items-center justify-center bg-transparent border-none p-0 outline-none transition-transform duration-150 ${
                rollDisabled || !onRollClick
                  ? "cursor-not-allowed"
                  : "cursor-pointer active:scale-95"
              }`}
            >
              {isRolling ? (
                <div className="text-7xl lg:text-8xl animate-spin drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]">
                  🎲
                </div>
              ) : diceResult ? (
                <div className="flex flex-col items-center animate-[bounce_0.5s_ease-out]">
                  <div className="w-28 h-28 lg:w-32 lg:h-32 border-4 border-amber-500 rounded-2xl flex items-center justify-center text-6xl lg:text-7xl font-black text-amber-500 shadow-[0_0_25px_rgba(251,191,36,0.35)] mb-3 bg-[#2a0b0b]">
                    {diceResult}
                  </div>
                  <p className="text-amber-200/80 text-sm lg:text-base font-semibold">
                    Kết quả: {diceResult}
                  </p>
                </div>
              ) : (
                <div
                  className={`w-28 h-28 lg:w-32 lg:h-32 border-4 rounded-2xl flex items-center justify-center text-5xl lg:text-6xl transition-all duration-200 ${
                    rollDisabled || !onRollClick
                      ? "border-dashed border-[#3f1211] text-[#3f1211] bg-[#120505]"
                      : "border-amber-500 text-amber-400 bg-[#2a0b0b] shadow-[0_0_25px_rgba(251,191,36,0.25)] group-hover:scale-105 animate-pulse"
                  }`}
                >
                  🎲
                </div>
              )}
              {!isRolling && !diceResult && !rollDisabled && onRollClick && (
                <p className="mt-2 text-amber-300 text-xs lg:text-sm font-bold tracking-wide animate-pulse">
                  👉 Chạm để lắc xúc xắc
                </p>
              )}
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2 bg-black/40 px-5 py-2 rounded-full border border-white/5">
            <span className="text-xl leading-none">{activeTeam.character}</span>
            <span className="text-sm font-bold text-amber-100">
              {activeTeam.name}{" "}
              <span className="font-normal text-amber-100/50">
                đang đến lượt
              </span>
            </span>
          </div>
        </div>

        {/* CÁC Ô ĐẤT */}
        {tiles.map((tile) => {
          let bgClass = "bg-[#2d0a0a]";
          let borderClass = "border-[#4a1515]";
          let textClass = "text-amber-50";
          let icon = "❓";

          if (tile.type === "START") {
            bgClass = "bg-gradient-to-br from-red-700 to-red-900";
            borderClass = "border-amber-500 border-2";
            textClass = "text-amber-400";
            icon = "🚩";
          }

          return (
            <div
              key={tile.id}
              className={`relative rounded-xl flex flex-col p-2 shadow-md border ${bgClass} ${borderClass} transition-all duration-300 overflow-hidden`}
              style={{ gridColumn: tile.gridCol, gridRow: tile.gridRow }}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs opacity-60">{icon}</span>
              </div>

              <span
                className={`text-[10px] lg:text-xs font-bold leading-tight mt-2 ${textClass}`}
              >
                {tile.name}
              </span>

              {/* Tokens: nhân vật các đội đang đứng trên ô */}
              <div className="absolute bottom-2 w-full left-0 flex justify-center -space-x-1 px-1">
                {teams
                  .filter((t) => t.position === tile.id)
                  .map((t) => (
                    <div
                      key={t.id}
                      className={`w-5 h-5 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.5)] border-2 border-white/80 z-10 flex items-center justify-center text-[11px] ${t.color}`}
                      title={t.name}
                    >
                      {t.character}
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
