import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { styled } from '@mui/material/styles';
import { Grid, Paper } from '@mui/material';
import NewsFeed from '../components/news-feed';
import fetch from 'node-fetch';
import { useState, useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Home() {
  const [items, setItems]= useState([])

  useEffect(() => {
    fetch("http://localhost:8081/items")
    .then(response => response.json())
    .then(data => setItems(data))
  },[])

  return (
    <div className={styles.container}>
      <Head>
        <title>Appfront News Feed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NewsFeed items={items}></NewsFeed>
      </main>

      <footer>
        <p>Appfront</p>
      </footer>

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
  )
}
