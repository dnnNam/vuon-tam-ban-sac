import { useState } from "react";
import {
  INITIAL_TEAMS,
  BOARD_TILES,
  QUESTION_BANK,
  WIN_LAPS,
  TOTAL_TILES,
} from "./constants";
import Leaderboard from "./components/Leaderboard";
import BoardMap from "./components/BoardMap";
import GMPanel from "./components/GMPanel";
import RulesPanel from "./components/RulesPanel";
import type { Team, Tile } from "./types";
import type { ActiveQuestion } from "./components/QuestionModal";
import QuestionModal from "./components/QuestionModal";

const wrapPos = (pos: number) =>
  ((pos % TOTAL_TILES) + TOTAL_TILES) % TOTAL_TILES;

export default function App() {
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [tiles] = useState<Tile[]>(BOARD_TILES);
  const [currentTurn, setCurrentTurn] = useState<number>(0);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<ActiveQuestion>(null);
  // Đội vừa bị đá về vạch xuất phát (do bị giẫm ô hoặc do bị lùi trúng ô)
  const [lastKicked, setLastKicked] = useState<{
    teamId: number;
    teamName: string;
    kickerName: string;
  } | null>(null);
  // Hiệu ứng gần nhất (an toàn / đúng / sai) để hiển thị banner
  const [lastEffect, setLastEffect] = useState<{
    teamName: string;
    message: string;
  } | null>(null);
  // Đội vừa trả lời đúng, được lắc xúc xắc thêm lượt (không chuyển lượt)
  const [bonusRoll, setBonusRoll] = useState(false);
  // Đội đã hoàn thành đủ WIN_LAPS vòng
  const [winner, setWinner] = useState<Team | null>(null);

  const activeTeam = teams[currentTurn];
  const currentTile = tiles[activeTeam.position];
  const rollDisabled =
    !!winner || !!activeQuestion || diceResult !== null || isRolling;

  // Di chuyển 1 đội thêm/lùi số ô (steps có thể âm), không kích hoạt lại câu hỏi ở ô đích
  // Dùng cho thao tác thủ công của GM (không đụng tới laps).
  const moveTeamBy = (teamId: number, steps: number, message?: string) => {
    if (message) {
      const team = teams.find((t) => t.id === teamId);
      if (team) setLastEffect({ teamName: team.name, message });
    }
    setTeams((prev) =>
      prev.map((t) =>
        t.id === teamId ? { ...t, position: wrapPos(t.position + steps) } : t,
      ),
    );
  };

  const handleRollClick = () => {
    if (winner) return;
    setIsRolling(true);
    setLastKicked(null);
    setLastEffect(null);
    setBonusRoll(false);

    setTimeout(() => {
      setIsRolling(false);

      // eslint-disable-next-line
      const roll = Math.floor(Math.random() * 6) + 1;
      setDiceResult(roll);

      const rawNext = activeTeam.position + roll;
      const newPosition = wrapPos(rawNext);
      const landingTile = tiles[newPosition];
      const gainedLap = rawNext >= TOTAL_TILES; // đi qua/trùng vạch xuất phát -> +1 vòng
      const newLaps = gainedLap ? activeTeam.laps + 1 : activeTeam.laps;

      // ----- LOGIC "CỜ CÁ NGỰA": đá quân đối phương về vạch xuất phát -----
      // Ô loại START là ô an toàn, không bị đá.
      const isSafeTile = landingTile.type === "START";
      const kickedTeam = isSafeTile
        ? undefined
        : teams.find(
            (t) => t.id !== activeTeam.id && t.position === newPosition,
          );

      if (kickedTeam) {
        setLastKicked({
          teamId: kickedTeam.id,
          teamName: kickedTeam.name,
          kickerName: activeTeam.name,
        });
      }

      setTeams((prev) =>
        prev.map((t) => {
          if (t.id === activeTeam.id) {
            return {
              ...t,
              position: newPosition,
              laps: newLaps,
              lastRoll: roll,
            };
          }
          if (kickedTeam && t.id === kickedTeam.id) {
            return { ...t, position: 0 };
          }
          return t;
        }),
      );
      // ----------------------------------------------------------------

      // Chiến thắng khi đội đi đủ WIN_LAPS vòng
      if (newLaps >= WIN_LAPS) {
        setWinner({ ...activeTeam, position: newPosition, laps: newLaps });
        return;
      }

      handleLandOnTile(newPosition, activeTeam.id, newLaps, roll, gainedLap);
    }, 500);
  };

  const handleLandOnTile = (
    posIndex: number,
    teamId: number,
    teamLaps: number,
    roll: number,
    gainedLap: boolean,
  ) => {
    const tile = tiles[posIndex];

    if (tile.type === "START") {
      const team = teams.find((t) => t.id === teamId);
      if (team)
        setLastEffect({
          teamName: team.name,
          message: "Ô an toàn, không có câu hỏi.",
        });
      return;
    }

    // Bộ câu hỏi tương ứng với vòng hiện tại của đội: laps=0 -> vòng 1, laps=1 -> vòng 2, ...
    const lapIndex = Math.min(teamLaps, WIN_LAPS - 1);
    const questionsForTile = QUESTION_BANK[tile.id];
    const question = questionsForTile?.[lapIndex];

    if (question) {
      setActiveQuestion({
        teamId,
        tileId: tile.id,
        lapIndex,
        question,
        rollUsed: roll,
        lapGained: gainedLap,
      });
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (!activeQuestion) return;
    const { teamId, lapGained } = activeQuestion;

    if (isCorrect) {
      const team = teams.find((t) => t.id === teamId);
      if (team)
        setLastEffect({
          teamName: team.name,
          message: "Trả lời đúng! Được lắc xúc xắc thêm lượt 🎉",
        });
      setBonusRoll(true);
      setDiceResult(null); // cho phép lắc lại ngay, không chuyển lượt
    } else {
      const team = teams.find((t) => t.id === teamId);

      // Vị trí sau khi bị phạt: TRƯỚC TIÊN hủy trọn số điểm xúc xắc vừa quay
      // (coi như lượt quay đó không có giá trị) -> quay về đúng vị trí đội
      // đang đứng TRƯỚC KHI đổ xúc xắc (team.position hiện tại trừ đi
      // rollUsed). Sau đó mới lùi tiếp 2 ô tính từ vị trí đó. Lùi từng ô một
      // (tối đa 2 bước) — nếu chạm phải ô an toàn (START: vạch xuất phát /
      // trạm dừng chân) thì DỪNG LẠI ngay tại đó, không lùi tiếp xuyên qua ô
      // an toàn (ví dụ: đang ở ô 1, lùi 2 ô sẽ dừng ngay tại vạch xuất phát).
      //
      // FIX: nếu vị trí TRƯỚC KHI đổ xúc xắc (posBeforeRoll) đã LÀ ô an toàn
      // (ví dụ đội đang đứng sẵn ở vạch xuất phát rồi mới quay xúc xắc đi
      // tiếp), thì tuyệt đối giữ nguyên tại ô an toàn đó, KHÔNG được lùi
      // xuyên qua vạch xuất phát ra phía cuối bàn cờ. Trước đây vòng lặp chỉ
      // kiểm tra ô an toàn SAU khi đã lùi từng bước, nên bỏ sót đúng trường
      // hợp điểm xuất phát của việc lùi đã là ô an toàn — gây ra hiện tượng
      // quân bị "bắn" từ vạch xuất phát ra ô 14/15 một cách bí ẩn.
      let newPos: number | null = null;
      if (team) {
        const posBeforeRoll = wrapPos(team.position - activeQuestion.rollUsed);
        let pos = posBeforeRoll;

        if (tiles[pos].type !== "START") {
          for (let step = 0; step < 2; step++) {
            pos = wrapPos(pos - 1);
            if (tiles[pos].type === "START") break;
          }
        }
        // Nếu tiles[posBeforeRoll] đã là START thì giữ nguyên pos = posBeforeRoll,
        // không lùi thêm bước nào nữa.

        newPos = pos;
      }

      // Ô lùi tới có an toàn không (ô START không bị đá / không đá được ai)
      const landingTile = newPos !== null ? tiles[newPos] : null;
      const isSafeTile = landingTile?.type === "START";

      // Nếu ô lùi tới đang có đội khác đứng -> đội đó bị đá về vạch xuất phát
      const kickedTeam =
        !isSafeTile && newPos !== null
          ? teams.find((t) => t.id !== teamId && t.position === newPos)
          : undefined;

      if (team) {
        setLastEffect({
          teamName: team.name,
          message: "Trả lời sai, lùi 2 ô!",
        });
      }

      if (kickedTeam && team) {
        setLastKicked({
          teamId: kickedTeam.id,
          teamName: kickedTeam.name,
          kickerName: team.name,
        });
      }

      setTeams((prev) =>
        prev.map((t) => {
          if (t.id === teamId) {
            return {
              ...t,
              position: newPos ?? t.position,
              laps: lapGained ? Math.max(0, t.laps - 1) : t.laps,
            };
          }
          if (kickedTeam && t.id === kickedTeam.id) {
            return { ...t, position: 0 };
          }
          return t;
        }),
      );
      setBonusRoll(false);
    }
    setActiveQuestion(null);
  };

  const nextTurn = () => {
    setDiceResult(null);
    setLastKicked(null);
    setLastEffect(null);
    setBonusRoll(false);
    setCurrentTurn((prev) => (prev + 1) % teams.length);
  };

  return (
    <div
      className="grid h-screen w-screen bg-[#1a0504] font-sans overflow-hidden gap-0"
      style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
    >
      {/* TRÁI: BẢNG XẾP HẠNG */}
      <div className="bg-[#240706] border-r border-[#3f1211] overflow-y-auto hidden md:flex flex-col">
        <Leaderboard
          teams={teams}
          currentTurn={currentTurn}
          winLaps={WIN_LAPS}
        />
      </div>

      {/* GIỮA: BÀN CỜ */}
      <div className="relative flex items-center justify-center p-0 bg-[#1a0504]">
        <BoardMap
          tiles={tiles}
          teams={teams}
          activeTeam={activeTeam}
          diceResult={diceResult}
          isRolling={isRolling}
          onRollClick={handleRollClick}
          rollDisabled={rollDisabled}
        />

        {lastKicked && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-700/90 border border-red-400 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-40 animate-bounce">
            💥 {lastKicked.kickerName} đá {lastKicked.teamName} về vạch xuất
            phát!
          </div>
        )}
        {lastEffect && !lastKicked && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-700/90 border border-amber-400 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-40 animate-bounce">
            ✨ {lastEffect.teamName}: {lastEffect.message}
          </div>
        )}

        <QuestionModal
          activeQuestion={activeQuestion}
          onAnswer={handleAnswer}
        />

        {winner && (
          <div className="absolute inset-0 bg-black/85 flex items-center justify-center z-50 rounded-xl">
            <div className="bg-slate-800 border-2 border-amber-400 p-10 rounded-2xl max-w-md w-[90%] text-center shadow-2xl">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold text-amber-400 mb-2">
                CHIẾN THẮNG!
              </h2>
              <p className="text-xl text-white mb-1">
                {winner.character} {winner.name}
              </p>
              <p className="text-slate-300">
                đã hoàn thành {WIN_LAPS} vòng đầu tiên!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* PHẢI: BẢNG QUẢN TRÒ */}
      <div className="bg-[#240706] border-l border-[#3f1211] overflow-y-auto hidden md:flex flex-col z-10">
        <GMPanel
          activeTeam={activeTeam}
          currentTile={currentTile}
          diceResult={diceResult}
          hasActiveEvent={!!activeQuestion}
          teams={teams}
          isRolling={isRolling}
          onRollClick={handleRollClick}
          onNextTurn={nextTurn}
          onManualMove={moveTeamBy}
          bonusRoll={bonusRoll}
          winner={winner}
          winLaps={WIN_LAPS}
        />
      </div>

      {/* GIAO DIỆN LUẬT CHƠI ĐƯỢC THÊM VÀO ĐÂY */}
      <RulesPanel />
    </div>
  );
}
