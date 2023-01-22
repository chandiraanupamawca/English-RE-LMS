const urlsToCache = ["/","/js"];
self.addEventListener("install", (event) => {
   event.waitUntil(async () => {
      const cache = await caches.open("v1");
      console.log("cached")
      return cache.addAll(urlsToCache);
   });
});