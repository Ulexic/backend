const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 4000;

app.use(express.json());

const routes = [
    { path: '/account', router: require('./src/account/router') },
    { path: '/blog', router: require('./src/blog/router') },
    { path: '/profile', router: require('./src/profile/router') },
];

routes.forEach(route => {
    app.use(route.path, route.router);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
