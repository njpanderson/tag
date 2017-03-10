import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fs from 'fs';

import useMockery from '../helpers/mockery';
import structCompare from '../helpers/structCompare';
import final_pallet from '../fixtures/parsed-pallet';

describe('Index', function() {
	let App, final_template;

	chai.use(chaiAsPromised);

	final_template = fs.readFileSync('test/fixtures/template-with-drop-zones.html', {
		encoding: 'UTF-8'
	});

	useMockery(() => {
		useMockery
			.registerMultiple({
				'./UI.jsx': require('../mocks/UI'),
				'./lib/Template': require('../mocks/Template'),
				'./lib/ajax': require('../mocks/node/ajax')
			});
	});

	before(() => {
		App = require('../../src/js/app/Index').default;
	});

	it('Should instantiate', function() {
		var app = new App();
		expect(app).to.be.an.instanceof(App);
	});

	it('Should correctly obtain app UI refs', function() {
		var app = new App();
		expect(app._refs.ui.app).to.equal(document.querySelector('.app'));
	});

	it('Should load a template and pallet', function() {
		var app = new App();
		return app.load('test/fixtures/template.html', 'testpallet.json').then(() => {
			expect(app._data.template).to.equal(final_template);
			expect(app._data.pallet).to.have.length(2);
			structCompare(app._data.pallet[0], final_pallet[0]);
			structCompare(app._data.pallet[1], final_pallet[1]);
		});
	});

	it('Should throw with a non-existent template file', function() {
		var app = new App();
		return expect(app.load('404.html', 'testpallet.json'))
			.to.eventually.be.rejectedWith(Error, '404');
	});

	it('Should throw with a non-existent pallet file', function() {
		var app = new App();
		return expect(app.load('test/fixtures/template.html', '404.json'))
			.to.eventually.be.rejectedWith(Error, '404');
	});

	it('Should throw with invalid pallet JSON data', function() {
		var app = new App();
		return expect(app.load('test/fixtures/template.html', 'corrupted.json'))
			.to.eventually.be.rejectedWith(Error, 'could not be parsed');
	});

	it('Should throw with empty/invalid pallet JSON', function() {
		var app = new App();
		return expect(app.load('test/fixtures/template.html', 'empty.json'))
			.to.eventually.be.rejectedWith(Error, 'isn’t a valid array in JSON format');
	});
});