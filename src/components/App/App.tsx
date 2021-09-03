import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Header from '../Header';
import Footer from '../Footer';

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Header />
        <Content className="App">Content</Content>
        <Footer />
      </Layout>
    </>
  );
};

export default App;
