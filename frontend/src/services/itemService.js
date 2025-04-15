const API_URL = "/api/items";

const itemService = {
  // 一覧取得
  getItems: async () => {
    const res = await fetch(API_URL);
    return res.json();
  },

  // アイテム追加
  addItem: async (newItem) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    return res.json();
  },

  // アイテム更新
  updateItem: async (id, updatedItem) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });
  },
};

export default itemService;
