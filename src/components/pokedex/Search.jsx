import { useRef } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import '../../styles/pokedex/search.css';

function Search({ handleSearch }) {
	const inputRef = useRef();

	const onSearch = () => {
		handleSearch(inputRef.current.value.toLowerCase().trim());
		inputRef.current.value = '';
	};

	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="search__items">
			<form onSubmit={onSubmit} className="search search__item">
				<div className="search__input">
					<MdOutlineSearch />
					<input type="text" placeholder="Nombre del pokémon" ref={inputRef} />
				</div>

				<button onClick={onSearch} className="search__btn">
					Buscar
				</button>
			</form>
		</div>
	);
}

export { Search };
