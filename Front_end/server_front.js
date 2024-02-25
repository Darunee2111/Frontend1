const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios'); // ย้าย import มาที่นี่

const app = express();
const base_url = "http://localhost:3000";

app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.get("/orders", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/orders"); // แก้ URL ให้ถูกต้อง
        res.render("orders/viewAll", { orders: response.data });
    } catch(err) {
        res.status(500).send(err);
    }
});

app.get("/orders/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/orders/" + req.params.id);
        res.render("orders/view", { orders: response.data });
    } catch(err) {
        res.status(500).send(err);
    }
});

app.get("/orders/create", async (req, res) => {
    res.render("orders/create");
});

app.post('/orders/create', async (req, res) => {
    try {
        const data = {
            orders_id: req.body.orders_id,
            products_id: req.body.products_id,
            user_id: req.body.user_id
        };
        await axios.post(base_url + '/orders', data);
        res.redirect('/orders/');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/orders/update/:id", async (req, res) => {
    try {         
        const response = await axios.get(base_url + "/orders/" + req.params.id);
        res.render("orders/update", { product: response.data });
    } catch(err) {
        res.status(500).send(err);
    }
});

app.post("/orders/update/:id", async (req, res) => {
    try {
        const data = {
            orders_id: req.body.orders_id,
            products_id: req.body.products_id,
            user_id: req.body.user_id
        };
        await axios.put(base_url + '/orders/' + req.params.id, data); // ใช้ axios.put แทน axios.post
        res.redirect('/orders/');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/orders/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + "/orders/" + req.params.id);
        res.redirect("/orders");
    } catch(err) {
        res.status(500).send(err);
    }
});

app.listen(5500, () => {
    console.log("Server start on port 5500");
});
