import { UserContext } from "@/pages/dashboard";
import { useContext } from "react";
import LogoutButton from "../auth/LogoutButton";

import style from "./Header.module.scss";

export default function Header() {
  const user = useContext(UserContext);

  return (
    <header className={style.container}>
      <div className={style.title}>
        <h3>croniclau</h3>
        <h2>Hi, {user.name}!</h2>
      </div>
      <LogoutButton />
    </header>
  );
}
