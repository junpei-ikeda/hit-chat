import { useNavigate, useParams } from "react-router-dom";
import useItems from "../hooks/useItems";
import ItemForm from "../components/ItemForm";

const ItemUpsert = () => {
  const { id } = useParams();
  const { items, addItem, updateItem } = useItems();
  const navigate = useNavigate();

  const isEditMode = !!id;
  const item = items.find((item) => item.id === parseInt(id));

  if (isEditMode && !item) return <p>Loading...</p>;

  const handleSubmit = (data) => {
    if (isEditMode) {
      updateItem(id, data);
    } else {
      addItem(data);
    }
    navigate("/items");
  };

  return (
    <div>
      <h2>{isEditMode ? "アイテムを編集" : "アイテムを追加"}</h2>
      <ItemForm onSubmit={handleSubmit} defaultValues={item || { name: "" }} />
    </div>
  );
};

export default ItemUpsert;
import { useNavigate, useParams } from "react-router-dom";
import useItems from "../hooks/useItems";
import ItemForm from "../components/ItemForm";

const ItemUpsert = () => {
  const { id } = useParams();
  const { items, addItem, updateItem } = useItems();
  const navigate = useNavigate();

  const isEditMode = !!id;
  const item = items.find((item) => item.id === parseInt(id));

  if (isEditMode && !item) return <p>Loading...</p>;

  const handleSubmit = (data) => {
    if (isEditMode) {
      updateItem(id, data);
    } else {
      addItem(data);
    }
    navigate("/items");
  };

  return (
    <div>
      <h2>{isEditMode ? "アイテムを編集" : "アイテムを追加"}</h2>
      <ItemForm onSubmit={handleSubmit} defaultValues={item || { name: "" }} />
    </div>
  );
};

export default ItemUpsert;
