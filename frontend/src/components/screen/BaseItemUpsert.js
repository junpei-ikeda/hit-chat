import { useNavigate, useParams } from "react-router-dom";

const BaseItemUpsert = ({ items, addItem, updateItem, renderForm }) => {
  const { id } = useParams();
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

  return renderForm({ isEditMode, item, handleSubmit });
};

export default BaseItemUpsert;
