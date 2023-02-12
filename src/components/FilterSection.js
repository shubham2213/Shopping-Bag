import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/Filtercontext";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../Helper/FormatPrice";
import { Button } from "../styles/Button";

const FilterSection = () => {
  const {
    filters: { text, category, color, price, maxPrice, minPrice },
    updateFiterSerchValue,
    all_products,
    clearFilters,
  } = useFilterContext();

  // to get the unique data to each product field

  const getUniqueData = (data, property) => {
    let newValue = data.map((CurrEle) => {
      return CurrEle[property];
    });

    // console.log(newValue);
    if (property === "colors") {
      return (newValue = ["all", ...new Set([].concat(...newValue))]);
    } else {
      return (newValue = ["all", ...new Set(newValue)]);
      // console.log(newValue);
    }
  };

  //  to get unique data
  const CategoryData = getUniqueData(all_products, "category");
  const CompanyData = getUniqueData(all_products, "company");
  // console.log(CompanyData);
  const ColorsData = getUniqueData(all_products, "colors");
  // console.log(ColorsData);

  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            value={text}
            onChange={updateFiterSerchValue}
            placeholder="SEARCH"
          />
        </form>
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {CategoryData.map((CurrEle, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={CurrEle}
                className={CurrEle === category ? "active" : ""}
                onClick={updateFiterSerchValue}
              >
                {CurrEle}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-company">
        <h3>Company</h3>

        <form action="#">
          <select
            name="company"
            id="company"
            className="filter-company--select"
            onClick={updateFiterSerchValue}
          >
            {CompanyData.map((currEle, index) => {
              return (
                <option key={index} value={currEle} name="company">
                  {currEle}
                </option>
              );
            })}
          </select>
        </form>
      </div>

      {/* <div className="filter-colors colors">
        <h3>Colors</h3>
        <div className="filter-color-style">
          {ColorsData.map((currColor, index) => {
            if (currColor === "all") {
              return (
                <button
                  key={index}
                  type="button"
                  value={currColor}
                  name="color"
                  className="color-all--style"
                  onClick={updateFiterSerchValue}
                >
                  All
                </button>
              );
            }
            return (
              <button
                key={index}
                type="button"
                value={currColor}
                name="color"
                style={{ backgroundColor: currColor }}
                className={
                  color === currColor ? "btnStyle active " : "btnStyle"
                }
                onClick={updateFiterSerchValue}
              >
                {color === currColor ? (
                  <FaCheck className="checkStyle" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div> */}

      <div className="filter_price">
        <h3>Price</h3>
        <p>
          <FormatPrice price={price} />
        </p>
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFiterSerchValue}
        />
      </div>

      <div className="filter-clear">
        <Button className="btn" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  h3 {
    padding: 2rem 0;
    font-size: bold;
  }
  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }
  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;
      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }
      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }
  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }
  .filter-color-style {
    display: flex;
    justify-content: center;
  }
  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }
  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;
export default FilterSection;
