import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link, createBrowserRouter, RouterProvider } from "react-router-dom";
import Login ,{action as authAction}from './pages/Login';
import FindPwd from './pages/FindPwd';
import Main ,{loader as mainLoader}from './pages/Main';
import History from './pages/History';
import Position, {action as RegisterLocationAction} from './pages/Position';
import Goodin from './pages/Goodin';
import Warehousing from './pages/Warehousing';
import Inventory from './pages/Inventory';
import Release from './pages/Release';
import Salelist from './pages/Salelist';
import Myshop from './pages/Myshop';
import Register from './pages/Register';
import View from './pages/View';
import Store from './pages/Store';
import SearchList from './pages/SearchList';
import Sort from './pages/Sort';
import Storageproduct from './pages/Storageproduct';
import ViewManager from './pages/ViewManager';
import ErrorPage from './pages/ErrorPage';
import { tokenLoader } from './util/auth';
import RootLayout from './commons/RootLayout';
import {action as logoutAction} from "./pages/Logout";

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
      {path: "location/new", element:<Position />,action:RegisterLocationAction }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
