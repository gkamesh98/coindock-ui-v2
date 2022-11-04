/**
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.  Once you add a new route on this file it will be visible automatically on
  the Sidenav.  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav.
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/ // Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";

import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up/create-account"; // @mui icons
import RecoveryCodes from "layouts/authentication/sign-up/recovery-codes";
import RecoveryCodeTest from "layouts/authentication/sign-up/recovery-code-test";
import Icon from "@mui/material/Icon";
import Addwallet from "shared/AddWallet";
import Account from "layouts/account";
import Accountpassword from "layouts/account/account-settings/password";
import ProfileSettings from "layouts/account/settings/profile";
import AccountSettings from "layouts/account/settings/account";
import SystemSettings from "layouts/account/settings/system";
import ProfileName from "layouts/account/profile-settings/name";
import Country from "layouts/account/profile-settings/country";
import DateofBirth from "layouts/account/profile-settings/date-of-birth";
import Primary from "layouts/account/system-settings/primary-currency";
import Secondary from "layouts/account/system-settings/secoundary-currency";
import AccountRecoveryCodeTest from "layouts/account/account-settings/recovery-code-test";
import AccountRecoveryCodes from "layouts/account/account-settings/recovery-codes";

export const loggedroutes = [
  {
    type: "route",
    name: "Recovery Codes",
    key: "recovery-codes",
    icon: <Icon fontSize="small">recoveryCodes</Icon>,
    route: "/sign-up/recovery-codes",
    component: <RecoveryCodes />,
  },
  {
    type: "route",
    name: "Recovery Code Test",
    key: "recovery-code-test",
    icon: <Icon fontSize="small">recoveryTestCodes</Icon>,
    route: "/sign-up/recovery-code-test",
    component: <RecoveryCodeTest />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "Account",
    key: "Account",
    route: "/account",
    component: <Account />,
  },
  {
    type: "collapse",
    name: "Account",
    key: "Account",
    icon: <Icon fontSize="small">account_circle</Icon>,
    route: "/account",
    component: <Account />,
  },
  {
    type: "route",
    name: "Account",
    key: "Account",
    route: "/account",
    component: <Account />,
  },
  {
    type: "route",
    name: "Profile Settings",
    key: "profile-settings",
    route: "/profile-settings",
    component: <ProfileSettings />,
  },
  {
    type: "route",
    name: "Name",
    key: "profile name",
    route: "/profile-name",
    component: <ProfileName />,
  },
  {
    type: "route",
    name: "Country",
    key: "profile country",
    route: "/profile-country",
    component: <Country />,
  },
  {
    type: "route",
    name: "Date of Birth",
    key: "profile-Date-of-Birth",
    route: "/profile-date-of-birth",
    component: <DateofBirth />,
  },
  {
    type: "route",
    name: "Account Settings",
    key: "account-settings",
    route: "/account-settings",
    component: <AccountSettings />,
  },
  {
    type: "route",
    name: "Account Password",
    key: "account-password",
    route: "/account-password",
    component: <Accountpassword />,
  },
  {
    type: "route",
    name: "Account Recovery",
    key: "account-recovery",
    route: "/account/recovery",
    component: <AccountRecoveryCodes />,
  },
  {
    type: "route",
    name: "Account Recovery Code",
    key: "account-recovery-code",
    route: "/account/recovery-code",
    component: <AccountRecoveryCodeTest />,
  },

  {
    type: "route",
    name: "System Settings",
    key: "system-settings",
    route: "/system-settings",
    component: <SystemSettings />,
  },
  {
    type: "route",
    name: "Primary Currency",
    key: "primary-currency",
    route: "/primary",
    component: <Primary />,
  },
  {
    type: "route",
    name: "Secondary Currency",
    key: "secondary-currency",
    route: "/secondary",
    component: <Secondary />,
  },

  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
];

export const publicRoutes = [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Create account",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/sign-up/create-account",
    component: <SignUp />,
  },
  {
    type: "route",
    name: "Add wallet",
    key: "addwallet",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/addwallet",
    component: <Addwallet />,
  },
];
export default { loggedroutes, publicRoutes };
