import { useState } from 'react';
import type { Team, Tile } from '../types';

type Props = {
  activeTeam: Team;
  currentTile: Tile;
  diceResult: number | null;
  hasActiveEvent: boolean;
  teams: Team[];
  isRolling: boolean;
  onRollClick: () => void;
  onNextTurn: () => void;
  onManualMove: (teamId: number, steps: number) => void;
  bonusRoll: boolean;
  winner: Team | null;
  winLaps: number;
};

const TILE_ICON: Record<Tile['type'], string> = {
  START: '🚩',
  QUESTION: '❓',
};

export default function GMPanel({
  activeTeam, currentTile, diceResult, hasActiveEvent, teams, isRolling,
  onRollClick, onNextTurn, onManualMove, bonusRoll, winner, winLaps
}: Props) {

  const [selectedTargetId, setSelectedTargetId] = useState<number>(activeTeam.id);

  const rollDisabled = !!winner || hasActiveEvent || diceResult !== null || isRolling;

  return (
    <div className="p-5 flex flex-col h-full text-amber-50 bg-[#240706] border-l border-[#3f1211]">
      <div className="mb-6">
        <p className="text-[10px] text-amber-500/70 uppercase tracking-widest font-bold">Quản trò</p>
        <h2 className="text-xl font-black text-amber-500">Bảng Điều Khiển</h2>
      </div>

      {/* Lượt hiện tại */}
      <div className="mb-4">
        <p className="text-[10px] text-amber-100/50 uppercase tracking-wide mb-2">Lượt hiện tại</p>
        <div className="text-lg font-bold flex items-center gap-2 bg-[#1a0504] border border-[#3f1211] p-3 rounded-lg">
          <span className="text-2xl leading-none">{activeTeam.character}</span>
          <span className="truncate">{activeTeam.name}</span>
          <span className="ml-auto shrink-0 text-xs font-mono text-amber-300/70">
            Vòng {Math.min(activeTeam.laps + 1, winLaps)}/{winLaps}
          </span>
        </div>
        {bonusRoll && (
          <p className="text-xs text-emerald-400 font-bold mt-2">🎁 Trả lời đúng — được lắc thêm lượt!</p>
        )}
      </div>

      {/* Thông tin ô hiện tại */}
      <div className="mb-6 bg-[#1a0504] border border-[#3f1211] p-3 rounded-lg flex items-start gap-2">
        <span className="text-xl leading-none">{TILE_ICON[currentTile.type]}</span>
        <div className="text-sm text-amber-100/80 leading-tight">
          <div className="font-bold text-amber-200">{currentTile.name}</div>
          <div className="text-xs text-amber-100/50 mt-0.5">
            {currentTile.type === 'START'
              ? 'Ô an toàn, không có câu hỏi'
              : 'Ô câu hỏi — trả lời đúng để lắc tiếp'}
          </div>
        </div>
      </div>

      {/* Nút Tung Xúc Xắc */}
      <button
        onClick={onRollClick}
        disabled={rollDisabled}
        className={`w-full py-4 rounded-xl font-black text-xl flex justify-center items-center gap-2 tracking-widest transition-all duration-200
          ${rollDisabled
            ? 'bg-[#1a0504] border border-[#3f1211] text-amber-700 cursor-not-allowed mb-6'
            : isRolling
              ? 'bg-amber-600 text-[#1a0504] scale-95 shadow-none mb-6'
              : 'bg-gradient-to-b from-amber-400 to-amber-600 text-[#1a0504] shadow-[0_4px_0_#92400e] hover:-translate-y-1 hover:shadow-[0_6px_0_#92400e] mb-6'
          }
        `}
      >
        <span className={isRolling ? 'animate-spin' : ''}>🎲</span> ĐỔ XÚC XẮC
      </button>

      {/* Thao tác thủ công cho đội bất kỳ */}
      <div className="mt-2 flex-1">
        <p className="text-[10px] text-amber-100/50 uppercase tracking-widest font-bold mb-3">Thao tác thủ công</p>

        {/* Dropdown chọn đội */}
        <select
          className="w-full bg-[#1a0504] border border-[#3f1211] text-amber-100 text-sm p-2.5 rounded-lg mb-4 outline-none focus:border-amber-500"
          value={selectedTargetId}
          onChange={(e) => setSelectedTargetId(Number(e.target.value))}
        >
          {teams.map(t => (
            <option key={t.id} value={t.id}>{t.character} {t.name}</option>
          ))}
        </select>

        {/* Tiến / Lùi thủ công */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-amber-200">
            <span>🏃</span> Tiến / Lùi thủ công
          </div>
          <div className="flex gap-1">
            {[-3, -1].map(val => (
              <button key={val} onClick={() => onManualMove(selectedTargetId, val)} className="flex-1 bg-red-900/30 hover:bg-red-900/60 border border-red-900/50 text-red-400 text-xs py-2 rounded font-mono transition">{val}</button>
            ))}
            {[+1, +3].map(val => (
              <button key={val} onClick={() => onManualMove(selectedTargetId, val)} className="flex-1 bg-emerald-900/30 hover:bg-emerald-900/60 border border-emerald-900/50 text-emerald-400 text-xs py-2 rounded font-mono transition">+{val}</button>
            ))}
          </div>
        </div>

        {/* LUẬT NHANH */}
        <div className="border-t border-[#3f1211] pt-4">
          <p className="text-[10px] font-bold text-amber-500/70 uppercase mb-2">Luật Nhanh</p>
          <ul className="text-xs text-amber-100/60 space-y-1 font-mono">
            <li>• Mỗi ô là 1 câu hỏi, theo bộ câu hỏi của vòng hiện tại 📖</li>
            <li>• Trả lời đúng &rarr; được lắc xúc xắc tiếp 🎲</li>
            <li>• Trả lời sai &rarr; lùi 2 ô ☠️</li>
            <li>• Giẫm ô có đội khác &rarr; đá về xuất phát 💥</li>
            <li>• Đi hết 1 vòng &rarr; sang bộ câu hỏi vòng kế tiếp 🏁</li>
            <li>• Hoàn thành {winLaps} vòng &rarr; Chiến thắng 🏆</li>
          </ul>
        </div>
      </div>

      <button
        onClick={onNextTurn}
        disabled={!!winner}
        className="w-full bg-[#1a0504] hover:bg-[#3f1211] border border-[#4a1515] text-amber-500 font-bold py-3.5 rounded-xl transition-all mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        CHUYỂN LƯỢT ⏭️
      </button>
    </div>
  );
}