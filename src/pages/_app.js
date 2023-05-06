/* 

  using next/font
  https://blog.logrocket.com/next-js-font-optimization-custom-google-fonts/
  https://dev.to/mikeesto/how-to-use-nextfont-globally-4img
*/

import Layout from "@/components/Layout.jsx";
import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext.js";
import { NotificationProvider } from "@/contexts/NotificationContext.js";
import { ShowsProvider } from "@/contexts/ShowsContext.js";
import { ModalProvider } from "@/contexts/ModalContext.js";

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
      <ModalProvider>
        <NotificationProvider>
          <AuthProvider>
            <ShowsProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ShowsProvider>
          </AuthProvider>
        </NotificationProvider>
      </ModalProvider>
    </>
  );
}
