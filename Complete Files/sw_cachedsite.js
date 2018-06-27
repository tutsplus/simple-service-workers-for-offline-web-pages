var offlineCacheName = 'wholeSiteCached';

var offlinePageCache = 'customOfflinePage';

var offlineURL = "offline.html";

this.addEventListener('install', function(event){

	console.log('Service worker installing');

	event.waitUntil(

		caches.open(offlinePageCache)
		.then(function(cache){
			return cache.add(offlineURL);
		})
		.then(function(){
			return self.skipWaiting();
		})

	);

});

this.addEventListener('fetch', function(event){

	event.respondWith(

		fetch(event.request)
		.then(function(response){
			var responseClone = response.clone();
			caches.open(offlineCacheName)
			.then(function(cache){
				cache.put(event.request, responseClone);
			})
			return response;
		})
		.catch(function(){
			return caches.match(event.request)
			.then(function(response){
				return response || caches.match(offlineURL);
			});
		})

	);

});