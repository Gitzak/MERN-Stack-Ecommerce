import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import Header from "../wrappers/header/Header";
import Footer from "../wrappers/footer/Footer";

const ShopLayout = () => {
  return (
      <BreadcrumbsProvider>
        <Fragment>
          <Header />
          <Outlet />
          <Footer />
        </Fragment>
      </BreadcrumbsProvider>
  );
};

export default ShopLayout;
