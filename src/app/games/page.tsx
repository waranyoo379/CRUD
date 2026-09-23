import type { Metadata } from "next";
import { games } from "@/data/games";
import { GameStoreProvider } from "@/store/GameStore";
import GameExplorer from "@/components/GameExplorer";

export const metadata: Metadata = {
  title: "รายการเกมที่ตั้งใจจะเล่น",
};

export default function GamesPage() {
  return (
    <main className="py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Game Backlog</h1>
        <p className="mt-1 text-gray-500">
          บันทึกเกมที่ตั้งใจจะเล่น พร้อมติดตามสถานะและเวลาที่คาดว่าจะใช้
        </p>
      </div>

      <GameStoreProvider initialGames={games}>
        <GameExplorer />
      </GameStoreProvider>
    </main>
  );
}
