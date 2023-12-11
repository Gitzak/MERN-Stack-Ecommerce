import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/shop/section-title/SectionTitle";
import NewArrival from "./newArrival";
import BestSeller from "./bestSeller";
import RecommendedProducts from "./recommendedProducts";
import { useState } from "react";

const TabProduct = () => {
  const [newArr, setNewArr] = useState(true);
  const [bestSell, setBestSell] = useState(false);
  const [recom, setRecom] = useState(false);

  const handleTabChange = (tabKey) => {
    switch (tabKey) {
      case "newArrival":
          setNewArr(true);
          setBestSell(false);
          setRecom(false);
        break;
      case "bestSeller":
        setNewArr(false);
        setBestSell(true);
        setRecom(false);
        break;
      case "recommendedProducts":
        setNewArr(false);
        setBestSell(false);
        setRecom(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className=" product-area pt-70 pb-65 ">
      <div className="container">
        <SectionTitle
          titleText="Daily Deals"
          positionClass="text-center"
          borderClass="no-border"
        />

        <Tab.Container defaultActiveKey="newArrival">
          <Nav
            variant="pills"
            className="product-tab-list pt-30 pb-55 text-center"
          >
            <Nav.Item>
              <Nav.Link eventKey="newArrival" 
              onClick={() => handleTabChange("newArrival")}
              >
                <h4>New Arrivals</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bestSeller"
               onClick={() => handleTabChange("bestSeller")}
               >
                <h4>Best Sellers</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="recommendedProducts" 
              onClick={() => handleTabChange("recommendedProducts")}
              >
                <h4>Recommended For You</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="newArrival">
              <div className="row" style={{ backgroundColor: "white" }}>
                <NewArrival activeTab={newArr} Number={8} />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="bestSeller">
              <div className="row" style={{ backgroundColor: "white" }}>
                <BestSeller activeTab={bestSell} Number={8} />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="recommendedProducts">
              <div className="row" style={{ backgroundColor: "white" }}>
                <RecommendedProducts activeTab={recom} Number={8} />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

export default TabProduct;
