import { dialogModes } from '../assets/constants';
import actions from '../state/actions';

/**
 * Handle production of tour dialogs.
 * @param {UI} parent - Parent UI class instance.
 * @class
 */
var Tour = function(parent) {
	this._parent = parent;
};

Tour.prototype = {
	/**
	 * Produce the tour introduction.
	 */
	intro: function() {
		return this._parent._showDialog(dialogModes.GENERAL, this._parent.dialogs.intro)
			.then((dialog) => {
				this._parent._hideDialog();

				if (dialog.action === 'tour') {
					this.start();
				}
			});
	},

	/**
	 * Starts the tour (but will continue if paused).
	 */
	start: function() {
		return this._progressTour();
	},

	/**
	 * Starts or progreses the tour (by one dialog).
	 * @private
	 */
	_progressTour: function(index = null) {
		var state;

		// get next tour item from state or default
		if (index === null) {
			state = (this._parent._store.getState()).UI;
			index = (state.tour_stage !== null) ? (state.tour_stage + 1) : 0;
		}

		if ((this._parent.dialogs.tour.length - 1) >= index) {
			this._setTourStage(index);
			return this._showTourElement(index)
				.then((dialog) => {
					this._parent._hideDialog();

					// if action is pause, will pause the tour by doing nothing
					if (dialog.action === 'cancel') {
						// end the tour
						this._setTourStage(null);
					} else if (dialog.action !== 'pause') {
						// progress the tour
						this._progressTour((index + 1));
					}
				});
		} else {
			// end of tour - set stage to null and hide dialog
			this._setTourStage(null);
			return this._parent._hideDialog();
		}
	},

	/**
	 * Show a specific indexed element of the tour.
	 * @private
	 */
	_showTourElement(index) {
		return this._parent._showDialog(
			dialogModes.TOUR,
			this._parent.dialogs.tour[index]
		);
	},

	/**
	 * Set the tour stage index (using Redux).
	 * @private
	 */
	_setTourStage: function(stage) {
		this._parent._store.dispatch(
			actions.setTourStage(stage)
		);
	}
};

export default Tour;