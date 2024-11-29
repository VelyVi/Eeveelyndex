import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useEffect, Fragment, useState } from 'react';
import { tipos } from '../utils/helpers';
import '../styles/details/details.css';
import { IoSparkles } from 'react-icons/io5';

function Details() {
	const params = useParams();
	const [pokemon, setPokemon] = useFetch();
	const [pokeShiny, setPokeShiny] = useState(false);

	useEffect(() => {
		if (params?.name) getPokemon();
	}, [params?.name]);

	const getPokemon = () => {
		setPokemon(`https://pokeapi.co/api/v2/pokemon/${params?.name}`);
	};

	const handleShiny = () => {
		setPokeShiny(!pokeShiny);
	};

	const types = pokemon?.types.map((type) => type?.type?.name);

	if (!types) return;

	return (
		<div className="pokedetails__container">
			<Link to="/pokedex" className="btn__back">
				<img src="/pokeball.gif" alt="icon" width="25" height="25" />
				<span>Volver</span>
			</Link>
			<div className="poke__details-card">
				<div className={`poke__details type--${types[0]}`}>
					<div className="poke__details-header">
						{pokeShiny ? (
							<>
								<button className="btn__shiny" onClick={handleShiny}>
									<img
										src={pokemon?.sprites?.other?.showdown?.front_shiny}
										alt={pokemon?.name}
									/>
									<IoSparkles className="shiny__icon" />
								</button>
							</>
						) : (
							<>
								<button className="btn__shiny" onClick={handleShiny}>
									<img
										src={pokemon?.sprites?.other?.showdown?.front_default}
										alt={pokemon?.name}
									/>
								</button>
							</>
						)}
					</div>
					<div className="poke__details-body">
						<div className="poke__details-nyn">
							<span># {pokemon?.id?.toString().padStart(3, '0')}</span>

							<div>
								<h2 className="poke__details-name">{pokemon?.name}</h2>
							</div>
						</div>
						<div className="poke__details-pya">
							<div className="poke__details-peso">
								<span>Peso</span>
								<span>{`${parseInt(pokemon?.weight) / 10}`} kg</span>
							</div>

							<div className="poke__details-altura">
								<span>Altura</span>
								<span>{`${parseInt(pokemon?.height) / 10}`} m</span>
							</div>
						</div>

						<div>
							<div className="poke__details-tys">
								<div className="pokedetails__tys-items">
									<h3>Tipo</h3>
									<div>
										<span className="poke__details-types">
											{types?.map((type, index) => {
												return (
													<Fragment key={type}>
														{index > 0 ? (
															<>
																<span> / {tipos[type]}</span>
															</>
														) : (
															<span>{tipos[type]}</span>
														)}
													</Fragment>
												);
											})}{' '}
										</span>
									</div>
								</div>
								<div className="pokedetails__tys-items">
									<h3>Habilidades</h3>
									<div>
										{pokemon?.abilities?.map((data) => (
											<span key={data?.ability?.name}>
												{data?.ability?.name}
											</span>
										))}
									</div>
								</div>
							</div>

							<div>
								<h3 className="poke__stats-title">Stats</h3>
								<div className="poke__details-stats">
									<div className="poke__details-item">
										<span>HP</span>
										<span>{pokemon?.stats[0]?.base_stat}</span>
									</div>
									<div className="poke__details-item">
										<span>ATAQUE</span>
										<span>{pokemon?.stats[1]?.base_stat}</span>
									</div>
									<div className="poke__details-item">
										<span>DEFENSA</span>
										<span>{pokemon?.stats[2]?.base_stat}</span>
									</div>
									<div className="poke__details-item">
										<span>VELOCIDAD</span>
										<span>{pokemon?.stats[5]?.base_stat}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export { Details };
