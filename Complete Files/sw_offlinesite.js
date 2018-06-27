var offlineSiteCache = 'offlineSite';

var resourcesToCache = [
	'index.html',
	'about.html',
	'style.css',
	'background.jpg'
];

this.addEventListener('install', function(event){

	console.log('Service worker installing');

	event.waitUntil(

		caches.open(offlineSiteCache)
		.then(function(cache){
			return cache.addAll(resourcesToCache);
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
			return caches.match(event.request);
		})

	);

});