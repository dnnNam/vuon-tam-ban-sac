export type Team = {
  id: number;
  name: string;
  color: string;
  character: string; // emoji / icon đại diện nhân vật của đội
  position: number;
  laps: number; // số vòng đã hoàn thành (0,1,2...). Đạt WIN_LAPS là thắng.
  lastRoll?: number | null; // số xúc xắc gần nhất mà đội này quay được
};

export type TileType = 'START' | 'QUESTION';

export type Tile = {
  id: number;
  name: string;
  type: TileType;
  gridCol: number;
  gridRow: number;
};

export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

// key: tileId -> mảng câu hỏi theo vòng.
// index 0 = câu hỏi vòng 1, index 1 = vòng 2, index 2 = vòng 3...
export type QuestionBank = Record<number, Question[]>;