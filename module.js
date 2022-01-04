(function (root, factory) {
	if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof define === 'function' && define.cmd) {
		define(function (require, exports, module) {
			module.exports = factory();
		});
	} else {
		root.umdModule = factory();
	}
})(this, function () {
	/**
	 * 创建元素
	 * @param {*} type
	 * @returns
	 */
	function createElement(type) {
		return document.createElement(type);
	}

	/**
	 * 插入元素
	 * @param {*} parent
	 * @param {*} child
	 */
	function append(parent, child) {
		parent.appendChild(child);
	}

	/**
	 * 移除元素
	 * @param {*} parent
	 * @param {*} child
	 */
	function remove(parent, child) {
		parent.removeChild(child);
	}

	/**
	 * 延迟执行
	 * @param {*} fn
	 * @param {*} time
	 */
	function delay(fn, time) {
		setTimeout(fn, time);
	}

	/**
	 * 初始化
	 */
	function init() {
		const h1 = createElement('h1');
		h1.innerText = 'hello world';

		const body = document.body;
		append(body, h1);

		delay(function () {
			// remove(body, h1);
		}, 2000);
	}

	init();

	return {
		createElement,
		append,
		remove,
		delay,
		init,
	};
});
