const functions = require("firebase-functions");
const Koa = require("koa");
const Router = require("koa-router");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const app = new Koa();
const router = new Router();

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now(); // --(1)
  await next();
  const ms = Date.now() - start; // --(6)
  ctx.set("X-Response-Time", `${ms}ms`); // --(7)
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now(); // --(2)
  await next();
  const ms = Date.now() - start; // --(4)
  console.log(`${ctx.method} ${ctx.url} - ${ms}`); // --(5)
});

// response
// app.use(async (ctx) => {
//   ctx.body = "Hello World222"; // --(3)
// });

router.get("/hoge", (ctx, next) => {
  ctx.body = "Hello hogehoge22!";
});

app.use(router.routes()).use(router.allowedMethods());
// app.listen(3000);
