import BasketMessage from "./messToBasket";
import React from "react";
import { ShopContext } from "../context";

export default function Cart() {

    const {setIsBasketShow, setAddActive, order, addMess} = React.useContext(ShopContext);

    const time = 3000;

    React.useEffect(() => {
        const id = setTimeout(setAddActive, time);
        return () => {
            clearTimeout(id);
        };
    //eslint-disable-next-line
    }, [addMess.active]);



    return (
        <>
            <div onClick={setIsBasketShow} className="cart lime accent-2">
                <i className="material-icons">shopping_cart</i>
                {order.length ? <span className="cart-quantity">{order.length}</span> : null}
            </div>
            {addMess.active && <BasketMessage t={time} name={addMess.name}/>}
        </>              
    )
}