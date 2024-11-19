const cors = require('cors');
const redis = require('redis');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const client = redis.createClient({
	url: process.env.REDIS_URL,
	host: process.env.REDIS_HOST || 'localhost', // Use REDIS_HOST from environment
	port: process.env.REDIS_PORT || 6379, // Use REDIS_PORT from environment
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

app.get('/data', async (req, res) => {
	const value = await client.get('dogs');
	res.json({ value });
});

app.post('/data', async (req, res) => {
	const { key, value } = req.body;
	await client.set(key, value);

	res.json({ key, value });
});

app.listen(8001, '0.0.0.0', () => {
	console.log('Backend is running on port 8001');
});
