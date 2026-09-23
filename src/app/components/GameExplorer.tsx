"use client";

import { useState } from "react";
import { GAME_STATUSES, type GameDraft, type GameStatus } from "@/types/games";
import { useGameStore } from "@/store/GameStore";
import GameForm from "./GameForm";
import GameCard from "./GameCard";

type StatusFilter = "ทั้งหมด" | GameStatus;

export default function GameExplorer() {
  const { games, addGame, updateGame, deleteGame, setStatus } = useGameStore();

  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ทั้งหมด");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  function handleSave(draft: GameDraft) {
    if (editingId) {
      updateGame(editingId, draft);
      setEditingId(null);
    } else {
      addGame(draft);
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
  }

  function handleRequestDelete(id: string) {
    setPendingDeleteId(id);
  }

  function handleConfirmDelete(id: string) {
    deleteGame(id);
    if (editingId === id) setEditingId(null);
    setPendingDeleteId(null);
  }

  function handleCancelDelete() {
    setPendingDeleteId(null);
  }

  const editingGame = games.find((game) => game.id === editingId);

  // ค้นหาชื่อเกมและกรองตามสถานะทำงานร่วมกันได้ (AND)
  const searchText = keyword.trim().toLowerCase();
  const visibleGames = games.filter((game) => {
    const matchesKeyword = game.title.toLowerCase().includes(searchText);
    const matchesStatus =
      statusFilter === "ทั้งหมด" || game.status === statusFilter;
    return matchesKeyword && matchesStatus;
  });

  // Derived state: คำนวณจาก games ทุกครั้งที่ render ไม่เก็บแยกเป็น state
  const totalHoursNotStarted = games
    .filter((game) => game.status === "ยังไม่เริ่ม")
    .reduce((sum, game) => sum + game.expectedHours, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-4">
        <div className="rounded-lg border border-gray-300 bg-white p-4 sm:col-span-3">
          <p className="text-sm text-gray-500">
            ชั่วโมงรวมของเกมที่ยังไม่เริ่ม
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {totalHoursNotStarted} ชั่วโมง
          </p>
        </div>
      </div>

      <GameForm
        key={editingId ?? "new"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={handleCancelEdit}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="ค้นหาชื่อเกม..."
          aria-label="ค้นหาชื่อเกม"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:max-w-xs"
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as StatusFilter)
          }
          aria-label="กรองตามสถานะ"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="ทั้งหมด">ทุกสถานะ</option>
          {GAME_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {visibleGames.length === 0 ? (
        <p className="text-gray-500">ไม่พบเกมที่ตรงกับเงื่อนไข</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isPendingDelete={pendingDeleteId === game.id}
              onEdit={setEditingId}
              onRequestDelete={handleRequestDelete}
              onConfirmDelete={handleConfirmDelete}
              onCancelDelete={handleCancelDelete}
              onStatusChange={setStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}
