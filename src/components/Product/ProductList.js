import React, { useState, useEffect } from "react";
import ProductCart from "./ProductCart";
import { gql, useQuery } from "@apollo/client";
import Pagination from "react-js-pagination";

const GET_ALL_PRODUCT = gql`
    query getAllProduct{
        products{
            nodes {
                ... on SimpleProduct {
                    name
                    slug
                    featuredImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    salePrice
                    databaseId
                    regularPrice
                    onSale
                }
            }
        }
    }
`;

export default function ProductList() {

    const [activePage, setActivePage] = useState(1);
    const { loading, error, data } = useQuery(GET_ALL_PRODUCT);
    const [currentProducts, setCurrentProducts] = useState(null);
    const productsPerPage = 6;
    const pageRange = 10;
    
    useEffect(() => {
        if (data) {
            const activePage = 1;
            setActivePage(activePage);

            setProductsToBeDisplayed(
                activePage * productsPerPage
            );
        }
    }, [data?.products.nodes.length]);

    useEffect(() => {
        if (activePage){
            setProductsToBeDisplayed(activePage * productsPerPage);
        }
    }, [activePage]);

    const setProductsToBeDisplayed = (lastProductIndex) => {
        if (data){
            const indexOfLastProduct = lastProductIndex; // e.g. 6
            const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // e.g. 6-6 = 0 ( when product per page is 6 )

            const currentProductsData = data.products.nodes.slice(
                indexOfFirstProduct,
                indexOfLastProduct
            ); // e.g. products from index 0 to 6 ( 6 items ).
            setCurrentProducts(currentProductsData);
        }
    }

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    }

    if (loading) return <p>Loading products…</p>;
    if (error) return <p>Error : {error.message}</p>;

    if (null === currentProducts) {
        return <p>No matching product found.</p>;
    }

    return (
        <>
        <div className="posts-list">
            {currentProducts.map((product) => (
                <ProductCart key={product.databaseId} product={product} />
            ))}
        </div>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={productsPerPage}
                totalItemsCount={data?.products.nodes.length}
                pageRangeDisplayed={pageRange}
                onChange={handlePageChange}
                itemClass={"page-item"}
                linkClass={"page-link"}
                prevPageText={"Previous"}
                nextPageText={"Next"}
            />
        </>
    );
}
