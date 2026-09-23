export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-2xl px-6 py-16">
      <h1>เกี่ยวกับเว็บไซต์</h1>
      <p className="mt-3 text-neutral-500">
        เว็บไซต์นี้เป็นเว็บไซต์สำหรับนักศึกษามหาวิทยาลัย 69 เพื่อใช้ในการเรียนการสอนและการลงทะเบียนรายวิชา
      </p>
      <section className="mt-10 space-y-8">
        <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          <p>เว็บไซต์นี้พัฒนาโดยนักศึกษามหาวิทยาลัย 69</p>
        </div>
      </section>
    </main>
  );
}