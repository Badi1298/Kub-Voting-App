const cors = require('cors');
const redis = require('redis');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const client = redis.createClient({
	url: `redis://${process.env.REDIS_HOST}`,
	host: process.env.REDIS_HOST || 'localhost',
	port: process.env.REDIS_PORT || 6379,
});

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

app.get('/data/cats', async (req, res) => {
	const value = await client.get('cats');
	res.json({ value });
});

app.post('/data', async (req, res) => {
	const { key } = req.body;

	const value = await client.get(key);

	if (!value) {
		await client.set(key, 1);
	} else {
		await client.set(key, +value + 1);
	}

	res.json({ key, value });
});

app.listen(80);
