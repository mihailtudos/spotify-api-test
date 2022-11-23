function AlbumItem({ album }) {
	return (
		<div className="lg:w-1/4 md:w-1/2 p-4 w-full">
			<span className="block relative h-48 rounded overflow-hidden">
				<img alt="ecommerce" className="object-cover object-center w-full h-full block" src={album.images[0].url}/>
			</span>
			<div className="mt-4">
				<h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{ album.type }</h3>
				<h2 className="text-gray-900 title-font text-lg font-medium">{ album.name }</h2>
				<p className="mt-1"> { album.artists.length ? album.artists.map(artist => artist.name + " ") : 'no artist'  } </p>
			</div>
		</div>
	)
}

export default AlbumItem;
