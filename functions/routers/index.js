const admin = require("firebase-admin");
const mysql = require("mysql");

admin.initializeApp();
const db = admin.firestore();
const endPoint = "/articles";

module.exports = (router) => {
  router.get(endPoint, async (ctx, next) => {
    const data = ctx.request.body;

    const messages = [];
    try {
      const connection = mysql.createConnection({
        host: "database-instagram.cmlaa0x24wd4.ap-northeast-1.rds.amazonaws.com",
        user: "admin",
        password: "fcfnMnaSXAcQfgdzCGqv",
        port: 3306,
      });

      connection.connect((err) => {
        if (err) {
          console.error("@@Database connection failed: " + err.stack);
          return;
        }
        console.log("Connected to database.");
      });

      connection.end();

      // const querySnapshot = await db
      //   .collection("articles")
      //   .orderBy("createdAt", "desc")
      //   .limit(10)
      //   .get();
      // querySnapshot.forEach((doc) => {
      //   messages.push({
      //     id: doc.id,
      //     ...doc.data(),
      //   });
      // });
    } catch (error) {
      console.log(error, "@@@@@@@@@@@@@@@");
    }

    ctx.response.body = {
      messsage: "Called by the GET method",
      messages,
    };
  });
};
