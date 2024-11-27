import { useEffect, useState } from 'react';
import {
	Header,
	Search,
	Filters,
	PokemonList,
	PokemonCard,
} from '../components/pokedex';
import { useFetch } from '../hooks/useFetch';
import '../styles/pokedex/pokedex.css';
import { Link } from 'react-router-dom';

function Pokedex() {
	const [pokemons, setPokemons, loading, error] = useFetch();
	const [pokemonUrl, setPokemonUrl] = useState(null);
	const [isFiltering, setIsFiltering] = useState(false);

	useEffect(() => {
		getPokemons();
	}, []);

	const getPokemons = () => {
		setPokemons('https://pokeapi.co/api/v2/pokemon');
	};

	const handleSearch = (value) => {
		if (!value) {
			setIsFiltering(false);
			setPokemonUrl(null);
			setPokemons('https://pokeapi.co/api/v2/pokemon');
		} else {
			setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${value}/`);
		}
	};

	const handleTypeFilter = (type) => {
		if (!type) {
			setIsFiltering(false);
			setPokemons('https://pokeapi.co/api/v2/pokemon');
		} else {
			setIsFiltering(true);
			setPokemons(`https://pokeapi.co/api/v2/type/${type}`);
		}
	};

	const onNext = () => {
		setPokemons(pokemons?.next);
	};

	const onPrev = () => {
		setPokemons(pokemons?.previous);
	};

	const pokemonsArray = isFiltering ? pokemons?.pokemon : pokemons?.results;

	return (
		<div className="pokedex">
			<div className="hero" />

			<Link to="/" className="btn__back">
				<img src="/pokeball.gif" alt="icon" width="25" height="25" />
				<span>Volver</span>
			</Link>

			<div className="pokedex__container">
				<Header />
				{loading ? (
					<div>
						<img src="/load-wop.gif" alt="load-wop" className="load__wooper" />
					</div>
				) : error ? (
					<h2 className="err__psy">
						<img className="imgpsy" src="/err-psy.gif" alt="err_psy" />
						<p className="texterr">{error}</p>
					</h2>
				) : (
					<>
						<div className="pokedex__form syf">
							<Search handleSearch={handleSearch} />
							<Filters handleTypeFilter={handleTypeFilter} />
						</div>

						<div className="btns__pg">
							<button onClick={onPrev} disabled={!pokemons?.previous}>
								Anterior
							</button>
							<button onClick={onNext} disabled={!pokemons?.next}>
								Siguiente
							</button>
						</div>

						<div className="pokedex__cards">
							{pokemonUrl ? (
								<PokemonCard url={pokemonUrl} />
							) : (
								<PokemonList
									pokemons={pokemonsArray}
									isFiltering={isFiltering}
								/>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export { Pokedex };