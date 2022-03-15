import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { black } from './style/theme/black.color';
import { brown } from './style/theme/brown.color';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';
import Categories from './categories/index'
import Films from './films/index'
import Nav from './navbar'
import ShoppingCart from './shoppingCart';
import RegisterForm from './register'
import LoginForm from './login'
import reportWebVitals from './reportWebVitals';
import { GlobalProvider } from "./context";
import AllFilms from './allProduct';
import AddressForm from './address';
import ProfileForm from './profile';
import Paid from './paid'
import HomeAdmin from './admin/home'
import AddressCreate from './admin/address/create'
import AddressCrud from './admin/address';
import AddressModify from './admin/address/read-update-delete'
import CategoryCrud from './admin/category'
import CategoryCreate from './admin/category/create';
import CategoryModify from './admin/category/read-update-delete';
import CustomerCrud from './admin/customer';
import CustomerCreate from './admin/customer/create';
import CustomerModify from './admin/customer/read-update-delete'
import FilmCrud from './admin/film';
import FilmCreate from './admin/film/create';
import FilmModify from './admin/film/read-update-delete'
import PurchaseList from './admin/purchase/read-update-delete'
import UserCrud from './admin/user';
import UserCreate from './admin/user/create'
import UserModify from './admin/user/read-update-delete'
import StaffCreate from './admin/staff/create'
import StaffCrud from './admin/staff';

const theme = createTheme({
  palette: {
    primary: {
      main: black[200],
    },
    secondary: {
      main: brown[200]
    }
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <GlobalProvider id="dvd-selling">
        <Nav />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category=:id" element={<Films />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/address" element={<AddressForm />} />
          <Route path="/all" element={<AllFilms />} />
          <Route path="/paid" element={<Paid />} />
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/admin/address" element={<AddressCrud />} />
          <Route path="/admin/address/create" element={<AddressCreate />} />
          <Route path="/admin/address/modify" element={<AddressModify />} />
          <Route path="/admin/category" element={<CategoryCrud />} />
          <Route path="/admin/category/create" element={<CategoryCreate />} />
          <Route path="/admin/category/modify" element={<CategoryModify />} />
          <Route path="/admin/customer" element={<CustomerCrud />} />
          <Route path="/admin/customer/create" element={<CustomerCreate />} />
          <Route path="/admin/customer/modify" element={<CustomerModify />} />
          <Route path="/admin/film" element={<FilmCrud />} />
          <Route path="/admin/film/create" element={<FilmCreate />} />
          <Route path="/admin/film/modify" element={<FilmModify />} />
          <Route path="/admin/purchase" element={<PurchaseList />} />
          <Route path="/admin/user" element={<UserCrud />} />
          <Route path="/admin/user/create" element={<UserCreate />} />
          <Route path="/admin/user/modify" element={<UserModify />} />
          <Route path="/admin/staff/create" element={<StaffCreate />} />
          <Route path="/admin/staff" element={<StaffCrud />} />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
