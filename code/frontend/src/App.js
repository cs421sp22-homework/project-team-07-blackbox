import "styles/globalStyles.css";
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./styleBox/HomePage";
import Login from "./styleBox/login_register/Login";
import Register from "./styleBox/login_register/Register"
import AuthenticatedRoute from './styleBox/AuthenticatedRoute'
import StylistProfile from"./styleBox/stylist/StylistProfile";
import CustomerProfile from "./styleBox/customer/CustomerProfile";
import AccountSetting from "./styleBox/AccountSetting";
import Quiz from "./styleBox/quiz/Quiz";
import OrderList from "./styleBox/order/OrderList";
import OrderDetail from "styleBox/order/OrderDetail";
import ReadStylist from "./styleBox/customer/ReadStylist";
import Test from "demos/EventLandingPage";
import CreateOrder from "styleBox/order/CreateOrder";
import StylistList from "./styleBox/stylist/StylistList";
import FollowStylist from"./styleBox/customer/followStylistList"
import NavBarCustomer from "./styleBox/navBar_footer/NavBarCustomer";
import NavBarStylist from "./styleBox/navBar_footer/NavBarStylist";
import DropDown from "./styleBox/navBar_footer/Dropdown"
import PayOrder from "./styleBox/order/PayOrder"


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
              <Route path="/test" component={Test}/>
              <Route path="/stylistList" component={StylistList}/>
              <AuthenticatedRoute path="/quiz" component={Quiz}/>
              <AuthenticatedRoute path="/followStylist" component={FollowStylist}/>
              <AuthenticatedRoute path="/stylist/profile" component={StylistProfile}/>
              <AuthenticatedRoute path="/customer/profile" component={CustomerProfile}/>
              <AuthenticatedRoute path="/account" component={AccountSetting}/>
              <AuthenticatedRoute path="/orders" component={OrderList}/>
              <AuthenticatedRoute path="/orderDetail" component={OrderDetail} />
              <AuthenticatedRoute path="/stylist/homepage" component={ReadStylist}/>
              <AuthenticatedRoute path="/order" component={CreateOrder}/>
              <AuthenticatedRoute path="/payOrder" component={PayOrder}/>
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
