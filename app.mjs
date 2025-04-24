import express from "express";
import session from "express-session";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";

const app = express();
app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // HTTPS 쓸 땐 true
  })
);

// 라우터
app.use("/posts", postsRouter);
app.use("/auth", authRouter);

// 로그인한 사용자 정보
app.get("/me", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
});

// 로그아웃
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("로그아웃 되었습니다.");
  });
});

// 404 처리
app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(8080, () => {
  console.log("✅ 서버 실행 중: http://localhost:8080");
});
