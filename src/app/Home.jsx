import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { types, useNameContext } from '../contexts/nameContext';
import '../styles/home/home.css';

function Home() {
	const inputRef = useRef();
	const [name, dispatch] = useNameContext();
	const navigate = useNavigate();

	const setName = (e) => {
		dispatch({
			type: types.SET_NAME,
			payload: inputRef.current.value.trim(),
		});
		inputRef.current.value = '';
		navigate('/pokedex');
		e.preventDefault();
	};

	const clearName = () => {
		dispatch({
			type: types.CLEAR_NAME,
		});
	};

	return (
		<div className="home">
			<div className="home__content">
				<img
					className="home__lg"
					src="/lg2.png"
					alt="lg"
					width="350"
					height="185"
				/>
				<h2 className="home__title">
					¡Hola {name ? <>de nuevo {name}</> : 'Entrenador'}!
				</h2>

				<div>
					{name ? (
						<>
							<p className="home__text">
								¡Continuemos con tu viaje! Ve a tu{' '}
								<Link className="home__link" to="/pokedex">
									Pokédex.
								</Link>
							</p>

							<button onClick={clearName} className="home__btn btn--radious">
								Salir
							</button>
						</>
					) : (
						<>
							<p className="home__text home__title">
								Para poder comenzar tu exploración, dame tu nombre de
								entrenador.
							</p>
							<form onSubmit={setName}>
								<input
									ref={inputRef}
									type="text"
									placeholder="Tu nombre . . ."
									className="home__input"
								/>
								<button onClick={setName} className="home__btn">
									¡Comencémos!
								</button>
							</form>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export { Home };
