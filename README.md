# The Archive

A static personal archive site. Pure HTML/CSS/JS, no build step, no backend.

## Adding content

Everything lives in `/content` as JSON. No HTML editing needed for new entries.

- `content/projects.json` — larger finished/in-progress work
- `content/experiments.json` — small or unfinished things
- `content/notes.json` — write-ups (supports HTML in the `body` field)
- `content/gallery.json` — images for the masonry gallery

Copy an existing object in the relevant file and edit the fields. Required fields per type are visible in the existing sample entries. `id` must be unique within its file and is used in the URL (`entry.html?id=...` or `note.html?id=...`).

For a project/experiment image, add file paths or URLs to its `images` array.

## Running locally

Any static server works, e.g.:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`. (Opening `index.html` directly via `file://` will not work — the JSON `fetch` calls require a server.)

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo.
2. Repo Settings → Pages → Source: deploy from branch → `main` / `root`.
3. Site publishes at `https://<username>.github.io/<repo>/`.

## Structure

```
index.html        Home
archive.html       Combined search + filter view
projects.html      Projects grid
experiments.html   Experiments grid
notes.html         Notes list
gallery.html        Masonry gallery
about.html          About
entry.html          Project/experiment detail (reads ?id=)
note.html           Note detail (reads ?id=)
css/style.css       All styles, design tokens at the top
js/                 Page logic, one file per page + shared data.js
content/            JSON data files — edit these to add entries
```

## Future CMS

Content is already decoupled from markup (plain JSON), so a future admin UI could write to these files directly, or the fetch layer in `js/data.js` could be swapped for an API without touching page templates.
