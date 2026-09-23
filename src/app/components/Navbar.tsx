import Link from "next/link";

const links = [
  { href: "/", label: "หน้าแรก" },
  { href: "/courses", label: "รายวิชา" },    
  { href: "/about", label: "เกี่ยวกับ" },
  { href: "/band", label: "วงดนตรี" },
  { href: "/games", label: "เกม" },
];

export default function Navbar() {
  return (
    <nav
      aria-label="เมนูหลัก"
      className="border-b border-black/10 dark:border-white/10"
    >
      <ul className="mx-auto flex max-w-3xl items-center justify-center gap-1 px-4 py-3 text-sm">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="rounded-md px-3 py-1.5 text-foreground/70 transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
