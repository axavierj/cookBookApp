const db = new Dexie("cookBookApp");

db.version(4).stores({
  recipes: "++id,name,ingredients,instructions,createdAt",
});

export default db;
