import React, { useState } from 'react';
import Error from './error';
import GET_PAYMENT_GATEWAY from '../../query/get-payment-gateway';
import { useQuery } from "@apollo/client";

const PaymentModes = ({ input, handleOnChange }) => {

    const [payments, setPayment] = useState(null);
    // Get payment method.
    const { loading } = useQuery(GET_PAYMENT_GATEWAY, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {

            if (data.paymentGateways.nodes.length > 0){

                setPayment(data.paymentGateways.nodes);
            }
        },
    });

    if (loading) return 'Loading...';

    return (
        <div className="mt-3">
            <Error errors={input.errors} fieldName={'paymentMethod'} />
            { payments && payments.map((payment) => (
                <div className="form-check woo-next-payment-input-container mt-2" key={`${payment.id}`}>
                    <label className="form-check-label">
                        <input onChange={handleOnChange} value={`${payment.id}`} className="form-check-input" name="paymentMethod" type="radio" />
                        <span className="woo-next-payment-content">{`${payment.title}`}</span>
                    </label>
                </div>
            ))}
         </div>
    );
};

export default PaymentModes;
