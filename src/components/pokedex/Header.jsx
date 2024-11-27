import { Link } from 'react-router-dom';
import { useNameContext } from '../../contexts/nameContext';
import '../../styles/pokedex/header.css';

function Header() {
	const [name] = useNameContext();

	return (
		<div className="pokedex__header">
			<div>
				<span className="nameuser">Bienvenido {name}</span>, aquí podremos
				encontrar toda clase de pokémons y entre ellos puedes descubrir a tu
				favorito
			</div>
		</div>
	);
}

export { Header };
