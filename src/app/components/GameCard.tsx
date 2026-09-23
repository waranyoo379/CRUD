"use client";

import Link from "next/link";
import { GAME_STATUSES, type Game, type GameStatus } from "@/types/games";

const STATUS_STYLES: Record<GameStatus, string> = {
  ยังไม่เริ่ม: "bg-gray-100 text-gray-700",
  กำลังเล่น: "bg-blue-100 text-blue-700",
  เล่นจบแล้ว: "bg-green-100 text-green-700",
};

type GameCardProps = {
  game: Game;
  isPendingDelete: boolean;
  onEdit: (id: string) => void;
  onRequestDelete: (id: string) => void;
  onConfirmDelete: (id: string) => void;
  onCancelDelete: () => void;
  onStatusChange: (id: string, status: GameStatus) => void;
};

export default function GameCard({
  game,
  isPendingDelete,
  onEdit,
  onRequestDelete,
  onConfirmDelete,
  onCancelDelete,
  onStatusChange,
}: GameCardProps) {
  return (
    <article className="space-y-3 rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-gray-900">
          <Link href={`/games/${game.id}`} className="hover:underline">
            {game.title}
          </Link>
        </h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[game.status]}`}
        >
          {game.status}
        </span>
      </div>

      <p className="text-sm text-gray-600">แพลตฟอร์ม: {game.platform}</p>
      <p className="text-sm text-gray-600">
        เวลาที่คาดว่าจะใช้เล่น: {game.expectedHours} ชั่วโมง
      </p>

      {/* เปลี่ยนสถานะได้ทันทีจากรายการ โดยไม่ต้องเปิดฟอร์มแก้ไข */}
      <div>
        <label className="sr-only" htmlFor={`status-${game.id}`}>
          เปลี่ยนสถานะ
        </label>
        <select
          id={`status-${game.id}`}
          value={game.status}
          onChange={(event) =>
            onStatusChange(game.id, event.target.value as GameStatus)
          }
          className="rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:border-blue-500"
        >
          {GAME_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {isPendingDelete ? (
        <div className="flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm">
          <span className="text-red-700">ยืนยันการลบเกมนี้?</span>
          <button
            type="button"
            onClick={() => onConfirmDelete(game.id)}
            className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700"
          >
            ยืนยันลบ
          </button>
          <button
            type="button"
            onClick={onCancelDelete}
            className="rounded-md border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-50"
          >
            ยกเลิก
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(game.id)}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
          >
            แก้ไข
          </button>
          <button
            type="button"
            onClick={() => onRequestDelete(game.id)}
            className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
          >
            ลบ
          </button>
        </div>
      )}
    </article>
  );
}
