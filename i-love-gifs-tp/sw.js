// Your Service Worker. You can use its instance with the keyword `self`
// Example: self.addEventListener(...)

const appShellCacheName = 'app-shell-v1';
const appShellFilesToCache = [
    // TODO: 2a - Declare files and URLs to cache at Service Worker installation
    '/assets/css/desktop.css',
    '/assets/css/fonts.css',
    '/assets/css/mobile.css',
    '/assets/css/normalize.css',
    '/assets/css/shell.css',
    '/assets/fonts/balsamiq-sans-v1-latin-700.woff',
    '/assets/fonts/balsamiq-sans-v1-latin-700.woff2',
    '/assets/fonts/balsamiq-sans-v1-latin-700italic.woff',
    '/assets/fonts/balsamiq-sans-v1-latin-700italic.woff2',
    '/assets/fonts/balsamiq-sans-v1-latin-italic.woff',
    '/assets/fonts/balsamiq-sans-v1-latin-italic.woff2',
    '/assets/fonts/balsamiq-sans-v1-latin-regular.woff',
    '/assets/fonts/balsamiq-sans-v1-latin-regular.woff2',
    '/assets/js/dexie.min.js',
    '/assets/js/fontawesome-pro-5.13.0.min.js',
    '/assets/js/lazysizes.min.js',
    '/assets/js/saved.js',
    '/assets/js/search.js',
    '/assets/js/trending.js',
    '/index.html',
    '/saved.html',
    '/search.html',
    '/sw.js'
];

const appCaches = [
    appShellCacheName,
];


// TODO: 2b - On install, add app shell files to cache
self.addEventListener('install', function(e) {
    e.waitUntil(
    caches.open(appShellCacheName).then(function(cache) {
        console.log(cache)
    return cache.addAll(appShellFilesToCache);
    })
    );
   });
// TODO: 2c - On activation, remove obsolete caches
   self.addEventListener('activate', function(event) {
    event.waitUntil(
    caches.keys().then(function(cacheNames) {
    return Promise.all(
    cacheNames.filter(function(cacheName) {
    return true
    }).map(function(cacheName) {
    return caches.delete(cacheName);
    })
    );
    })
    );
   });



// TODO: 2d - On intercepted fetch, use the strategy of your choice to respond to requests
// Service Worker
self.addEventListener('fetch', function(event) {
    event.respondWith(
    caches.open(appShellCacheName).then(function(cache) {
    return cache.match(event.request).then(function(response) {
    var fetchPromise = fetch(event.request).then(function(networkResponse) {
    cache.put(event.request, networkResponse.clone());
    return networkResponse;
    })
    return response || fetchPromise;
    })
    })
    );
   });
