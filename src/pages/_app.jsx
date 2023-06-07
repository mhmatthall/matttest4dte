// Applies global styles to entire app
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
