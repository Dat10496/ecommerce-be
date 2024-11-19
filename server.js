const app = require("./src/app");

const PORT = process.env.PORT || 3055;

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce is running on ${PORT}`);
});
process.on("SIGINT", () => {
  server.close(() => console.log("WSV eCommerce server is shutting down"));
});
