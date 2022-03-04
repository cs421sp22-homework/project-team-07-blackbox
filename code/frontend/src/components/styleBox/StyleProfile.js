import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import Features from "components/features/VerticalWithAlternateImageAndText.js";
import Blog from "components/blogs/ThreeColSimpleWithImage.js";
import Testimonial from "components/testimonials/TwoColumnWithImage.js";
import ContactUsForm from "components/forms/SimpleContactUs.js";
import Footer from "components/styleBox/Footer.jsx";
import TwoColumnWithImageAndProfilePictureReview from "components/testimonials/TwoColumnWithImageAndProfilePictureReview.js"
import TwoColumnWithImageAndRating from "components/testimonials/TwoColumnWithImageAndRating.js"
import TwoColumnWithImage from "components/testimonials/TwoColumnWithImage.js"
import StylistProfileImageIntro from "components/testimonials/StylistProfileImageIntro.js"
import StylistProfilePastDesign from "components/testimonials/StylistProfileTwoColumnWithImageAndProfilePictureReview.js"
import StylistRating from "components/testimonials/StylistTwoColumnWithImageAndRating.js"
export default () => (
  <AnimationRevealPage>

    <StylistProfileImageIntro/>
    <StylistProfilePastDesign/>
    <Footer />
  </AnimationRevealPage>
);
//    <TwoColumnWithImageAndRating/>
//      <ContactUsForm />
