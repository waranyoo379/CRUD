"use client";

import { useState } from "react";

type Course = {
  id: string;
  code: string;
  name: string;
  credit: number;
  instructor: string;
};

type CourseDraft = Omit<Course, "id">;

type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({
  initialCourses,
}: CourseExplorerProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [keyword, setKeyword] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleCreate(draft: CourseDraft) {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      ...draft,
      code: draft.code.trim(),
      name: draft.name.trim(),
      instructor: draft.instructor.trim(),
      credit: Number(draft.credit),
    };
    setCourses((current) => [...current, newCourse]);
  }

  function handleDelete(id: string) {
    setCourses((current) => current.filter((course) => course.id !== id));
  }

  function handleUpdate(id: string, draft: CourseDraft) {
    setCourses((current) =>
      current.map((course) =>
        course.id === id
          ? { ...course, ...draft, credit: Number(draft.credit) }
          : course,
      ),
    );
    setEditingId(null);
  }

  function handleSave(draft: CourseDraft) {
    if (editingId === null) handleCreate(draft);
    else handleUpdate(editingId, draft);
  }

  const editingCourse = courses.find((course) => course.id === editingId);
  const visibleCourses = courses.filter((course) =>
    `${course.code} ${course.name} ${course.instructor}`
      .toLowerCase()
      .includes(keyword.trim().toLowerCase()),
  );

  return (
    <div>
      <input
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="ค้นหาวิชา"
        aria-label="ค้นหาวิชา"
      />
      <ul>
        {visibleCourses.map((course) => (
          <li key={course.id}>
            {course.code} - {course.name} ({course.credit}) - {course.instructor}
            <button type="button" onClick={() => setEditingId(course.id)}>แก้ไข</button>
            <button type="button" onClick={() => handleDelete(course.id)}>ลบ</button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() =>
          handleSave({ code: "", name: "", credit: 0, instructor: "" })
        }
        hidden={!editingCourse}
      >
        บันทึก
      </button>
    </div>
  );
}