import style from "./FormWrapper.module.scss";

export default function FormWrapper({ children, ...props }) {
  return (
    <form {...props} className={style.container}>
      {children}
    </form>
  );
}
