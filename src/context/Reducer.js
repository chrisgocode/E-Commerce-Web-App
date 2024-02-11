import { createContext, useReducer, useContext } from 'react';

// Define the initial state of the application
const initialState = {
  basket: [], // to contain shopping basket details
  user: null, // to contain details of the logged in user
};

// Helper function calculate total items in basket
const getTotalItems = (basket) => 
  basket.reduce((total, currentItem) => total + currentItem.quantity, 0);


// Helper function to calculate the total amount in the basket
const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);

// Actions
const ACTIONS = {
  ADD_TO_BASKET: 'ADD_TO_BASKET',
  REMOVE_FROM_BASKET: 'REMOVE_FROM_BASKET',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  SET_USER: 'SET_USER',
  // Define other actions as needed
};

// Create a context for the global state
export const GlobalContext = createContext();

// Reducer function to handle actions
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_BASKET:
      // Check if the item is already in the basket
      const existingIndex = state.basket.findIndex(
        (basketItem) => basketItem.id === action.item.id
      );

      let updatedBasket = [...state.basket];

      if (existingIndex >= 0) {
        // Item exists, update its quantity
        const existingItem = updatedBasket[existingIndex];
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
        updatedBasket[existingIndex] = updatedItem;
      } else {
        // Item not in basket, add it with a quantity of 1
        const newItem = { ...action.item, quantity: 1 };
        updatedBasket = [...state.basket, newItem];
      }
      return {
        ...state,
        basket: updatedBasket,
      };
      case ACTIONS.REMOVE_FROM_BASKET:
        // Filter out the item with the given id
        const newBasketAfterRemoval = state.basket.filter(item => item.id !== action.id);
        return {
          ...state,
          basket: newBasketAfterRemoval,
        };

        case ACTIONS.UPDATE_QUANTITY:
          const indexToUpdate = state.basket.findIndex(
            (basketItem) => basketItem.id === action.id
          );
          if (indexToUpdate >= 0) {
            const newBasket = [...state.basket];
            newBasket[indexToUpdate] = {
              ...newBasket[indexToUpdate],
              quantity: action.quantity,
            };
            return {
              ...state,
              basket: newBasket,
            };
          }
          return state;

    case ACTIONS.SET_USER:
      // Logic to set the user
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

// Custom hook to use the global state context
export const useGlobalContext = () => useContext(GlobalContext);

// Provider component to wrap the app and provide the global state
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // The value prop is where we define what values that are accessible to consumer components
  const value = { state, dispatch, getBasketTotal };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

// Export the reducer and ACTIONS for use in components
export { initialState, reducer, ACTIONS, getBasketTotal, getTotalItems };