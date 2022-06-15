import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './redux/User/user.actions';

// components
import AdminToolbar from './components/AdminToolbar';
import WorkerToolbar from './components/WorkerToolbar';
// hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';
import WithWorkerAuth from './hoc/withWorkerAuth';

// layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import AdminLayout from './layouts/AdminLayout';
import WorkerLayout from './layouts/WorkerLayout';
import DashboardLayout from './layouts/DashboardLayout';

// pages
import Homepage from './pages/Homepage';
import Search from './pages/Search';
import Contact from './pages/Contact';
import About from './pages/About';
import Registration from './pages/Registration';
import Login from './pages/Login';
import ViewList from './pages/ViewList';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Worker from './pages/Worker';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Order from './pages/Order';
import './default.scss';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());

  }, []);

  return (
    <div className="App">
      <AdminToolbar />
      <WorkerToolbar />
      <Switch>
        <Route exact path="/" render={() => (
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>
        )}/>
        <Route exact path="/contact" render={() => (
          <MainLayout>
            <Contact />
          </MainLayout>
        )} />
        <Route exact path="/search" render={() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )} />
        <Route exact path="/about" render={() => (
          <MainLayout>
            <About />
          </MainLayout>
        )} />
        <Route path="/search/:filterType" render={() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )} />
        <Route path="/product/:productID" render={() => (
          <MainLayout>
            <ProductDetails />
          </MainLayout>
        )} />
        <Route path="/cart" render={() => (
          <MainLayout>
            <Cart />
          </MainLayout>
        )} />
        <Route path="/payment" render={() => (
          <WithAuth>
            <MainLayout>
              <Payment />
            </MainLayout>
          </WithAuth>
        )} />
        <Route path="/registration" render={() => (
          <MainLayout>
            <Registration />
          </MainLayout>
        )} />
        <Route path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />
        <Route path="/ViewList"
          render={() => (
            <MainLayout>
              <ViewList />
            </MainLayout>
          )} />
        <Route path="/recovery" render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />
        <Route path="/dashboard" render={() => (
          <WithAuth>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </WithAuth>
        )} />
        <Route path="/order/:orderID" render={() => (
          <WithAuth>
            <DashboardLayout>
              <Order />
            </DashboardLayout>
          </WithAuth>
        )} />
        <Route path="/admin" render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </WithAdminAuth>
        )} />
        <Route path="/worker" render={() => (
          <WithWorkerAuth>
            <WorkerLayout>
              <Worker />
            </WorkerLayout>
          </WithWorkerAuth>
        )} />
      </Switch>
    </div>
  );
}

export default App;
