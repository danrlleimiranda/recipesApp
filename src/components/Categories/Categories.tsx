import { useDispatch } from 'react-redux';
import { fetchData } from '../../redux/actions';
import { CategoryType, Dispatch } from '../../types';

type CategoriesProps = {
  pathname: string;
  categories: CategoryType[];
  currentPath: string;
};

function Categories({ pathname, categories, currentPath }: CategoriesProps) {
  const dispatch: Dispatch = useDispatch();
  return (
    <div>
      {categories && categories
        .filter((_: any, index: number) => index < 5)
        .map((category: CategoryType) => (
          <button
            type="button"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => {
              dispatch(fetchData(pathname, category.strCategory, ''));
            } }
            style={ {
              backgroundColor: 'white',
              marginLeft: '5px',
              borderRadius: '5px',
              border: '1px solid black',
            } }
          >
            {category.strCategory}
          </button>
        ))}
    </div>
  );
}
export default Categories;
