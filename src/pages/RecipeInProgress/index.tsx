import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { InProgressType } from '../../types';

export default function RecipeInProgress() {
  const [inProgress, setInProgress] = useState<InProgressType>({
    drinks: {},
    meals: {},
  });

  const { id } = useParams();
  const { pathname } = useLocation();

  // talvez fazer um find no estado do redux de acordo com o id e o caminho.

  useEffect(() => {
    const inProgressLocalStorage = localStorage.getItem('inProgressRecipes') || '{}';
    const recipesInProgress = JSON.parse(inProgressLocalStorage);
    const route = pathname.includes('meals') ? 'meals' : 'drinks';

    if (id && recipesInProgress[route][id]) {
      setInProgress({ ...recipesInProgress[route][id] });
    }
  }, [id, pathname]);

  return (
    <div>
      {/* {!inProgress.meals && id ? (
        <div>
            {inProgress.drinks[id].map((ingredient, index) => (
                <img src={} alt="" />
            ))}

        </div>

        ))
    ):} */}
    </div>
  );
}
