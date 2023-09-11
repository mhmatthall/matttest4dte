import style from "./ProgressIndicator.module.scss";

export default function ProgressIndicator({ variant }) {
  return <div className={style[variant]} />;
}
