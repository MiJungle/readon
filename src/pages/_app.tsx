import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Noto_Sans_KR } from "next/font/google";
import "../styles/globals.css";
import Layout from "@/components/Layout";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
});

export default function App({ Component, pageProps }: AppProps) {
  const [showPreview, setShowPreview] = useState(false);

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <main className={notoSansKR.className}>
      <Layout>
        <Component {...pageProps} showPreview={showPreview} />
      </Layout>
    </main>
  );
}
