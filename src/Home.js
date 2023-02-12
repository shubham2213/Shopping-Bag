import React from "react";
import FeatureProduct from "./components/FeatureProduct";
import Herosection from "./components/Herosection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";

const Home = () => {
  const data = {
    name: "Shopping Bag",
  };

  return (
    <>
      <Herosection myData={data} />;
      <FeatureProduct/>
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
