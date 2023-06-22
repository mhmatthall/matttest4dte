import Head from "next/head";
import Header from "./Header";

import style from "./Layout.module.scss";

// Global variables
export const pageTitleSuffix = " | Dashboard | DtE test";

// Here comes the layout!
export default function Layout({ children }) {
  return (
    <div className={style.root}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="author" content="CHIPS" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/img/dte250.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Header />
      <div className={style.main}>{children}</div>
    </div>
  );
}
