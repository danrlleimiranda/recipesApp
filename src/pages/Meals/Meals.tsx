import { useSelector } from 'react-redux';
import { GlobalStateType } from '../../types';

function Meals() {
  const meals = useSelector((state: GlobalStateType) => state.recepiesReducer.meals);
  return (
    <div
      style={ {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      } }
    >
      Meals

    </div>
  );
}
export default Meals;
