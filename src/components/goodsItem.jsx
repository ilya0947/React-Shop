import React from "react";
// import { ShopContext } from "../context";


export default function GoodsItem({id, name, description, price, full_background, icon, cb}) {

    // const {example} = React.useContext(ShopContext);


    return (
        <div className="card">
            <div className="card-image">
                <img src={full_background === "https://media.fortniteapi.io/images/5a2ae270a641158746592cd5bdf27287/background_full.ru.png" ? icon : full_background} alt={name}/>
                
            </div>
            <div className="card-content">
                <span className="card-title">{name}</span>
                <p>{description}</p>
            </div>
            <div className="card-action">
               <button onClick={(e) => cb(e, {id, price, name})} className="btn">Купить</button>
               <span className="right">{price} Руб</span>
            </div>
        </div>
    )
}