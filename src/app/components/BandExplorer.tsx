"use client";

import { useState, type ChangeEvent } from "react";
import type { Band } from "@/types/Band";
import BandCard from "./BandCard";

type BandExplorerProps = {
  initialBands: Band[];
};

type SortOption = "none" | "name" | "year";

export default function BandExplorer({ initialBands }: BandExplorerProps) {
  // ช่องค้นหา (Controlled Input)
  const [keyword, setKeyword] = useState("");

  // เก็บ id ของวงที่กำลังติดตามอยู่
  const [followingIds, setFollowingIds] = useState<Band["id"][]>([]);

  // เก็บจำนวน like แยกตาม id ของวง
  const [likes, setLikes] = useState<Record<string, number>>({});

  // เก็บแค่เงื่อนไขการเรียงลำดับ ไม่เก็บ list ที่เรียงแล้ว
  const [sortBy, setSortBy] = useState<SortOption>("none");

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFollow(id: Band["id"]) {
    setFollowingIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((followId) => followId !== id)
        : [...prevIds, id],
    );
  }

  function handleLike(id: Band["id"]) {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: (prevLikes[id] ?? 0) + 1,
    }));
  }

  function handleClearAll() {
    setKeyword("");
    setSortBy("none");
    setFollowingIds([]);
    setLikes({});
  }

  const searchText = keyword.trim().toLowerCase();

  // กรองตามคำค้นหาก่อน แล้วค่อยเรียงลำดับตามเงื่อนไขที่เลือก
  const visibleBands = initialBands
    .filter((band) => band.name.toLowerCase().includes(searchText))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "year") return a.formationYear - b.formationYear;
      return 0;
    });

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Favorite Bands</h1>
        <p className="text-gray-500 mt-1">
          กำลังติดตาม {followingIds.length} จาก {initialBands.length} วง
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          aria-label="ค้นหาชื่อวงดนตรี"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวงดนตรี..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:max-w-xs"
        />

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as SortOption)}
          aria-label="เรียงลำดับวงดนตรี"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500"
        >
          <option value="none">ไม่เรียงลำดับ</option>
          <option value="name">เรียงตามชื่อวง</option>
          <option value="year">เรียงตามปีก่อตั้ง</option>
        </select>

        <button
          type="button"
          onClick={handleClearAll}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-900"
        >
          ล้างเงื่อนไข
        </button>
      </div>

      {visibleBands.length === 0 ? (
        <p className="text-gray-500">
          ไม่พบวงดนตรีที่ตรงกับเงื่อนไข ลองแก้คำค้นหาหรือกดล้างเงื่อนไข
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFollowing={followingIds.includes(band.id)}
              onToggleFollow={handleToggleFollow}
              likeCount={likes[band.id] ?? 0}
              onLike={handleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}
