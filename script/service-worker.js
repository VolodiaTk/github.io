if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('script/service-worker.js')
      .then(registration => {
        console.log('Service Worker зарегистрирован с областью видимости:', registration.scope);
      })
      .catch(error => {
        console.error('Ошибка при регистрации Service Worker:', error);
      });
}