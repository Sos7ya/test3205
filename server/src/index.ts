import express from "express";
import cors from "cors";
import axios, { CancelTokenSource } from "axios";
import { model } from "./model";

interface reqQuery {
  email: string;
  number?: string;
}

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let currentRequest: CancelTokenSource | null = null;

app.get("/users", async (req: express.Request<{}, {}, {}, reqQuery>, res) => {
  if (currentRequest) {
    currentRequest.cancel("Request cancelled");
  
  }

  const source = axios.CancelToken.source();
  currentRequest = source;

  try {
    await new Promise((resolve) => setTimeout(resolve, 5000)).then(() => {}); // 5-секундная задержка
    
    const { email, number } = req.query;

    let filteredUsers = model.findUsers({ email, number });

    if(filteredUsers.length === 0) {
      return res.status(404).json({ error: "Users not found" });
    }

    res.status(200).json(filteredUsers);
  }
  catch (error) {
    if (axios.isCancel(error)) {
      
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});