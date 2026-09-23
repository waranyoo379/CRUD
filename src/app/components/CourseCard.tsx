"use client";

import Link from "next/link";
 
type Course = {
  id: string | number;
  name?: string;
  title?: string;
  code?: string;
  credit?: number;
  credits?: number;
  isOpen?: boolean;
  open?: boolean;
};

type CourseCardProps = {
  course: Course;
  isFavorite?: boolean;
  onToggleFavorite?: (id: Course["id"]) => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function CourseCard({
  course,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
}: CourseCardProps) {
  type LegacyCourseShape = Partial<Course> & {
    title?: string;
    credits?: number;
    isOpen?: boolean;
    open?: boolean;
  };

  const legacyCourse = course as LegacyCourseShape;
  const courseName = legacyCourse.name ?? legacyCourse.title ?? "Unnamed Course";
  const courseCode = legacyCourse.code ?? "";
  const credits = legacyCourse.credit ?? legacyCourse.credits ?? 0;
  const isOpen = legacyCourse.isOpen ?? legacyCourse.open ?? false;

  return (
    <article key={course.id} className="border p-4 mb-4 rounded-lg shadow-md">
      <h2>
        {course.id ? <Link href={`/courses/${course.id}`}>{courseName}</Link> : courseName}
      </h2>

      {courseCode ? <p>รหัสวิชา: {courseCode}</p> : null}
      {credits ? <p>{credits} หน่วยกิต</p> : null}

      <p className={isOpen ? "text-green-600" : "text-red-600"}>
        {isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
      </p>

      <button
        type="button"
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite?.(course.id)}
      >
        {isFavorite ? "อยู่ในรายการโปรด" : "เพิ่มเป็นรายการโปรด"}
      </button>

      {onEdit ? (
        <button type="button" onClick={onEdit}>
          แก้ไข
        </button>
      ) : null}

      {onDelete ? (
        <button type="button" onClick={onDelete}>
          ลบ
        </button>
      ) : null}
    </article>
  );
}

