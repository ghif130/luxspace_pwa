import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Browse from './components/Browse';
import Arrive from './components/Arrive';
import Client from './components/Client';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Offline from './components/Offline';
import Splash from './pages/Splash';
import Profile from './pages/Profile';

function App() {
  // const [items, setItems] = React.useState([])
  const [items, setItems] = useState([])
  const [offline, setOffline] = useState(!navigator.onLine)
  const [isLoading, setIsLoading] = useState(true)
    // const [data, setData] = useState(null);

  setTimeout( () => {
    setIsLoading(false)
  }, 1500)

  function handleOffline(){
    setOffline(!navigator.onLine)
  }

  useEffect(() => {
    (async function() {
      try {
        const response = await fetch(
          // `https://jsonplaceholder.typicode.com/posts?_limit=8`
          // 'https://api-harilibur.vercel.app/api?month=9&year=2024'
          'https://donasi.lazpersada.org/api/products'
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        // let postsData = await response.json();
        let postsData1 = await response.json();
        let postsData = postsData1.data
        console.log(postsData)
        setItems(postsData);        
        // setError(null);
      } catch (err) {
        // setError(err.message);
        setItems(null);
      } finally {
        // setLoading(false);

        const script = document.createElement("script")
        script.src = "/carousel.js"
        script.async = false
        document.body.appendChild(script)
      }

      handleOffline()
      window.addEventListener('online', handleOffline)
      window.addEventListener('offline', handleOffline)

      return function(){
        window.removeEventListener('online', handleOffline)
        window.removeEventListener('offline', handleOffline)
      }
    })();    

    // fetchDataForPosts();
  }, [offline]);
  
  // React.useEffect(function(){
  //   (async function() {
  //     const response = await fetch('https://api-harilibur.vercel.app/api?month=9&year=2024')
  //     const {nodes} = await response
  //     console.log(nodes)
  //     setItems(nodes)
  //   })();
  // }, []);

  return (
    <>
      {isLoading ? <Splash /> : 
        (
          <>
            {offline && <Offline />}
            <Header />    
            <Hero />
            <Browse />
            <Arrive items={items}/>
            <Client />
            <Aside />
            <Footer />
          </>
        )
      }            
    </>
  );
}

export default function Navigate(){
  const router = createBrowserRouter(
    [
      {    
        path: "/", children: [{ path: "/", element: <App /> }],
      },
      {    
        path: "/profile", children: [{ path: "/profile", element: <Profile /> }],
      }
    ],
    {future: 
      {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
      }
    }
  )

  return(
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
    // <Router router={router} future={{ v7_startTransition: true }}>
    //   <Routes>
    //     <Route path="/">
    //       <Route path="/" element={<App />} />
    //    </Route>
    //     {/* <Route path="/" exact element={<App />}/>
    //     <Route path="/profile" exact element={<Profile />}/> */}
    //   </Routes>
    // </Router>
  )
};
