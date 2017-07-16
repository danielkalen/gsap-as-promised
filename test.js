var animate = require('./dist/gsap-as-promised.js')
var assert = require('chai').assert;

suite('a Promise wrapper around gsap / tweenlite', function() {
	test('animate', function(){
		var target = { value: 0 };
		
		return Promise.resolve()
			.then(function(){
				return animate(target, 0.5, {value: 1.0})
			})
			.then(function(){
				assert.equal(target.value, 1, 'animate() works');
			})
	});
	
	test('animate.to', function(){
		var target = { value: 0 };
		
		return Promise.resolve()
			.then(function(){
				return animate.to(target, 0.5, {value: 1.0})
			})
			.then(function(){
				assert.equal(target.value, 1, 'animate.to() works');
			})
	});
	
	test('animate.set', function(){
		var target = { value: 5 };
		
		return Promise.resolve()
			.then(function(){
				return animate.set(target, {delay: 0.5, value: 10})
			})
			.then(function(){
				assert.equal(target.value, 10, 'animate.set() works');
			})
	});
	
	test('animate.from', function(){
		var target = { value: 10 };
		
		return Promise.resolve()
			.then(function(){
				setTimeout(function(){
					assert.isBelow(target.value, 10);
					assert.isAtLeast(target.value, 5);
				}, 200);
			})
			.then(function(){
				return animate.from(target, 0.5, {value: 5});
			})
			.then(function(){
				assert.equal(target.value, 10, 'animate.from() works');
			})
	});
	
	test('animate.fromTo', function(){
		var target = { value: 0 };
		
		return Promise.resolve()
			.then(function(){
				setTimeout(function(){
					assert.isBelow(target.value, 100);
					assert.isAtLeast(target.value, 50);
				}, 25);
			})
			.then(function(){
				return animate.fromTo(target, 0.5, {value: 50}, {value: 100})
			})
			.then(function(){
				assert.equal(target.value, 100, 'animate.fromTo() works');
			})
	});
	


	test('Promise all', function(){
		var _this = this;
		var f = [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}];
		var to = {value: 100};
		var timeout = setTimeout(function () {
			throw new Error('not all promises resolved, are arguments being mutated?');
		}, 800)
		
		return animate.all([
			a=animate.set(f[0], {value: 100}),
			b=animate.set(f[1], {value: 100}),
			c=animate.to(f[2], 0.5, {value: 100}),
			d=animate.to(f[3], 0.5, {value: 100}),
			e=animate.fromTo(f[4], 0.5, {value: 0}, {value: 100}),
			ff=animate.fromTo(f[5], 0.5, {value: 0}, {value: 100})
		]).then(function () {
			clearTimeout(timeout)

			assert(f.every(function (item) {
				return item.value === to.value
			}), 'all promises resolved')
		})
	})
});