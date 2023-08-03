import Image from "next/image";

import style from "./Button.module.scss";

export default function Button({ iconSrc, altText, labelText, onClick }) {
  return (
    <button type="button" className={style.container} onClick={onClick}>
      <Image
        src={iconSrc}
        alt={altText}
        className={style.icon}
        width="32"
        height="32"
      />
      <b>{labelText}</b>
    </button>
  );
}
