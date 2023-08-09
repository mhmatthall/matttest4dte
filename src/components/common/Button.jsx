import Link from "next/link";
import style from "./Button.module.scss";

export default function Button({ href, label, variant }) {
  return (
    <Link href={href} className={style["bounds-" + variant]} replace>
      <div className={style.buttonArea}>
        <div className={style.label}>{label}</div>
      </div>
    </Link>
  );
}
