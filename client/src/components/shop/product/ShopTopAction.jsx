import React from "react";

const ShopTopAction = () => {
  return (
    <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        <div className="shop-select">
          <select
          // onChange={e => getFilterSortParams("filterSort", e.target.value)}
          >
            <option value="default">Default</option>
            <option value="priceHighToLow">Price - High to Low</option>
            <option value="priceLowToHigh">Price - Low to High</option>
          </select>
        </div>
        <p>
          {/* Showing {sortedProductCount} of {productCount} result */}
          Showing 8 of 20 result
        </p>
      </div>

      {/* <div className="shop-tab">
        <button
          onClick={e => {
            getLayout("grid two-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th-large" />
        </button>
        <button
          onClick={e => {
            getLayout("grid three-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th" />
        </button>
        <button
          onClick={e => {
            getLayout("list");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-list-ul" />
        </button>
      </div> */}
    </div>
  );
};

export default ShopTopAction;
