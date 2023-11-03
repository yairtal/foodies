import { NewsItemList } from "../components/news-items";
import { fetchItems } from "../services/itemService";
import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useUser } from "../contexts/UserContext";

export default function Home() {
  const { hasToken, userId, authChecked } = useUser();
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Only attempt to load data if we finished authentication.
    if (!authChecked) return;

    fetchItems(hasToken && userId ? userId : null)
      .then((itemsData) => {
        setItems(itemsData || []);
      })
      .catch((error) => {
        console.error("Failed to fetch items:", error);
      });
  }, [userId, hasToken, authChecked]);

  return (
    <Layout title="Appfront News Feed" footerText="Appfront">
      <NewsItemList items={items} />
    </Layout>
  );
}
