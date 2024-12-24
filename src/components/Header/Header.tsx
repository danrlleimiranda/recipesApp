import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';
import style from './header.module.css';

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
      <div className={ style.headerContainer }>

        <div className={ style.logo }>
          <img src={ logo } alt="Logo" />
          <h2>
            My Recipes
          </h2>
        </div>

        <div className={ style.icons }>
          {(pathname === '/drinks' || pathname === '/meals') && (
            <button onClick={ showSearchBar }>
              <img src={ searchIcon } alt="" data-testid="search-top-btn" />
            </button>)}
          <Link to="/profile">
            <img src={ profileIcon } alt="" data-testid="profile-top-btn" />
          </Link>
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
