function wrapLib(gsap){
	function wrapper(a,b,c){
		return wrapper.to(a,b,c);
	}

	wrapper.all = function(target){
		return Promise.all(target)
	};

	Object.keys(gsap).forEach(function(method){
		wrapper[method] = function(a,b,c,d){
			var tween, promise, opts = arguments[arguments.length-1];
			
			promise = new Promise(function(resolve){
				opts.onComplete = resolve
			});
			
			tween = gsap[method](a,b,c,d);
			
			tween.promise = promise;
			tween.then = function(next, reject){
				promise.then(next, reject);
			}

			return tween;
		}
	});

	return wrapper;
}

var wrapped = wrapLib(require('gsap/src/minified/TweenLite.min.js'));
wrapped.wrap = wrapLib;

module.exports = wrapped;