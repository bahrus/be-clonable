# Add Support For Programmatic Attachment

## Bruce's Ask

Can you please follow the example of [be-persistent](https://github.com/bahrus/be-persistent) and [the addendum](../types/ImportantEnhancementAddendum.md) to add demos and adjust be-clonable.js as needed and add def.js to support programmatic attachment of this enhancement?

Please add your implementation notes below.

## Implementation Notes

be-clonable can now be attached with no attribute and no be-hive, via
`el.enh.set.beClonable` or `el.enh.get(emc)`. It follows be-persistent and
addendum steps 1–6. Step 7 (accept elements wherever an id is accepted)
doesn't apply: be-clonable takes no ids.

### What changed

| File | Change |
|------|--------|
| `def.js` (new) | `defBeClonable(ref)`, the formulaic copy of be-persistent's. |
| `be-clonable.js` | `init` reads `ctx.emc \|\| ctx.config`, `await`s roundabout, then sets `initialized` (steps 1–2). `beCloned` enhances the clone directly when attached programmatically (see below). |
| `emc.mjs` → `emc.json`, `⿻.json` | `enhKey` changed from `BeClonable` to `beClonable`. The `resolved` dispatch compact is replaced by `propagate: ['resolved', 'cloneInsertPosition']`. |
| `package.json` | `exports` now lists `./def.js`, `./emc.json` and `./⿻.json`. `files` now includes the two JSON files. |
| `types/be-clonable/types.d.ts` | Adds `initialized?: boolean`. |
| `README.md` | New "Programmatic attachment (no attribute)" section (step 6). It replaces the stale `oLabel.beEnhanced.by.beClonable` snippet. Also a short attribute example for the three settings attributes. |
| `demo/Programmatic/` | `DeclarativeInSequence.html`, `DeclarativeOutOfSequence.html`, `Imperative.html`. |
| `tests/Programmatic*.{html,spec.mjs}` | One per pattern (step 5). |

Before changing `package.json`, `exports` pointed at `./emc.js` and
`./⿻.js`, which don't exist. And `files` (`*.js`) left out `emc.json`, which
`def.js` imports. So a published package would have broken `def.js`.

### Things that were specific to be-clonable

1. **`enhKey` casing.** `enh.set` / `enh.get` look up the instance by the
   exact `enhKey`. With `BeClonable`, the programmatic API would have been
   `el.enh.set.BeClonable`, unlike `bePersistent` and the rest. Nothing
   depended on the capitalized key, other than the id be-hive generates for
   the script tag.

2. **Clones of a programmatically enhanced element.** With the attribute,
   the clone copies `be-clonable`, and be-hive enhances it in turn. With
   programmatic attachment, there's no attribute to copy. The clone got a
   copy of the button with no click handler, so it looked clonable but did
   nothing. Now, if the instance was spawned without `ctx.emc`, `beCloned`:
   - seeds `clone.enh.beClonable` with the same three settings;
   - calls `clone.enh.get(config)`;
   - the copied button is then found and reused (`byob`).

   The attribute path is unchanged: it returns early and leaves the clone to
   be-hive.

3. **`cloneInsertPosition` was unmonitored** (addendum step 4). No action
   references it, so roundabout never made it reactive. A value set right
   after `enh.get(emc)`, e.g. `Object.assign(el.enh.get(emc),
   {cloneInsertPosition: 'beforebegin'})`, was silently overwritten by the
   default `'afterend'`. Fix: list it in `propagate`.

4. **Pre-existing error in the attribute path.** roundabout's `dispatch`
   compact checks `vm.propagator`, then calls `vm.dispatchEvent`. BeClonable
   isn't an `EventTarget`, so each instance logged `vmAny.dispatchEvent is
   not a function` twice. I replaced `when_resolved_changes_dispatch` with
   `propagate: ['resolved']`. That keeps a `'resolved'` event firing on the
   instance's `propagator`.
   **Possible roundabout fix:** `processors/compacts.js` should probably
   call `vmAny.propagator.dispatchEvent(...)`.

### Dependencies

`package-lock.json` still pinned old versions (assign-gingerly 0.0.51,
roundabout-lib 0.0.21, etc.), which have no `enh.get` / `enh.set`.
`npm install` brought the lockfile up to `package.json`'s versions
(assign-gingerly 0.0.97, roundabout-lib 0.0.38, be-hive 0.1.18,
mount-observer 0.1.53).

### Tests

The three new specs follow be-persistent's fixtures. They load only
`def.js`: no attribute, no be-hive. Each one:
- checks the button was added with the custom content;
- clicks it and checks where the clone landed (`afterend`, or `beforebegin`
  in the imperative test);
- **clicks the clone's button**, and expects a third label;
- asserts no console errors;
- asserts mount-observer was never requested. This backs the README's "less
  overhead" claim.

`test1.spec.mjs` (the attribute path) now also asserts no console errors.

Negative controls. Each fix was temporarily reverted, and its test failed
for the expected reason:

| Reverted | Result |
|----------|--------|
| `cloneInsertPosition` dropped from `propagate` | Imperative fails: "clone not inserted beforebegin" |
| `clone.enh.get(config)` removed | All 3 fail: "expected 3 labels after clicking the clone's button, got 2" |
| `ctx.config` fallback removed | All 3 fail: "no trigger button added" |
| old dispatch compact restored | test1 fails on `vmAny.dispatchEvent is not a function` |

Final run: **4 passed** (test1 plus the three programmatic specs). The
three demo pages and the new README attribute example were also checked in
the browser: the button is added, cloning works, clones of clones work, and
there are no console errors.

The first `test1` run after `npm install` failed once, on a cold dev
server, and passed on every rerun. Its fixed 500 ms delay is tight.

### To commit

- The `types.d.ts` change is in this clone of the `types` submodule. It
  needs committing / pushing from there.

