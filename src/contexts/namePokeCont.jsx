import { createContext, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';

const namePoke = createContext();

const AuthProvider = ({ children }) => {
	const [pokemon, setPokemon] = useFetch(null);
	console.log(pokemon);
	useEffect(() => {
		if (url) getPokemon();
	}, [url]);

	const getPokemon = () => {
		setPokemon(url);
	};
};

export { AuthProvider };
export default namePoke;
