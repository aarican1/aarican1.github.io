'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "fe408eec79e86b8cb512d59f476195c8",
"version.json": "009c9e65172e010890f7f65fde438006",
"index.html": "80b7f3c2a7bb29c643595523dbc0fc2e",
"/": "80b7f3c2a7bb29c643595523dbc0fc2e",
"main.dart.js": "f3f8c29bdcd3968d03b54e766bf89b36",
"flutter.js": "24bc71911b75b5f8135c949e27a2984e",
"favicon.png": "9a363c831c75d162b544d6629cfe65ae",
"icons/Icon-192.png": "08ed9d39a1ca514278f2f2b0ff261565",
"icons/Icon-maskable-192.png": "08ed9d39a1ca514278f2f2b0ff261565",
"icons/Icon-maskable-512.png": "9a363c831c75d162b544d6629cfe65ae",
"icons/Icon-512.png": "9a363c831c75d162b544d6629cfe65ae",
"manifest.json": "d40c47d1c161f94dbcb13094d37f1f55",
"assets/AssetManifest.json": "6713a4c458cb5ab06e6e9fadf4005faa",
"assets/NOTICES": "46f9a259ccb826eca0e513706e1cc17f",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "70b9c281e46897608fc9b76649f9568a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/shaders/stretch_effect.frag": "40d68efbbf360632f614c731219e95f0",
"assets/AssetManifest.bin": "d5637c94ddf2c325f6e59eae25fcb0af",
"assets/fonts/MaterialIcons-Regular.otf": "8a03fbc5f63f28602bcce92b160fa3c3",
"assets/assets/images/googlePlay.png": "8d4573def2d91683e9fa30575a45a71f",
"assets/assets/images/appStore.png": "4e3402fe96f30ad0efb45e7d5dbb20f7",
"assets/assets/images/profile.png": "075d5e4b859c5983b429339d62b4ffa1",
"assets/assets/docs/cv.pdf": "18a834f0873ea27304b4746708ed7f11",
"assets/assets/svgs/white_app_store.svg": "0f3514a45d51f95167e5fe8b6a03bb60",
"assets/assets/svgs/Flutter.svg": "5ff1722cbed36fdb869cba0c95788d42",
"assets/assets/svgs/black_app_store.svg": "2928664fe1fc6aca88583a6f606d60ba",
"assets/assets/svgs/google_play.svg": "42a90f34edf7ad2f898a9ce7ef21ae72",
"assets/assets/svgs/swifUI.svg": "2f0ff0d79e3ccf1d178c9536f068d1d2",
"assets/assets/svgs/Swift.svg": "714948ba4cf994b64135be84ced494e2",
"assets/assets/icons/kacan.png": "164c0913773fc20c5eb336ccc248d79a",
"assets/assets/icons/memfast.png": "7809f00bceda85198a40e5668b3118a9",
"assets/assets/icons/safeRide.png": "c3934ee294910e41df1286c2f3011f60",
"assets/assets/icons/github.png": "1dee40f2668d5c719eafa2c89296f5e7",
"assets/assets/icons/bushufflee.png": "ec57ba1b49d63ad8c027791e20200bfc",
"assets/assets/icons/rastgele.jpg": "44f467257ede51324dd04de9d63a39f4",
"assets/assets/icons/pranks.png": "f9b06192bd37d59713db99ffe0f4ff94",
"assets/assets/icons/linkedin.png": "1b18d461ce75c75fdb4d7b6ec08b3e65",
"assets/assets/icons/kanalize.png": "99f74036ea4b9bcf4ce5ad8c62a348d8",
"assets/assets/icons/qr.png": "b2aa7b813c9dd1a28eb5447e08eacf7e",
"assets/assets/translations/tr-TR.json": "058fea72cf17bf0ddd69f499eca3427b",
"assets/assets/translations/en-US.json": "b056d433173a83cdd3d657ac606fd68b",
"canvaskit/skwasm.js": "8060d46e9a4901ca9991edd3a26be4f0",
"canvaskit/skwasm_heavy.js": "740d43a6b8240ef9e23eed8c48840da4",
"canvaskit/skwasm.js.symbols": "3a4aadf4e8141f284bd524976b1d6bdc",
"canvaskit/canvaskit.js.symbols": "a3c9f77715b642d0437d9c275caba91e",
"canvaskit/skwasm_heavy.js.symbols": "0755b4fb399918388d71b59ad390b055",
"canvaskit/skwasm.wasm": "7e5f3afdd3b0747a1fd4517cea239898",
"canvaskit/chromium/canvaskit.js.symbols": "e2d09f0e434bc118bf67dae526737d07",
"canvaskit/chromium/canvaskit.js": "a80c765aaa8af8645c9fb1aae53f9abf",
"canvaskit/chromium/canvaskit.wasm": "a726e3f75a84fcdf495a15817c63a35d",
"canvaskit/canvaskit.js": "8331fe38e66b3a898c4f37648aaf7ee2",
"canvaskit/canvaskit.wasm": "9b6a7830bf26959b200594729d73538e",
"canvaskit/skwasm_heavy.wasm": "b0be7910760d205ea4e011458df6ee01"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
