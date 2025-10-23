"use client";

export function Notifications() {
  const requestPermission = async () => {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }
    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
      const reg = await navigator.serviceWorker.getRegistration();
      await reg?.showNotification('Breaking: Battery breakthrough', {
        body: 'Tap to view the story',
        icon: '/icon.png',
        tag: 'breaking-1'
      });
    }
  };

  return (
    <section className="space-y-4">
      <div className="card p-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Enable push notifications for breaking news.</p>
        <button className="mt-3 px-4 py-2 rounded-md bg-accent-500 text-white" onClick={requestPermission}>Enable & Test</button>
      </div>
    </section>
  );
}
