import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from "./components/nav";
import Gallery from "./components/gallery";
import Upload from "./components/upload";
import { Helmet } from 'react-helmet';

 
function App() {
  return (
        <>
<Router>
  <Nav />
  <Routes>
    <Route exact path="/" element={<Gallery />} />
    <Route exact path="/upload" element={<Upload />} />
  </Routes>
</Router>

<Helmet>

<link rel="stylesheet" href="/css/bootstrap.min.css"/>
 	  <link rel="stylesheet" href="/css/font-awesome.min.css"/>
	  <link rel="stylesheet" href="/css/slicknav.min.css"/>
	  <link rel="stylesheet" href="/css/fresco.css"/>
	  <link rel="stylesheet" href="/css/slick.css"/>
 
	  <link rel="stylesheet" href="/css/style.css"/>


    <script src="/js/vendor/jquery-3.2.1.min.js"></script>
    <script src="/js/jquery.slicknav.min.js"></script>
    <script src="/js/slick.min.js"></script>
    <script src="/js/fresco.min.js"></script>
    <script src="/js/main.js"></script>
 
</Helmet>

 </>
  );
}

export default App;







