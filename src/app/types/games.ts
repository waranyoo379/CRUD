export const GAME_STATUSES = ["ยังไม่เริ่ม", "กำลังเล่น", "เล่นจบแล้ว"] as const;
export type GameStatus = (typeof GAME_STATUSES)[number];

export const GAME_PLATFORMS = [
  "PC",
  "PlayStation 5",
  "Xbox Series X",
  "Nintendo Switch",
  "Mobile",
] as const;
export type GamePlatform = (typeof GAME_PLATFORMS)[number];

export type Game = {
  id: string;
  title: string;
  platform: GamePlatform;
  expectedHours: number;
  status: GameStatus;
};

// ฟอร์มเก็บทุกฟิลด์เป็น string เดียวกัน (Controlled Input) จึงแยก type ของ draft ออกจาก Game จริง
export type GameDraft = {
  title: string;
  platform: GamePlatform | "";
  expectedHours: string;
  status: GameStatus;
};

export const emptyGameDraft: GameDraft = {
  title: "",
  platform: "",
  expectedHours: "",
  status: "ยังไม่เริ่ม",
};

export function toDraft(game?: Game): GameDraft {
  if (!game) return { ...emptyGameDraft };
  return {
    title: game.title,
    platform: game.platform,
    expectedHours: String(game.expectedHours),
    status: game.status,
  };
}
