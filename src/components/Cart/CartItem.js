import React, { useState } from 'react';
import isEmpty from "validator/es/lib/isEmpty";
import getUpdatedItems from "./getUpdatedItems";
import { Link } from "react-router-dom";

export const CartItem = ({ uniquekey, item, products, setdisabled, setupdateCart, handleRemoveProductClick, setloadingQnty }) => {
    
    const [productCount, setProductCount] = useState(item.qty);
    const [changeQnty, setchangeQnty] = useState(null);

    /*
     * When user changes the qty from product input update the cart in localStorage
     * Also update the cart in global context
     *
     * @param {Object} event event
     *
     * @return {void}
     */
    const handleQtyChange = (event, cartKey, type) => {

        event.stopPropagation();
        let newQty;

        // If the previous update cart mutation request is still processing, then return.
        if ('decrement' === type && 1 === productCount) {
            return;
        }

        if (!isEmpty(type)) {
            newQty = 'increment' === type ? productCount + 1 : productCount - 1;
        } else {
            // If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
            newQty = (event.target.value) ? parseInt(event.target.value) : 1;
        }
        
        // Set the new qty in state.
        setProductCount(newQty);
        
        // Update cart details.
        if (products.length) {

            const updatedItems = getUpdatedItems(products, newQty, cartKey);
            // Enable disabled btn.
            setdisabled(true);

            // Update Cart.
            setupdateCart(updatedItems);
        }

        setchangeQnty(true);
    }
    
    
    return (
        <tr>
            <td style={{ width: "6%" }}>
                <button className="cart-remove-item" onClick={(event) => handleRemoveProductClick(event, item.cartKey, products)}>
                    x
                </button>
            </td>
            <td style={{ width: "24%" }}>
                <img
                    style={{ width: "75%" }}
                    alt={item.image.title}
                    src={!isEmpty(item.image.sourceUrl) ? item.image.sourceUrl : ''} // use normal <img> attributes as props
                />
            </td>

            <td style={{ width: "30%" }}>
                <Link to={`/product/${item.slug}`}><span>{item.name}</span></Link>
            </td>
            <td style={{ width: "24%" }}>
                <span className="cart-product-price">{('string' !== typeof item.price) ? item.price.toFixed(2) : item.price}</span>
            </td>
            <td style={{ width: "24%" }}>
                <button style={{ cursor: "pointer", backgroundColor: "rgb(253, 116, 108)" }} onClick={(event) => handleQtyChange(event, item.cartKey, 'decrement')} >-</button>
                &nbsp;{(!changeQnty) ? item.qty : productCount}&nbsp;
                <button style={{ cursor: "pointer", backgroundColor: "rgb(253, 116, 108)" }} onClick={(event) => handleQtyChange(event, item.cartKey, 'increment')}>+</button>
            </td>
            <td>
                <span className="cart-total-price"> {('string' !== typeof item.totalPrice) ? item.totalPrice.toFixed(2) : item.totalPrice}</span>
            </td>
            
        </tr>
    )
}

