import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import {name, version, homepage, main, module} from './package.json';

const banner = `/*!
* ${name} v${version}
* ${homepage}
 * (c) ${(new Date(process.env.SOURCE_DATE_EPOCH ? (process.env.SOURCE_DATE_EPOCH * 1000) : new Date().getTime())).getFullYear()} chartjs-plugin-annotation Contributors
 * Released under the MIT License
 */`;

const input = 'src/index.js';
const inputESM = 'src/index.esm.js';
const external = [
	'chart.js',
	'chart.js/helpers'
];
const globals = {
	'chart.js': 'Chart',
	'chart.js/helpers': 'Chart.helpers'
};

export default [
	{
		input,
		plugins: [
			resolve(),
		],
		output: {
			name,
			file: main,
			banner,
			format: 'umd',
			indent: false,
			globals
		},
		external
	},
	{
		input,
		plugins: [
			resolve(),
			terser({
				output: {
					preamble: banner
				}
			})
		],
		output: {
			name,
			file: main.replace('.js', '.min.js'),
			format: 'umd',
			sourcemap: true,
			indent: false,
			globals
		},
		external
	},
	{
		input: inputESM,
		plugins: [
			resolve()
		],
		output: {
			name,
			file: module,
			banner,
			format: 'esm',
			indent: false
		},
		external
	},
];
