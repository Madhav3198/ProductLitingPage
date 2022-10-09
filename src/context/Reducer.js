import React from "react";

const val=1;

export const cartReducer = (state, action) => {

    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state, cart: [...state.cart, {
                    ...action.payload,
                    qty: val
                   }]
            }
            case "REMOVE_FROM_CART":
                return {
                    ...state, cart: state.cart.filter((c) => c.id !== action.payload.id),
                }
                 case "CHANGE_CART_QTY": {
                        return {
                          ...state,
                          cart: state.cart.map((cart) => ({
                            ...cart,
                            qty: cart.id === action.payload.id ? action.payload.qty : cart.qty,
                          })),
                        };
                      };
                    default:
                        return state;
    }
}