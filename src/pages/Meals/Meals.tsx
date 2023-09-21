import { useSelector } from 'react-redux';
import { GlobalStateType } from '../../types';

function Meals() {
  const meals = useSelector((state: GlobalStateType) => state.recepiesReducer.meals);
  return (
    <div>Test</div>
  );
}
export default Meals;
