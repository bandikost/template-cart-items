import ButtonToAddCart from "./ui/ButtonToAddCart"
import { useAnimals } from "../hooks/useAnimals";
import { Link } from "react-router-dom";

export default function Card() {
  const { animals, loading, error } = useAnimals(true); // true — авто-загрузка
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

 

    return (
<div className="mt-20">   
    <div className="grid gap-6 grid-cols-3">
    {animals
     .filter(a => a.lefts > 0)
     .map(a => ( 
      <div key={a.id} className="flex flex-col h-72 w-full px-8 border p-2 rounded-xl">
        <h1 className="text-xl h-20 mt-4">{a.name}</h1>
        <article className="h-20">{a.descrip}</article>
        <p className="my-4">Осталось: {a.lefts}</p>
        <div className="flex items-center mb-4">   
            <p className="px-4">{a.price}₽</p>
            <ButtonToAddCart animal={a} >
              Добавить
            </ButtonToAddCart>  {/* Передаем animal, чтобы не пришлось перебирать массив в дочернем el */}
            <button className="mx-2">
              <Link to={`/card/${a.id}`} aria-label="Перейти к описанию товара">Перейти</Link>
            </button>
        </div> 
        
      </div>
    ))}
    </div>
</div>
    )
}