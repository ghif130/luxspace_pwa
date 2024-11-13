import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Browse from './components/Browse';
import Arrive from './components/Arrive';
import Client from './components/Client';
import Aside from './components/Aside';
import Footer from './components/Footer';

function App() {
  // const [items, setItems] = React.useState([])
  const [items, setItems] = useState([])
    // const [data, setData] = useState(null);


  useEffect(() => {
    const fetchDataForPosts = async () => {
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
      }
    };    

    fetchDataForPosts();
  }, []);
  
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
      <Header />    
      <Hero />
      <Browse />
      <Arrive items={items}/>
      <Client />
      <Aside />
      <Footer />
    </>
  );
}

export default App;
