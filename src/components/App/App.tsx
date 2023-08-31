import { Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import style from './App.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../../pages/Home/Home';
import Game from '../../pages/Game/Game';
import Lobby from '../../pages/Lobby/Lobby';
import Result from '../../pages/Result/Result';
import NotFound from '../../pages/NotFound/NotFound';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#40a9ff',
          borderRadius: 0,
          colorBgContainer: '#add7ff11',
        },
      }}
    >
      <div className={style.wrapper}>
        <Header />
        <main className={style.main}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lobby/:roomId" element={<Lobby />} />
              <Route path="/game/:roomId" element={<Game />} />
              <Route path="/result/:roomId" element={<Result />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </ConfigProvider>
  );
};

export default App;
