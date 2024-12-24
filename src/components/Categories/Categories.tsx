import { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, fetchRecipesByCategory } from '../../redux/actions';
import { CategoryType, Dispatch } from '../../types';
import Input from '../Input/Input';
import style from './Categories.module.css';

type CategoriesProps = {
  pathname: string;
  categories: CategoryType[];
};

function Categories({ pathname, categories }: CategoriesProps) {
  const dispatch: Dispatch = useDispatch();
  const [isSelect, setIsSelect] = useState(false);
  const [selectedRadioBtn, setSelectedRadioBtn] = useState('');

  const isRadioSelected = (value: string) => selectedRadioBtn === value;

  const handleRadioClick = (
    event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>,
    categoryName: string,
  ) => {
    setSelectedRadioBtn((event.target as HTMLInputElement).value);

    if (selectedRadioBtn === categoryName) {
      handleClear();
    } else {
      dispatch(fetchRecipesByCategory(pathname, categoryName));
      setIsSelect(!isSelect);
    }
  };
  if (!categories) {
    return <p>Loading...</p>;
  }
  const handleClear = () => {
    dispatch(fetchData(pathname, '', ''));
    setSelectedRadioBtn('');
  };

  return (
    <div className={ style.categories }>
      {categories && categories.slice(0, 5)
        .map((category: CategoryType) => (
          <Input
            type="radio"
            value={ category.strCategory }
            checked={ isRadioSelected(category.strCategory) }
            onClick={ (event) => handleRadioClick(event, category.strCategory) }
            id={ category.strCategory }
            key={ category.strCategory }
            label={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            inputStyle={ style.category }
          />
        ))}
      <button
        id="clean-all"
        data-testid="All-category-filter"
        onClick={ handleClear }
      >
        {' '}
        Clean All
      </button>
    </div>
  );
}
export default Categories;
