# gsap-as-promised
[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)
[![NPM](https://img.shields.io/npm/v/smart-extend.svg)](https://npmjs.com/package/smart-extend)

A Promise wrapper around gsap (TweenLite by default, but can wrap any gsap library).

```js
var animate = require('gsap-as-promised')

Promise.all([
	animate(element, 1.0, { x: 10 }),
	animate(element, 1.0, { y: 10, delay: 0.5 })
]).then(function() {
	console.log("all animations finished")
})

var animateMax = animate.wrap(require('gsap')); // If you want to wrap TweenMax
animateMax.staggerTo(...);
```

## Usage
This library promisifies all `TweenLite` methods: (e.g. `to`,`from`,`fromTo`,`set`, etc.) Use the [official documentation](https://greensock.com/docs/TweenLite) for complete reference.

### Common methods (not everything)
#### ```animate(element, duration, params)```
#### ```animate.to(element, duration, params)```
#### ```animate.from(element, duration, from)```
#### ```animate.set(element, params)```
#### ```animate.fromTo(element, duration, from, to)```

Matches the TweenLite methods by the same name, but returns a Promise for the onComplete event.

#### ```animate(element, duration, params)```
The default export is the same as `animate.to`.

#### ```animate.all(element)```
An alias for `Promise.all`, which will trigger all tweens in parallel.

#### ```animate.wrap(gsapLib)```
Wraps the provided [gsap](https://github.com/greensock/GreenSock-JS) library with promisified methods. This doesn't actually modify the provided object but rather returns a wrapped object that uses a promisified version of the methods of the provided object;


## License
MIT © [Daniel Kalen](https://github.com/danielkalen)
