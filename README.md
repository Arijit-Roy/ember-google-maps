# 📍 Ember Google Maps

> A *lightweight*, *declarative*, *composable* API for building ambitious map UIs in your Ember apps.

⚠ **This addon is in active development. APIs may change.** ⚠

##### What this addon *is*:

* ✅ A lightweight Ember API for working with Google Maps.
* ✅ An on-demand, asynchronous loader for the Google Maps API.

##### What this addon *is not*:

* ❌ A bulky, verbose wrapper that reimplements the entire Google Maps API.
* ❌ A whitelist or option validator that is tightly coupled to Google's API.

#### Documentation

[View guides and documentation ›](https://ember-google-maps.sandydoo.me/)

#### Maintainers

This addon is maintained by [campusboard](https://www.campusboard.co.uk).

#### 👀 Alternatives

The two *maintained* alternatives are [ember-g-map](https://github.com/asennikov/ember-g-map) and [ember-cli-g-maps](https://github.com/Matt-Jensen/ember-cli-g-maps).

Here's a *very subjective* 😬 comparison of the Ember + Google Maps integration addons available today:

|                           | ember-google-maps | ember-g-map       | ember-cli-g-maps  |
| ------------------------- | ----------------- | ----------------- | ----------------- |
| Lightweight               | ✅                | ✅                | ❌               |
| Minimal wrapping          | ✅                | ❌                | ❌               |
| Async API loading         | ✅                | ❌                | ✅               |
| Official Google API       | ✅                | ✅                | ❌               |
| Leverages templates       | ✅                | ✅                | ❌               |
| Contextual components     | ✅                | ❌                | ❌               |
| Minimal observer usage    | ✅                | ❌                | ❌               |
| Native Ember HTML markers | ✅                | ❌                | ❌               |

**ember-g-map** provides a great template-oriented API for working with maps. It is however a bit long in the tooth for some refactoring and upgrades, like supporting contextual components and more Google Maps components. The current architecture makes adding these features quite involved. It also doesn't support loading the Google Maps API asynchronously and by default inserts a render-blocking script tag into your HTML!

**ember-cli-gmaps** actually uses a [custom fork](https://github.com/Matt-Jensen/gmaps-for-apps) of [gmaps](https://github.com/hpneo/gmaps) – a wrapper for the Google Maps API. That's 3 whole layers of complex wrappers tightly coupled to their API all to render a map and some markers in Ember – be wary of this if you are conscious of build sizes and/or technical debt. It also doesn't utilize any of the paradigms that we love about Ember, like templates, contextual components, closure actions, etc.

If you don't need the Google API specifically, check out [ember-leaflet](https://github.com/miguelcobain/ember-leaflet).

#### Basic usage

Display a map centered around a set of coordinates 🗺.

```handlebars
{{g-map lat='51.508530' lng='-0.076132' zoom=10}}
```

Display an array of locations using markers 📍.

```handlebars
{{#g-map lat='51.508530' lng='-0.076132' zoom=10 as |g|}}
  {{#each locations as |l|}}
    {{g.marker lat=l.lat lng=l.lng onClick=(action 'showDetails' l)}}
  {{/each}}
{{/g-map}}
```

Display a custom overlay, like a custom HTML marker using template blocks 😱.
This lets you do all sorts of fancy things, like adding CSS animations and binding data.

```handlebars
{{#g-map lat='51.508530' lng='-0.076132' zoom=10 as |g|}}
  {{#each rentals as |r|}}
    {{#g.overlay lat=r.lat lng=r.lng classNames='custom-marker'}}
      <div class="marker-content">
        <p class="price">{{r.price}}</p>
      </div>
    {{/g.overlay}}
  {{/each}}
{{/g-map}}
```

[Learn more](https://ember-google-maps.sandydoo.me/)

## License

[MIT](https://github.com/sandydoo/ember-google-maps/blob/master/LICENSE.md) © Sander Melnikov.