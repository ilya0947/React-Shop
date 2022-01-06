export default function reducer(state, {type, payload}) {
    switch (type) {
        case 'SET_GOODS':
            return {
                ...state,
                goods: payload
            };
        case 'SET_LOADING':
            return {
               ...state,
               loading: !state.loading
            };
        case 'SET_ORDER':
            if (payload) {
                return {
                    ...state,
                    order: [...state.order, payload]
                };
            } else {
                return {
                    ...state,
                    order: [...state.order]
                };
            };
            
        case 'INCREMENT':
            return {
                ...state,
                order: state.order.map(el => {
                    if (el.id === payload.id) {
                        const newCount = el.count + 1;
                        return {
                            ...el,
                            count: newCount
                        };
                    } else {
                        return el;
                    }
                })
            };
        case 'DECREMENT':
                return {
                    ...state,
                    order: state.order.map(el => {
                        if (el.id === payload.id) {
                            const newCount = el.count > 1 ? el.count - 1 : el.count;
                            return {
                                ...el,
                                count: newCount
                            };
                        } else {
                            return el;
                        }
                    })
                };
        case 'DEL_FROM_BASKET':
            return {
               ...state,
              order: state.order.filter(el => el.id !== payload)
            };
        case 'SET_IS_BASKET_SHOW':
            return {
               ...state,
               isBasketShow: !state.isBasketShow
            };
        case 'SET_ADD_MESS':
            return {
               ...state,
               addMess: {active: true, name: payload}
            };
        case 'SET_ADD_ACTIVE':
            return {
               ...state,
               addMess: {active: false, name: ''}
            };
        case 'FLY_TO_BASKET': {
            const thisCard = payload.target.parentNode.parentNode,
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
             return {
                ...state
            };
        }
           
        default:
            return state;
    }
}