const parseRecipeName = (content) => {
  const nameLine = content
    .split(/\r?\n/)
    .find((line) => line.startsWith("name:"));
  return nameLine ? nameLine.replace("name:", "").trim() : "";
};

const parseIngredients = (content) => {
  //start at the ingredients section and extract each line as an ingredient stoping at the next section
  //do not include the dash at the beginning of each ingredient line
  //it should be quantity followed by unit and then the ingredient name
  const ingredientsStart = content.indexOf("ingredients:");
  if (ingredientsStart === -1) return [];
  const ingredientsEnd = content.indexOf("instructions:");
  const ingredientsContent = content
    .substring(
      ingredientsStart + "ingredients:".length,
      ingredientsEnd !== -1 ? ingredientsEnd : undefined,
    )
    .split(/\r?\n/)
    .map((line) => line.replace(/^-/, "").trim())
    .filter((line) => line.length > 0);
  return ingredientsContent;
};

const parseInstructions = (content) => {
  const instructionsStart = content.indexOf("instructions:");
  if (instructionsStart === -1) return [];
  const instructionsContent = content
    .substring(instructionsStart + "instructions:".length)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  return instructionsContent;
};

const seperateIngrediants = (ingredientLine) => {
  const [quantity, unit, nameParts] = ingredientLine.split(" ");

  return { quantity, unit, name: nameParts };
};

export {
  parseRecipeName,
  parseIngredients,
  parseInstructions,
  seperateIngrediants,
};
