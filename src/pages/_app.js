// Applies global styles to entire app
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}