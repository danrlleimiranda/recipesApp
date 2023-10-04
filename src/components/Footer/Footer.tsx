import { Link } from 'react-router-dom';
import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      style={ {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1rem',
        background: 'white',
        width: '100%',
        border: '1px solid black',
        position: 'fixed',
        bottom: '0',

      } }
    >
      <Link to="/drinks">
        <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } alt="Meals Icon" data-testid="meals-bottom-btn" />
      </Link>
    </footer>
  );
}
export default Footer;
