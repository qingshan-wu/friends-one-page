/// <reference lib="WebWorker" />
// export type {};
export type {}

declare const self: ServiceWorkerGlobalScope

self.addEventListener('message', (event) => {
  if (event.data === 'New message from another tab') {
    self.clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      .then((windowClients) => {
        windowClients.forEach((client) => {
          client.postMessage({
            data: 'New message from',
          })
        })
      })
  }
})
