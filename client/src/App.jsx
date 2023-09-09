import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Gigs from './pages/gigs/Gigs';
import Gig from './pages/gig/Gig';
import Orders from './pages/Orders/Orders';
import MyGigs from './pages/myGigs/MyGigs';
import Message from './pages/message/Message';
import Add from './pages/add/Add';
import Messages from './pages/messages/Messages';
// import { Gig, Home } from './pages';
import './App.scss';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'gigs', element: <Gigs /> },
        { path: 'gig/:id', element: <Gig /> },
        { path: 'orders', element: <Orders /> },
        { path: 'mygigs', element: <MyGigs /> },
        { path: 'add', element: <Add /> },
        { path: 'messages', element: <Messages /> },
        { path: 'message/:id', element: <Message /> },
        { path: 'order', element: <Orders /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
      ],
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
