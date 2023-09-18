import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Orders from './pages/Orders/Orders';
import Add from './pages/add/Add';
import Gig from './pages/gig/Gig';
import Gigs from './pages/gigs/Gigs';
import Home from './pages/home/Home';
import Message from './pages/message/Message';
import Messages from './pages/messages/Messages';
import MyGigs from './pages/myGigs/MyGigs';
// import { Gig, Home } from './pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.scss';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Pay from './pages/pay/Pay';
import Success from './pages/success/Success';

const queryClient = new QueryClient();

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
        { path: 'pay/:id', element: <Pay /> },
        { path: 'success', element: <Success /> },
      ],
    },
  ]);

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
