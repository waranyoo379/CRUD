export default function HomePage() {

  const siteName: string = "69 University";
  const courseCount: number = 4;
  const isOpen: boolean = true;

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">{siteName}</h1>
      <p className="mt-2 text-neutral-500">เว็บไซต์ของมหาวิทยาลัย 69</p>

      <section className="mt-10 space-y-8">
        <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          <p>เหมาะสำหรับชาว 69</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">คอร์สที่มีอยู่</h2>
          <p className="mt-2 text-sm text-neutral-600">
            จำนวนคอร์ส: {courseCount} | {isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
          </p>
          {/* <ul className="mt-3 divide-y divide-neutral-200 dark:divide-neutral-800">
            {course.map((c, index) => (
              <li key={index} className="py-2">{c}</li>
            ))}
          </ul> */}
          {/* <article>
            <h2>{course.title}</h2>
            <p>รหัสวิชา: {course.code}</p>
            <p>{course.credits} หน่วยกิต</p>
            <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
          </article> */}
        </div>
      </section>
    </main>
  );
}
