import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import GET_CART from "../../query/get-cart";
import UPDATE_CART from "../../mutations/update-cart";
import REMOVE_CART from "../../mutations/remove-cart";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { CartItem } from "./CartItem";
import { v4 } from "uuid";

const Cart = () => {
    
    const [cart, setCart] = useState(null);
    const [requestError, setRequestError] = useState(null);
    const [BtnDisabled, setdisabled] = useState(null);
    const [updateCart, setupdateCart] = useState([]);
    /**
     * Extracts and returns float value from a string.
     *
     * @param {string} string String
     * @return {any}
     */
    const getFloatVal = (string) => {
        let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];
        return null !== floatValue
            ? parseFloat(parseFloat(floatValue).toFixed(2))
            : "";
    };

    /**
     * Returns cart data in the required format.
     * @param {String} data Cart data
    */
    const getFormattedCart = (CartData) => {
        let formattedCart = null;

        if (undefined === CartData || !CartData?.cart?.contents?.nodes?.length) {
            return formattedCart;
        }

        const givenProducts = CartData.cart.contents.nodes;
        
        // Create an empty object.
        formattedCart = {};
        formattedCart.products = [];
        let totalProductsCount = 0;

        for (let i = 0; i < givenProducts.length; i++) {
            const givenProduct = givenProducts[i].product;
            const product = {};
            const total = getFloatVal(givenProducts[i].total);
            
            product.productId = givenProduct?.node?.databaseId;
            product.cartKey = givenProducts[i].key;
            product.name = givenProduct?.node?.name;
            product.qty = givenProducts[i].quantity;
            product.price = total / product.qty;
            product.totalPrice = givenProducts[i].total;
            product.slug = givenProduct.node.slug;
            
            // Ensure we can add products without images to the cart
            !isEmpty(givenProduct?.node?.image)
                ? (product.image = {
                    sourceUrl: givenProduct?.node?.image.sourceUrl,
                    srcSet: givenProduct?.node?.image.srcSet,
                    title: givenProduct?.node?.image.title,
                })
                : (product.image = {
                    sourceUrl: "https://via.placeholder.com/434",
                    srcSet: "https://via.placeholder.com/434",
                    title: givenProduct?.node?.name,
                });

            totalProductsCount += givenProducts[i].quantity;

            // Push each item into the products array.
            formattedCart.products.push(product);
        }

        formattedCart.totalProductsCount = totalProductsCount;
        formattedCart.totalProductsPrice = CartData.cart.total;

        return formattedCart;
    };
    // Get Cart Data.
    const { loading: carDetails, error, data, refetch } = useQuery(GET_CART, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            // Update cart in the localStorage.
            const updatedCart = getFormattedCart(data);
            // Update cart data in React Context.
            setCart(updatedCart);
        },
    });

    // Update Cart Mutation.
    const [updateCartMutation, { loading: updateCartProcessing }] = useMutation(
        UPDATE_CART,
        {
            onCompleted: () => {
                refetch();
            },
            onError: (error) => {
                if (error) {
                    setRequestError(error.graphQLErrors[0].message);
                }
            },
        }
    );

    // Update Cart Mutation.
    const handleUpdateCart = (event) => {

        updateCartMutation({
            variables: {
                input: {
                    clientMutationId: v4(),
                    items: updateCart
                }
            },
        });
        
    };

    // Remove Cart Mutation.
    const [removeCartMutation, { loading: removeCartProcessing }] = useMutation(
        REMOVE_CART,
        {
            onCompleted: () => {
                refetch();
            },
            onError: (error) => {
                if (error) {
                    setRequestError(error.graphQLErrors[0].message);
                }
            },
        }
    );
    
    // Handle remove item click.
    const handleRemoveProductClick = (event, cartKey, products) => {
        
        if (products.length) {
            
            removeCartMutation({
                variables: {
                    input: {
                        clientMutationId: v4(),
                        keys: cartKey,
                        all: false
                    }
                },
            });
        }
    }
    
    if (removeCartProcessing) return 'Loading...';
    if (updateCartProcessing) return 'Loading...';
    if (carDetails) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    
    return (
        <div className="content-wrap-cart">
            {cart ? (
                <div className="container woo-next-cart-wrapper">
                    <h1 className="mt-5 woo-next-cart-heading">Cart</h1>
                    <div className="woo-next-cart-table-row row">
                        <div>
                            <table style={{ width: "100%", textAlign:"left"}}>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                    {cart.products.length &&
                                        cart.products.map((item) => (
                                            <CartItem
                                                key={item.productId}
                                                item={item}
                                                products={cart.products}
                                                setdisabled={setdisabled}
                                                setupdateCart={setupdateCart}
                                                handleRemoveProductClick={handleRemoveProductClick}
                                            />
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        {/*Update Cart*/}
                        <div style={{ float: "right", marginTop: "10px" }}>
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr className="table-light">
                                        <td className="woo-next-cart-element-total">
                                            <button onClick={(event) => handleUpdateCart(event)} className="update-cart" disabled={!BtnDisabled}>
                                                Update Cart
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>            

                        {/* Display Errors if any */}
                        {requestError ? (
                            <div style={{ color: "red", marginTop: "18px" }}>
                                {" "}
                                {requestError}{" "}
                            </div>
                        ) : (
                            ""
                        )}
                       
                        {/*Cart Total*/}
                        <div style={{ marginTop: "65px" }}>
                            <h2>Cart Total</h2>
                            <table style={{width:"100%"}}>
                                <tbody>
                                    <tr className="table-light">
                                        <td className="woo-next-cart-element-total">Subtotal</td>
                                        <td className="woo-next-cart-element-amt">
                                            {"string" !== typeof cart.totalProductsPrice
                                                ? cart.totalProductsPrice.toFixed(2)
                                                : cart.totalProductsPrice}
                                        </td>
                                    </tr>
                                    <tr className="table-light">
                                        <td className="woo-next-cart-element-total">Total</td>
                                        <td className="woo-next-cart-element-amt">
                                            {"string" !== typeof cart.totalProductsPrice
                                                ? cart.totalProductsPrice.toFixed(2)
                                                : cart.totalProductsPrice}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Link to="/checkout">
                                <button style={{ cursor: "pointer", backgroundColor: "rgb(253, 116, 108)" }}>
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container mt-5" style={{ height: '72vh' }}>
                    <h2>No items in the cart</h2>
                    <Link to="/">
                        <button className="btn btn-secondary woo-next-large-black-btn">
                            Add New Products
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
export default Cart;