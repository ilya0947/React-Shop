import React from "react";

export default function GoodsItem({id, name, description, price, full_background, icon, cb}) {

    let img;
    
    let image = document.createElement('img');
    image.src = full_background;

    !image.width ? img = <img src={icon} alt={name}/> : img = <img src={full_background} alt={name}/>;

    return (
        <div className="card">
            <div className="card-image">
                {img}
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