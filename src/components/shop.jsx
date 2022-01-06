import React from "react";
import {API_KEY, API_URL} from '../config';
import BasketList from "./basketList";
import Cart from "./cart";
import GoodsList from "./goodsList";
import Preloader from "./preloader";
import { ShopContext } from "../context";

export default function Shop() {

    const {setGoods, loading, setLoading, order, setOrder, isBasketShow, setAddMess} = React.useContext(ShopContext);

    React.useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY
            }
        })
        .then(res => res.json())
        .then(res => {
            res.featured && setGoods(res.featured);
        })
        .catch(() => alert("error"))
        .finally(() => setLoading());
    //eslint-disable-next-line
    }, []);

    const flyToBasket = (e) => {
        const thisCard = e.target.parentNode.parentNode,
           copyItem = thisCard.cloneNode(true),
           t = 300;
        thisCard.appendChild(copyItem);
        let cart = document.querySelector('.cart').getBoundingClientRect(),
            x = cart.left - thisCard.getBoundingClientRect().left - 100,
            y = cart.bottom - thisCard.getBoundingClientRect().bottom + 650;

        copyItem.style.cssText = `
            position: absolute;
            transition: ${t}ms all ease;
            z-index: 10;
        `;

        copyItem.style.transform = `translate(${x}px, ${y}px) scale(.1)`;
        setTimeout(() => {
            copyItem.remove();
        }, t);
    };

    const addToBasket = (e, item) => {

        flyToBasket(e);

        setAddMess(item.name);

        const index = order.findIndex(orderItem => orderItem.id === item.id);
        
        if (index < 0) {
            let newItem = {
                ...item,
                count: 1
            };
            setOrder(newItem);
        } else {
            order.forEach(elem => {
                if (elem.id === item.id) {
                    elem.count = elem.count + 1;
                    setOrder();
                }
            });
        }
    };

    const checkout = (obj) => {
        console.log(obj);
    };

    return (
        <main className="container content">
            <Cart/>
            {loading ? <Preloader/> : <GoodsList cb={addToBasket}/>}
            {isBasketShow && <BasketList cbOrder={checkout}/>}
        </main>
    )
}