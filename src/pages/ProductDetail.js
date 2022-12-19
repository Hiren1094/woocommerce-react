import React from "react";
import { Link, useParams } from "react-router-dom";
import ProductPageContent from "../components/Product/ProductPageContent";
import { gql, useQuery } from "@apollo/client";

const GET_PRODUCT_BY_SLUG = gql`
    query getProductBySlug($id: ID!) {
        product(id: $id, idType: SLUG) {
            ... on SimpleProduct {
            databaseId
            name
            content
            date
            featuredImage {
                node {
                altText
                sourceUrl
                }
            }
            regularPrice
            price(format: RAW)
            salePrice
            onSale
            }
            
        }
    }
`;

export default function ProductPage(props) {
    let { slug } = useParams();

    const { loading, error, data } = useQuery(GET_PRODUCT_BY_SLUG, {
        variables: {
            id: slug
        }
    });
    
    const productFound = Boolean(data?.product);

    return (
        <div className="page-container">
            <Link to="/">← Home</Link>
            {loading ? (
                <p>Loading…</p>
            ) : error ? (
                <p>Error: {error.message}</p>
                ) : !productFound ? (
                <p>Product could not be found.</p>
            ) : (
                <ProductPageContent product={data.product} />
            )}
        </div>
    );
}