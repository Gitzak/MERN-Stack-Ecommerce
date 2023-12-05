import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { animateScroll } from "react-scroll";
import FooterCopyright from "../../components/shop/footer/FooterCopyright";
import FooterNewsletter from "../../components/shop/footer/FooterNewsletter";

const Footer = () => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <footer className=" footer-area bg-gray pt-100 pb-70">
      <div className=" container-fluid container ">
        <div className="row">
          <div className="col-xl-2 col-sm-4 col-lg-2 col-sm-4">
            {/* footer copyright */}
            <FooterCopyright />
          </div>
          <div className="col-xl-2 col-sm-4 col-lg-2 col-sm-4">
            <div className="footer-widget mb-30 ml-30">
              <div className="footer-title">
                <h3>ABOUT US</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to="/about">About us</Link>
                  </li>
                  <li>
                    <Link to="/">Store location</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link to="/">Orders tracking</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-sm-4 col-lg-2 col-sm-4">
            <div className=" footer-widget mb-30 ml-95 footer-widget mb-30 ml-50">
              <div className="footer-title">
                <h3>USEFUL LINKS</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to="/">Returns</Link>
                  </li>
                  <li>
                    <Link to="/">Support Policy</Link>
                  </li>
                  <li>
                    <Link to="/">Size guide</Link>
                  </li>
                  <li>
                    <Link to="/">FAQs</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className=" col-xl-3 col-sm-4 col-lg-2 col-sm-6">
            <div className=" footer-widget mb-30 ml-145 footer-widget mb-30 ml-75">
              <div className="footer-title">
                <h3>FOLLOW US</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <a
                      href="//www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="//www.twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="//www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="//www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Youtube
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-8 col-lg-4 col-sm-6">
            {/* footer newsletter */}
            <FooterNewsletter />
          </div>
        </div>
      </div>
      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <i className="fa fa-angle-double-up"></i>
      </button>
    </footer>
  );
};

export default Footer;
