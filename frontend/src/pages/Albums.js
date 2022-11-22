import Search from '../components/Search';
import { useState } from 'react';
import AlbumItem from '../components/AlbumItem';


function Albums() {
	const [ albums, setAlbums ] = useState([{item: 1}, {item: 2}]);

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
									<AlbumItem album={album} key={album.item}></AlbumItem>
								)
							})
							:
							<p className="text-center">No albums found </p>
						}
					</div>
				</div>
			</section>
		</div>
	)
}

export default Albums;