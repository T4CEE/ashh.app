

export interface CartItem {
    id: number;
    title: string;
    description?: string;
    price: number;
    image: string;
    quantity: number;
  }
  
  export interface RootState {
    cart: {
      cart: CartItem[];
    };
  }
  