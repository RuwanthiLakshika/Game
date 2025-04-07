import express from 'express';
import cors from 'cors';
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

const api_key = "pnb3nxxeurye";
const api_secret =
  "cxvqxsxh6yrj3pw254654mt4yhcbwgpskq4c7g8k7h4xp896ugwd9ndyhxkckjzk";
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});