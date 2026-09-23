import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/coursesdata";

export default function CoursesPage() {
  return (
    <main className="py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">รายวิชาที่เปิดสอน</h1>
        <p className="text-gray-500 mt-1">แสดงสถานะและข้อมูลของรายวิชาทั้งหมด</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </main>
  );
}