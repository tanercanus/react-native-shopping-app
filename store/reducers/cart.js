import { ADD_TO_CART } from '../actions/cart';
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

        default:
            return state;
    }
}