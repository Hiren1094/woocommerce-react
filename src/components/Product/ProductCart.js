import React from "react";
import { Link } from "react-router-dom";

const formatDate = (date) => new Date(date).toLocaleDateString();

export default function ProductCart({ product }) {
    const {
        name,
        slug,
        featuredImage,
        salePrice,
        regularPrice,
        onSale
    } = product;
    
    return (
        <div className="post-card">
            <Link to={`/product/${slug}`}>
                {featuredImage ? (
                    <img
                        src={featuredImage.node.sourceUrl}
                        alt={featuredImage.node.altText}
                    />
                ) : null}
                
                    <h3>{name}</h3>
                <p className="post-meta">
                    <span>Price: {regularPrice} </span><br/>
                    {onSale &&
                        <span>
                            Sale Price: {salePrice}
                        </span>
                    }
                </p>
            </Link>
        </div>
    );
}
