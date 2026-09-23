"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  GAME_PLATFORMS,
  GAME_STATUSES,
  emptyGameDraft,
  type Game,
  type GameDraft,
} from "@/types/games";

type FormErrors = Partial<Record<keyof GameDraft, string>>;

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

function validate(draft: GameDraft): FormErrors {
  const errors: FormErrors = {};

  if (!draft.title.trim()) {
    errors.title = "กรุณาระบุชื่อเกม";
  }

  if (!draft.platform) {
    errors.platform = "กรุณาเลือกแพลตฟอร์ม";
  }

  const hours = Number(draft.expectedHours);
  if (
    draft.expectedHours.trim() === "" ||
    !Number.isInteger(hours) ||
    hours <= 0
  ) {
    errors.expectedHours = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
  }

  return errors;
}

export default function GameForm({
  initialGame,
  onSave,
  onCancel,
}: GameFormProps) {
  // เก็บทุกฟิลด์ของฟอร์มไว้ใน State ก้อนเดียว (Controlled Input)
  const [draft, setDraft] = useState<GameDraft>(() =>
    initialGame
      ? {
          title: initialGame.title,
          platform: initialGame.platform,
          expectedHours: String(initialGame.expectedHours),
          status: initialGame.status,
        }
      : { ...emptyGameDraft },
  );
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave(draft);
    setDraft({ ...emptyGameDraft });
    setErrors({});
  }

  function handleCancel() {
    setDraft({ ...emptyGameDraft });
    setErrors({});
    onCancel();
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-lg border border-gray-300 bg-white p-4"
    >
      <h2 className="text-lg font-semibold text-gray-900">
        {initialGame ? "แก้ไขเกม" : "เพิ่มเกมใหม่"}
      </h2>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          ชื่อเกม
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={draft.title}
          onChange={handleChange}
          aria-invalid={!!errors.title}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
          แพลตฟอร์ม
        </label>
        <select
          id="platform"
          name="platform"
          value={draft.platform}
          onChange={handleChange}
          aria-invalid={!!errors.platform}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">-- เลือกแพลตฟอร์ม --</option>
          {GAME_PLATFORMS.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
        {errors.platform && (
          <p className="mt-1 text-sm text-red-600">{errors.platform}</p>
        )}
      </div>

      <div>
        <label htmlFor="expectedHours" className="block text-sm font-medium text-gray-700">
          จำนวนชั่วโมงที่คาดว่าจะใช้เล่น
        </label>
        <input
          id="expectedHours"
          name="expectedHours"
          type="number"
          min="1"
          step="1"
          value={draft.expectedHours}
          onChange={handleChange}
          aria-invalid={!!errors.expectedHours}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {errors.expectedHours && (
          <p className="mt-1 text-sm text-red-600">{errors.expectedHours}</p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          สถานะ
        </label>
        <select
          id="status"
          name="status"
          value={draft.status}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {GAME_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          บันทึก
        </button>
        {initialGame && (
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}
