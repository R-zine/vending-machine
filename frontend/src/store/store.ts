import { create } from "zustand";

interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  currency: { code: string; name: string; symbol: string };
  quantity: number;
}

interface IStore {
  appWidth: number;
  updateAppWidth: (newWidth: number) => void;
  isMenuOpen: boolean;
  toggleMenuOpen: () => void;
  products: IProduct[];
  APIState: { isLoading: boolean; isError: boolean };
  fetchProductData: () => void;
  balance: number;
  addBalance: (moneyToAdd: number) => void;
  clearBalance: () => void;
  buyProduct: (productId: string) => void;
  error: string;
  setError: (error: string) => void;
}

export const useStore = create<IStore>((set, get) => ({
  appWidth: window.innerWidth,
  updateAppWidth: (newWidth: number) => set({ appWidth: newWidth }),
  isMenuOpen: false,
  toggleMenuOpen: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  products: [],
  APIState: { isLoading: false, isError: false },
  fetchProductData: async () => {
    const response = await fetch("http://localhost:3000/");
    if (!response.ok) {
      set({ APIState: { isLoading: false, isError: true } });
      return;
    }
    const data = await response.json();
    set({ products: data });
  },
  balance: 0,
  addBalance: (moneyToAdd) =>
    set((state) => ({ balance: state.balance + moneyToAdd })),
  clearBalance: () => set({ balance: 0 }),
  buyProduct: (productId) => {
    const products = [...get().products];

    const productIndex = products.findIndex((p) => p.id === productId);

    if (!products[productIndex].quantity) {
      set({ error: "Out of stock!" });
      return;
    }

    products[productIndex] = {
      ...products[productIndex],
      quantity: products[productIndex].quantity - 1,
    };

    if (get().balance < products[productIndex].price) {
      set({ error: "Insufficient balance!" });
      return;
    }

    set((state) => ({
      balance: state.balance - products[productIndex].price,
      products: products,
    }));
  },
  error: "",
  setError: (error) => set({ error }),
}));
