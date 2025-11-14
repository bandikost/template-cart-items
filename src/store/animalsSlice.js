import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Компонент → dispatch(fetchAnimals()) 
    //     → Redux Toolkit вызывает thunk:
    //         fetchAnimals.pending  → loading=true
    //          fetchAnimals.fulfilled → animals=[...данные...]
    //          fetchAnimals.rejected  → error="Ошибка"


// Асинхронный thunk для получения данных с сервера
export const fetchAnimals = createAsyncThunk(
  "animals/fetchAnimals", // уникальное имя действия
  async () => {
    const res = await axios.get("http://localhost:5000/animals");
    return res.data;
  }
);

export const updateAnimal = createAsyncThunk(
  "animals/updateAnimal",
  async ({ id, lefts }) => { // Объекты с которыми мы работаем из базы
    await axios.put(`http://localhost:5000/animals/${id}`, { lefts })
    return {id, lefts} // вернём обновлённые данные, чтобы изменить Redux без запроса
  }
)


const animalsSlice = createSlice({
  name: "animals", // Имя слайса

  initialState: {
    animals: [], // массив животных, изначально пустой
    loading: false, // индикатор загрузки (true/false)
    error: null // текст ошибки, если запрос упадёт
  },

  extraReducers: (builder) => { // используется, чтобы обрабатывать внешние экшены (createAsyncThunk)
    builder
      .addCase(fetchAnimals.pending, (state) => { // обрабатывает момент начала запроса
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => { // выполняется при успешном ответе от сервера
        state.loading = false;
        state.animals = action.payload; 
        // action — это объект, который Redux всегда передаёт в редьюсер
        // payload: [
        // { id: 1, name: "Кошка" }, 
        // { id: 2, name: "Собака" }]

      })
      .addCase(fetchAnimals.rejected, (state, action) => { // выполняется при ошибке запроса
        state.loading = false;
        state.error = action.error.message;
      });
      
      builder
        .addCase(updateAnimal.fulfilled, (state, action) => {
          const { id, lefts } = action.payload;
          const animal = state.animals.find(a => a.id === id);
          if (animal) animal.lefts = lefts;
        });

  }
});

export default animalsSlice.reducer;
