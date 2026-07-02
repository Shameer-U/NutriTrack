import AsyncStorage from '@react-native-async-storage/async-storage';

export type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: string;
  updatedAt?: string;
};

const MEALS_KEY = 'meals';

export const getMeals = async (): Promise<Meal[]> => {
  const data = await AsyncStorage.getItem(MEALS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addMeal = async (
  meal: Omit<Meal, 'id' | 'createdAt'>,
): Promise<Meal> => {
  const meals = await getMeals();
  const newMeal: Meal = {
    ...meal,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify([newMeal, ...meals]));
  return newMeal;
};

export const deleteMeal = async (id: string): Promise<void> => {
  const meals = await getMeals();
  const filtered = meals.filter((meal) => meal.id !== id);
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(filtered));
};

export const clearAllMeals = async (): Promise<void> => {
  await AsyncStorage.removeItem(MEALS_KEY);
};

export const getMeal = async (id: string): Promise<Meal> => {
  const meals = await getMeals();
  const filtered = meals.filter((meal) => meal.id === id);
  return filtered[0] ?? [];
} 

export const updateMeal =  async (editedMeal: Omit<Meal, 'createdAt'>): Promise<void> => {
   const meals = await getMeals();
   const editedMealIndex = meals.findIndex((meal) => meal.id === editedMeal.id);
   const updatedMeal = {
    ...meals[editedMealIndex],
    ...editedMeal,
    updatedAt: new Date().toISOString()
   }
   meals[editedMealIndex] = updatedMeal;
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(meals));
}