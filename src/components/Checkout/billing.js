import React from "react";
import countryList from "./country-list";
import Error from "./error";

const Billing = ({ input, handleOnChange }) => {
    
    return (
        <React.Fragment>
            {/*Name*/}

                <tr>
                    <td>
                        <label htmlFor="first-name"> First Name* </label>
                    </td>
                    <td>    
                        <input
                            onChange={handleOnChange}
                            value={input.firstName}
                            type="text"
                            name="firstName"
                            className="form-control woo-next-checkout-input"
                            id="first-name"
                        />
                        <Error errors={input.errors} fieldName={"firstName"} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="last-name">Last Name*</label>
                    </td>
                    <td>    
                        <input
                            onChange={handleOnChange}
                            value={input.lastName}
                            type="text"
                            name="lastName"
                            className="form-control woo-next-checkout-input"
                            id="last-name"
                        />
                        <Error errors={input.errors} fieldName={"lastName"} />
                    </td>
                </tr>

                {/* Company Name */}
                <tr>
                    <td>
                        <label htmlFor="company-name">Company Name</label>
                    </td>
                    <td>
                        <input
                            onChange={handleOnChange}
                            value={input.company}
                            type="text"
                            name="company"
                            className="form-control woo-next-checkout-input"
                            id="company-name"
                        />
                        <Error errors={input.errors} fieldName={"company"} />
                    </td>
                </tr>
                {/* Country */}
                <tr>
                    <td>
                        <label htmlFor="country-select">Country*</label>
                    </td>
                    <td>    
                        {/* eslint-disable */}
                        <select
                            onChange={handleOnChange}
                            value={input.country}
                            name="country"
                            className="form-control woo-next-checkout-input"
                            id="country-select"
                        >
                            <option value="">Select a country...</option>
                            {countryList.length &&
                                countryList.map((country, index) => (
                                    <option key={`${country}-${index}`} value={country.countryCode}>
                                        {country.countryName}
                                    </option>
                                ))}
                        </select>
                        <Error errors={input.errors} fieldName={"country"} />
                    </td>
                </tr>
                {/* Street Address */}
                <tr>
                    <td>
                        <label htmlFor="street-address">Street Address*</label>
                    </td>
                    <td>   
                        <input
                            type="text"
                            onChange={handleOnChange}
                            value={input.address1}
                            name="address1"
                            placeholder="House number and street name"
                            className="form-control woo-next-checkout-input"
                            id="street-address"
                        />
                        <Error errors={input.errors} fieldName={"address1"} />
                    </td>
                </tr>
                <tr>
                   <td></td> 
                   <td>
                    <input
                        type="text"
                        onChange={handleOnChange}
                        value={input.address2}
                        name="address2"
                        placeholder="Apartment, suite, unit etc.(optional)"
                        className="form-control woo-next-checkout-input"
                        id="address-2"
                    />
                   </td>
                </tr>
                {/* Town/City */}
                <tr>
                    <td>
                        <label htmlFor="city">Town/City*</label>
                    </td>
                    <td>    
                        <input
                            onChange={handleOnChange}
                            value={input.city}
                            type="text"
                            name="city"
                            className="form-control woo-next-checkout-input"
                            id="city"
                        />
                        <Error errors={input.errors} fieldName={"city"} />
                    </td>
                </tr>
                {/* County */}
                <tr>
                    <td>
                        <label htmlFor="state">State/County*</label>
                    </td>
                    <td>    
                        <input
                            onChange={handleOnChange}
                            value={input.state}
                            type="text"
                            name="state"
                            className="form-control woo-next-checkout-input"
                            id="state"
                        />
                        <Error errors={input.errors} fieldName={"state"} />
                    </td>
                </tr>
                {/* Post Code */}
                <tr>
                    <td>
                        <label htmlFor="post-code">Postcode*</label>
                    </td>
                    <td>    
                        <input
                            onChange={handleOnChange}
                            value={input.postcode}
                            type="text"
                            name="postcode"
                            className="form-control woo-next-checkout-input"
                            id="post-code"
                        />
                        <Error errors={input.errors} fieldName={"postcode"} />
                    </td>
                </tr>
                {/*Phone & Email*/}
                
                <tr>
                    <td>
                        <label htmlFor="phone">Phone*</label>
                    </td>
                    <td>    
                        <input
                            onChange={handleOnChange}
                            value={input.phone}
                            type="text"
                            name="phone"
                            className="form-control woo-next-checkout-input"
                            id="phone"
                        />
                        <Error errors={input.errors} fieldName={"phone"} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="email">Email*</label>
                    </td>
                    <td>    
                        <input
                            onChange={handleOnChange}
                            value={input.email}
                            type="email"
                            name="email"
                            className="form-control woo-next-checkout-input"
                            id="email"
                        />
                        <Error errors={input.errors} fieldName={"email"} />
                    </td>
                </tr>
                <tr>
                    <td><h4 className="mt-4 mb-4">Additional Information</h4></td>
                </tr>
                <tr>                      
                    <td>
                        <label htmlFor="order-notes">Order Notes</label>
                    </td>
                    <td>
                        <textarea onChange={handleOnChange} defaultValue={input.customerNote} name="customerNote" className="form-control woo-next-checkout-textarea" id="order-notes" rows="4" />
                        <Error errors={input.errors} fieldName={'customerNote'} />
                    </td>
                </tr>
        </React.Fragment>
    );
};

export default Billing;
