function jsonFlickrApi(response) {
	var cats = $("#cats");
	$.each(response.photos.photo, function(i, item) {
		var src = "https://farm"
			+ item.farm
			+ ".static.flickr.com/"
			+ item.server
			+ "/" + item.id
			+ "_" + item.secret
			+ "_n.jpg";
		var container = $("<li/>").appendTo(cats);
		$("<img/>").attr("src", src).appendTo(container);
	});
}

$(function() {
	$.ajax({
		url: flickr_api_url,
		method: 'GET',
		dataType: 'jsonp',
		jsonpCallback: 'jsonFlickrApi',
		cache: true,
		data: {
			tags: 'cat',
			safe_search: 1,
			per_page: 20
		},
		error: function(err) {
			console.log(err);
		}
	});
});

if(navigator.serviceWorker) {
	navigator
		.serviceWorker
		.register('sw.js')
		.then(function(r) {
			console.log('Cats are now available offline');
		})
		.catch(function(e) {
			console.log('Cats are NOT available offline');
			console.log(e);
		});
} else {
	console.log('Service workers are not supported');
}