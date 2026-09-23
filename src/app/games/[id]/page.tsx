import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { games } from "@/data/games";

type GamePageProps = {
  params: Promise<{ id: string }>;
};

function findGame(id: string) {
  return games.find((game) => game.id === id);
}

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { id } = await params;
  const game = findGame(id);

  if (!game) {
    return { title: "ไม่พบเกม" };
  }

  return { title: game.title };
}

export default async function GameDetailPage({ params }: GamePageProps) {
  const { id } = await params;
  const game = findGame(id);

  if (!game) {
    notFound();
  }

  return (
    <main className="py-6">
      <Link href="/games" className="text-sm text-blue-600 hover:underline">
        &larr; กลับไปรายการเกม
      </Link>

      <div className="mt-4 space-y-3 rounded-lg border border-gray-300 bg-white p-6">
        <h1 className="text-2xl font-bold text-gray-900">{game.title}</h1>
        <p className="text-gray-600">แพลตฟอร์ม: {game.platform}</p>
        <p className="text-gray-600">
          เวลาที่คาดว่าจะใช้เล่น: {game.expectedHours} ชั่วโมง
        </p>
        <p className="text-gray-600">สถานะ: {game.status}</p>
      </div>
    </main>
  );
}
