import PropTypes from "prop-types";
import React, { Fragment } from "react";
// import MetaTags from "react-meta-tags";
// import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../../layouts/LayoutOne";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Breadcrumb from "../../../wrappers/breadcrumb/Breadcrumb";
import SectionTitleWithText from "../../../components/shop/section-title/SectionTitleWithText";
import Banner from "../../../wrappers/banner/Banner";
import TextGridOne from "../../../wrappers/textGrid/TextGridOne";
import FunFactOne from "../../../wrappers/fun-fact/FunFactOne";
import TeamMemberOne from "../../../wrappers/team-member/TeamMemberOne";
import BrandLogoSliderOne from "../../../wrappers/brand-logo/BrandLogoSliderOne";
import BannerSingle from "../../../components/shop/banner/BannerSingle";
import BannerOne from "../../../wrappers/banner/BannerOne";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
// import BannerOne from "../../wrappers/banner/BannerOne";
// import TextGridOne from "../../wrappers/text-grid/TextGridOne";
// import FunFactOne from "../../wrappers/fun-fact/FunFactOne";
// import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";
// import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";

const About = () => {

  return (
    <Fragment>
      {/* <MetaTags>
        <title>Flone | About us</title>
        <meta
          name="description"
          content="About page of flone react minimalist eCommerce template."
        />
      </MetaTags> */}
      <BreadcrumbsItem to={"/shop/home"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={"/shop/aboutUs"}>
        About 
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* section title with text */}
        <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-95" />

        {/* banner */}
        {/* <BannerOne spaceBottomClass="pb-70" /> */}
        {/* <BannerOne spaceBottomClass="pb-70" /> */}

        {/* text grid */}
        <TextGridOne spaceBottomClass="pb-70" />

        {/* fun fact */}
        <FunFactOne
          spaceTopClass="pt-100"
          spaceBottomClass="pb-70"
          bgClass="bg-gray-3"
        />

        {/* team member */}
        {/* <TeamMemberOne spaceTopClass="pt-95" spaceBottomClass="pb-70" /> */}

        {/* brand logo slider */}
        <BrandLogoSliderOne spaceBottomClass="pb-70" />
      </LayoutOne>
    </Fragment>
  );
};



export default About;
