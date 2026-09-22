const db = new Dexie("cookBookApp");

db.version(1).stores({
  recipes: "++id,name,ingredients,instructions",
});

export default db;
