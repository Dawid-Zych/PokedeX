function Tab({ name, generation, dispatch }) {
	return (
		<button onClick={() => dispatch({ type: 'SELECT_REGION', payload: name })}>
			<strong>{name}</strong>
			<p>{generation}</p>
		</button>
	);
}

export default Tab;
