const tourDialogModifiers = {
	arrow: {
		element: '.arrow'
	}
};

export default {
	intro: {
		title: 'Welcome to <span class="logo">&lt;<b>Tag</b>&gt;</span>!',
		message: [
			'Tag is an app designed to explain how web pages are constructed.',
			'If you are new to tag, you can use the Tour button in the toolbar.',
			'Otherwise, just click “OK” and get creating!'
		]
	},
	resetState: {
		title: 'Reset Tag',
		message: [
			'Are you sure you want to go back to the beginning?',
			'All of your current work will be cleared.'
		],
		buttons: [{
			type: 'cancel',
			label: 'Cancel'
		}, {
			type: 'submit',
			className: 'danger',
			label: 'Clear my work'
		}]
	},
	tour: [{
		title: 'Welcome to <span class="logo">&lt;<b>Tag</b>&gt;</span>!',
		message: [
			'Tag is an app designed to explain how web pages are constructed.',
			'The idea is simple: Place <b>elements</b> onto the <b>template</b>, and then use the ' +
				'<span class="pseudo-button run"><svg class="icon" width="14" height="14"><use xlink:href="#icon-media-play"></use></svg>Run</span> button to see how the page will look in the <b>view</b>.'
		]
	}, {
		title: 'The template',
		message: [
			'This is the template. It contains the source code for your web page, and is where you’ll add snippets of code.',
			'Add elements to the <span class="drop-zone"><span class="target"><b>...</b></span></span> targets to construct the page.'
		],
		overlay: false,
		attachment: {
			selector: '.main > .template',
			options: {
				placement: 'right',
				modifiers: tourDialogModifiers
			}
		}
	}, {
		title: 'The pallet',
		message: [
			'This is the pallet. It contains Droplets, which can be added to the template above.',
			'Click on a Droplet and then click on one of the <span class="drop-zone"><span class="target"><b>...</b></span></span> targets in the template to attach it.'
		],
		overlay: false,
		attachment: {
			selector: 'section.pallet',
			options: {
				placement: 'top',
				modifiers: tourDialogModifiers
			}
		}
	}, {
		title: 'Droplet',
		message: [
			'This is a Droplet. It can be added to the template above.',
			'Certain <span class="drop-zone"><span class="target"><b>...</b></span></span> targets only allow certain Droplets to be added to them. The target will turn into <span class="drop-zone accept"><span class="target"><b>...</b></span></span> if it can accept the Droplet you have chosen, or <span class="drop-zone decline"><span class="target"><b>...</b></span></span> if you can’t drop the Droplet there.'
		],
		overlay: false,
		attachment: {
			selector: 'section.pallet .droplet:first-child',
			options: {
				placement: 'top',
				modifiers: tourDialogModifiers
			}
		}
	}, {
		title: 'The view',
		message: [
			'This is the view. It will show you how the page looks after running the code!',
			'Use the <span class="pseudo-button run"><svg class="icon" width="14" height="14"><use xlink:href="#icon-media-play"></use></svg>Run</span> button to update the view'
		],
		overlay: false,
		attachment: {
			selector: 'section.view',
			options: {
				placement: 'left',
				modifiers: tourDialogModifiers
			}
		}
	}]
};