# tools

Four small browser tools for PDFs and images. Each one does its work inside the page,
so the files you pick are never uploaded.

**→ [hungbo.github.io/tools](https://hungbo.github.io/tools/)**

| Tool | What it does |
| --- | --- |
| [Merge PDF](pdf/merge.html) | Combine several PDFs into one, in an order you set |
| [Split PDF](pdf/split.html) | Pull a page range out as its own file |
| [Compress image](image/compress.html) | Shrink a JPEG, PNG or WebP by quality or width |
| [Convert image](image/convert.html) | Move between PNG, JPEG and WebP |

## How it works

PDFs go through [pdf-lib](https://pdf-lib.js.org/); images go through a `<canvas>`.
Both run in the browser. The only requests the site makes are for its own pages, the
stylesheet, the fonts and the pdf-lib bundle — open the Network panel and watch if you
want to check.

Two consequences worth knowing:

- **PNG has no quality setting.** Compressing a PNG only helps if you also cap its
  width. Converting it to JPEG or WebP usually helps more.
- **JPEG cannot store transparency.** Converting a transparent PNG to JPEG fills the
  see-through areas with white.

## Running it locally

Static HTML, no build step:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Layout

```
index.html          landing page
assets/app.css      shared styles, light and dark
assets/app.js       drop tray, file list, size formatting
pdf/merge.html      pdf-lib: copy pages from N documents into one
pdf/split.html      pdf-lib: copy a parsed page range into a new document
image/compress.html canvas: optional downscale, then re-encode at a chosen quality
image/convert.html  canvas: re-encode to another format at the original size
```

## License

MIT
