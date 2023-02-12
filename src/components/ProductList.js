import React from "react";
import { useFilterContext } from "../context/Filtercontext";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filter_products, grid_view } = useFilterContext();
  // console.log("ProductList",filter_products);

  if (grid_view) {
    return <GridView products={filter_products} />;
  }
   if (grid_view === false  ) {
     return <ListView products={filter_products}/>
  }
};

export default ProductList;
