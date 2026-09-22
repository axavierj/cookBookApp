import db from "./db.js";

const seedRecipes = [
  {
    name: "Spaghetti Carbonara",
    createdAt: new Date(),
    ingredients: [
      { name: "Spaghetti", quantity: 1, unit: "lb" },
      { name: "Bacon", quantity: 8, unit: "oz" },
      { name: "Eggs", quantity: 4, unit: "" },
      { name: "Parmesan cheese", quantity: 1, unit: "cup" },
      { name: "Black pepper", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      "Cook the spaghetti according to the package directions.",
      "Cook the bacon in a large skillet until crispy.",
      "Whisk together the eggs, Parmesan cheese, and black pepper.",
      "Drain the pasta, reserving a cup of pasta water.",
      "Remove the skillet from the heat and add the pasta.",
      "Pour in the egg mixture and toss quickly until creamy.",
      "Add pasta water as needed to reach the desired consistency.",
      "Serve immediately.",
    ],
  },

  {
    name: "Chicken Parmesan",
    createdAt: new Date(),
    ingredients: [
      { name: "Chicken breasts", quantity: 2, unit: "" },
      { name: "Breadcrumbs", quantity: 1, unit: "cup" },
      { name: "Parmesan cheese", quantity: 1, unit: "cup" },
      { name: "Mozzarella cheese", quantity: 1, unit: "cup" },
      { name: "Marinara sauce", quantity: 2, unit: "cups" },
      { name: "Egg", quantity: 1, unit: "" },
    ],
    instructions: [
      "Preheat the oven to 400°F.",
      "Flatten the chicken breasts.",
      "Dip the chicken in beaten egg.",
      "Coat the chicken with breadcrumbs and Parmesan.",
      "Brown the chicken in a skillet.",
      "Place the chicken in a baking dish.",
      "Cover with marinara sauce and mozzarella.",
      "Bake for 20 minutes or until cooked through.",
      "Serve with pasta or a salad.",
    ],
  },

  {
    name: "Classic Pancakes",
    createdAt: new Date(),
    ingredients: [
      { name: "All-purpose flour", quantity: 2, unit: "cups" },
      { name: "Milk", quantity: 1.5, unit: "cups" },
      { name: "Eggs", quantity: 2, unit: "" },
      { name: "Butter", quantity: 4, unit: "tbsp" },
      { name: "Sugar", quantity: 2, unit: "tbsp" },
      { name: "Baking powder", quantity: 2, unit: "tsp" },
      { name: "Salt", quantity: 0.5, unit: "tsp" },
    ],
    instructions: [
      "Mix the flour, sugar, baking powder, and salt.",
      "Whisk together the milk, eggs, and melted butter.",
      "Combine the wet and dry ingredients.",
      "Heat a lightly buttered skillet over medium heat.",
      "Pour about 1/4 cup of batter into the skillet.",
      "Cook until bubbles form on the surface.",
      "Flip and cook until golden brown.",
      "Serve with butter and syrup.",
    ],
  },

  {
    name: "Beef Tacos",
    createdAt: new Date(),
    ingredients: [
      { name: "Ground beef", quantity: 1, unit: "lb" },
      { name: "Taco shells", quantity: 8, unit: "" },
      { name: "Cheddar cheese", quantity: 1, unit: "cup" },
      { name: "Lettuce", quantity: 1, unit: "cup" },
      { name: "Tomato", quantity: 1, unit: "" },
      { name: "Taco seasoning", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      "Brown the ground beef in a skillet.",
      "Drain excess grease.",
      "Add taco seasoning and water.",
      "Simmer for 5 minutes.",
      "Warm the taco shells.",
      "Fill each shell with beef.",
      "Top with lettuce, tomato, and cheese.",
      "Serve immediately.",
    ],
  },

  {
    name: "Grilled Chicken",
    createdAt: new Date(),
    ingredients: [
      { name: "Chicken breasts", quantity: 4, unit: "" },
      { name: "Olive oil", quantity: 2, unit: "tbsp" },
      { name: "Garlic", quantity: 2, unit: "cloves" },
      { name: "Lemon juice", quantity: 2, unit: "tbsp" },
      { name: "Salt", quantity: 1, unit: "tsp" },
      { name: "Black pepper", quantity: 0.5, unit: "tsp" },
    ],
    instructions: [
      "Combine olive oil, garlic, lemon juice, salt, and pepper.",
      "Coat the chicken with the marinade.",
      "Marinate for at least 30 minutes.",
      "Preheat the grill to medium-high heat.",
      "Grill the chicken for 5–7 minutes per side.",
      "Cook until the internal temperature reaches 165°F.",
      "Let the chicken rest before serving.",
    ],
  },

  {
    name: "Tomato Basil Soup",
    createdAt: new Date(),
    ingredients: [
      { name: "Tomatoes", quantity: 2, unit: "lbs" },
      { name: "Onion", quantity: 1, unit: "" },
      { name: "Garlic", quantity: 3, unit: "cloves" },
      { name: "Chicken broth", quantity: 4, unit: "cups" },
      { name: "Fresh basil", quantity: 0.5, unit: "cup" },
      { name: "Heavy cream", quantity: 0.5, unit: "cup" },
    ],
    instructions: [
      "Chop the tomatoes and onion.",
      "Sauté the onion and garlic until soft.",
      "Add the tomatoes and chicken broth.",
      "Simmer for 20 minutes.",
      "Blend until smooth.",
      "Return the soup to the pot.",
      "Stir in the basil and heavy cream.",
      "Season with salt and pepper.",
      "Serve hot.",
    ],
  },

  {
    name: "Garlic Butter Shrimp",
    createdAt: new Date(),
    ingredients: [
      { name: "Shrimp", quantity: 1, unit: "lb" },
      { name: "Butter", quantity: 4, unit: "tbsp" },
      { name: "Garlic", quantity: 4, unit: "cloves" },
      { name: "Lemon juice", quantity: 2, unit: "tbsp" },
      { name: "Parsley", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      "Melt the butter in a large skillet.",
      "Add the garlic and cook for 30 seconds.",
      "Add the shrimp.",
      "Cook for 2–3 minutes per side.",
      "Add the lemon juice and parsley.",
      "Toss everything together.",
      "Serve with rice or pasta.",
    ],
  },

  {
    name: "Classic Meatloaf",
    createdAt: new Date(),
    ingredients: [
      { name: "Ground beef", quantity: 2, unit: "lbs" },
      { name: "Breadcrumbs", quantity: 1, unit: "cup" },
      { name: "Eggs", quantity: 2, unit: "" },
      { name: "Onion", quantity: 1, unit: "" },
      { name: "Ketchup", quantity: 0.5, unit: "cup" },
      { name: "Worcestershire sauce", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      "Preheat the oven to 350°F.",
      "Dice the onion.",
      "Combine all ingredients except half of the ketchup.",
      "Shape the mixture into a loaf.",
      "Place in a baking dish.",
      "Spread the remaining ketchup over the top.",
      "Bake for about 60 minutes.",
      "Let rest for 10 minutes before slicing.",
    ],
  },

  {
    name: "Macaroni and Cheese",
    createdAt: new Date(),
    ingredients: [
      { name: "Elbow macaroni", quantity: 1, unit: "lb" },
      { name: "Cheddar cheese", quantity: 3, unit: "cups" },
      { name: "Milk", quantity: 2, unit: "cups" },
      { name: "Butter", quantity: 4, unit: "tbsp" },
      { name: "Flour", quantity: 4, unit: "tbsp" },
      { name: "Salt", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      "Cook the macaroni according to the package directions.",
      "Melt the butter in a saucepan.",
      "Whisk in the flour.",
      "Slowly add the milk while whisking.",
      "Cook until the sauce thickens.",
      "Add the cheese and stir until melted.",
      "Season with salt and pepper.",
      "Stir in the cooked macaroni.",
      "Serve hot.",
    ],
  },

  {
    name: "Chocolate Chip Cookies",
    createdAt: new Date(),
    ingredients: [
      { name: "All-purpose flour", quantity: 2.25, unit: "cups" },
      { name: "Butter", quantity: 1, unit: "cup" },
      { name: "Brown sugar", quantity: 1, unit: "cup" },
      { name: "White sugar", quantity: 0.5, unit: "cup" },
      { name: "Eggs", quantity: 2, unit: "" },
      { name: "Chocolate chips", quantity: 2, unit: "cups" },
      { name: "Vanilla extract", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      "Preheat the oven to 375°F.",
      "Cream together the butter and sugars.",
      "Beat in the eggs and vanilla.",
      "Gradually mix in the flour.",
      "Fold in the chocolate chips.",
      "Drop spoonfuls of dough onto a baking sheet.",
      "Bake for 9–11 minutes.",
      "Allow the cookies to cool before serving.",
    ],
  },
];

const seedDatabase = async () => {
  try {
    await db.recipes.bulkAdd(seedRecipes);
    console.log("Seed data added successfully.");
  } catch (error) {
    console.error("Failed to add seed data:", error);
  }
};

export default seedDatabase;
