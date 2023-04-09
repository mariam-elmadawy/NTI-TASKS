require("dotenv").config();
const app = require("./app/src")


app.listen(process.env.port, () => {
    console.log(`http://localhost:${process.env.port}`);
})