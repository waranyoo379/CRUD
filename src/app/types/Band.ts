export type Member = {
  name: string;
  role: string;
  image: string; // เพิ่มฟิลด์เก็บ path หรือ URL รูปสมาชิก
};

export type Band = {
  id: string;
  name: string;
  formationYear: number;
  image: string;
  members: Member[];
};