# be-clonable (⿻)

be-clonable is a web component decorator, that adds or hydrates a triggering button, and enables that button to clone the adorned element.

[![Playwright Tests](https://github.com/bahrus/be-clonable/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-clonable/actions/workflows/CI.yml)
[![NPM version](https://badge.fury.io/js/be-clonable.png)](http://badge.fury.io/js/be-clonable)

Size of package, including custom element behavior framework (be-enhanced/be-hive): [![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-clonable?style=for-the-badge)](https://bundlephobia.com/result?p=be-clonable)

Size of new code in this package: <img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-clonable?compression=gzip">


## Vernacular

```html
<label be-clonable>
    <input type="checkbox" name="">
    <span>Check me out</span>
</label>
```

or, alternatively:

```html
<label ⿻>
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



The position of the button, the position of the clone, and the button's content can be adjusted:

```html
<label be-clonable be-clonable-trigger-insert-position=afterbegin be-clonable-clone-insert-position=beforebegin be-clonable-button-content=+>
    <input type="checkbox" name="">
    <span>Check me out</span>
</label>
```

## Programmatic attachment (no attribute)

The attribute syntax shines for server-rendered HTML and progressive enhancement, where the markup alone says what the enhancement does.  But most web development today renders on the client, with a framework (Lit, React, Vue, Svelte, etc.) that already has a JavaScript reference to each element it creates.  There, attaching be-clonable programmatically is the better fit:

1. **A less clunky API.**  Frameworks are awkward about setting arbitrary attributes, let alone an emoji one like `⿻`, or a family of them like `be-clonable-clone-insert-position=beforebegin`.  Programmatically, that is just `{cloneInsertPosition: 'beforebegin'}`.
2. **Less stringifying and parsing.**  Settings go straight onto the enhancement as property values, rather than being written to attributes and read back.
3. **Less overhead monitoring attributes.**  The attribute approach relies on be-hive / mount-observer watching the DOM for elements that carry (or gain) the attribute.  `def.js` just registers the config.  The enhancement is attached exactly when, and to exactly the elements, your code says, and mount-observer is never loaded.

Either way it is the **same enhancement**, with the same defaults, so the two approaches can be mixed in one app: attributes for server-rendered islands, programmatic attachment inside client-rendered components.

### Registration

```JavaScript
import { defBeClonable } from 'be-clonable/def.js';
const emc = await defBeClonable(document.body); // or a shadow root's host, for a scoped registry
```

### Attribute → property mapping

| Attribute                              | Property                | Default        |
|----------------------------------------|-------------------------|----------------|
| `be-clonable` (`⿻`)                    | *(attachment itself)*   |                |
| `be-clonable-trigger-insert-position`  | `triggerInsertPosition` | `'beforeend'`  |
| `be-clonable-clone-insert-position`    | `cloneInsertPosition`   | `'afterend'`   |
| `be-clonable-button-content`           | `buttonContent`         | `'⿻'`          |

The insert positions take any [`InsertPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement#position) value.  As with the attribute path, a `button.be-clonable-trigger` already in place is reused rather than a new one created.

### Declarative -- via `enh.set`

```JavaScript
// equivalent to <label be-clonable be-clonable-button-content=❏>
oLabel.enh.set.beClonable.buttonContent = '❏';
oLabel.enh.beClonable.cloneInsertPosition = 'beforebegin';
```

Only the first property needs to go through `.set` -- that is what attaches the enhancement.  This works before or after `defBeClonable` is called.  If it is called after, the enhancement is attached once the config is registered.

### Imperative -- via `enh.get()`

```JavaScript
Object.assign(oLabel.enh.get(emc), {
    buttonContent: '+',
    cloneInsertPosition: 'beforebegin',
});
```

### Differences from the attribute path

- **Clones.**  With the attribute, each clone carries a copy of the `be-clonable` attribute, so be-hive enhances it in turn.  A programmatically enhanced element has no attribute to copy, so be-clonable attaches itself to each clone directly, with the same settings.  Either way, clones are clonable too.
- **Enhancement key.**  Programmatically, the instance is always at `el.enh.beClonable`.  With the emoji attribute it is at `el.enh['⿻']`.

See [demo/Programmatic](demo/Programmatic/) for runnable examples.


## Viewing Locally

Any web server that serves static files with server-side includes will do but...

1. Install git
2. Fork/clone this repo
3. Install node.js
4. Open command window to folder where you cloned this repo
5. > git submodule add https://github.com/bahrus/types.git types
6. > git submodule update --init --recursive
7. > npm install
8. > npm run serve
9. Open http://localhost:8000/demo/ in a modern browser

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



