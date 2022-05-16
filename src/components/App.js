import { useState } from 'react';
import './App.css';

export function App() {
	const [input, setInput] = useState('');
	const [user, setUser] = useState(null);

	const APIURL = 'https://api.github.com/users/';

	const getUser = e => {
		if (e.key === 'Enter') {
			fetch(APIURL + input)
				.then(response => response.json())
				.then(result => {
					setUser(result);
					setInput('');
				});
		}
	};

	return (
		<>
			<header className='search-container'>
				<input
					className='search-box'
					type='text'
					placeholder='Search a Github user'
					value={input}
					onChange={e => setInput(e.target.value)}
					onKeyPress={getUser}
				/>
			</header>
			<main className='card-container'>
				{user ? (
					<div className='card'>
						<div className='img-container'>
							<img className='img' src={user.avatar_url} alt={user.name}></img>
						</div>
						<div className='profile'>
							<h2>{user.name}</h2>
							<span>{user.bio}</span>
							<div className='user-info'>
								<p>
									<strong>{user.followers} Followers</strong>
								</p>
								<p>
									<strong>{user.following} Following</strong>
								</p>
								<p>
									<strong>{user.public_repos} Repositories</strong>
								</p>
							</div>
						</div>
					</div>
				) : (
					<h2 className='not-found'>No results</h2>
				)}
			</main>
		</>
	);
}
