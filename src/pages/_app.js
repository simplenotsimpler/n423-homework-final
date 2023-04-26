/* 

  using next/font
  https://blog.logrocket.com/next-js-font-optimization-custom-google-fonts/
  https://dev.to/mikeesto/how-to-use-nextfont-globally-4img
*/

import Layout from "@/components/Layout.jsx";
import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext.js";

//TODO: watch for loading issues, esp. when deployed, and fix
const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --roboto-font: ${roboto.style.fontFamily};
        }
      `}</style>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}
