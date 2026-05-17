import express from 'express';
import 'dotenv/config';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import session from 'express-session';
import favoritesRouter from './routers/favoritesRouter.js';
import authRouter from './routers/authRouter.js';
import profileRouter from './routers/profileRouter.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';

const app = express();
const server = createServer(app);

app.use(express.static('../client/dist'));

app.use(express.json());

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56
});

app.use(generalLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56
});

app.use(helmet());

app.use(
  cors({
    origin: '*',
    credentials: true
  })
);

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



const chatHistory = [];

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('user connected: ', socket.id);

  socket.emit('chat-history', chatHistory);

  socket.on('send-message', (message) => {
    const timeAndMessage = {
      ...message,
      time: new Date().toLocaleTimeString()
    };

    chatHistory.push(timeAndMessage);
    if (chatHistory.length > 100) {
      chatHistory.shift();
    }

    io.emit('receive-message', timeAndMessage);
  });

  socket.on('get-messages', () => {
    socket.emit('chat-history', chatHistory);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected: ', socket.id);
  });
});

app.get('/*splat', (req, res) => {
  res.sendFile(path.resolve('../client/dist/index.html'));
});

const PORT = process.env.PORT ?? 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
