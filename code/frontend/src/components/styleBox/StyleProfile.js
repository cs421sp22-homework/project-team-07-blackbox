import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import Features from "components/features/VerticalWithAlternateImageAndText.js";
import Blog from "components/blogs/ThreeColSimpleWithImage.js";
import Testimonial from "components/testimonials/TwoColumnWithImage.js";
import ContactUsForm from "components/forms/SimpleContactUs.js";
import Footer from "components/footers/SimpleFiveColumn.js";
import TwoColumnWithImageAndProfilePictureReview from "components/testimonials/TwoColumnWithImageAndProfilePictureReview.js"
import TwoColumnWithImageAndRating from "components/testimonials/TwoColumnWithImageAndRating.js"
import TwoColumnWithImage from "components/testimonials/TwoColumnWithImage.js"
import StylistProfileImageIntro from "components/testimonials/StylistProfileImageIntro.js"
export default () => (
  <AnimationRevealPage>

    <StylistProfileImageIntro/>
    <TwoColumnWithImageAndRating/>
    <TwoColumnWithImageAndProfilePictureReview/>
    <ContactUsForm />
    <Footer />
  </AnimationRevealPage>
);
