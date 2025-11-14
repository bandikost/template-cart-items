import { useDispatch, useSelector } from "react-redux";
import { updateAnimal } from "../../store/animalsSlice";
import { addToCart } from "../../store/cartSlice";


export default function ButtonToAddCart({animal, children, 
    className="text-sm text-center flex items-center justify-center rounded"
}) {
    const dispatch = useDispatch();
    const animals = useSelector(state => state.animals.animals);
    const actualAnimal = animals.find(a => a.id === animal.id);

    const handleDecrement = () => {
        if (!actualAnimal) return

        if(actualAnimal.lefts > 0 ) {
            dispatch(updateAnimal({id: actualAnimal.id, lefts: actualAnimal.lefts - 1}))
            dispatch(addToCart(animal))
        }

    }

    return (
        <button 
        className={className} 
        onClick={handleDecrement} 
        disabled={actualAnimal.lefts === 0}
        style={{
        opacity: actualAnimal.lefts === 0 ? 0.5 : 1,
        cursor: actualAnimal.lefts === 0 ? "not-allowed" : "pointer"
    }}
        >
            {children}
        </button>
    )
}