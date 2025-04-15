import { Outlet } from 'react-router-dom';
import Header from '../ui/Header';
import Footer from '../ui/Footer';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* 各ページがここにレンダリングされる */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
