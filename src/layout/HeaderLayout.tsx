import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

function HeaderLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
export default HeaderLayout;
