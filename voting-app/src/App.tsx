import { useEffect } from 'react';

import axios from 'axios';

import './App.css';

function App() {
	// const [dogs, setDogs] = useState(null);

	useEffect(() => {
		async function getRedisData() {
			const response = await axios.get('http://localhost:8001/data');

			return response;
		}

		getRedisData();
	}, []);

	const voteDogs = async () => {
		const response = await axios.post('http://localhost:8001/data', {
			key: 'dogs',
			value: 3,
		});

		console.log(response.data);
	};

	return (
		<>
			<h1>Choose between:</h1>
			<div className="btn-container">
				<button onClick={voteDogs}>Dogs</button>
				<button>Cats</button>
			</div>
		</>
	);
}

export default App;
