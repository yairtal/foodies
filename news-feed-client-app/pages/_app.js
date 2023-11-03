import "../styles/globals.css";
import { UserProvider } from "../contexts/UserContext";

function AppfrontApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default AppfrontApp;
