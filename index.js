const express = require('express')
const app = express();

let port = 4000;

app.use(express.json());

app.use("/account", require("./src/account/router"));
app.use("/blog", require("./src/blog/router"));
app.use("/profile", require("./src/profile/router"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
