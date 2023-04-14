
require("dotenv").config()
const app = require("./app/running")


app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`));