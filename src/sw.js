(function() {
  "use strict";

  let pat, username;
  const pollingIntervalMs = 30 * 1000;

  self.addEventListener("message", function(event) {
    if (event.data.type === "onLogin") {
      pat = event.data.pat;
      username = event.data.username;
    }
  });

  self.addEventListener("activate", async () => {
    // This will be called only once when the service worker is activated.
    console.log("service worker activate");

    setInterval(async () => {
      if (Notification.permission === "granted" && pat && username) {
        const notifications = await getLatestCommentsNotifications();

        if (notifications && notifications.length > 0) {
          notifications.forEach(({ title, options }) =>
            self.registration.showNotification(title, options)
          );
        }
      }
    }, pollingIntervalMs);
  });

  self.addEventListener(
    "notificationclick",
    event => {
      clients.openWindow(event.notification.data.url);
      event.notification.close();
    },
    false
  );

  const getLatestCommentsNotifications = async () => {
    const date = new Date();
    date.setMilliseconds(date.getMilliseconds() - pollingIntervalMs);
    const since = date.toISOString();
    const url = `https://api.github.com/notifications?since=${since}&all=true&access_token=${pat}`;
    const result = await fetch(url);
    const notifications = await result.json();

    return notifications
      .filter(not => not.unread === true && not.subject)
      .map(not => {
        return {
          title: not.subject.title,
          options: {
            actions: [
              {
                action: "open",
                title: "Open"
              }
            ],
            data: {
              url: generateNotificationUrl(
                not.subject.url,
                not.subject.latest_comment_url
              )
            }
          }
        };
      });
  };

  const generateNotificationUrl = (prUrl, latestCommentUrl) => {
    const splitedPrUrl = prUrl.split("/");
    const prId = splitedPrUrl[splitedPrUrl.length - 1];
    const splittedLatestCommentUrl = latestCommentUrl.split("/");
    const commentId =
      splittedLatestCommentUrl[splittedLatestCommentUrl.length - 1];
    return `https://github.com/UiPath/Activities/pull/${prId}#issuecomment-${commentId}`;
  };
})();

// const options = {
//   "//": "Visual Options",
//   body: "<String>",
//   icon: "<URL String>",
//   image: "<URL String>",
//   badge: "<URL String>",
//   vibrate: "<Array of Integers>",
//   sound: "<URL String>",
//   dir: "<String of 'auto' | 'ltr' | 'rtl'>",
//   "//": "Behavioural Options",
//   tag: "<String>",
//   data: "<Anything>",
//   requireInteraction: "<boolean>",
//   renotify: "<Boolean>",
//   silent: "<Boolean>",
//   "//": "Both Visual & Behavioural Options",
//   actions: "<Array of Strings>",
//   "//": "Information Option. No visual affect.",
//   timestamp: "<Long>"
// };
