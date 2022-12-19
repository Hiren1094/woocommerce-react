/**
* Get the updated items in the below format required for mutation input.
*
* [
* { "key": "33e75ff09dd601bbe6dd51039152189", "quantity": 1 },
* { "key": "02e74f10e0327ad868d38f2b4fdd6f0", "quantity": 1 },
* ]
*
* Creates an array in above format with the newQty (updated Qty ).
*
*/
const getUpdatedItems = (products, newQty, cartKey) => {
    // Create an empty array.
    const updatedItems = [];

    // Loop through the product array.
    products.map((cartItem) => {
        // If you find the cart key of the product user is trying to update, push the key and new qty.
        if (cartItem.cartKey === cartKey) {
            updatedItems.push({
                key: cartItem.cartKey,
                quantity: parseInt(newQty),
            });

            // Otherwise just push the existing qty without updating.
        } else {
            updatedItems.push({
                key: cartItem.cartKey,
                quantity: cartItem.qty,
            });
        }
        return null;
    });

    // Return the updatedItems array with new Qtys.
    return updatedItems;
}

export default getUpdatedItems;
