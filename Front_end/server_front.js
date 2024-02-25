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

app.get("/categories", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/categories"); // แก้ URL ให้ถูกต้อง
        res.render("categories/viewAll", { categories: response.data });
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

app.get("/categories/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/categories/" + req.params.id);
        res.render("categories/view", { categories: response.data });
    } catch(err) {
        res.status(500).send(err);
    }
});

app.get("/orders/create", async (req, res) => {
    try {
    res.render("orders/create");
} catch(err) {
    res.status(500).send(err)
}   
});

app.get("/categories/create", async (req, res) => {
    try {
    res.render("categories/create");
} catch(err) {
    res.status(500).send(err)
}   
});

app.post('/orders/create', async (req, res) => {
    try {
        const data = {
            orders_id: req.body.orders_id,
            products_id: req.body.products_id,
            user_id: req.body.user_id
        };
        await axios.post(base_url + '/orders', data);
        res.redirect('/orders');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/categories/create', async (req, res) => {
    try {
        const data = {
            category_id: req.body.category_id,
            category_name: req.body.category_name,
        };
        await axios.post(base_url + '/categories', data);
        res.redirect('/categories/');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/orders/update/:id", async (req, res) => {
    try {         
        const response = await axios.get(base_url + "/orders/" + req.params.id);
        res.render("orders/update", { orders: response.data });
    } catch(err) {
        res.status(500).send(err);
    }
});

app.get("/categories/update/:id", async (req, res) => {
    try {         
        const response = await axios.get(base_url + "/categories/" + req.params.id);
        res.render("categories/update", { categories: response.data });
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

app.post("/categories/update/:id", async (req, res) => {
    try {
        const data = {
            category_id: req.body.category_id,
            category_name: req.body.category_name,
        };
        await axios.put(base_url + '/categories/' + req.params.id, data); // ใช้ axios.put แทน axios.post
        res.redirect('/categories/');
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

app.get("/categories/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + "/categories/" + req.params.id);
        res.redirect("/categories");
    } catch(err) {
        res.status(500).send(err);
    }
});

app.listen(5500, () => {
    console.log("Server start on port 5500");
});
