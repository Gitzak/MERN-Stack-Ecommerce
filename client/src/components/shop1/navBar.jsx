import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;
import "../../assets/css/shopNavbar.css";
import ShopHeader from "./header";
import ShopFooter from "./shopFooter";

const NavBar = ({ children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            <Layout className="layout">
                <ShopHeader />
                <Content className="site-layout-content">
                    <div>{children}</div>
                </Content>

                <ShopFooter />
            </Layout>
        </>
    );
};

export default NavBar;
