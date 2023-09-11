import Link from "next/link";
import style from "./Button.module.scss";

export default function Button({ variant, label, href, ...props }) {
  if (props.disabled) {
    variant = "disabled";
  }

  if (href) {
    return (
      <Link
        {...props}
        href={href}
        className={style["bounds-" + variant]}
        replace
      >
        <div className={style.buttonArea}>
          <div className={style.label}>{label}</div>
        </div>
      </Link>
    );
  } else {
    return (
      <button {...props} className={style["bounds-" + variant]}>
        <div className={style.buttonArea}>
          <div className={style.label}>{label}</div>
        </div>
      </button>
    );
  }
}
