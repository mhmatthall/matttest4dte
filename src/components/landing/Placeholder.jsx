import Button from "@/components/common/Button";
import style from "./Placeholder.module.scss";

export default function Placeholder() {
  return (
    <div className={style.container}>
      <h1 className={style.headline}>cronicl</h1>
      <h2 className={style.subhead}>
        Let&apos;s explore our local outdoors together.
      </h2>
      <p className={style.description}>
        This is a prototype biodiversity education app for Down to Earth, made
        at Swansea University. It isn&apos;t open to the public yet, so only
        login if you know what you&apos;re doing.
      </p>
      <div className={style.actions}>
        <Button href="/play" label="Join a session" variant="outlined"/>
        <Button href="/dashboard" label="Login" variant="filled"/>
      </div>
    </div>
  );
}
