import React, { useState, Fragment } from "react";
import styled from "styled-components";
import LayoutOne from "../../../layouts/LayoutOne";
import Breadcrumb from "../../../wrappers/breadcrumb/Breadcrumb";
import SectionTitleWithText from "../../../components/shop/section-title/SectionTitleWithText";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

const TrackingForm = styled.div`
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    max-width: 100%; /* Limit the maximum width */

    h3 {
        color: #333;
        font-size: 24px;
        margin-bottom: 10px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center; /* Center the form horizontally */
        justify-content: center; /* Center the form vertically */

        input {
            width: 100%; /* Take up full width */
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
            transition: border-color 0.3s;

            &:focus {
                border-color: #4caf50; /* Change border color on focus */
            }
        }

        button {
            width: 100%; /* Take up full width */
            background-color: #4caf50;
            color: #fff;
            padding: 15px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;

            &:hover {
                background-color: #45a049; /* Darken button color on hover */
            }
        }
    }
`;

const TrackingResult = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 400px; /* Limit the maximum width */

    h3 {
        color: #333;
        font-size: 24px;
        margin-bottom: 10px;
    }

    p {
        color: #777;
        font-size: 16px;
    }
`;

const TrackingOrders = () => {
    const [trackingData, setTrackingData] = useState(null);

    const trackOrder = (trackingNumber) => {
        const fakeTrackingData = {
            orderNumber: "123456",
            status: "Shipped",
            location: "Distribution Center",
            estimatedDelivery: "December 15, 2023",
        };
        setTrackingData(fakeTrackingData);
    };

    const handleTrackClick = (e) => {
        e.preventDefault();
        const trackingNumber = e.target.form.elements.trackingNumber.value;
        trackOrder(trackingNumber);
    };

    return (
        <Fragment>
            <BreadcrumbsItem to={"/shop/home"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={"/shop/tracking-orders"}>Tracking Orders</BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                <Breadcrumb />
                <div className="container">
                    <div className="row" style={{ justifyContent: "center" }}>
                        <div className="col-md-12">
                            <SectionTitleWithText
                                spaceTopClass="pt-100"
                                spaceBottomClass="pb-95"
                            >
                                <h2>Tracking Orders</h2>
                                <p>Track the status of your orders using the tracking number.</p>
                            </SectionTitleWithText>

                            <TrackingForm>
                                <h3>Tracking Orders</h3>
                                <form>
                                    <input
                                        type="text"
                                        placeholder="Enter tracking number"
                                        name="trackingNumber"
                                    />
                                    <button type="submit" onClick={handleTrackClick}>
                                        Track
                                    </button>
                                </form>
                            </TrackingForm>

                            {trackingData && (
                                <TrackingResult>
                                    <h3>Order Details</h3>
                                    <p>
                                        Order Number: {trackingData.orderNumber}<br />
                                        Status: {trackingData.status}<br />
                                        Location: {trackingData.location}<br />
                                        Estimated Delivery: {trackingData.estimatedDelivery}
                                    </p>
                                </TrackingResult>
                            )}
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default TrackingOrders;