import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/cart-items';

const initialState = {
    items: {},
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;

            let updatedOrNweCartItem;

            if (state.items[addedProduct.id]) {
                // alreadt have the item in the cart
                updatedOrNweCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice
                );
            } else {
                updatedOrNweCartItem = new CartItem(1, productPrice, productTitle, productPrice);
            }

            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNweCartItem },
                totalAmount: state.totalAmount + productPrice
            };

        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid];
            const currentQty = selectedCartItem.quantity;
            let updatedCartItems;
            if (currentQty > 1) {
                //need to reduce it, not erase it
                updatedCartItems = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                );

                updatedCartItems = { ...state.items, [action.pid]: updatedCartItems };

            } else {
                //erase
                updatedCartItems = { ...state.items };                
                delete updatedCartItems[action.pid];
            }
            let totalAmount = state.totalAmount - selectedCartItem.productPrice;
            if ( totalAmount < 0 ) {
                totalAmount = 0;
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: totalAmount
            };
        default:
            return state;
    }
}