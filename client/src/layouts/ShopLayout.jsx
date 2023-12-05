import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
// import { ToastProvider } from "react-toast-notifications";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import Header from "../wrappers/header/Header";
import Footer from "../wrappers/footer/Footer";

const ShopLayout = () => {
  return (
    // <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Fragment>
          <Header />
          <Outlet />
          <Footer />
        </Fragment>
      </BreadcrumbsProvider>
    // </ToastProvider>
  );
};

export default ShopLayout;
