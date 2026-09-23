import type { Game } from "@/types/games";

export const games: Game[] = [
  {
    id: "g-elden-ring",
    title: "Elden Ring",
    platform: "PC",
    expectedHours: 80,
    status: "เล่นจบแล้ว",
  },
  {
    id: "g-zelda-totk",
    title: "The Legend of Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    expectedHours: 60,
    status: "กำลังเล่น",
  },
  {
    id: "g-baldurs-gate-3",
    title: "Baldur's Gate 3",
    platform: "PC",
    expectedHours: 100,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "g-spiderman-2",
    title: "Marvel's Spider-Man 2",
    platform: "PlayStation 5",
    expectedHours: 25,
    status: "กำลังเล่น",
  },
  {
    id: "g-genshin-impact",
    title: "Genshin Impact",
    platform: "Mobile",
    expectedHours: 40,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "g-forza-horizon-5",
    title: "Forza Horizon 5",
    platform: "Xbox Series X",
    expectedHours: 30,
    status: "ยังไม่เริ่ม",
  },
];
