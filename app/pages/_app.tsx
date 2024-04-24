import Router from "next/router";
import { config } from "@fortawesome/fontawesome-svg-core";
import ProgressBar from "@badrap/bar-of-progress";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";
import type { AppProps } from "next/app";
config.autoAddCss = false;

const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100,
});
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
