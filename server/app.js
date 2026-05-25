import express from 'express';
import 'dotenv/config';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import session from 'express-session';
import favoritesRouter from './routers/favoritesRouter.js';
import authRouter from './routers/authRouter.js';
import profileRouter from './routers/profileRouter.js';
import adminRouter from './routers/adminRouter.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const server = createServer(app);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https://ddragon.leagueoflegends.com']
      }
    }
  })
);

app.use(express.static('../client/dist'));

app.use(express.json());

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56
});

app.use(generalLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax'
    }
  })
);

app.use(authLimiter, authRouter);

app.use(generalLimiter, favoritesRouter);

app.use(generalLimiter, profileRouter);

app.use(authLimiter, adminRouter);

const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: true
  }
});

let onlineUsers = 0;

io.on('connection', (socket) => {
  onlineUsers++;
  io.emit('online-count', onlineUsers);

  socket.on('disconnect', () => {
    onlineUsers--;
    io.emit('online-count', onlineUsers);
  });
});

app.get('/*splat', (req, res) => {
  res.sendFile(path.resolve('../client/dist/index.html'));
});

const PORT = process.env.PORT ?? 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
