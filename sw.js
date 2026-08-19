const CACHE_NAME='jeju-trip-v16';
const ASSETS=[
  './',
  './index.html',
  './styles.css',
  './Jeju-banner.png',
  './manifest.webmanifest',
  './app-icon-192.png',
  './app-icon-512.png',
  './apple-touch-icon.png',
  './favicon-64.png'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  event.respondWith(
    caches.match(event.request).then(cached=>cached || fetch(event.request).then(res=>{
      const copy=res.clone();
      caches.open(CACHE_NAME).then(cache=>cache.put(event.request, copy)).catch(()=>{});
      return res;
    }).catch(()=>cached))
  );
});

self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const url=(event.notification.data && event.notification.data.url) || './index.html';
  event.waitUntil(
    clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
      for(const client of list){
        if('focus' in client){
          client.navigate(url).catch(()=>{});
          return client.focus();
        }
      }
      if(clients.openWindow) return clients.openWindow(url);
    })
  );
});
