import React from "react";
import {API_KEY, API_URL} from '../config';
import BasketList from "./basketList";
import Cart from "./cart";
import GoodsList from "./goodsList";
import Preloader from "./preloader";

export default function Shop() {

    const [goods, setGoods] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [order, setOrder] = React.useState([]);
    const [isBasketShow, setIsBasketShow] = React.useState(false);
    const [addMess, setAddMess] = React.useState({active: false, name: ''});

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
        .finally(() => setLoading(false));
    }, []);

    const cardToBasket = (e) => {
        const thisCard = e.target.parentNode.parentNode,
           copyItem = thisCard.cloneNode(true),
           t = 300;
        thisCard.appendChild(copyItem);
        let cart = document.querySelector('.cart').getBoundingClientRect(),
            x = cart.x - thisCard.getBoundingClientRect().x - 100,
            y = document.documentElement.clientHeight - thisCard.getBoundingClientRect().bottom + cart.top + 50;
        copyItem.style.cssText = `
            position: absolute;
            transition: ${t}ms all ease;
            z-index: 10;
        `;

        copyItem.style.transform = `translate(${x}px, ${y}px) scale(.01)`;
            setTimeout(() => {
                copyItem.remove();
            }, t);
    };

    const addToBasket = (e, item) => {

        cardToBasket(e);

        setAddMess({active: true, name: item.name});

        const index = order.findIndex(orderItem => orderItem.id === item.id);
        
        if (index < 0) {
            let newItem = {
                ...item,
                count: 1
            };
            setOrder([...order, newItem]);
        } else {
            order.forEach(elem => {
                if (elem.id === item.id) {
                    elem.count = elem.count + 1;
                    setOrder([...order]);
                }
            });
        }
    };

    const delBasket = (itemId) => {
        setOrder(order.filter(el => el.id !== itemId));
    };

    const handleBasketShow = () => {
        setIsBasketShow(!isBasketShow);
    };

    const checkout = (obj) => {
        console.log(obj);
    };

    const increment = (item) => {
        item.count = item.count + 1;
        setOrder([...order]);
    };

    const decrement = (item) => {
        if (item.count > 1) {
            item.count = item.count - 1;
            setOrder([...order]);
        }
    };

    const handleActive = () => {
        setAddMess({active: false, name: ''});
    };

    return (
        <main className="container content">
            <Cart quantity={order.length} mess={addMess} handleActive={handleActive} cb={handleBasketShow}/>
            {loading ? <Preloader/> : <GoodsList cb={addToBasket} goods={goods}/>}
            {isBasketShow && <BasketList order={order} cbOrder={checkout} cb={handleBasketShow} deccb={decrement} inccb={increment} delcb={delBasket}/>}
        </main>
    )
}