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
		.catch(function(){
			return caches.match(offlineURL);
		})

	);

});