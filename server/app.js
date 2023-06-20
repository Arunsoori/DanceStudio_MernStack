const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketio = require("socket.io");
const db = require("./config/db");
const socketapi = require('./sockets/groupChat')
db();

// Middlewares
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Session
const min = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "secret-key",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: min },
  })
);

// Routes
app.use("/admin", adminRouter);
app.use("/", userRouter);

// Port
const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Socket.io setup
const io = socketio(server, {
  cors: {
    origin: process.env.CORS_ORIGIN_URL,
    methods: ["GET", "POST"],
  },
});
socketapi.io.attach(server,{
  cors:{
    origin: '*'
  }
})


server.listen(port, () => {
  console.log("Server running on port " + port);
});
