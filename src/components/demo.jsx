import Image from "next/image";

import style from "./demo.module.scss";

export default function Demo() {
  return (
    <main className={style.main}>
      <h1>Down to Earth x EPIC CDT</h1>
      <p>This is a next.js site hosted on Github and served by AWS Amplify!</p>
      <Image
        className={style.thumbnail}
        src="/img/jones.png"
        alt="Matt Jones' noggin"
        width={500}
        height={500}
        priority
      />
    </main>
  );
}
