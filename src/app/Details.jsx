import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useEffect, Fragment, useState } from 'react';
import { tipos } from '../utils/helpers';
import '../styles/details/details.css';
import { IoSparkles } from 'react-icons/io5';
import { Chart } from '../components/details/Chart';
import { Abilities } from '../components/details/Abilities';

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
		let audio = new Audio(`${pokemon?.cries?.latest}`);
		audio.play();
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
									<div className="details__card-abilities">
										{pokemon?.abilities?.map((data) => (
											<Abilities
												key={data?.ability?.name}
												data={data?.ability}
											/>
										))}
									</div>
								</div>
							</div>

							<div>
								<h3 className="poke__stats-title">Stats</h3>
								<div className="poke__details-stats">
									<div className="chart__container">
										<Chart stats={pokemon?.stats} />
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
