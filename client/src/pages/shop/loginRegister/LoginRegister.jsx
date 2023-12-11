import React, { Fragment } from "react";
// import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Breadcrumb from "../../../wrappers/breadcrumb/Breadcrumb";
import Login from "../../../wrappers/login/Login";
import Register from "../../../wrappers/register/Register";

const LoginRegister = () => {
  const { pathname } = location;

  return (
    <Fragment>
      <BreadcrumbsItem to="/shop">Home</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>Login Register</BreadcrumbsItem>
      {/* breadcrumb */}
      <Breadcrumb />

      <div className="login-register-area pt-100 pb-100">
        <div className="container">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-7 col-md-12 ml-auto mr-auto">
              <div className="login-register-wrapper">
                <Tab.Container defaultActiveKey="login">
                  <Nav variant="pills" className="login-register-tab-list">
                    <Nav.Item>
                      <Nav.Link eventKey="login">
                        <h4>Login</h4>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="register">
                        <h4>Register</h4>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="login">
                      <div className="login-form-container">
                        <Login />
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="register">
                      <div className="login-form-container">
                        <Register />
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginRegister;
