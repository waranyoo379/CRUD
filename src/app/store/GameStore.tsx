"use client";

// ---------------------------------------------------------------------------
// GameStore: ใช้ React Context + useReducer เป็น "React State Management
// Library" แบบ built-in (ไม่ต้องติดตั้งแพ็กเกจเพิ่ม) เพื่อเก็บ state ของ
// รายการเกมไว้ที่จุดเดียว แล้วแจกจ่าย state + action ให้ทุก component ที่อยู่
// ภายใต้ <GameStoreProvider> เรียกใช้ผ่าน useGameStore() โดยไม่ต้องส่ง props
// ลงมาเป็นทอด ๆ (prop drilling)
//
// หมายเหตุ: โปรเจกต์นี้ไม่มีการเชื่อมต่ออินเทอร์เน็ตสำหรับติดตั้งไลบรารี
// ภายนอกอย่าง zustand/redux ได้ แต่โครงสร้างนี้ทำหน้าที่เทียบเท่ากัน
// (single source of truth + reducer + dispatch) และสามารถสลับไปใช้ zustand
// ได้ในภายหลังโดยแก้ไขเฉพาะไฟล์นี้ไฟล์เดียว
// ---------------------------------------------------------------------------

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Game, GameDraft, GameStatus } from "@/types/games";

type GameAction =
  | { type: "ADD"; payload: Game }
  | { type: "UPDATE"; id: string; payload: GameDraft }
  | { type: "DELETE"; id: string }
  | { type: "SET_STATUS"; id: string; status: GameStatus };

function gamesReducer(state: Game[], action: GameAction): Game[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "UPDATE":
      return state.map((game) =>
        game.id === action.id
          ? {
              ...game,
              title: action.payload.title.trim(),
              platform: action.payload.platform as Game["platform"],
              expectedHours: Number(action.payload.expectedHours),
              status: action.payload.status,
            }
          : game,
      );
    case "DELETE":
      return state.filter((game) => game.id !== action.id);
    case "SET_STATUS":
      return state.map((game) =>
        game.id === action.id ? { ...game, status: action.status } : game,
      );
    default:
      return state;
  }
}

type GameStoreValue = {
  games: Game[];
  addGame: (draft: GameDraft) => void;
  updateGame: (id: string, draft: GameDraft) => void;
  deleteGame: (id: string) => void;
  setStatus: (id: string, status: GameStatus) => void;
};

const GameStoreContext = createContext<GameStoreValue | null>(null);

export function GameStoreProvider({
  initialGames,
  children,
}: {
  initialGames: Game[];
  children: ReactNode;
}) {
  const [games, dispatch] = useReducer(gamesReducer, initialGames);

  const addGame = useCallback((draft: GameDraft) => {
    const newGame: Game = {
      id: crypto.randomUUID(),
      title: draft.title.trim(),
      platform: draft.platform as Game["platform"],
      expectedHours: Number(draft.expectedHours),
      status: draft.status,
    };
    dispatch({ type: "ADD", payload: newGame });
  }, []);

  const updateGame = useCallback((id: string, draft: GameDraft) => {
    dispatch({ type: "UPDATE", id, payload: draft });
  }, []);

  const deleteGame = useCallback((id: string) => {
    dispatch({ type: "DELETE", id });
  }, []);

  const setStatus = useCallback((id: string, status: GameStatus) => {
    dispatch({ type: "SET_STATUS", id, status });
  }, []);

  const value = useMemo(
    () => ({ games, addGame, updateGame, deleteGame, setStatus }),
    [games, addGame, updateGame, deleteGame, setStatus],
  );

  return (
    <GameStoreContext.Provider value={value}>
      {children}
    </GameStoreContext.Provider>
  );
}

export function useGameStore(): GameStoreValue {
  const ctx = useContext(GameStoreContext);
  if (!ctx) {
    throw new Error("useGameStore ต้องถูกเรียกภายใน <GameStoreProvider>");
  }
  return ctx;
}
