import Link from "next/link";
import { useRouter } from "next/router";
import style from "./NavButton.module.scss";

export default function RailButton({ href, label, glyph }) {
  // Determine if this button is active
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href} className={style.bounds} replace>
      <div className={style.symbolContainer}>
        <div className={isActive ? style.symbolAreaActive : style.symbolArea}>
          <span className={style["material-symbols-outlined"]}>
            {glyph}
          </span>
        </div>
      </div>
      {label && <div className={style.label}>{label}</div>}
    </Link>
  );
}
