import Image from "next/image";
import { Band } from "../types/Band";

type BandCardProps = {
  band: Band;
  isFollowing?: boolean;
  onToggleFollow?: (id: Band["id"]) => void;
  likeCount?: number;
  onLike?: (id: Band["id"]) => void;
};

export default function BandCard({
  band,
  isFollowing,
  onToggleFollow,
  likeCount = 0,
  onLike,
}: BandCardProps) {
  return (
    <article className="border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
      {/* รูปวงหลัก */}
      <div className="relative w-full h-52 mb-4 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={band.image}
          alt={`รูปภาพวง ${band.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <h2 className="text-2xl font-bold text-gray-900">{band.name}</h2>
      <p className="text-sm text-gray-500 mb-4">
        ก่อตั้งปี ค.ศ. {band.formationYear} · {band.members.length} สมาชิก
      </p>

      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-3">
        สมาชิกในวง:
      </h3>

      {/* รายชื่อสมาชิกพร้อมรูปภาพวงกลม */}
      <ul className="space-y-3 mt-auto">
        {band.members.map((member, index) => (
          <li key={index} className="flex items-center justify-between border-b border-gray-100 pb-2">
            <div className="flex items-center gap-3">
              {/* กรอบรูปทรงกลมขนาดเล็ก (40x40 px) */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <span className="font-medium text-gray-900 text-sm">{member.name}</span>
            </div>
            <span className="text-gray-500 text-xs">{member.role}</span>
          </li>
        ))}
      </ul>

      {/* ปุ่ม Like และปุ่มติดตาม/เลิกติดตาม */}
      <div className="mt-4 flex items-center gap-2 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => onLike?.(band.id)}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-pink-300 hover:text-pink-600"
        >
          <span>♥</span>
          {likeCount}
        </button>

        <button
          type="button"
          aria-pressed={isFollowing}
          onClick={() => onToggleFollow?.(band.id)}
          className={
            isFollowing
              ? "ml-auto rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white"
              : "ml-auto rounded-lg border border-gray-200 px-4 py-1.5 text-sm text-gray-700 transition-colors hover:border-blue-400 hover:text-blue-600"
          }
        >
          {isFollowing ? "กำลังติดตาม" : "ติดตาม"}
        </button>
      </div>
    </article>
  );
}