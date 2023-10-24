import { useReducer, useEffect } from 'react';
import pokemonListData from '../data/pokemonList.json';
import regions from '../data/regions.json';
import Header from './Header';
import Tab from './Tab';
import TabsBox from './TabsBox';
import Pokemon from './Pokemon';

const initialState = {
	currentRegion: '', // Domyślny region
	displayedData: [], // Dane do wyświetlenia
	checkboxState: {}, // Stan checkboxa
};
function reducer(state, action) {
	switch (action.type) {
		case 'SELECT_REGION':
			// Filtr date with choosen Region
			const selectedRegion = regions.find(region => region.name === action.payload);
			if (selectedRegion) {
				const filteredData = pokemonListData.slice(selectedRegion.start, selectedRegion.end);
				return {
					...state,
					currentRegion: action.payload,
					displayedData: filteredData,
				};
			}
			return state;
		case 'TOGGLE_CHECKBOX':
			const updatedState = {
				...state,
				checkboxState: {
					...state.checkboxState,
					[action.payload.pokemonName]: {
						checkbox1:
							action.payload.checkbox === 'checkbox1'
								? action.payload.checked
								: state.checkboxState[action.payload.pokemonName]?.checkbox1 || false,
						checkbox2:
							action.payload.checkbox === 'checkbox2'
								? action.payload.checked
								: state.checkboxState[action.payload.pokemonName]?.checkbox2 || false,
						checkbox3:
							action.payload.checkbox === 'checkbox3'
								? action.payload.checked
								: state.checkboxState[action.payload.pokemonName]?.checkbox3 || false,
					},
				},
			};
			localStorage.setItem('checkboxState', JSON.stringify(updatedState.checkboxState));
			return updatedState;

		case 'SET_CHECKBOX_STATE':
			// Aktualizuj stan checkboxów
			return {
				...state,
				checkboxState: action.payload,
			};
		default:
			return state;
	}
}

export default function App() {
	const [pokeList, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const storedCheckboxState = localStorage.getItem('checkboxState');
		if (storedCheckboxState) {
			dispatch({ type: 'SET_CHECKBOX_STATE', payload: JSON.parse(storedCheckboxState) });
		}
	}, []);

	useEffect(function () {
		dispatch({ type: 'SELECT_REGION', payload: 'Kanto' });
	}, []);

	return (
		<>
			<Header />
			<TabsBox classname='tabs'>
				{regions.map(reg => (
					<Tab name={reg.name} generation={reg.gen} key={reg.name} dispatch={dispatch} />
				))}
			</TabsBox>
			<TabsBox>
				{pokeList.displayedData.map((pokemon, index) => (
					<Pokemon
						key={pokemon.name}
						name={pokemon.name}
						imgSrc={pokemon.imageUrl}
						num={pokemon.url}
						checkboxes={
							pokeList.checkboxState[pokemon.name] || {
								checkbox1: false,
								checkbox2: false,
								checkbox3: false,
							}
						}
						dispatch={dispatch}
					/>
				))}
			</TabsBox>
		</>
	);
}
