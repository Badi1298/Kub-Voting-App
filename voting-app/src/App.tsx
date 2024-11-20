import axios from 'axios';

import './App.css';

function App() {
	const voteDogs = async () => {
		await axios.post('http://localhost:8001/data', {
			key: 'dogs',
		});
	};

	const voteCats = async () => {
		await axios.post('http://localhost:8001/data', {
			key: 'cats',
		});
	};

	return (
		<>
			<h1>Choose between:</h1>
			<div className="btn-container">
				<button onClick={voteDogs}>Dogs</button>
				<button onClick={voteCats}>Cats</button>
			</div>
		</>
	);
}

export default App;
