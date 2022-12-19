import React, { useState, useContext, useEffect } from "react";
import Billing from "./billing";
import { v4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";
import GET_CART from "../../query/get-cart";
import CHECKOUT_MUTATION from "../../mutations/checkout";
import validateAndSanitizeCheckoutForm from "./validator/checkout";
import { isEmpty } from "lodash";
import OrderSuccess from "./OrderSuccess";
import YourOrder from "./YourOrder";
import PaymentModes from "./PaymentModes";

const CheckoutForm = () => {
    const initialState = {
        firstName: '',
        lastName: '',
        company: '',
        country: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        postcode: '',
        phone: '',
        email: '',
        createAccount: false,
        username: '',
        password: '',
        customerNote: '',
        paymentMethod: '',
        errors: null
    };

    // Use this for testing purposes, so you dont have to fill the checkout form over an over again.
    /* const initialState = {
      firstName: "Hiren",
      lastName: "Sanja",
      address1: "109 Hills Road Valley",
      address2: "Station Road",
      city: "Pune",
      state: "Maharastra",
      country: "IN",
      postcode: "400298",
      phone: "9959338989",
      email: "hiren.sanja@creolestudios.com",
      company: "Tech",
      createAccount: false,
        username: '',
        password: '',
      customerNote: "My Order notes",
      paymentMethod: "cod",
      errors: null,
     } */
    // Set state.
    const [cart, setCart] = useState(null);
    const [input, setInput] = useState(initialState);
    const [orderData, setOrderData] = useState(null);
    const [requestError, setRequestError] = useState(null);

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
    }

    /**
     * Returns cart data in the required format.
     * @param {String} data Cart data
     */
    const getFormattedCart = (data) => {
        let formattedCart = null;

        if (undefined === data || !data?.cart?.contents?.nodes?.length) {
            return formattedCart;
        }

        const givenProducts = data.cart.contents.nodes;

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
        formattedCart.totalProductsPrice = data.cart.total;

        return formattedCart;
    }

    // Create checkout Data.
    const createCheckoutData = (order) => {
        const checkoutData = {
            clientMutationId: v4(),
            billing: {
                firstName: order.firstName,
                lastName: order.lastName,
                address1: order.address1,
                address2: order.address2,
                city: order.city,
                country: order.country,
                state: order.state,
                postcode: order.postcode,
                email: order.email,
                phone: order.phone,
                company: order.company,
            },
            shipping: {
                firstName: order.firstName,
                lastName: order.lastName,
                address1: order.address1,
                address2: order.address2,
                city: order.city,
                country: order.country,
                state: order.state,
                postcode: order.postcode,
                email: order.email,
                phone: order.phone,
                company: order.company,
            },
            shipToDifferentAddress: true,
            paymentMethod: order.paymentMethod,
            isPaid: true,
            transactionId: v4(),
            customerNote: order.customerNote,
        };

        if (order.createAccount) {
            checkoutData.account = {
                username: order.username,
                password: order.password,
            };
        }

        return checkoutData;
    }
    // Get Cart Data.
    const { loading: carDetails, error, data, refetch } = useQuery(GET_CART, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            // console.warn( 'completed GET_CART' );

            // Update cart in the localStorage.
            const updatedCart = getFormattedCart(data);
            
            // Update cart data in React Context.
            setCart(updatedCart);
        },
    });

    // Checkout or CreateOrder Mutation.
    const [
        checkout,
        { data: checkoutResponse, loading: checkoutLoading },
    ] = useMutation(CHECKOUT_MUTATION, {
        variables: {
            input: orderData,
        },
        onCompleted: () => {
            // console.warn( 'completed CHECKOUT_MUTATION' );
            refetch();
        },
        onError: (error) => {
            if (error) {
                setRequestError(error.graphQLErrors[0].message);
            }
        },
    });

    /*
     * Handle form submit.
     *
     * @param {Object} event Event Object.
     *
     * @return {void}
     */
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const result = validateAndSanitizeCheckoutForm(input);
        if (!result.isValid) {
            setInput({ ...input, errors: result.errors });
            return;
        }
        const checkOutData = createCheckoutData(input);
        setOrderData(checkOutData);
        setRequestError(null);
    };

    /*
     * Handle onchange input.
     *
     * @param {Object} event Event Object.
     *
     * @return {void}
     */
    const handleOnChange = (event) => {
        if ("createAccount" === event.target.name) {
            const newState = { ...input, [event.target.name]: !input.createAccount };
            setInput(newState);
        } else {
            const newState = { ...input, [event.target.name]: event.target.value };
            setInput(newState);
        }
    };

    useEffect(() => {
        if (null !== orderData) {
            // Call the checkout mutation when the value for orderData changes/updates.
            /* eslint-disable */
            checkout();
        }
    }, [orderData]);
    
    if (carDetails) return 'Loading...';

    return (
        <>
            {cart ? (
                <form onSubmit={handleFormSubmit} className="woo-next-checkout-form">
                    <h2 className="mb-4">Billing Details</h2>
                            <table className="billing">
                                <tbody>
                                    {/*Billing Details*/}
                                    <Billing input={input} handleOnChange={handleOnChange} />
                                </tbody>
                            </table>
                            {/* Order & Payments*/}
                            <div className="col-lg-6">
                                {/*	Order*/}
                                <h2 className="mb-4">Your Order</h2>
                                <YourOrder cart={cart} />

                                {/*Payment*/}
                                <h2 className="mb-4">Payment Method</h2>
                                <PaymentModes input={input} handleOnChange={handleOnChange} />
                                <div className="woo-next-place-order-btn-wrap mt-5">
                                    <br/>
                                    <button
                                        className="woo-next-large-black-btn woo-next-place-order-btn btn btn-dark"
                                        style={{ cursor: "pointer", backgroundColor: 'rgb(253, 116, 108)' }}
                                        type="submit"
                                    >
                                        Place Order
                                    </button>
                                </div>

                                {/* Checkout Loading*/}
                                {checkoutLoading && <p>Processing Order...</p>}
                                {requestError && <CheckoutError requestError={requestError} />}
                            </div>
                </form>
            ) : (
                "No order found."
            )}

            {/*Show message if Order Success*/}
            <OrderSuccess response={checkoutResponse} />
        </>
    );
};

export default CheckoutForm;
