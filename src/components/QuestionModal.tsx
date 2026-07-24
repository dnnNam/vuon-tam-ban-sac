import { useState } from 'react';
import type { Question } from '../types';

export type ActiveQuestion = {
  teamId: number;
  tileId: number;
  lapIndex: number; // 0 = vòng 1, 1 = vòng 2, 2 = vòng 3...
  question: Question;
  rollUsed: number; // số điểm xúc xắc đã dùng để đến ô này
  lapGained: boolean; // lượt đổ xúc xắc này có vừa đi qua vạch xuất phát (được cộng 1 vòng) hay không
} | null;

type Props = {
  activeQuestion: ActiveQuestion;
  onAnswer: (isCorrect: boolean) => void;
};

export default function QuestionModal({ activeQuestion, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  if (!activeQuestion) return null;
  const { question, lapIndex } = activeQuestion;

  const handlePick = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
  };

  const handleContinue = () => {
    const isCorrect = selected === question.correctIndex;
    setSelected(null);
    setRevealed(false);
    onAnswer(isCorrect);
  };

  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 rounded-xl">
      <div className="bg-slate-800 border-2 border-purple-500 p-8 rounded-2xl max-w-lg w-[90%] text-center shadow-2xl">
        <p className="text-xs font-bold text-purple-300 uppercase tracking-widest mb-1">
          Câu hỏi — Vòng {lapIndex + 1}
        </p>
        <h2 className="text-xl font-bold text-white mb-6">{question.question}</h2>

        <div className="flex flex-col gap-3 mb-6">
          {question.options.map((opt, idx) => {
            let style = "bg-slate-700 hover:bg-slate-600 border border-slate-500";
            if (revealed) {
              if (idx === question.correctIndex) style = "bg-emerald-700 border border-emerald-400";
              else if (idx === selected) style = "bg-red-700 border border-red-400";
              else style = "bg-slate-700/50 border border-slate-600 opacity-60";
            }
            return (
              <button
                key={idx}
                onClick={() => handlePick(idx)}
                disabled={revealed}
                className={`${style} p-3 rounded-lg text-left transition text-white font-medium`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {revealed && (
          <button
            onClick={handleContinue}
            className="bg-amber-500 hover:bg-amber-400 text-[#1a0504] font-black px-6 py-3 rounded-xl transition"
          >
            {selected === question.correctIndex
              ? 'Tiếp tục — Lắc xúc xắc thêm 🎲'
              : 'Tiếp tục — Lùi 2 ô ☠️'}
          </button>
        )}
      </div>
    </div>
  );
}