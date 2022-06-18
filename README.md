# be-clonable

be-clonable is a web component decorator, that adds or hydrates a triggering button, and enables that button to clone the adorned element.

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



The button as well as the event handler can be attached during template instantiation as well, if using the trans-render library [TODO].



