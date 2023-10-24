import React, { useState, useEffect } from 'react';

function Pokemon({ name, imgSrc, num, checkboxes, dispatch }) {
	const [isLoaded, setIsLoaded] = useState(false);
	const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);
	const urlParts = num.split('/');
	const numPokemon = urlParts[urlParts.length - 2];

	useEffect(() => {
		const image = new Image();
		image.src = imgSrc;

		image.onload = () => {
			setIsLoaded(true);
		};

		image.onerror = () => {
			setIsLoaded(true);
		};
	}, [imgSrc]);
	return (
		<li>
			<p>
				#{numPokemon} {pokemonName}
			</p>
			{isLoaded ? <img src={imgSrc} alt={name} /> : <p>Loading...</p>}
			<div className='pokemon-form'>
				<label>
					<input
						type='checkbox'
						checked={checkboxes.checkbox1}
						onChange={() => {
							const newChecked = !checkboxes.checkbox1;
							dispatch({
								type: 'TOGGLE_CHECKBOX',
								payload: { pokemonName: name, checkbox: 'checkbox1', checked: newChecked },
							});
						}}
					/>
					<img src='pokeball.png' alt='normal form' title='normal form'></img>
				</label>
				<label>
					<input
						type='checkbox'
						checked={checkboxes.checkbox2}
						onChange={() => {
							const newChecked = !checkboxes.checkbox2;
							dispatch({
								type: 'TOGGLE_CHECKBOX',
								payload: { pokemonName: name, checkbox: 'checkbox2', checked: newChecked },
							});
						}}
					/>
					<img src='shadow.png' alt='shadow form' title='shadow form'></img>
				</label>
				<label>
					<input
						type='checkbox'
						checked={checkboxes.checkbox3}
						onChange={() => {
							const newChecked = !checkboxes.checkbox3;
							dispatch({
								type: 'TOGGLE_CHECKBOX',
								payload: { pokemonName: name, checkbox: 'checkbox3', checked: newChecked },
							});
						}}
					/>
					<img src='puryfied.png' alt='puryfied form' title='puryfied form'></img>
				</label>
			</div>
		</li>
	);
}

export default Pokemon;
