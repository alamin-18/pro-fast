import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import LogingPage from "../Pages/LoginPage/LogingPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import AddParcelForm from "../Pages/AddParcelForm/AddParcelForm";
import Profiles from "../Pages/Profiles/Profiles";
import PrivateRoute from "./PrivateRoute";
import Payments from "../Pages/Payments/Payments";
import PaymentsHistory from "../Pages/Payments/PaymentsHistory";
import BecomeRider from "../Pages/BeComeARider/BeComeARider";
import DashboardLayout from "../Dashboad/Dashboad/DashboadLayout";
import pendingRider from './../Dashboad/pendingRider/pendingRider';
import ActiveRider from "../Dashboad/ActiveRider/ActiveRider";
import MakeAdmin from "../Dashboad/Dashboad/MakeAdmin/MakeAdmin";


const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children:[
        {
            index:true,
            Component: Home 
        },
        {
          path:'coverage',
          Component: Coverage,
          loader: () => fetch('./serviceCenter.json')
        },
        {
          path:'/add-parcel',
          element:<PrivateRoute><AddParcelForm/></PrivateRoute>,
          loader: () => fetch('./warehouses.json')
        },
        {
          path:'/profile',
          element:<PrivateRoute><Profiles/></PrivateRoute>
        },
        {
          path:'/payments/:id',
          element:<PrivateRoute><Payments/></PrivateRoute>
        },
        {
          path:'/profile/payment-history',
          element:<PrivateRoute><PaymentsHistory/></PrivateRoute>
        },
        {
          path:'/become-a-rider',
          element:<PrivateRoute><BecomeRider/></PrivateRoute>,
          loader: () => fetch('./serviceCenter.json')
        }
    ]
  },
  {
    path:'/',
    Component: AuthLayout,
    children:[
      {
        path:'login',
        Component: LogingPage
      },
      {
        path:'/register',
        Component:RegisterPage
      }
    ]
  },
  {
    path:'/dashboard',
    element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
    children:[
      {
        index:true,
        Component:pendingRider
      },
      {
        path:'pending-rider',
        Component:pendingRider
      },
      {
        path:'active-rider',
        Component:ActiveRider
      },
      {
        path:'make-admin',
        Component:MakeAdmin
      }
    ]
  }
]);
export default router;