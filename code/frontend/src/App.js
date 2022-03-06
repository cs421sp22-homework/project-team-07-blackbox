import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/styleBox/HomePage";
import Login from "./components/styleBox/Login";
import Register from "./components/styleBox/Register"
import AuthenticatedRoute from './components/styleBox/AuthenticatedRoute'
import Quiz from "./components/styleBox/Quiz";
import BasicRouter from "./components/styleBox/BasicRouter";
// import StylistProfile from"./components/styleBox/StylistProfile";



export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;


  return (
      <Router>
        <>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            {/*<Route path="/stylist/profile" component={StylistProfile}/>*/}
            <Route path="/quiz" component={Quiz}/>
          </Switch>
        </>
      </Router>
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