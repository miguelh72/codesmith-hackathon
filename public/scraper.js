/* global chrome */

const SCRAPE_TIMEOUT = 2000; // ms

chrome.storage.sync.get(['name'], (result) => {
  const name = result.name.map(str => str.trim());

  setInterval(() => {
    // scrape for div's with class c-message_kit__gutter__right
    const posts = [...document.querySelectorAll('div.c-message_kit__gutter__right')];

    for (let i = posts.length - 1; i >= 0; i--) {
      const post = posts[i];

      // find first post to mention the user's name
      const nameMatcher = new RegExp(`${name[0]}[^<]*${name[1]}(.*?<br.*?>.*?)*?(<a[^>]*href="(.*?)"[^>]*>)`, 'i');
      const matchResult = post.innerHTML.match(nameMatcher); // matching group 2 is href

      if (matchResult && typeof matchResult[3] === 'string') {
        const link = matchResult[3];
        // confirm link is valid
        if (!link.match(/https*:\/\/.*(codesmith|zoom)/i)) continue;

        // update local storage with latest link
        chrome.storage.sync.set({ lastPPLink: link }, () => {
          console.log('\nCODESMITH WIZARD: Link is set to "' + link + '" in local storage\n'); // TODO remove
        });

        break;
      }
    }
  }, SCRAPE_TIMEOUT);
});



