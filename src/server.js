import app from "./app.js";
import sequelize from "./config/database.js";

const PORT = process.env.PORT || 3000;

await sequelize.sync();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
