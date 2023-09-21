import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from '../SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import logo from '../../images/logo.svg';

function Header() {
  const [searchBar, setSearchBar] = useState(false);
  const showSearchBar = () => {
    setSearchBar((prev) => !prev);
  };

  const { pathname } = useLocation();
  const title = pathname === '/meals' ? 'Meals' : 'Drinks';
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

          <Link to="/profile" data-testid="profile-top-btn">
            <img src={ profileIcon } alt="" />
          </Link>
          {searchBar && <SearchBar />}
          <button data-testid="search-top-btn" onClick={ showSearchBar }>
            <img src={ searchIcon } alt="" />
          </button>
        </div>
      </header>
      <div>
        <h2 data-testid="page-title">{ title }</h2>
      </div>
    </>
  );
}
export default Header;
