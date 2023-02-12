const FilterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((currEle) => currEle.price);
      console.log(priceArr);

      // let maxPrice = priceArr.reduce((initialValue, curVal) => {
      //   return Math.max(initialValue, curVal);
      // }, 0);
      // console.log(maxPrice);

      const maxPrice = Math.max(...priceArr);
      console.log(maxPrice);

      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice },
      };

    case "SET_GRIDVIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LISTVIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "GET_SORT_VALUE":
      // let UserSortValue = document.getElementById("sort");
      // let SortValue = UserSortValue.options[UserSortValue.selectedIndex].value;
      // console.log(SortValue);
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "SORTING_PRODUCTS":
      let newSortData;
      // let tempSortProduct = [...action.payload];

      const { filter_products } = state;
      let tempSortProduct = [...filter_products];

      if (state.sorting_value === "lowest") {
        const SortingProducts = (a, b) => {
          return a.price - b.price;
        };

        newSortData = tempSortProduct.sort(SortingProducts);
      }

      if (state.sorting_value === "highest") {
        let SortingProducts = (a, b) => {
          return b.price - a.price;
        };

        newSortData = tempSortProduct.sort(SortingProducts);
      }

      if (state.sorting_value === "a-z") {
        newSortData = tempSortProduct.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }

      if (state.sorting_value === "z-a") {
        newSortData = tempSortProduct.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return {
        ...state,
        filter_products: newSortData,
      };

    case "UPDATE_FILTER_SEARCH_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_SEARCH_PRODUCTS":
      let { all_products } = state;
      let tempFilterProduct = [...all_products];

      const { text, category, company, color, price } = state.filters;

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((currEle) => {
          return currEle.name.toLowerCase().includes(text);
        });
      }

      // if (category !== "all") {
      //   tempFilterProduct = tempFilterProduct.filter((currEle) => {
      //     return currEle.category === category;
      //   });
      // }

      // if (company !== "all" ) {
      //   tempFilterProduct = tempFilterProduct.filter((currEle) => {
      //     return currEle.company.toLowerCase() === company.toLowerCase()
      //   });
      // }

      if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.category === category
        );
      }

      if (company !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.company.toLowerCase() === company.toLowerCase()
        );
      }

      // if (color !== "all") {
      //   tempFilterProduct = tempFilterProduct.filter((curElem) =>
      //     curElem.colors.includes(color)
      //   );
      // }

      if (price === 0) {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price == price
        );
      } else {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price <= price
        );
      }

      return {
        ...state,
        filter_products: tempFilterProduct,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          text: "",
          category: "all",
          company: "all",
          price: state.filters.maxPrice,
          maxPrice: state.filters.maxPrice,
          minPrice: state.filters.maxPrice,
        },
      };

    default:
      return state;
  }
};

export default FilterReducer;
