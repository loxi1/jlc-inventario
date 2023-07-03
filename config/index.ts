import dotenv from 'dotenv';
dotenv.config();

const PORT = Number(process.env.PORT) || 4000
const DB_URL = String(process.env.DATABASE_URL) || ''
const JWT_SECRET = String(process.env.JWT_SECRET) || ''
const SENDGRID_API_KEY = String(process.env.SENDGRID_API_KEY) || ''
const BASE = String(process.env.BASE)
const HOST_FRONT = String(process.env.HOST_FRONT) || ''
export {PORT, DB_URL, BASE, HOST_FRONT, JWT_SECRET, SENDGRID_API_KEY}
