import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (pathname !== '/meals' && pathname !== '/drinks') {
      setSearchBar(false);
    }
  }, [pathname]);

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
    <header>
      <div className="header">

        <div className="logo-container">
          <img src={ logo } alt="" />
          <h2>
            {'RECIPES '}
            <span>app</span>
          </h2>
        </div>

        <div className="button-container">
          <div className="button-container">
            {(pathname === '/drinks' || pathname === '/meals') && (

              <button onClick={ showSearchBar }>
                <img src={ searchIcon } alt="" data-testid="search-top-btn" />
              </button>)}
            {pathname !== '/profile' && (
              <Link to="/profile">
                <img src={ profileIcon } alt="" data-testid="profile-top-btn" />
              </Link>)}

          </div>

        </div>

      </div>

      <h2 data-testid="page-title">{ title }</h2>
      <div className="searchBar-container">

        {searchBar && <SearchBar />}
      </div>
    </header>
  );
}
export default Header;
