import { useDispatch, useSelector } from "react-redux"
import ButtonToRemoveCart from "../components/ui/ButtonToRemoveCart"
import ButtonToAddCart from "../components/ui/ButtonToAddCart"
import { clearCart } from "../store/cartSlice"


export default function Cart() {
    const cart = useSelector(state => state.cart.items)
    const total = cart.reduce((acc, item) => acc + item.price * item.count, 0)
    const totalCount = cart.reduce((acc, items) => acc + items.count, 0)

    const dispatch = useDispatch()

    const handleClear = () => {
        if (total > 0) {
            dispatch(clearCart())
        }
    }

    return (
        <section className="flex flex-col">
        <h1 className="flex items-center justify-center text-2xl">Корзина</h1>
       
            <div className="flex items-center justify-between mt-10">
                {total > 0 && (
                     <div className="flex flex-col">
                         <ul>
                        {cart.map((item, index) => (
                        <li key={item.id + '-' + index} className='flex flex-row justify-start p-4 text-lg' >
                            <p>{item.name} — {item.price}₽ </p>
                            
                            <div className="bg-zinc-500 ml-2 rounded flex text-lg">
                                <ButtonToRemoveCart animal={item} 
                                    className="p-0 w-0 h-0 !bg-transparent text-center flex items-center justify-center " />

                                <p className="px-3">{item.count}</p>

                                <ButtonToAddCart 
                                    className="p-0 w-0 h-0 !bg-transparent  text-center flex items-center justify-center " animal={item}>
                                    +
                                </ButtonToAddCart>
                                
                            </div>
                            
                        </li>
                        ))}
                    </ul>
                    <div className="mt-10">
                        <button className="w-72 !p-1 ">Очистить корзину</button>
                    </div>
                      </div>
                   
                    )}
                

                    {total > 0 && (
                    <div className="grid gap-2 text-lg">
                        <input placeholder="Введите промокод" maxLength={20} minLength={5} className="p-1 bg-gray-600 rounded-md" />
                            <p className="terxt-white pt-4">Количество товаров: {totalCount}</p>
                            <p className="terxt-white pb-4">Общая стоимость - {total}₽</p>
                        <button className="!p-1" onClick={handleClear}>Оплатить</button>
                        <p className="text-xs w-full max-w-72"><sup>*</sup> при нажатии на кнопку очищается корзина, товары не возвращаются в базу</p>
                    </div>
                    
                
                    )}

            </div>
            
    
        

        {total === 0 && (
            <p className="flex items-center justify-center text-2xl"> Ваша корзина пока что пустая </p>
        )}
        </section>
        
    )
}