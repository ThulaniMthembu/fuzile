// Self-executing function to avoid polluting the global scope
(function () {
	if (!self.define) {
		let registry = {};

		const define = (moduleName, depsArray, callback) => {
			const moduleUrl = new URL(moduleName + '.js', self.location.href).href;
			if (registry[moduleUrl]) return;

			const moduleExports = {};
			const require = (dep) => loadModule(dep, moduleUrl);
			const localRequire = (depName) => require(depName);

			registry[moduleUrl] = moduleExports;

			Promise.all(depsArray.map(localRequire)).then((deps) => {
				callback.apply(moduleExports, deps);
				registry[moduleUrl] = moduleExports;
			});
		};

		const loadModule = (moduleName, parentUrl) => {
			const moduleUrl = new URL(moduleName + '.js', parentUrl).href;
			if (registry[moduleUrl]) return Promise.resolve(registry[moduleUrl]);

			return new Promise((resolve, reject) => {
				if ('document' in self) {
					const script = document.createElement('script');
					script.src = moduleUrl;
					script.onload = () => resolve(registry[moduleUrl]);
					script.onerror = reject;
					document.head.appendChild(script);
				} else {
					importScripts(moduleUrl);
					resolve(registry[moduleUrl]);
				}
			});
		};

		self.define = define;
	}
})();

// Main service worker logic
define(['./workbox-4754cb34'], function (workbox) {
	'use strict';

	self.skipWaiting();
	workbox.clientsClaim();

	// Precache and route setup
	workbox.precacheAndRoute(
		[
			{
				url: '/_next/app-build-manifest.json',
				revision: 'e44142fb282d8c750b127a9d5a92c799',
			},
			{
				url: '/_next/static/OtYcURlpFMzl8sbnsDT8K/_buildManifest.js',
				revision: '1dd0c59aa2c55012c35badc3f964e750',
			},
			{
				url: '/_next/static/OtYcURlpFMzl8sbnsDT8K/_ssgManifest.js',
				revision: 'b6652df95db52feb4daf4eca35380933',
			},
			{
				url: '/_next/static/chunks/100-b7e73aaf5f48c099.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/138-7da50d34cc087f2f.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/215-20fc5fc9462f6d88.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/362-9cf9d26909f9fc8e.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/454-791f1c1a8537c95a.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/4bd1b696-b9cc63cab3cdf646.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/539-0ac5b9bade964098.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/685-b5019aab5d157ac7.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/831-3789a5e039ce9e59.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/840-86da3bef1df8fb9c.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/938-676ecb54babf2b98.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/977-f9ba9ac8fff1a6b5.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/app/_not-found/page-7b3df5c4d8e0fdd7.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/app/about/page-0c53b33a5375c919.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/app/admin/page-6012f0b0a1b7d5c1.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/app/blog/%5Bid%5D/page-5af3a98680944143.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/app/blog/page-4bb5cd10457cf59e.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/app/contact/page-b029f773f5631190.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/app/education/page-95f4fa49d0e212fe.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/app/experience/page-a190ec8edea92d2b.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/app/layout-4e7a394dbe2b4617.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/app/login/page-4e201bc12bee081c.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/app/page-ca9b4f7ae28f2515.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/app/skills/page-96811a1a929a5e07.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/app/training/page-9c624361f6e00866.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/bc9e92e6-d5f1425624dfdad7.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/ee09ae8a-a46b2d86d7b59ba2.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/framework-aec844d2ccbe7592.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/main-48b439fc1d16bb6e.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/main-app-9c9d9954fa750f63.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/pages/_app-6a626577ffa902a4.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/pages/_error-1be831200e60c5c0.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
				revision: '846118c33b2c0e922d7b3a7676f81f6f',
			},
			{
				url: '/_next/static/chunks/webpack-15709f0762e67228.js',
				revision: 'OtYcURlpFMzl8sbnsDT8K',
			},
			{
				url: '/_next/static/css/9ba6ef66e1d1a400.css',
				revision: '9ba6ef66e1d1a400',
			},
			{
				url: '/_next/static/media/26a46d62cd723877-s.woff2',
				revision: 'befd9c0fdfa3d8a645d5f95717ed6420',
			},
			{
				url: '/_next/static/media/55c55f0601d81cf3-s.woff2',
				revision: '43828e14271c77b87e3ed582dbff9f74',
			},
			{
				url: '/_next/static/media/581909926a08bbc8-s.woff2',
				revision: 'f0b86e7c24f455280b8df606b89af891',
			},
			{
				url: '/_next/static/media/6d93bde91c0c2823-s.woff2',
				revision: '621a07228c8ccbfd647918f1021b4868',
			},
			{
				url: '/_next/static/media/97e0cb1ae144a2a9-s.woff2',
				revision: 'e360c61c5bd8d90639fd4503c829c2dc',
			},
			{
				url: '/_next/static/media/a34f9d1faa5f3315-s.p.woff2',
				revision: 'd4fe31e6a2aebc06b8d6e558c9141119',
			},
			{
				url: '/_next/static/media/df0a9ae256c0569c-s.woff2',
				revision: 'd54db44de5ccb18886ece2fda72bdfe0',
			},
			{
				url: '/android-chrome-192x192.png',
				revision: '7625badeb036d2297d30773dc9bf3c76',
			},
			{
				url: '/android-chrome-512x512.png',
				revision: '1432bfa2f41396f6a93201d2eb4f8c7c',
			},
			{
				url: '/apple-touch-icon.png',
				revision: '8b32af4af3fd8a39190d90eb9f6fc5a8',
			},
			{
				url: '/background/background-image1.jpg',
				revision: '13d9e42d36b1a56bc75a41756ca8c0f5',
			},
			{
				url: '/background/background-image2.jpg',
				revision: '13c6dd7a45b60d93c5af09451187f0a9',
			},
			{
				url: '/background/background-image3.jpg',
				revision: 'b9d6e07cb33c2153de219df903bc2ce9',
			},
			{
				url: '/background/background-image4.jpg',
				revision: 'b67e62a8ce24b2858e2925cf960912e2',
			},
			{
				url: '/background/background-image5.jpg',
				revision: '9aaf3ee2b7c6f5b79e2d77e77a1cc71e',
			},
			{
				url: '/background/background-image6.jpg',
				revision: '3b4e3f10c56fbd5bdbe0f09f3a499d30',
			},
			{
				url: '/experience-banner.jpg',
				revision: 'ea30d25bf2d0b46d4acf99832a6d6d85',
			},
			{
				url: '/favicon-16x16.png',
				revision: '1083b53a35c7fe21ec8dae5a82ca59e3',
			},
			{
				url: '/favicon-32x32.png',
				revision: '88b597fe1249e16747b3644b66e87d1e',
			},
			{ url: '/favicon.ico', revision: '1364bfb47325750e44c65b664ec573f3' },
			{ url: '/fuzile.jpeg', revision: '52234cf2141c3cbc52f6b59cf76613fe' },
			{
				url: '/google523f418b1738107c.html',
				revision: 'd5a452375c14c705493b9c96398373d6',
			},
			{
				url: '/icon-192x192.png',
				revision: '7625badeb036d2297d30773dc9bf3c76',
			},
			{
				url: '/icon-512x512.png',
				revision: '1432bfa2f41396f6a93201d2eb4f8c7c',
			},
			{ url: '/new-logo.png', revision: '87f014b0b366c8fc14089bce7c7ec05b' },
			{ url: '/og-image.jpg', revision: '52234cf2141c3cbc52f6b59cf76613fe' },
			{
				url: '/site.webmanifest',
				revision: 'ad9fc37566dbbbc14cb1308cc329eebb',
			},
			{ url: '/sitemap.xml', revision: '9e35f6442f3bb0ff79bc935bdfde7589' },
			{
				url: '/twitter-image.jpg',
				revision: '52234cf2141c3cbc52f6b59cf76613fe',
			},
		],
		{ ignoreURLParametersMatching: [] }
	);

	workbox.cleanupOutdatedCaches();

	// Start URL caching
	workbox.registerRoute(
		'/',
		new workbox.NetworkFirst({
			cacheName: 'start-url',
			plugins: [
				{
					cacheWillUpdate: async ({ response }) => {
						if (response && response.type === 'opaqueredirect') {
							return new Response(response.body, {
								status: 200,
								statusText: 'OK',
								headers: response.headers,
							});
						}
						return response;
					},
				},
			],
		}),
		'GET'
	);

	// Google Fonts caching
	workbox.registerRoute(
		/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
		new workbox.CacheFirst({
			cacheName: 'google-fonts-webfonts',
			plugins: [
				new workbox.ExpirationPlugin({
					maxEntries: 4,
					maxAgeSeconds: 31536000,
				}),
			],
		}),
		'GET'
	);

	workbox.registerRoute(
		/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
		new workbox.StaleWhileRevalidate({
			cacheName: 'google-fonts-stylesheets',
			plugins: [
				new workbox.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
			],
		}),
		'GET'
	);

	// Static assets caching
	workbox.registerRoute(
		/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
		new workbox.StaleWhileRevalidate({
			cacheName: 'static-font-assets',
			plugins: [
				new workbox.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
			],
		}),
		'GET'
	);

	workbox.registerRoute(
		/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
		new workbox.StaleWhileRevalidate({
			cacheName: 'static-image-assets',
			plugins: [
				new workbox.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
			],
		}),
		'GET'
	);

	workbox.registerRoute(
		/\/_next\/image\?url=.+$/i,
		new workbox.StaleWhileRevalidate({
			cacheName: 'next-image',
			plugins: [
				new workbox.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
			],
		}),
		'GET'
	);

	workbox.registerRoute(
		/\.(?:mp3|wav|ogg)$/i,
		new workbox.CacheFirst({
			cacheName: 'static-audio-assets',
			plugins: [
				new workbox.RangeRequestsPlugin(),
				new workbox.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
			],
		}),
		'GET'
	);

	workbox.registerRoute(
		/\.(?:mp4)$/i,
		new workbox.CacheFirst({
			cacheName: 'static-video-assets',
			plugins: [
				new workbox.RangeRequestsPlugin(),
				new workbox.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
			],
		}),
		'GET'
	);

	workbox.registerRoute(
		/\.(?:js)$/i,
		new workbox.StaleWhileRevalidate({
			cacheName: 'static-js-assets',
			plugins: [
				new workbox.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
			],
		}),
		'GET'
	);

	workbox.registerRoute(
		/\.(?:css|less)$/i,
		new workbox.StaleWhileRevalidate({
			cacheName: 'static-style-assets',
			plugins: [
				new workbox.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
			],
		}),
		'GET'
	);

	workbox.registerRoute(
		/\/_next\/data\/.+\/.+\.json$/i,
		new workbox.StaleWhileRevalidate({
			cacheName: 'next-data',
			plugins: [
				new workbox.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
			],
		}),
		'GET'
	);

	workbox.registerRoute(
		/\.(?:json|xml|csv)$/i,
		new workbox.NetworkFirst({
			cacheName: 'static-data-assets',
			plugins: [
				new workbox.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
			],
		}),
		'GET'
	);

	// API routes caching
	workbox.registerRoute(
		({ url }) => {
			const isSameOrigin = self.origin === url.origin;
			const pathname = url.pathname;
			// Exclude /api/auth/ routes from cache
			const isApiRoute = pathname.startsWith('/api/');
			const excludedApiRoute = pathname.startsWith('/api/auth/');
			return isSameOrigin && isApiRoute && !excludedApiRoute;
		},
		new workbox.NetworkFirst({
			cacheName: 'apis',
			networkTimeoutSeconds: 10,
			plugins: [
				new workbox.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
			],
		}),
		'GET'
	);

	// Catch-all for other same-origin routes
	workbox.registerRoute(
		({ url }) => {
			const isSameOrigin = self.origin === url.origin;
			const pathname = url.pathname;
			return isSameOrigin && !pathname.startsWith('/api/');
		},
		new workbox.NetworkFirst({
			cacheName: 'others',
			networkTimeoutSeconds: 10,
			plugins: [
				new workbox.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
			],
		}),
		'GET'
	);

	// Cross-origin routes
	workbox.registerRoute(
		({ url }) => url.origin !== self.origin,
		new workbox.NetworkFirst({
			cacheName: 'cross-origin',
			networkTimeoutSeconds: 10,
			plugins: [
				new workbox.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
			],
		}),
		'GET'
	);
});

console.log('Service Worker initialized successfully');
