/* global chrome */

const interval = 2000;

chrome.storage.sync.get(['name'], (result) => {
  const name = result.name;

  setInterval(() => {
    console.log(`Injected with name ${name}`); // TODO RM

    // scrape for div's with class c-message_kit__gutter__right
    const posts = [...document.querySelectorAll('div.c-message_kit__gutter__right')];
    for (let i = posts.length - 1; i >= 0; i--) {
      const post = posts[i];

      // find first post to mention the user's name
      const nameMatcher = new RegExp(`${name[0]}[^<]*${name[1]}[^<]*(<a[^>]*href="(.*?)"[^>]*>)`, 'i');
      const matchResult = post.innerHTML.match(nameMatcher); // index 2 is href

      if (matchResult && typeof matchResult[2] === 'string') {
        const link = matchResult[2];
        // TODO add regex to confirm link is valid
        if (!link.match(/https*:\/\//i)) continue;

        // update local storage with latest link
        chrome.storage.sync.set({ lastPPLink: link }, () => {
          console.log('Link is set to ' + link + 'in local storage'); // TODO remove
        });

        break;
      }
    }
  }, interval);
});



