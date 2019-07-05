const express = require('express');
const bodyParser = require('body-parser');

let nextID = 3;
let items = [{ id: 1, name: 'tea' }, { id: 2, name: 'pen' }];

const app = express();
app.use('/api', bodyParser.json());

app.get('/api/items', (req, res) => {
    res.json(items);
});
app.get('/api/items/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = items.find((i) => i.id == id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).send(`Can not get item with ID: ${id}`);
    };
});
app.post('/api/items', (req, res) => {
    const body = req.body;
    if (typeof body === 'object' && 'name' in body) {
        items.push({
            id: nextID++,
            name: body.name
        });
        res.status(201);
        res.set('Location', `${req.baseUrl}/${nextID - 1}`);
        res.end();
    } else {
        res.status(400).end();
    };
});
app.put('/api/items/:id', (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const item = items.find((i) => i.id == id);
    if (item) {
        if (typeof body === 'object' && 'name' in body) {
            item.name = body.name;
            res.end();
        } else {
            res.status(400);
            res.end();
        }
    } else {
        res.status(404).send(`Can not get item with ID: ${id}`);
    };
});
app.delete('/api/items/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = items.find((i) => i.id == id);
    if (item) {
        items = items.filter((i) => i.id !== id);
		res.end();
    } else {
        res.status(404).send(`Can not get item with ID: ${id}`);
    };
});

app.listen(3000);