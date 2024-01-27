import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link, createBrowserRouter, RouterProvider } from "react-router-dom";
import Login ,{action as authAction}from './pages/Login';
import FindPwd from './pages/FindPwd';
import Main ,{loader as mainLoader}from './pages/Main';
import History, {loader as incomeLoader} from './pages/income/History';
import Position, {action as RegisterLocationAction} from './pages/location/Position';
import Warehousing from './pages/income/Warehousing';
import Inventory, {loader as inventoryLoader} from './pages/stock/Inventory';
import Release from './pages/Release';
import Salelist, {loader as salelistLoader} from './pages/Salelist';
import Myshop, {loader as myDataLoader} from './pages/MyPage';
import Register from './pages/income/Register';
import View, {loader as stockLocationLoader} from './pages/stock/View';
import Store, {loader as storeLoader} from './pages/stock/Store';
import SearchList, {loader as searchListLoader} from './pages/SearchList';
import Storageproduct, {loader as storageLoader} from './pages/location/Storageproduct';
import ViewManager from './pages/manager/ViewManager';
import ErrorPage from './pages/ErrorPage';
import { tokenLoader } from './util/auth';
import RootLayout from './commons/RootLayout';
import {action as logoutAction} from "./pages/Logout";
import MyPage from './pages/MyPage';
import M_RootLayout from './commons/M_RootLayout';
import Manager from './pages/manager/Manager';
import Managersolstice, {loader as managerListLoader} from './pages/manager/Managersolstice';
import Managershop, {loader as adminMyPageLoader} from './pages/manager/Managershop';
import ManagerDetail from './pages/manager/ManagerDetail';

const router = createBrowserRouter([
  { 
    path:"/",
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
    path:"/branch",
    element:<RootLayout />,
    errorElement:<ErrorPage />,
    loader: tokenLoader,
    children : [
      {path: "main", element:<Main />, loader:mainLoader, index:true},
      {path: "logout", action:logoutAction },
      {path: "location/new", element:<Position />,action:RegisterLocationAction },
      {path: "location/list", element:<Storageproduct />, loader:storageLoader},
      {path: "income/list", element:<History />, loader:incomeLoader},
      {path: "income/inspection", element:<Warehousing />},
      {path: "income/new", element:<Store />, loader:storeLoader},
      {path: "stock/inventory/list", element:<View />, loader:stockLocationLoader},
      {path: "stock/product/list", element:<Inventory />, loader:inventoryLoader},
      {path: "discard/product", element:<Release />},
      {path: "sale/product", element:<Salelist />, loader:salelistLoader},
      {path: "mypage", element:<MyPage />, loader:myDataLoader},
      {path: "search/list/:searchWord", element:<SearchList/>, loader:searchListLoader },
    ]
  },
  {
    path:"/admin",
    element:<M_RootLayout />,
    errorElement:<ErrorPage />,
    loader:tokenLoader,
    children : [
      {path: "main", element:<Manager />},
      {path: "branch/list", element:<Managersolstice />, loader:managerListLoader},
      {path: "branch/detail/:branch_id", element:<ManagerDetail />, loader:managerListLoader},
      {path: "mypage", element:<Managershop />, loader:adminMyPageLoader},
      {path: "logout", action:logoutAction },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
