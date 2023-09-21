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
        width: '100%',
        border: '1px solid black',
        position: 'fixed',
        bottom: '0',
      } }
    >
      <Link data-testid="drinks-bottom-btn" to="/drinks">
        <img src={ drinkIcon } alt="Drink Icon" />
      </Link>
      <Link data-testid="meals-bottom-btn" to="/meals">
        <img src={ mealIcon } alt="Meals Icon" />
      </Link>
    </footer>
  );
}
export default Footer;
