import default_state from '../assets/default-state';
import { actionTypes, uiStates } from '../assets/constants';

import { combineReducers } from 'redux';

/**
 * Sets application state values
 */
function app(state = default_state.app, action) {
	var active;

	switch (action.type) {
	// set ui state
	case actionTypes.UI_STATE:
		// set 'active' flag based on the ui_state value
		switch (action.ui_state) {
		case uiStates.ACTIVE:
			active = true;
			break;

		default:
			active = false;
		}

		return Object.assign({}, state, {
			ui_state: action.ui_state,
			active
		});

	case actionTypes.SET_ACTIVE_DROPLET:
		// set the active droplet (i.e. the one that will be "dropped" when a
		// drop zone is next clicked
		return Object.assign({}, state, {
			active_droplet_id: action.droplet_id
		});

	default:
		return state;
	}
}

/**
 * Sets drop zone state values
 */
function zones(state = default_state.zones, action) {
	var zones = Object.assign({}, state);

	switch (action.type) {
	case actionTypes.ZONE_ADD_ATTACHMENT:
		if (!zones[action.id]) {
			zones[action.id] = {
				attachments: []
			};
		}

		// attach the droplet
		zones[action.id].attachments.push({
			droplet_id: action.droplet_id,
			data: action.data
		});

		break;

	case actionTypes.ZONE_EDIT_ATTACHMENT:
		if (zones[action.id].attachments[action.attachment_index]) {
			zones[action.id].attachments[action.attachment_index].data = action.data;
		}

		break;

	case actionTypes.ZONE_DETACH_ATTACHMENT:
		// detach the attachment by index
		if (action.attachment_index !== null &&
			action.attachment_index < zones[action.id].attachments.length) {
			zones[action.id].attachments.splice(action.attachment_index, 1);
		}

		break;

	default:
		return state;
	}

	return zones;
}

function dialog(state = default_state.dialog, action) {
	switch (action.type) {
	case actionTypes.SET_DIALOG_MODE:
		return Object.assign({}, state, {
			mode: action.mode,
			state: action.state
		});

	default:
		return state;
	}
}

export default combineReducers({
	app,
	zones,
	dialog
});