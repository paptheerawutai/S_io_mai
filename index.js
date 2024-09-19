import express from 'express';
import http from 'http';
import cors from 'cors';
import { readdirSync } from 'fs';
import path from 'path';
import 'dotenv/config';  // เพิ่มการใช้ dotenv

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Dynamic import for routes
const __dirname = path.dirname(new URL(import.meta.url).pathname);

readdirSync('./routes').map(async (r) => {
  const route = await import(`./routes/${r}`);
  app.use('/io', route.default);
});

// สร้าง HTTP Server
const server = http.createServer(app);

// Listen
const port = process.env.PORT || 5005;
server.listen(port, () => console.log(`Server is running on port ${port}`));

