/** @const filesToCache Array A list of files to store in cache */
const filesToCache = [
    'css/style.css',
    'icons/blog_16.png',
    'icons/blog_32.png',
    'icons/blog_64.png',
    'icons/blog_128.png',
    'icons/blog_256.png',
    'https://code.jquery.com/jquery-3.5.1.slim.min.js'
    
];
/** @const staticCacheName String The name of the version. Update it to get the new files */
const staticCacheName = 'blog-cache-v1';

self.addEventListener ('install', event => {
    // Attemps to cache the static assets
    event.waitUntil (
        caches.open (staticCacheName)
        .then (cache => {
            return cache.addAll (filesToCache);
        })
    );
});

self.addEventListener ('fetch', function (event) {
    event.respondWith (
        caches.match (event.request).then (function (response) {
            console.log (event.request.url + " " + (response ? "in cache" : "not in cache"));
            return response || fetch (event.request);
        })
    );
});
