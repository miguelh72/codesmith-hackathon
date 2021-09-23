/* global chrome */

const interval = 2000;

chrome.storage.sync.get(['name'], (result) => {
  const name = result.name;
  name[0] = name[0].trim();
  name[1] = name[1].trim();

  setInterval(() => {
    // scrape for div's with class c-message_kit__gutter__right
    const posts = [...document.querySelectorAll('div.c-message_kit__gutter__right')];

    for (let i = posts.length - 1; i >= 0; i--) {
      const post = posts[i];

      // find first post to mention the user's name
      const nameMatcher = new RegExp(`${name[0]}[^<]*${name[1]}(.*?<br.*?>.*?)*?(<a[^>]*href="(.*?)"[^>]*>)`, 'i');
      //const nameMatcher = new RegExp(`${name[0]}[^<]*${name[1]}.*?(<a[^>]*href="(.*?)"[^>]*>)`, 'i');
      // const nameMatcher = new RegExp(`${name[0]}[^<]*${name[1]}[^<]*(<a[^>]*href="(.*?)"[^>]*>)`, 'i');
      const matchResult = post.innerHTML.match(nameMatcher); // index 2 is href

      if (matchResult && typeof matchResult[3] === 'string') {
        const link = matchResult[3];
        // TODO add regex to confirm link is valid
        if (!link.match(/https*:\/\/.*(codesmith|zoom)/i)) continue;

        // update local storage with latest link
        chrome.storage.sync.set({ lastPPLink: link }, () => {
          console.log('\nWIZARD: Link is set to "' + link + '" in local storage\n'); // TODO remove
        });

        break;
      }
    }
  }, interval);
});



