import { create } from 'zustand';

interface FiltersState {
  selectedIngredients: string[];
  priceRange: [number, number];
  isNew: boolean;
  isCustomizable: boolean;
  newItems: string[];
  weeklyItems: string[];
  setSelectedIngredients: (ingredients: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setIsNew: (isNew: boolean) => void;
  setIsCustomizable: (isCustomizable: boolean) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  selectedIngredients: [],
  priceRange: [0, 50],
  isNew: false,
  isCustomizable: false,
  newItems: [
    'Ирландский Капучино',
    'Пицца Халапеньё',
    'Острый Бургер 🌶️🌶️',
    'Молочный коктейль с печеньем Орео'
  ],
  weeklyItems: [
    'Пицца Пепперони',
    'Пицца Грибная',
    'Пицца 4 сезона'
  ],
  
  setSelectedIngredients: (ingredients) => set({ selectedIngredients: ingredients }),
  setPriceRange: (range) => set({ priceRange: range }),
  setIsNew: (isNew) => set({ isNew }),
  setIsCustomizable: (isCustomizable) => set({ isCustomizable }),
  resetFilters: () => set({
    selectedIngredients: [],
    priceRange: [0, 50],
    isNew: false,
    isCustomizable: false,
  }),
})); 