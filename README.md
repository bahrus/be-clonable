# be-clonable

be-clonable adds a button to any element that allows the element to be cloned.

## Syntax

```html
<label be-clonable>
    <input type="checkbox" name="">
    <span>Check me out</span>
</label>
```

If the server can be trained to recognize this attribute, it can generate the button ahead of time with class be-clonable-trigger, and be-clonable will use the server-created button.

```html
<label be-clonable>
    <input type="checkbox" name="">
    <span>Check me out</span>
    <button class="be-clonable-trigger">❏</button>
</label>
```

The button as well as the event handler can be attached during template instantiation as well, if using the trans-render library [TODO].

