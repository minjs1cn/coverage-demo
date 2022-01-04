const fs = require('fs');
const { transformSync } = require('@babel/core');
const args = process.argv;

const [, , coverageFilePath, modulePath] = args;

const coverage = JSON.parse(fs.readFileSync(coverageFilePath, 'utf-8'));

coverage.forEach(element => {
	if (element.url.endsWith(modulePath)) {
		const code = minify(element.text, element.ranges);
		fs.writeFileSync(element.url.split('/').pop().replace('.', '.min.'), code);
	}
});

function minify(source, ranges) {
	let cursor = 0;

	const result = transformSync(source, {
		// minified: true,
		// comments: false,
		plugins: [
			{
				name: 'coverage',
				visitor: {
					BlockStatement(path) {
						const { node } = path;
						const { start, end } = node;

						while (cursor < ranges.length) {
							const range = ranges[cursor];

							// 代码未执行到，继续
							if (range.end <= start) {
								cursor++;
								continue;
							}

							// 代码以跳过，删除
							if (range.start >= end) {
								path.node.body = [];
								if (path.parent.params) {
									path.parent.params = [];
								}
							}

							// 代码被执行，不做处理
							return;
						}
					},
				},
			},
		],
	});

	return result.code;
}
