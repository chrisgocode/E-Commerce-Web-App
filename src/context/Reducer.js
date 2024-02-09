import { createContext, useReducer, useContext } from 'react';

// Define the initial state of the application
const initialState = {
  basket: [], // to contain shopping basket details
  user: null, // to contain details of the logged in user
};

// Helper function to calculate the total amount in the basket
const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

// Actions
const ACTIONS = {
  ADD_TO_BASKET: 'ADD_TO_BASKET',
  REMOVE_FROM_BASKET: 'REMOVE_FROM_BASKET',
  SET_USER: 'SET_USER',
  // Define other actions as needed
};

// Create a context for the global state
export const GlobalContext = createContext();

// Reducer function to handle actions
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_BASKET:
      // Logic to add item to basket
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case ACTIONS.REMOVE_FROM_BASKET:
      // Logic to remove item from basket
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      }
      return {
        ...state,
        basket: newBasket,
      };
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
export { initialState, reducer, ACTIONS, getBasketTotal };