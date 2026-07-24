import type { Team } from "../types";

type Props = {
  teams: Team[];
  currentTurn: number;
  winLaps: number;
};

export default function Leaderboard({ teams, currentTurn, winLaps }: Props) {
  const activeTeamId = teams[currentTurn]?.id;

  // Tính hạng (#1, #2...) theo: số vòng đã đi (nhiều hơn = hạng cao hơn), rồi tới vị trí hiện tại trên vòng.
  // LƯU Ý: chỉ dùng để tính số hạng hiển thị, KHÔNG dùng để sắp xếp lại thứ tự các hàng bên dưới,
  // để danh sách không bị nhảy vị trí mỗi lần xúc xắc quay.
  const rankById = new Map<number, number>();
  [...teams]
    .sort((a, b) => {
      if (b.laps !== a.laps) return b.laps - a.laps;
      return b.position - a.position;
    })
    .forEach((t, idx) => rankById.set(t.id, idx + 1));

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🏆</span>
        <h2 className="text-lg font-bold text-amber-400 tracking-wider">BẢNG XẾP HẠNG</h2>
      </div>

      <div className="flex flex-col gap-3">
        {teams.map((team) => {
          const hasWon = team.laps >= winLaps;
          return (
            <div
              key={team.id}
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all duration-300
                ${hasWon ? 'bg-emerald-900/40 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                  : team.id === activeTeamId ? 'bg-[#2A2B5E] border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                  : 'bg-[#1C1E42] border-[#2A2C5D]'}`}
            >
              <span className="text-slate-500 font-bold text-sm w-5 text-center">#{rankById.get(team.id)}</span>

              <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-lg ring-2 ring-white/20 ${team.color}`}>
                {team.character}
              </div>

              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-100 truncate">{team.name}</span>
                  {hasWon && <span className="shrink-0 text-[10px] bg-emerald-500 text-black px-2 py-0.5 rounded-full font-bold">🏆 Thắng</span>}
                  {!hasWon && team.id === activeTeamId && <span className="shrink-0 text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded-full font-bold">Lượt</span>}
                </div>
                <div className="text-xs text-slate-400 font-mono">🏁 {Math.min(team.laps, winLaps)}/{winLaps} vòng · Ô {team.position}</div>
              </div>

              {/* Số xúc xắc gần nhất của đội này */}
              <div className="shrink-0 flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-[#12132e] border border-[#2A2C5D]">
                {team.lastRoll ? (
                  <>
                    <span className="text-sm leading-none">🎲</span>
                    <span className="text-xs font-bold text-amber-300 leading-none mt-0.5">{team.lastRoll}</span>
                  </>
                ) : (
                  <span className="text-[10px] text-slate-600">—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}