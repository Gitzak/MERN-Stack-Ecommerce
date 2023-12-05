import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ValidateCustomer } from "../../../api/customerApi";
import Header from "../../../wrappers/header/Header";
import Footer from "../../../wrappers/footer/Footer";

const Validation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const HandleValidation = async () => {
    const response = await ValidateCustomer(id);
    navigate("/shop/login-register");
  };

  return (
    <Fragment>
      <Header />
      <div className="subscribe-area-3 pt-100 pb-100 ">
        <div className="container-fluid">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-xl-5 col-lg-7 col-md-10 ml-auto mr-auto">
              <div className="subscribe-style-3 text-center dark-red-subscribe">
                <h2>Validation Page! </h2>
                <p>Please click the link bellow to validate your Account</p>
                <div className="validation-btn">
                  <button
                    style={{
                      backgroundColor: "#c61a32",
                      color: "#fff",
                      padding: "17px 55px",
                      lineHeight: "1",
                      marginTop: "20px",
                      border: "none",
                      borderRadius: "50px",
                      fontSize: "16px",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                    type="submit"
                    onClick={HandleValidation}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#000")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#c61a32")}
                  >
                    Validate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default Validation;
