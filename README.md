# Book Catalogue (Under Construction)

## Hosted on <https://books.ashhill.dev>

With AI-generated covers! Cover themes can be swapped for [all books easily](public/config.json).

![](book-cover-generation.png)



## Latest Snapshot

<div align="center" style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
  <img src="timeline/screenshot-latest.png" width="600" style="margin:0 8px;" />
</div>

## GIF Timeline

<div align="center" style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
  <img src="timeline/timeline.gif" width="600" style="margin:0 8px;" />
</div>

## Maintenance

`public/books.json` is the source of truth for the book contents on the site.

Any new books without covers will use DALL-E to generate a new cover that goes along with the current theme. 

The current theme is decided via `coverStyle` in `public/config.json` in order to have the generated art have a bit of uniformity.

## TODO

- Change the search bar to search for title and not tags since we have a tag filter now.

- Have [idea for an animation](https://github.com/ashfordhill/background-friends) in the bg but need to figure out how to do it via AI tools.

- Need to fill out more books, write reviews..someday. Definitely..(!)

- A book dislike list could be cool. could have the buttons be like '❤️ Books' and '👎 Books'. I suppose the Review display and pop open box contents would be the same. Yeah, I'm doin this.
