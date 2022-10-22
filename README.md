# be-clonable

be-clonable is a web component decorator, that adds or hydrates a triggering button, and enables that button to clone the adorned element.

[![Playwright Tests](https://github.com/bahrus/be-clonable/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-clonable/actions/workflows/CI.yml)

<a href="https://nodei.co/npm/be-clonable/"><img src="https://nodei.co/npm/be-clonable.png"></a>

Size of package, including custom element behavior framework (be-decorated):

[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-clonable?style=for-the-badge)](https://bundlephobia.com/result?p=be-clonable)

Size of new code in this package:

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-clonable?compression=gzip">


## Syntax

```html
<label be-clonable>
    <input type="checkbox" name="">
    <span>Check me out</span>
</label>
```

In fact, it is a little better from a performance point of view to manually add the button to go along with the attribute, to save the browser or server from having to render it.

```html
<label be-clonable>
    <input type="checkbox" name="">
    <span>Check me out</span>
    <button class="be-clonable-trigger">❏</button>
</label>
```



The button as well as the event handler can be attached during template instantiation, saving a bit of strain (including layout shift) on the browser, *if* the be-clonable library is already in memory.  If not, *Mei wenti*, this behavior will add it once it is loaded. This works if using the trans-render library for instantiating the template.



## Viewing Locally

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/dev in a modern browser.

## Importing in ES Modules:

```JavaScript
import 'be-clonable/be-clonable.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-clonable';
</script>
```



