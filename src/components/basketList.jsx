export default function BasketList({order, cb, delcb, inccb, deccb, cbOrder}) {
    let sum = 0,
    list = order.length ? order.map(item => {
        sum += item.price * item.count;
        return <li key={item.id} className="collection-item">{item.name}: {item.count} шт. {item.price * item.count} Руб
        <span className="secondary-content">
            <button className="basket-count"><i onClick={() => inccb(item)} className="material-icons">exposure_plus_1</i></button>
            <button className="basket-count"><i onClick={() => deccb(item)} className="material-icons">exposure_neg_1</i></button>
            <i onClick={() => delcb(item.id)} className="material-icons basket-del">delete</i>
        </span></li>
    }) : <li className="collection-item">Пусто</li>;

    return (
        <ul className="collection basket-list">
            <li className="collection-item active">Корзина</li>
                {list}
            <li className="collection-item active">Общая стоимость: {sum} Руб</li>
            {!!order.length && <li className="collection-item"><button onClick={() => cbOrder({sum, order})} className="btn">Заказать</button></li>}
            <i onClick={cb} className="material-icons basket-close">close</i>
        </ul>
    )
}