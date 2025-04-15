import { Link } from "react-router-dom";
import useItems from "../hooks/useItems";

const ItemsList = () => {
  const { items } = useItems();

  return (
    <div>
      <h2>アイテム一覧</h2>
      <Link to="/items/upsert">＋ 追加</Link>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} <Link to={`/items/upsert/${item.id}`}>編集</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
