import Link from "next/link";
import { useRouter } from "next/router";
import style from "./List.module.scss";

export function List({ children }) {
  return <div className={style.container}>{children}</div>;
}

export function ListItem({ label, subLabel, glyph, href }) {
  // Determine if this tab is active
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      replace
    >
      <div className={style.item}>
        <div className={isActive ? style.itemAreaActive : style.itemArea}>
          <div className={style.symbol}>
            <span className={style["material-symbols-outlined"]}>{glyph}</span>
          </div>
          <div className={style.content}>
            <h2 className={style.headline}>{label}</h2>
            <p className={style.supportingText}>{subLabel}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
