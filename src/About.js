import React from "react";
import Herosection from "./components/Herosection";
// import { useProductContext } from "./context/Productcontext";

const About = () => {
  // const { myName } = useProductContext();

  const data = {
    name: "Shopping Ecommerce",
  };
  return (
    <>
      {/* {myName} */}
      <Herosection myData={data} />;
    </>
  );
};

export default About;
