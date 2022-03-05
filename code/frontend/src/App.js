import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StylistProfile from"./components/styleBox/StylistProfile";
import Homepage from "./components/styleBox/HomePage"
import Login from "./components/styleBox/Login"
import AuthenticatedRoute from "components/styleBox/AuthenticationRoute";


export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;


  return (
    <Router>
        <>
            <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/login" component={Login}/>
                <AuthenticatedRoute path="/stylist/profile" component={StylistProfile}/>
            </Switch>
        </>
    </Router>
      // <HomePage/>
      // <NavBar/>
    // <Router>
    //   <Switch>
    //     <Route path="/components/:type/:subtype/:name">
    //       <ComponentRenderer />
    //     </Route>
    //     <Route path="/components/:type/:name">
    //       <ComponentRenderer />
    //     </Route>
    //     <Route path="/thank-you">
    //       <ThankYouPage />
    //     </Route>
    //     <Route path="/">
    //       <MainLandingPage />
    //     </Route>
    //   </Switch>
    // </Router>
  );
}

// export default EventLandingPage;
// export default HotelTravelLandingPage;
// export default AgencyLandingPage;
// export default SaaSProductLandingPage;
// export default RestaurantLandingPage;
// export default ServiceLandingPage;
// export default HostingCloudLandingPage;

// export default LoginPage;
// export default SignupPage;
// export default PricingPage;
// export default AboutUsPage;
// export default ContactUsPage;
// export default BlogIndexPage;
// export default TermsOfServicePage;
// export default PrivacyPolicyPage;

// export default MainLandingPage;
