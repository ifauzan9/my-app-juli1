import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppShell from "@/layouts/AppShell";
// import "boxicons";
import "boxicons/css/boxicons.min.css";

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />;
  return (
    <div>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </div>
  );
}
