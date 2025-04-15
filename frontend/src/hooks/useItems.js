// （状態管理を担当）
import { useState, useEffect } from "react";
import itemService from "../services/itemService";

const useItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    itemService.getItems().then(setItems);
  }, []);

  const addItem = async (newItem) => {
    const data = await itemService.addItem(newItem);
    setItems([...items, data]);
  };

  const updateItem = async (id, updatedItem) => {
    await itemService.updateItem(id, updatedItem);
    setItems(items.map((item) => (item.id === id ? updatedItem : item)));
  };

  return { items, addItem, updateItem };
};

export default useItems;
