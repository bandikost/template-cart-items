import { Link } from "react-router-dom";
import cartIcon from "../../../public/Images/Icons/cart.png"
import { useSelector } from "react-redux";

export default function Nav() {
    const cart = useSelector(state => state.cart.items)
    const totalCount = cart.reduce((acc, items) => acc + items.count, 0)

    return (
        <nav className="flex items-center justify-between w-full max-w-[1300px] mx-auto px-5 text-lg">

                <ul className="flex space-x-4">
                    <li className="text-zinc-800 hover:text-zinc-300 duration-500">
                        <Link to="/" aria-label="Вернуться на главную страницу">Главная</Link>
                    </li>
                    <li className="text-zinc-800 hover:text-zinc-300 duration-500">
                        <Link to="/" aria-label="Вернуться на главную страницу">О нас</Link>
                    </li>
                    <li className="text-zinc-800 hover:text-zinc-300 duration-500">
                        <Link to="/" aria-label="Вернуться на главную страницу">Новости</Link>
                    </li>
                </ul> 

                <div className="flex relative items-center space-x-2">
                    <Link to="/cart" aria-label="Переход в корзину">
                        <img loading="lazy" className="w-8 h-8 object-cover" src={cartIcon}  alt="Корзина товаров"/>
                    {totalCount > 0 ? (
                        <div className="flex items-center justify-center text-white text-xs absolute -top-2 -right-2 w-5 h-5 bg-red-400 rounded-full">
                            {totalCount}
                        </div>
                    ) : (
                        <></>
                    )}
                        

                    </Link>
                </div>
   
        </nav>
    )
}