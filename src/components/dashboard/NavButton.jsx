import Link from "next/link";
import { useRouter } from "next/router";
import style from "./NavButton.module.scss";

export default function NavButton({ href, label, glyph }) {
  // Highlight button if it is the current page (or a child page)
  const router = useRouter();
  const isActive =
    href === "/dashboard"
      ? href === router.pathname
      : router.pathname.startsWith(href);

  return (
    <Link href={href} className={style.container} replace>
      <div className={style.symbolContainer}>
        <div className={isActive ? style.symbolAreaActive : style.symbolArea}>
          <span className={style["material-symbols-outlined"]}>{glyph}</span>
        </div>
      </div>
      {label && <div className={style.label}>{label}</div>}
    </Link>
  );
}
