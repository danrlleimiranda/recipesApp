import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import style from './footer.module.css';

function Footer() {
  return (
    <footer
      className={ style.footer }
      data-testid="footer"

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
