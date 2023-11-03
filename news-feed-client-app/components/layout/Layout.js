import Head from "next/head";
import Header from "../header";
import styles from "../../styles/Home.module.css";

export default function Layout({ children, title, footerText }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <footer>
        <p>{footerText}</p>
      </footer>

      {/* Local styles for the layout */}
      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #efefef;
          padding: 30px;
        }
        footer {
          width: 100%;
          height: 50px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      {/* Global styles */}
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-color: #d9d9d9;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
