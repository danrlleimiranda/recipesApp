import { Link, useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle/PageTitle';
import ProfileOption from '../../components/ProfileOption/ProfileOption';
import profileIcon from '../../images/profileIcon.svg';
import doneRecipesIcon from '../../images/doneRecipesIcon.svg';
import favoriteRecipesIcon from '../../images/favoriteRecipesIcon.svg';
import logoutIcon from '../../images/logoutIcon.svg';

function Profile() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const email = localStorage.getItem('user');
  return (
    <div
      data-testid="page-title"
      style={ {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      } }
    >
      <PageTitle
        icon={ profileIcon }
        title="Profile"
      />
      <p data-testid="profile-email">{email}</p>
      <div>
        <Link
          to="/done-recipes"
          data-testid="profile-done-btn"
        >
          <ProfileOption
            icon={ doneRecipesIcon }
            title="Done Recipes"
          />
        </Link>

        <Link
          to="/favorite-recipes"
          data-testid="profile-favorite-btn"
        >
          <ProfileOption
            icon={ favoriteRecipesIcon }
            title="Favorite Recipes"
          />
        </Link>

        <button
          onClick={ handleLogout }
          data-testid="profile-logout-btn"
        >
          <ProfileOption
            icon={ logoutIcon }
            title="Logout"
          />
        </button>
      </div>
    </div>
  );
}
export default Profile;
