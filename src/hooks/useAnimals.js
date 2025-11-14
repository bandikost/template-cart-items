import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnimals } from "../store/animalsSlice";


// если autoFetch = true, компонент сам запрашивает животных при монтировании;
// если false, компонент просто читает их из Redux, не делая лишний запрос.

export const useAnimals = (autoFetch = false) => {
  const dispatch = useDispatch(); // Для работы со slice
  const { animals, loading, error } = useSelector(state => state.animals); // Инициализируем нужный слайс и его объекты

  useEffect(() => {
    if (autoFetch) dispatch(fetchAnimals()); // вызывает запрос, который возвращает массив animals
  }, [autoFetch, dispatch]); 

  return { 
    animals, loading, error, refetch: () => dispatch(fetchAnimals()) // хук должен вернуть, что нужно компоненту для работы с животными
}; 
// сами данные (animals), 
// состояние загрузки (loading),
// возможную ошибку (error), 
// возможность повторно сделать запрос (refetch)

};
