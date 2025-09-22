import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import LogingPage from "../Pages/LoginPage/LogingPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import AddParcelForm from "../Pages/AddParcelForm/AddParcelForm";


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
          element:<AddParcelForm/>,
          loader: () => fetch('./warehouses.json')
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
  }
]);
export default router;