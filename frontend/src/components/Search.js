import { useRef } from "react"
import axios from 'axios'

function Search(props) {
	const inputName = useRef();

	async function handleSearchBtnClick() {
		const albumsData = {
			data: [{item: 1}],
			err: []
		};
		await axios
		  .post("http://localhost:3001/api/search", {"albumTitle": inputName.current.value })
		  .then((response)=>{
			albumsData.data = response.data.data;
		  })
		  .catch(err => albumsData.error = err);

		  props.updateAlbums(albumsData)
	}

	function handleKeyDown(event) {
		if (event.key === "Enter") {
			console.log("Hit");
		}
	}
	return (
		<div className="flex flex-col w-full items-start jusify-center max-w-md mx-auto">
			<label htmlFor="hero-field" className="leading-7 text-sm text-gray-600">Spotify albums</label>
			<div className="relative flex gap-2 justify-start items-start mx-auto w-full">
				<input
					ref={inputName}
					 onKeyDown={(event) => handleKeyDown(event)}

					type="text" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
					<button onClick={() => { handleSearchBtnClick() }} className="inline-flex text-gray-900 bg-green-500 border-0 py-2 px-6 focus:outline-none hover:opacity-90 rounded text-lg">search</button>
			</div>
			<p className="text-sm text-left mt-2 text-gray-500 mb-8 w-full">Search for an album.</p>
		</div>

	)
}

export default Search;
