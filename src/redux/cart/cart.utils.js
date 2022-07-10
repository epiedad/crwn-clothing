export const addItemsToCart = (cartItems, itemToAdd) => {
    const isItemExist = cartItems.find(
        item => item.id === itemToAdd.id
    );

    if (isItemExist) {
        return cartItems.map(cartItem => 
            cartItem.id === itemToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1 }
            : { cartItem }
        )
    }
    return [...cartItems, {...itemToAdd, quantity: 1 }];
};