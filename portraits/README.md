# Pioneer portraits

Every pioneer shows a circular portrait in a thin gold ring — exactly as in the Web of
Computation. Until a photo is added, the medallion carries a gold **emblem** of the person's
signature idea (a Königsberg graph for Euler, the 17-gon for Gauss, a Hilbert curve for
Hilbert…), drawn in `emblems.js`. A photo always replaces the emblem.

**The quickest way:** save a photo as `portraits/<id>.jpg` (the `id` from `pioneers-data.js`,
e.g. `noether.jpg`). The site finds it on its own.

## Adding them all automatically (recommended)

Almost every mathematician on the map has a portrait on Wikimedia Commons, and for historical
figures it is usually **public domain**. `tools/fetch_portraits.py` looks up each pioneer's lead
image on Wikipedia, keeps it only if it lives on Commons under a free licence (public domain,
CC0, CC BY, CC BY-SA), crops it square, and writes the credits file for you:

```sh
pip install pillow
python3 tools/fetch_portraits.py            # everyone missing a portrait
python3 tools/fetch_portraits.py noether    # just one person
```

It needs internet access to `en.wikipedia.org`, `commons.wikimedia.org` and
`upload.wikimedia.org`, so run it on your own computer. Check the results by eye before
committing: the lead image is usually, but not always, a good portrait (for Euclid, Diophantus
or Hypatia it may be an imagined likeness painted centuries later — the emblem may suit them
better; delete the file to go back to it).

## Adding one portrait by hand

`python3 tools/add_portrait.py noether photo.jpg --artist "…" --license "…" --source "…"`
crops it square, saves it in the right place and records the credit. Or do it manually:

1. Save the image as `portraits/<id>.jpg`, square, about 320×320 px, face in the upper third.
2. Add an entry to `portraits/credits.js`:

   ```js
   noether: {
     file: "portraits/noether.jpg",
     artist: "Photographer's name, as the source asks",
     license: "Public domain",
     licenseUrl: "",
     source: "https://commons.wikimedia.org/wiki/File:..."
   },
   ```

The credit is shown under the portrait in the biography panel and in the gallery's
"Photo credits" list.

## Using images you are allowed to publish

A credit line does not give you the right to publish a photo. Press and agency photos (Getty,
news sites, prize-ceremony photos) belong to their photographers; on a public GitHub Pages site
the owner can send a takedown notice. Safe sources: public-domain paintings and old photographs
(anything published before 1930 in the US), freely licensed photos on Wikimedia Commons (credit
them as the licence asks), official university press photos whose terms allow reuse, photos you
took yourself, or photos used with written permission (record it as
`license: "Used with permission"`).
