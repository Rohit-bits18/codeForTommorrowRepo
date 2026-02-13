import express from 'express'
import cors from 'cors'
import { connection } from './db-config'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors({
  origin:"*",
  credentials:true,
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}));

connection()

export default app;
