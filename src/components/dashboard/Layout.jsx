import Head from "next/head";
import style from "./Layout.module.scss";
import NavRail from "./NavRail";

// Global variables
export const pageTitleSuffix = " – cronicl";

// Here comes the layout!
export default function Layout({ children }) {
  return (
    <div className={style.root}>
      <Head>
        <meta name="theme-color" content="#fff8f5" />
      </Head>
      <NavRail />
      <main className={style.main}>{children}</main>
    </div>
  );
}
