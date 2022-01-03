import BasketMessage from "./messToBasket";
import React from "react";

export default function Cart({quantity = 0, cb = Function.prototype, mess, handleActive}) {

 React.useEffect(() => {
    const id = setTimeout(handleActive, 3000);
    return () => {
        clearTimeout(id);
    };
//eslint-disable-next-line
}, [mess.active]);



    return (
        <>
            <div onClick={cb} className="cart lime accent-2">
                <i className="material-icons">shopping_cart</i>
                {quantity ? <span className="cart-quantity">{quantity}</span> : null}
            </div>
            {mess.active && <BasketMessage name={mess.name}/>}
        </>              
    )
}