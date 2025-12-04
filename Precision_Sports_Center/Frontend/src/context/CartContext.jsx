import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity = 1 } = action.payload;
      if (!product || !product.id) {
        return state;
      }

      const normalizedQuantity = Number(quantity) > 0 ? Number(quantity) : 1;
      const normalizedProduct = {
        id: product.id,
        title: product.title || product.name || "Product",
        price: Number(product.price) || 0,
        image: product.image || product.img || "/placeholder.svg",
        originalPrice: product.originalPrice ?? null,
        inStock: product.inStock ?? true,
      };

      const existing = state.items.find((item) => item.id === normalizedProduct.id);
      let nextItems;

      if (existing) {
        nextItems = state.items.map((item) =>
          item.id === normalizedProduct.id
            ? { ...item, quantity: item.quantity + normalizedQuantity }
            : item,
        );
      } else {
        nextItems = [...state.items, { ...normalizedProduct, quantity: normalizedQuantity }];
      }

      return { ...state, items: nextItems };
    }

    case "REMOVE_ITEM": {
      const { id } = action.payload;
      return { ...state, items: state.items.filter((item) => item.id !== id) };
    }

    case "CHANGE_QUANTITY": {
      const { id, delta } = action.payload;
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + delta } : item,
          )
          .filter((item) => item.quantity > 0),
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });

  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } });

  const changeItemQuantity = (id, delta) =>
    dispatch({ type: "CHANGE_QUANTITY", payload: { id, delta } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const { subtotal, totalItems } = useMemo(() => {
    const subtotalValue = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItemsValue = state.items.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal: subtotalValue, totalItems: totalItemsValue };
  }, [state.items]);

  const value = {
    items: state.items,
    addItem,
    removeItem,
    changeItemQuantity,
    clearCart,
    subtotal,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default CartProvider;
