import { SessionProvider } from "next-auth/react";
import "./styles.css";
import AuthGuard from "../components/AuthGuard";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {Component.auth ? (
        <AuthGuard allowedRoles={Component.auth.allowedRoles}>
          <Component {...pageProps} />
        </AuthGuard>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}
