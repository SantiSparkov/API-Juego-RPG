export interface RecipeMaterial {
  itemId: string;
  quantity: number;
}

export interface RecipeResult {
  itemId: string;
  quantity: number;
}

export interface Recipe {
  id: string;
  name: string;
  materials: RecipeMaterial[];
  result: RecipeResult;
  experienceGain: number;
}


