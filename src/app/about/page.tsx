type Siteinfo_student = {
  name: string;
  owner: string;
  updatedAt: string;
};

const siteInfo: Siteinfo_student = {
  name: "Student Course Hub",
  owner: "วรัญญู กล้าวินิจฉัย 6804101379",
  updatedAt: "2569-##-##",
};

const techStack: string[] = ["Next.js", "TypeScript", "React", "CSS(ยังไม่ได้้ใช้ tailwind)"];

export default function AboutMeProfile() {
  return (
    <div className="page">
      <h1>เกี่ยวกับเว็บไซต์</h1>

      <section>
        <h2>วัตถุประสงค์</h2>
        <p>
          {siteInfo.name} ทดสอบการเรียนรู้ Next.js
        </p><br></br>
      </section>

      <section>
        <h2>เทคโนโลยีที่ใช้</h2>
        <ul>
          {techStack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul><br></br>
      </section>

      <section>
        <h2>ผู้จัดทำ</h2>
        <p>ผู้จัดทำ: {siteInfo.owner}</p>
        <p>ปรับปรุงล่าสุด: {siteInfo.updatedAt}</p>
      </section>
    </div>
  );
}