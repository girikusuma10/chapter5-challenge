const express= require("express");
const cors= require("cors");
const routes = require("./routes");
const swaggerUi = require('swagger-ui-express');
const apiDoc =require("./apiDoc.json");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/apiDoc', swaggerUi.serve, swaggerUi.setup(apiDoc));

routes(app)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});