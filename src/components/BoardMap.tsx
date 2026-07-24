import type { Team, Tile } from "../types";

type Props = {
  tiles: Tile[];
  teams: Team[];
  activeTeam: Team;
  diceResult: number | null;
  isRolling?: boolean;
};

export default function BoardMap({ tiles, teams, activeTeam, diceResult, isRolling }: Props) {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-1">
      <div
        className="w-full h-full grid gap-1 lg:gap-1.5 p-2 bg-[#240706] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-[#3f1211]"
        style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gridTemplateRows: 'repeat(5, minmax(0, 1fr))' }}
      >
        {/* KHU VỰC TRUNG TÂM (Hiển thị Xúc xắc & Tên Game) */}
        <div
          className="bg-[#1a0504] rounded-xl shadow-inner flex flex-col items-center justify-center border border-[#3f1211]"
          style={{ gridColumn: '2 / 5', gridRow: '2 / 5' }}
        >
          <h1 className="text-3xl lg:text-5xl font-black text-amber-500 tracking-widest text-center leading-tight drop-shadow-md mb-6">
            VƯƠN TẦM<br/>BẢN SẮC
          </h1>

          {/* Hiển thị Xúc Xắc */}
          <div className="flex flex-col items-center justify-center min-h-[8rem]">
            {isRolling ? (
              <div className="text-7xl lg:text-8xl animate-spin drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]">🎲</div>
            ) : diceResult ? (
              <div className="flex flex-col items-center animate-[bounce_0.5s_ease-out]">
                <div className="w-24 h-24 lg:w-28 lg:h-28 border-4 border-amber-500 rounded-2xl flex items-center justify-center text-6xl lg:text-7xl font-black text-amber-500 shadow-[0_0_25px_rgba(251,191,36,0.35)] mb-3 bg-[#2a0b0b]">
                  {diceResult}
                </div>
                <p className="text-amber-200/80 text-sm lg:text-base font-semibold">Kết quả: {diceResult}</p>
              </div>
            ) : (
              <div className="w-24 h-24 lg:w-28 lg:h-28 border-4 border-dashed border-[#3f1211] rounded-2xl flex items-center justify-center text-5xl lg:text-6xl text-[#3f1211] bg-[#120505]">🎲</div>
            )}
          </div>

          <div className="mt-8 flex items-center gap-2 bg-black/40 px-5 py-2 rounded-full border border-white/5">
            <span className="text-xl leading-none">{activeTeam.character}</span>
            <span className="text-sm font-bold text-amber-100">{activeTeam.name} <span className="font-normal text-amber-100/50">đang đến lượt</span></span>
          </div>
        </div>

        {/* CÁC Ô ĐẤT */}
        {tiles.map((tile) => {
          let bgClass = "bg-[#2d0a0a]";
          let borderClass = "border-[#4a1515]";
          let textClass = "text-amber-50";
          let icon = "❓";

          if (tile.type === 'START') {
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

              <span className={`text-[10px] lg:text-xs font-bold leading-tight mt-2 ${textClass}`}>
                {tile.name}
              </span>

              {/* Tokens: nhân vật các đội đang đứng trên ô */}
              <div className="absolute bottom-2 w-full left-0 flex justify-center -space-x-1 px-1">
                {teams.filter(t => t.position === tile.id).map(t => (
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