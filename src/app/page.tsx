import Link from "next/link";

export default function HomePage() {
  return (
    <main className="text-center py-16">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
        ยินดีต้อนรับสู่ระบบข้อมูลการเรียนรู้
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
        มหาวิทยาลัยเเม่โจ้(Maejo University)
      </p>

      <div className="flex justify-center gap-4">
        <Link
          href="/courses"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition"
        >
          ดูรายวิชาทั้งหมด
        </Link>
      </div>
    </main>
  );
}