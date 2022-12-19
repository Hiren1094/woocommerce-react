import { gql } from "@apollo/client";

/**
 * Remove Cart
 *
 * This query is used for both updating the items in the cart and delete a cart item.
 * When the cart item needs to be deleted, we should pass quantity as 0 in the input along with other fields.
 */
const REMOVE_CART = gql`
    mutation ($input: RemoveItemsFromCartInput!) {
      removeItemsFromCart(input: $input) {
        cart {
            contentsTotal
        }
      }
    }
`;

export default REMOVE_CART;
