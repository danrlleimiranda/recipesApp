import { useDispatch } from 'react-redux';
import { useState, MouseEvent } from 'react';
import { fetchData, fetchRecipesByCategory } from '../../redux/actions';
import { CategoryType, Dispatch } from '../../types';
import Input from '../Input/Input';

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
      console.log('teste');
      dispatch(fetchData(pathname, '', ''));
      setSelectedRadioBtn('');
    } else {
      dispatch(fetchRecipesByCategory(pathname, categoryName));
      setIsSelect(!isSelect);
    }
  };

  return (
    <div>
      {categories && categories
        .filter((_: any, index: number) => index < 5)
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
            labelStyle={ {
              backgroundColor: 'white',
              marginLeft: '5px',
              borderRadius: '5px',
              border: '1px solid black',
            } }
          />
        ))}
    </div>
  );
}
export default Categories;
