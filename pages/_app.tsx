import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      {" "}
      <Component {...pageProps} />{" "}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID}');
    `}
      </Script>
    </div>
  );
}

export default MyApp;
