(function() {
  "use strict";

  let pat, username;
  const pollingIntervalMs = 30 * 60 * 1000;

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
    const prsUrl = `https://api.github.com/search/issues?q=is:pr+repo:uipath/activities+author:${username}&access_token=${pat}`;

    const prsResult = await fetch(prsUrl);
    const prs = await prsResult.json();
    const commentsRequests = [];
    const date = new Date();
    // date.setMilliseconds(date.getMilliseconds() - pollingIntervalMs);
    date.setDate(date.getDate() - 4);
    const since = date.toISOString();

    prs.items.forEach(pr => {
      if (pr.comments > 0) {
        commentsRequests.push(
          fetch(
            `https://api.github.com/repos/uipath/activities/issues/${
              pr.number
            }/comments?since=${since}&access_token=${pat}`
          )
        );
      }

      commentsRequests.push(
        fetch(
          `https://api.github.com/repos/uipath/activities/pulls/${
            pr.number
          }/comments?since=${since}&access_token=${pat}`
        )
      );
    });

    const result = await Promise.all(commentsRequests);
    const jsonResult = await Promise.all(result.map(comment => comment.json()));

    const notifications = jsonResult
      .filter(comments => comments.length > 0)
      .flat()
      .map(comment => {
        const type = comment.pull_request_review_id ? "code" : "PR";
        const url = comment.html_url;

        return {
          title: `You have a new ${type} comment!`,
          options: {
            actions: [{ action: "open_url", title: "Open" }],
            data: { url }
          }
        };
      });

    return notifications;
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
