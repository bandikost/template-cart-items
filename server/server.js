import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Получаем в формате json

const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

app.get("/animals", async (req, res) => {
  try {
    const [rows] = await db.query("select * from animals") // получаем данные в строку
    res.json(rows) // передаем эти данные в json 
  }
  catch(err) {
    console.error(err)
    res.status(500).json({ error: "Ошибка сервера" })
  }
})

app.put("/animals/:id", async (req, res) => {
  const { id } = req.params // объект req — это входящий запрос 
  const { lefts } = req.body // тело запроса 
  
  // Если на сервер идет запрос http://localhost/animals/6 и { "lefts": 4 
  // Тогда на сервер мы получим 
  // req.params = { id: 6 }
  // req.body = { lefts: 4 }

  try {
    await db.query("update animals set lefts = ? where id = ?", [lefts, id])
    res.json({ success: true })

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка обновления животного" });
  }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log("✅ Сервер запущен на http://localhost:5000"))