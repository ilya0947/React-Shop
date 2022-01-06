import React from "react";
import reducer from "./reducer";

export const ShopContext = React.createContext();

const initialState = {
    goods: [],
    loading: true,
    order: [],
    isBasketShow: false,
    addMess: {active: false, name: ''}
};

export const ContextProvider = ({children}) => {

    const [value, dispatch] = React.useReducer(reducer, initialState);

    value.setGoods = (res) => {
        dispatch({type: 'SET_GOODS', payload: res});
    };

    value.setLoading = () => {
        dispatch({type: 'SET_LOADING'});
    };

    value.setOrder = (newItem = false) => {
        dispatch({type: 'SET_ORDER', payload: newItem});
    };

    value.increment = (item) => {
        dispatch({type: 'INCREMENT', payload: item});
    };

    value.decrement = (item) => {
        dispatch({type: 'DECREMENT', payload: item});
    };

    value.delFromBasket = (id) => {
        dispatch({type: 'DEL_FROM_BASKET', payload: id});
    };

    value.setIsBasketShow = () => {
        dispatch({type: 'SET_IS_BASKET_SHOW'});
    };

    value.setAddMess = (name = '') => {
        dispatch({type: 'SET_ADD_MESS', payload: name});
    };

    value.setAddActive = () => {
        dispatch({type: 'SET_ADD_ACTIVE'});
    };

    value.flyToBasket = (e) => {
        dispatch({type: 'FLY_TO_BASKET', payload: e});
    };

    return (
        <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
    );
};