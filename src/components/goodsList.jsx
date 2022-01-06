import GoodsItem from "./goodsItem";
import React from "react";
import { ShopContext } from "../context";

export default function GoodsList({cb = Function.prototype}) {

    const {goods = []} = React.useContext(ShopContext);

    if (!goods.length) {
        return <h3>Не получилось загрузить карточки товаров</h3>
    }

    return (
       <div className="goods">
           {goods.map(item => (
                <GoodsItem key={item.id} cb={cb} {...item}/>
            ))}
       </div>
    )
}