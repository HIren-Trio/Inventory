import { ThemeProvider, CssBaseline, createTheme, Box } from "@mui/material";
import RootComponent from "./components/RootComponent";
import RootPage from "./components/RootPage";
import DataTable from "./test/DataTable";
import Hello from "./test/Hello";
import "./index.css"
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/bodyComponents/Home/Home";
import Inventory from "./components/bodyComponents/inventory/Inventory";
import Customer from "./components/bodyComponents/customer/Customer";
import Revenue from "./components/bodyComponents/revenue/Revenue";
import Growth from "./components/bodyComponents/growth/Growth";
import Report from "./components/bodyComponents/report/Report";
import Setting from "./components/bodyComponents/Settings/Setting";
import Order from "./components/bodyComponents/order/Order";
import Login from "./components/bodyComponents/login/Login";
import Signup from "./components/bodyComponents/Register/Signup";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { logoutSuccess } from "./redux/action/authAction";
import { store } from "./redux/Store";
import { jwtDecode } from 'jwt-decode';
import RootCustomerComponent from "./components_customer/RootCustomerComponent";
import LoginCustomer from "./components_customer/bodyComponents/login/LoginCustomer";
import CustomerOrder from "./components_customer/bodyComponents/order/CustomerOrder";
import CustomerHome from "./components_customer/bodyComponents/Home/CustomerHome";
import CustomerSetting from "./components_customer/bodyComponents/Settings/CustomerSetting";
function App() {
  const theme = createTheme({
    spacing: 4,
    palette: {
      mode: "light",

      primary: {
        main: "#573BFE",
      },
      text: {
        primary: "#202635",
        secondary: "#A0AEC0",
      },
      secondary: {
        main: "#01C0F6",
      },
      error: {
        main: "#E03137",
      },
    },

   
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
  },
  //here we customize our typographi and in the variant prop we can use out myVar value
});
const { userData } = store.getState()?.persist;
console.log(userData);
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/customer" element={<RootCustomerComponent />}>
        <Route index element={<RootPage />} />
        <Route path="/customer/orders" element={<CustomerOrder />}></Route>
        <Route path="/customer/home" element={<CustomerHome />}></Route>
        <Route path="/customer/settings" element={<CustomerSetting />}></Route>
        {/* 
          <Route path="/inventory" element={<Inventory />}></Route>
          <Route path="/customers" element={<Customer />}></Route>
          <Route path="/revenue" element={<Revenue />}></Route>
          <Route path="/growth" element={<Growth />}></Route>
          <Route path="/reports" element={<Report />}></Route>
           */}
      </Route>  <Route path="/" element={<RootComponent />}>
        <Route index element={<RootPage />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/inventory" element={<Inventory />}></Route>
        <Route path="/orders" element={<Order />}></Route>
        <Route path="/customers" element={<Customer />}></Route>
        <Route path="/revenue" element={<Revenue />}></Route>
        <Route path="/growth" element={<Growth />}></Route>
        <Route path="/reports" element={<Report />}></Route>
        <Route path="/settings" element={<Setting />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/customer/login" element={<LoginCustomer />} />
    </>
  )
);

const dispatch = useDispatch();
const checkTokenExpiration = () => {
  const token = userData?.token;
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      dispatch(logoutSuccess());
      alert('Your session has expired. Please log in again.');
    }
  }
};

setInterval(checkTokenExpiration, 6000);

return (
  <ThemeProvider theme={theme}>
    <ToastContainer toastClassName="dark:bg-darkmode-800 dark:text-slate-500" />
    <RouterProvider router={router} />

    <CssBaseline />
  </ThemeProvider>
);
}

export default App;

