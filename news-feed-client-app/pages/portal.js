import { NewsItemList } from "../components/news-items";
import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { fetchAllItems } from "../services/itemService";

export default function Portal() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Use the fetchAllItems service function to load items
    fetchAllItems().then((itemsData) => {
      setItems(itemsData || []);
    })
    .catch((error) => {
      console.error("Failed to fetch items:", error);
    });
  }, []);

  const handleItemAdded = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <Layout title="Appfront Portal" footerText="Appfront Portal">
      <NewsItemList
        items={items}
        editable={true}
        addable={true}
        onItemAdded={handleItemAdded}
      />
    </Layout>
  );
}
