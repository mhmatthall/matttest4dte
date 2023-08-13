// Applies global styles to entire app
import "@/styles/globals.scss";
import "material-symbols/outlined.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  // We've got nested layouts, so to maintain the SPA-like navigation we have made each page define its own layout
  // Here we ask for the layout from the page, and fall back on no layout if the page doesn't define one
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
