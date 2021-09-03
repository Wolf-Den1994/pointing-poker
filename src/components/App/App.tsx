import React from 'react';
import './App.scss';
import Header from '../Header';
import Footer from '../Footer';
import Content from '../Content';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
};

export default App;
