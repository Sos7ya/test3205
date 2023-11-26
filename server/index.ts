import express from "express";
import cors from "cors";
import axios, { CancelTokenSource } from "axios";
import { model } from "./models/model";

interface reqQuery {
  email: string;
  number?: string;
}

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let currentRequest: CancelTokenSource | null = null;
let latestRequestVersion = 0;

app.get("/users", async (req: express.Request<{}, {}, {}, reqQuery>, res) => {
  const currentRequestVersion = latestRequestVersion + 1;
  latestRequestVersion = currentRequestVersion;

  if (currentRequest) {
    currentRequest.cancel("Request cancelled");
  }

  const source = axios.CancelToken.source();
  currentRequest = source;

  try {
    await new Promise((resolve) => setTimeout(resolve, 5000)).then(() => {}); // 5-секундная задержка
    
    const { email, number } = req.query;

    // Проверяем, является ли текущий запрос последним
    if (currentRequestVersion !== latestRequestVersion) {
      console.log('Запрос отменен, так как поступил новый запрос');
      return;
    }

    let filteredUsers = model.findUsers({ email, number });

    // Отправка ответа
    res.json(filteredUsers);
    latestRequestVersion = 0;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Запрос отменен:', error.message);
    } else {
      console.log('Произошла ошибка при выполнении запроса:');
    }

    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});