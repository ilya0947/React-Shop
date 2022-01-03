import GoodsItem from "./goodsItem";

export default function GoodsList({goods = [], cb = Function.prototype}) {
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