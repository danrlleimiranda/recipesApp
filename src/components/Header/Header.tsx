import { Link } from 'react-router-dom';
import { useState } from 'react';
import Input from '../Input/Input';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import logo from '../../images/logo.svg';

function Header() {
  const [searchBar, setSearchBar] = useState(true);
  const showSearchBar = () => {
    setSearchBar(!searchBar);
  };
  return (
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
      <div
        className="logo-container"
        style={
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }
      }
      >
        <img src={ logo } alt="" />
        <span>
          {'RECIPES '}
          <span>app</span>
        </span>
      </div>
      <div className="button-container">
        <Input data-testid="search-input" hidden={ searchBar } />
        <button data-testid="search-top-btn" onClick={ showSearchBar }>
          <img src={ searchIcon } alt="" />
        </button>
        <Link to="/profile" data-testid="profile-top-btn">
          <img src={ profileIcon } alt="" />
        </Link>
      </div>
    </header>
  );
}
export default Header;
