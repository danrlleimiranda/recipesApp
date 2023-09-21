import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

function FooterLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
export default FooterLayout;
