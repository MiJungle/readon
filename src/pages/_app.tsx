import type { AppProps } from "next/app";
import { Noto_Sans_KR } from "next/font/google";
import "../styles/globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={notoSansKR.className}>
      <Component {...pageProps} />
    </main>
  );
}
