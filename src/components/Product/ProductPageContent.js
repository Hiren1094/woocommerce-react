import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import ADD_TO_CART from "../../mutations/add-to-cart";
import { v4 } from "uuid";

const formatDate = (date) => new Date(date).toLocaleDateString();

export default function ProductPageContent({ product }) {
    const { date, name, content, featuredImage, onSale, salePrice, price, regularPrice, databaseId } = product;
    const [qnty, setQnty] = useState(1);
    const [showViewCart, setShowViewCart] = useState(false);
    
    // Add to Cart Mutation.
    const productQtyInput = {
        clientMutationId: v4(), // Generate a unique id.
        productId: databaseId,
        quantity: qnty
    };

    const [
        addToCart,
        { data: addToCartRes,  loading: addToCartLoading, error: addToCartError },
    ] = useMutation(ADD_TO_CART, {
        variables: {
            input: productQtyInput,
        },
        onCompleted: () => {
            // If error.
            if (addToCartError) {
                alert(addToCartError.graphQLErrors[0].message);
            }

            // 2. Show View Cart Button
            setShowViewCart(true);
        },
        onError: (error) => {
            if (error) {
                alert(error.graphQLErrors[0].message);
            }
        },
    });
    // Add to cart.
    function handleAddToCartClick(){
        addToCart();
    }

    // Set Qnty.
    function HandleQnty(qnty){

        if (qnty < 1){
            qnty = 1;
        }

        setQnty(qnty);
    }

    return (
        <article>
            {featuredImage ? (
                <img
                    src={featuredImage.node.sourceUrl}
                    alt={featuredImage.node.altText}
                    style={{ width: "212px", marginTop: "10px"}}
                />
            ) : null}
            <h1>{name}</h1>
            <p className="post-meta">
                <span role="img" aria-label="writing hand">

                </span>
                {formatDate(date)} <br/><br/>
                <span>Price: {regularPrice}</span><br />
                {onSale &&
                    <span>
                        Sale Price: {salePrice}
                    </span>
                }
            </p>
            <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
            <button onClick={() => HandleQnty(qnty - 1)} style={{ cursor: "pointer", backgroundColor: "#fd746c" }}>-</button>
            &nbsp; {qnty} &nbsp;
            <button onClick={() => HandleQnty(qnty + 1)} style={{ cursor: "pointer", backgroundColor: "#fd746c" }}>+</button>
            &nbsp;&nbsp;
            <button onClick={handleAddToCartClick} style={{ cursor: "pointer", backgroundColor: "#fd746c"}}>
               Add To Cart
            </button>
            &nbsp;&nbsp;
            {/* Add To Cart Loading*/}
            {addToCartLoading ? (
                <p className="mt-2">Adding to Cart...</p>
            ) : (
                <p className="mt-2" style={{ color: "transparent" }}>
                    Adding to Cart...
                </p>
            )}
            {showViewCart ? (
                <Link to="/cart">
                    <button style={{ cursor: "pointer", backgroundColor: "#fd746c" }}>
                        View Cart
                    </button>
                </Link>
            ) : (
                ""
            )}
        </article>
    );
}
