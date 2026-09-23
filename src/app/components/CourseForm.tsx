"use client"; 
import { useState, type ChangeEvent, type FormEvent } from "react";

type Course = { code: string; name: string; credit: number; instructor: string };
type CourseDraft = Omit<Course, "credit"> & { credit: string };
type FormErrors = Partial<Record<keyof CourseDraft, string>>;
type CourseFormProps = { 
  initialCourse?: Course; 
  onSave: (draft: CourseDraft) => void; 
  onCancel: () => void; 
}; 

const emptyDraft: CourseDraft = { code: "", name: "", credit: "", instructor: "" };

function toDraft(course?: Course): CourseDraft {
  return course ? { ...course, credit: String(course.credit) } : { ...emptyDraft };
}

export default function CourseForm({ initialCourse, onSave, onCancel }: CourseFormProps) {
  const [draft, setDraft] = useState<CourseDraft>(() => toDraft(initialCourse));
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  }

  function validate(value: CourseDraft): FormErrors {
    const nextErrors: FormErrors = {};
    if (!value.code.trim()) nextErrors.code = "กรุณาระบุรหัสวิชา";
    if (!value.name.trim()) nextErrors.name = "กรุณาระบุชื่อวิชา";
    const credit = Number(value.credit);
    if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
      nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
    }
    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="code">รหัสวิชา</label>
      <input id="code" name="code" type="text" value={draft.code} onChange={handleChange} aria-invalid={!!errors.code} />
      {errors.code && <p>{errors.code}</p>}
      <label htmlFor="name">ชื่อวิชา</label>
      <input id="name" name="name" type="text" value={draft.name} onChange={handleChange} aria-invalid={!!errors.name} />
      {errors.name && <p>{errors.name}</p>}
      <label htmlFor="credit">หน่วยกิต</label>
      <input id="credit" name="credit" type="number" min="1" max="6" value={draft.credit} onChange={handleChange} aria-invalid={!!errors.credit} />
      {errors.credit && <p>{errors.credit}</p>}
      <label htmlFor="instructor">ผู้สอน</label>
      <input id="instructor" name="instructor" type="text" value={draft.instructor} onChange={handleChange} />
      <button type="submit">บันทึก</button>
      {initialCourse && <button type="button" onClick={onCancel}>ยกเลิก</button>}
    </form>
  );
}