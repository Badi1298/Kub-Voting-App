const cors = require('cors');
const redis = require('redis');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const client = redis.createClient();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

client.on('connect', () => {
	console.log('Connected to Redis server successfully!');
});

client.on('error', (error) => {
	console.error('Redis client encountered an error:', error);
});

(async () => {
	await client.connect();
})();

app.get('/data/dogs', async (req, res) => {
	const value = await client.get('dogs');
	res.json({ value });
});

app.post('/data', async (req, res) => {
	const { key, value } = req.body;
	await client.set(key, value);

	res.json({ key, value });
});

app.listen(8001, () => {
	console.log('Server running on port 8001');
});
