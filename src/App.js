import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link, createBrowserRouter, RouterProvider } from "react-router-dom";
import Login ,{action as authAction}from './pages/Login';
import FindPwd from './pages/FindPwd';
import Main ,{loader as mainLoader}from './pages/Main';
import History, {loader as incomeLoader} from './pages/income/History';
import Position, {action as RegisterLocationAction} from './pages/location/Position';
import Warehousing from './pages/income/Warehousing';
import Inventory from './pages/product/Inventory';
import Release from './pages/Release';
import Salelist from './pages/Salelist';
import Myshop, {loader as myDataLoader} from './pages/MyPage';
import Register from './pages/income/Register';
import View from './pages/product/View';
import Store from './pages/product/Store';
import SearchList from './pages/SearchList';
import Storageproduct, {loader as stockLocationLoader} from './pages/location/Storageproduct';
import ViewManager from './pages/manager/ViewManager';
import ErrorPage from './pages/ErrorPage';
import { tokenLoader } from './util/auth';
import RootLayout from './commons/RootLayout';
import {action as logoutAction} from "./pages/Logout";
import MyPage from './pages/MyPage';

const router = createBrowserRouter([
  {
    path:"/auth",
    element:<Login />,
    errorElement:<ErrorPage />,
    action: authAction
  },
  {
    path:"/find",
    element:<FindPwd />,
    errorElement:<ErrorPage />
  },
  {
    path:"/",
    element:<RootLayout />,
    errorElement:<ErrorPage />,
    loader: tokenLoader,
    children : [
      {path: "main", element:<Main />, loader:mainLoader, index:true},
      {path: "logout", action:logoutAction },
      {path: "location/new", element:<Position />,action:RegisterLocationAction },
      {path: "location/list", element:<Storageproduct />, loader:stockLocationLoader},
      {path: "income/list", element:<History />, loader:incomeLoader},
      {path: "income/inspection", element:<Warehousing />},
      {path: "income/new", element:<Store />},
      {path: "product/list", element:<View />},
      {path: "product/inspection", element:<Store />},
      {path: "product/move", element:<Inventory />},
      {path: "discard/product", element:<Release />},
      {path: "sale/product", element:<Salelist />},
      {path: "branch/info", element:<MyPage />, loader:myDataLoader},
      {path: "search/list", element:<SearchList/> },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
