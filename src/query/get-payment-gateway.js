import { gql } from "@apollo/client";

const GET_PAYMENT_GATEWAY = gql`
    query GET_PAYMENT_GATEWAY {
        paymentGateways(where: {}) {
            nodes {
                description
                icon
                id
                title
            }
        }
    }
`;

export default GET_PAYMENT_GATEWAY;
