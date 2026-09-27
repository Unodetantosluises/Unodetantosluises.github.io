import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home/Home';
import Portfolio from './pages/Portfolio/Portfolio';
import Experience from './pages/Experience/Experience';
import Blog from './pages/Blog/Blog';
import BlogPosts from './pages/BlogPosts/BlogPosts';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import BlogPost from './pages/BlogPost/BlogPost';
import PortfolioProject from './pages/PortfolioProject/PortfolioProject';

export function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portafolio" element={<Portfolio />} />
          <Route path="/portafolio/proyectos/:slug" element={<PortfolioProject />} />
          <Route path="/portafolio/:slug" element={<PortfolioProject />} />
          <Route path="/experiencia" element={<Experience />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/posts" element={<BlogPosts />} />
          <Route path="/blog/posts/:slug" element={<BlogPost />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/sobre-mi" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
