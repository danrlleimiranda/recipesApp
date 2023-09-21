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

  const whatTitle = () => {
    switch (pathname) {
      case '/meals': return 'Meals';
      case '/drinks': return 'Drinks';
      case '/profile': return 'Profile';
      case '/done-recipes': return 'Done Recipes';
      case '/favorite-recipes': return 'Favorite Recipes';
      default: return 'Recipes';
    }
  };
  const title = whatTitle();
  return (
    <>
      <header
      style={
      {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1rem',
        width: '100%',
        border: '1px solid black',
        marginBottom: '1rem',
      }
    }
    >
        <div className="logo-container">
          <img src={ logo } alt="" />
          <h2>
            {'RECIPES '}
            <span>app</span>
          </h2>
        </div>
        <div className="button-container">
          {pathname !== '/profile' && (
            <Link to="/profile">
              <img src={ profileIcon } alt="" data-testid="profile-top-btn" />
            </Link>)}

          {searchBar && <SearchBar />}
          {(pathname === '/drinks' || pathname === '/meals') && (

            <button onClick={ showSearchBar }>
              <img src={ searchIcon } alt="" data-testid="search-top-btn" />
            </button>)}
        </div>
      </header>
      <div>
        <h2 data-testid="page-title">{ title }</h2>
      </div>
    </header>
  );
}
export default Header;
