import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CartAmountToggle from "./CartAmountToggle";
import {Button } from '../styles/Button'
import { useCartContext } from "../context/cartcontext";

const AddToCart = ({ product }) => {

  const {addToCart} = useCartContext()

  const { id, colors, stock } = product;

  const [color, setcolor] = useState(colors[0]);
  const [amount, setamount] = useState(1)

  const setDecrease =() =>{
    amount > 1 ? setamount(amount -1 ) :setamount(1)
  }
  const setIncrease =() =>{
    amount < stock? setamount(amount +1 ) :setamount(stock)
  }

  return (
    <Wrapper>
      <div className="colors">
        <p>
          Colors:
          {colors.map((currEle, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: currEle }}
                className={color === currEle ? "btnStyle active" : "btnStyle"}
                onClick={() => setcolor(currEle)}
              >
                {color === currEle ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </p>
      </div>

      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />

      <NavLink to="/cart"
      onClick={(()=> addToCart(id,color,amount,product))}
      >
        <Button className="btn">Add to Cart</Button>
      </NavLink>

    </Wrapper>
  );
};

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;
    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }
    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;
export default AddToCart;
