import Search from '../components/Search';
import { useState } from 'react';
import { Link } from "react-router-dom";
import AlbumItem from '../components/AlbumItem';


function Albums() {
	const [ albums, setAlbums ] = useState([]);

	function updateAlbums(data) {
		console.log('update albums');
		setAlbums(data.data);
	}

	return (
		<div className="p-8">
			<Search updateAlbums={updateAlbums}></Search>
			<section className="text-gray-600 body-font">
				<div className="container px-5 py-8 mx-auto">
					<div className="flex flex-wrap -m-4">
						{
							albums.length ?
							 albums.map(album => {
								return (
									<AlbumItem album={album} key={album.id}></AlbumItem>
								)
							})
							:
							<div className="flex flex-col justify-center items-center mx-auto">
								<p className="text-center max-w-md text-center mx-auto">No albums found. Start searching for an album by typing something in the search box </p>
								<Link to={'/'} type="button"
										className="mt-4 text-green-600 border border-green-600 hover:bg-green-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800">
									<svg aria-hidden="true" className="w-5 h-5 rotate-100 rotate-180 transform-gpu" fill="currentColor"
										 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd"
											  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
											  clipRule="evenodd">
										</path>
									</svg>
								</Link>
							</div>
						}
					</div>
				</div>
			</section>
		</div>
	)
}

export default Albums;
