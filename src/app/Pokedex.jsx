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
	const [searchErr, setSearchErr] = useState(null);

	useEffect(() => {
		getPokemons();
	}, []);

	const getPokemons = () => {
		setPokemons('https://pokeapi.co/api/v2/pokemon');
	};

	const handleSearch = (value) => {
		setSearchErr(null);
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
		<>
			<div className="hero" />
			<div className="pokedex">
				<Link to="/" className="btn__back">
					<img src="/pokeball.gif" alt="icon" width="25" height="25" />
					<span>Volver</span>
				</Link>

				<div className="pokedex__container">
					<Header />
					{loading ? (
						<div className="load__wooper">
							<img
								src="/load-wop.gif"
								alt="load-wop"
								className="load__wooper"
							/>
						</div>
					) : error ? (
						<h2 className="err__psy">
							<img className="imgpsy" src="/err-psy.gif" alt="err_psy" />
							<p className="texterr">{error}</p>
						</h2>
					) : (
						<>
							<div className="pokedex__form syf">
								<Search handleSearch={handleSearch} url={pokemonUrl} />
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
									<PokemonCard
										url={pokemonUrl}
										onError={() => {
											setSearchErr(
												'Lo siento, no se ha encontrado algún pokémon con ese nombre.',
											);
										}}
									/>
								) : (
									<PokemonList
										pokemons={pokemonsArray}
										isFiltering={isFiltering}
									/>
								)}
								{searchErr && (
									<div className="psynotfound">
										{' '}
										<img
											className="psy__item"
											src="/psynotfound.gif"
											alt="psynotfound"
										/>
										<p className="pokedex__error psy__item">{searchErr}</p>{' '}
									</div>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export { Pokedex };
