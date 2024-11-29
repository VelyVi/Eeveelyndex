import { useEffect, Fragment, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import { tipos } from '../../utils/helpers';
import '../../styles/pokedex/pokemoncard.css';
import { HiSparkles } from 'react-icons/hi';

function PokemonCard({ url, onError }) {
	const [pokemon, setPokemon, loading, error] = useFetch();
	const [pokemonShiny, setPokemonShiny] = useState(false);

	useEffect(() => {
		if (url) getPokemon();
	}, [url]);

	const getPokemon = () => {
		setPokemon(url);
	};

	if (error && onError) {
		onError();
	}

	const handleShiny = () => {
		setPokemonShiny(!pokemonShiny);
	};

	const types = pokemon?.types.map((type) => type?.type?.name);

	if (loading)
		return (
			<div className="psyloading">
				<img src="/loading-psy.webp" alt="" className="search__load" />
			</div>
		);
	if (error) return null;

	if (!types) return;

	return (
		<div className="poke">
			<div className={`poke__card type--${types[0]}`}>
				<div className="poke__card-header">
					{pokemonShiny ? (
						<>
							<button className="btn__handle-Shiny" onClick={handleShiny}>
								<img
									src={pokemon?.sprites?.other['official-artwork']?.front_shiny}
									alt={pokemon?.name}
								/>
							</button>
							<HiSparkles className="shinny__icon" />
						</>
					) : (
						<>
							<button className="btn__handle-Shiny" onClick={handleShiny}>
								<img
									src={
										pokemon?.sprites?.other['official-artwork']?.front_default
									}
									alt={pokemon?.name}
								/>
							</button>
						</>
					)}
				</div>

				<Link to={`/pokedex/${pokemon?.name}`}>
					<div className="poke__card-body">
						<div>
							<h2 className="poke__card-name">{pokemon?.name}</h2>
						</div>
						<span className="poke__card-types">
							{types?.map((type, index) => {
								return (
									<Fragment key={type}>
										{index > 0 ? (
											<>
												{' /'} <span>{tipos[type]}</span>
											</>
										) : (
											<span>{tipos[type]}</span>
										)}
									</Fragment>
								);
							})}
						</span>
						<p className="poke__card-type-label">Tipo</p>
						<div className="poke__card-stats">
							<div className="poke__card-stats-item">
								<span>HP</span>
								<span>{pokemon?.stats[0]?.base_stat}</span>
							</div>
							<div className="poke__card-stats-item">
								<span>ATAQUE</span>
								<span>{pokemon?.stats[1]?.base_stat}</span>
							</div>
							<div className="poke__card-stats-item">
								<span>DEFENSA</span>
								<span>{pokemon?.stats[2]?.base_stat}</span>
							</div>
							<div className="poke__card-stats-item">
								<span>VELOCIDAD</span>
								<span>{pokemon?.stats[5]?.base_stat}</span>
							</div>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
}

export { PokemonCard };
