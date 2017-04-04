export const actionTypes = {
	UI_STATE: 'ui-state',
	ZONE_ADD_ATTACHMENT: 'zone-add-attachment',
	ZONE_EDIT_ATTACHMENT: 'zone-edit-attachment',
	ZONE_DETACH_ATTACHMENT: 'zone-detach-attachment',
	ZONE_CLEAR_ALL_ATTACHMENTS: 'zone-clear-all-attachments',
	SET_DIALOG_MODE: 'set-dialog-mode',
	SET_ACTIVE_DROPLET: 'set-active-droplet'
};

export const dialogModes = {
	NONE: 'none',
	GENERAL: 'general',
	EDIT_DROPLET: 'edit-droplet'
};

export const uiStates = {
	INITIALISING: 'initialising',
	ACTIVE: 'active'
};

export const messageCommands = {
	RELOAD: 'reload',
	RESET: 'reset'
};

export const errorCodes = {
	NOT_A_DROPLET: 'A valid Droplet instance must be passed to DropZone#willAccept.'
};

export const setLabels = {
	value: 'Value',
	attrs: 'Attributes',
	tagName: 'Tag name',
	innerHTML: 'HTML content'
};