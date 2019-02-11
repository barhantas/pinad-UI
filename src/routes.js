import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import HomePage from './pages/HomePage';

export const ROUTES = [
  {
    icon: 'home',
    path: '/',
    name: 'Home',
    component: HomePage,
    disableSider: false,
    disableHeader: false,
    disableFooter: true,
    disableContentHeader: true,
  },
  {
    icon: 'shopping-cart',
    path: '/first',
    name: 'First Page',
    component: FirstPage,
    disableSider: false,
    disableHeader: false,
    disableFooter: true,
    disableContentHeader: true,
  },
  {
    icon: 'customer-service',
    path: '/second',
    name: 'Second Page',
    component: SecondPage,
    disableSider: false,
    disableHeader: false,
    disableFooter: true,
    disableContentHeader: true,
  },
];
