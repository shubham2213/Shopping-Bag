import { createContext, useEffect } from "react";
import { useContext, useReducer } from "react";
import { useProductContext } from "./Productcontext";
import reducer from "../Reducer/FilterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "highest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    // colors: "all",
    price: 0,
    maxPrice: 0,
    minPrice: 0,
  },
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  // console.log("filtercontext", products);

  // grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRIDVIEW" });
  };

  // List view
  const setListView = () => {
    return dispatch({ type: "SET_LISTVIEW" });
  };

  // Sorting Function
  const Sorting = (event) => {
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };

  //update the fiter search Value

  const updateFiterSerchValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    return dispatch({
      type: "UPDATE_FILTER_SEARCH_VALUE",
      payload: { name, value },
    });
  };

  //to clear the filters
  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  // to sort the products
  useEffect(() => {
    dispatch({ type: "FILTER_SEARCH_PRODUCTS" });
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [state.sorting_value, state.filters]);

  // load the products for views
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        Sorting,
        updateFiterSerchValue,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
