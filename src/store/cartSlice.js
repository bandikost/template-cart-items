import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name: "cart",

    initialState: {
        items: []
    },

    reducers: {
        addToCart(state, action){
            const item = action.payload // Подразумевается, что с товаром будут какие то действия
            const existing = state.items.find(i => i.id === item.id) // ищем товар по id

            if (existing) existing.count += 1 // Если товар найден, то увеличиваем его в корзине 1 
            else state.items.push({...item, count: 1}) // Если не найдено, то добавляем этот товар
        },

        // Удаляем по id
        removeFromCart(state, action){
            const id = action.payload // Подразумевается, что с id товара будут джействия
            const existing = state.items.find(i => i.id === id) // ищем товар по id

            if (existing) {
                if (existing.count > 1) existing.count -= 1; // Если товар есть и количество больше 1, то убираем 1 единицу

             else state.items = state.items.filter(i => i.id !== id);       
        } // Если товара нет, то мы просто фильтруем корзину и ничего не делаем
        },

        clearCart: (state) => {
            state.items = []
        }
    }
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions
export default cartSlice.reducer