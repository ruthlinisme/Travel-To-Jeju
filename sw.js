const CACHE_NAME='jeju-trip-v16h';
const CORE_ASSETS=[
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
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys
        .filter(key=>key.startsWith('jeju-trip-') && key!==CACHE_NAME)
        .map(key=>caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('message',event=>{
  if(event.data && event.data.type==='SKIP_WAITING'){
    self.skipWaiting();
  }
});

function shouldUseNetworkFirst(request){
  const url=new URL(request.url);
  if(request.mode==='navigate') return true;
  if(url.origin!==self.location.origin) return false;
  return (
    url.pathname.endsWith('/index.html') ||
    url.pathname.endsWith('/styles.css') ||
    url.pathname.endsWith('/manifest.webmanifest') ||
    url.pathname.endsWith('/sw.js')
  );
}

async function networkFirst(request){
  const cache=await caches.open(CACHE_NAME);
  try{
    const response=await fetch(request,{cache:'no-store'});
    if(response && response.ok){
      cache.put(request,response.clone()).catch(()=>{});
    }
    return response;
  }catch(err){
    const cached=await cache.match(request);
    if(cached)return cached;
    throw err;
  }
}

async function cacheFirst(request){
  const cached=await caches.match(request);
  if(cached)return cached;
  const response=await fetch(request);
  if(response && response.ok && request.url.startsWith(self.location.origin)){
    const cache=await caches.open(CACHE_NAME);
    cache.put(request,response.clone()).catch(()=>{});
  }
  return response;
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(
    shouldUseNetworkFirst(event.request)
      ? networkFirst(event.request)
      : cacheFirst(event.request)
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
      if(clients.openWindow)return clients.openWindow(url);
    })
  );
});
