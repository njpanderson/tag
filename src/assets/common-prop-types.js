import PropTypes from 'prop-types';

import FormField from '../lib/FormField';

export const field = {
	refCollector: PropTypes.func,
	field: PropTypes.instanceOf(FormField).isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.arrayOf(PropTypes.string)
	]).isRequired,
	error: PropTypes.string,
	className: PropTypes.arrayOf(PropTypes.string).isRequired,
	onChange: PropTypes.func
};

export const dialog = {
	data: PropTypes.object.isRequired,
	settings: PropTypes.object.isRequired,
	refCollector: PropTypes.func,
	onDialogCancel: PropTypes.func,
	onDialogComplete: PropTypes.func,
	lib: PropTypes.object
};