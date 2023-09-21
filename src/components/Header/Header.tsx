import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import logo from '../../images/logo.svg';

function Header() {
  return (
    <>
      <header>
        <div className="logo-container">
          <img src={ logo } alt="" />
          <h2>
            {'RECIPES '}
            <span>app</span>
          </h2>
        </div>
        <div className="button-container">
          <button data-testid="search-top-btn">
            <img src={ searchIcon } alt="" />
          </button>
          <Link to="/profile" data-testid="profile-top-btn">
            <img src={ profileIcon } alt="" />
          </Link>
        </div>
      </header>
      <div>
        <h2>Meals</h2>
      </div>
    </>
  );
}
export default Header;
