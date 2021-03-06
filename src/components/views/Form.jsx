/**
 * @typedef FormOnSubmit
 * @param {object} formValues - the current values of the form elements, as an object.
 */

/**
 * @typedef FormFieldSets
 * @description
 * An array of fieldsets — each item of which contains an object defining a
 * single fieldset. See {@link FormFieldset}.
 * @example
 * var fieldsets = [
 * 	{@link FormFieldSet}...
 * ];
 */

/**
 * An object defining a single fieldset.
 * @typedef FormFieldSet
 * @property {string} key - Unique key value.
 * @property {string} legend - Legend label.
 * @property {object} fields - Fields within the fieldset. The keys of which
 * should represent the name of the field, with the values being one of
 * {@link FormField} each.
 * @example
 * var fieldset = [
 * 	{@link FormField}...
 * ]
 */

/**
 * @typedef FormButton
 * @property {string} type - Either 'cancel', 'submit' or a custom type.
 * @property {string} label - Button label.
 * @property {object} data - Data sent as `data` to the form onSubmit prop.
 * @property {object} className - Extra class name(s) for the button.
 */
import React from 'react';
import PropTypes from 'prop-types';

import Fieldset from './Fieldset.jsx';
import Button from './Button.jsx';

/**
 * @description
 * Takes a form specification and produces an HTML form.
 * See {@link Form.propTypes} for more information
 */
class Form extends React.Component {
	constructor(props) {
		var formValues = {};

		super(props);

		this.ui = {
			refs: {
				buttons: {},
				fields: {}
			}
		};

		// set default state for fields based on original values
		this.props.fieldSets.forEach((set) => {
			formValues[set.key] = {};

			set.fields.forEach((field) =>
				(formValues[set.key][field.name] = field.value)
			);
		});

		// set default form value state
		this.state = {
			formValues,
			errors: []
		};

		// bind functions for events
		this.elementChange = this.elementChange.bind(this);
	}

	valueSet(values, node) {
		var nodes = [], key;

		if (Array.isArray(values)) {
			values.forEach(function(value) {
				nodes.push(
					<node value={value}>{value}</node>
				);
			});
		} else if (typeof values === 'object') {
			for (key in values) {
				nodes.push(
					<node value={key}>{values[key]}</node>
				);
			}
		}

		return nodes;
	}

	getFieldSets() {
		var output = [];

		if (this.props.fieldSets) {
			this.props.fieldSets.forEach((set, index) => {
				const key = 'fieldset-' + set.key;

				output.push(
					<Fieldset
						key={key}
						settings={this.props.settings}
						refCollector={this.collectFieldRef.bind(this)}
						set={set.key}
						fields={set.fields}
						errors={this.findErrorsForFieldsetIndex(index)}
						legend={set.legend}
						onFieldUpdate={this.elementChange}
						/>
				);
			});
		}

		return output;
	}

	elementChange(set, name, value, values_state) {
		var sets = Object.assign({}, this.state.formValues);

		sets[set] = values_state;

		this.setState({
			formValues: sets
		});
	}

	componentOnSubmit(proxy_event) {
		this.onSubmit(proxy_event, 'submit');
	}

	onSubmit(event, button, button_data) {
		var errors;

		if (event) {
			event.preventDefault();
		}

		errors = this.validateFields();

		if (errors.length === 0) {
			this.props.onSubmit(this.state.formValues, button, button_data);
		} else {
			this.setState({
				errors: Array.prototype.slice.apply(errors)
			});
		}
	}

	/**
	 * Validates all the form fields based on the current form spec.
	 */
	validateFields() {
		var errors = [];

		this.props.fieldSets.forEach((fieldset, index) => {
			if (fieldset.fields) {
				fieldset.fields.forEach((field) => {
					var validation = this.validateField(field, index);

					if (validation !== true) {
						errors.push(validation);
					}
				});
			}
		});

		return errors;
	}

	/**
	 * Validates a single field.
	 */
	validateField(field, fieldset_index) {
		var value;

		if (field && field.required) {
			if (typeof field.required === 'function') {
				// validate using a function
				value = field.required(this.state.formValues);
				return (value === true) || ({
					field,
					fieldset_index,
					error: value
				});
			} else {
				// validate by value only
				value = this.findFieldValue(field.name, this.state.formValues);
				return (value !== undefined && value !== '') || ({
					field,
					fieldset_index,
					error: 'This value is required.'
				});
			}
		} else {
			return true;
		}
	}

	/**
	 * Finds a field's value by its name.
	 */
	findFieldValue(fieldname, search) {
		var key, value;

		for (key in search) {
			if (typeof search[key] === 'object') {
				value = this.findFieldValue(fieldname, search[key]);
			} else {
				if (key === fieldname) {
					value = search[key];
				}
			}

			if (value !== undefined) {
				return value;
			}
		}
	}

	findErrorsForFieldsetIndex(index) {
		return this.state.errors.filter((error) => {
			return (error.fieldset_index === index);
		});
	}

	/**
	 * Return a function to collect Button component DOM references.
	 */
	collectButtonRef(key) {
		return function(ref) {
			this.ui.refs.buttons[key] = ref;
		}.bind(this);
	}

	/**
	 * @description
	 * Collect a reference to a field. Each field component uses two arguments
	 * for their refCollector prop (unlike the usual one):
	 * 1. An identifying key
	 * 2. The DOM reference
	 */
	collectFieldRef(key, ref) {
		this.ui.refs.fields[key] = ref;
	}

	componentDidMount() {
		var a, b, key;

		if ('ontouchstart' in window) {
			// if it's a touch device, it'll likely have an on-screen keyboard
			// which could get in the way of the dialog opening and cause UX issues.
			return;
		}

		// handle focusing of the first field (or button) in the form
		if (this.props.fieldSets && this.props.fieldSets.length) {
			// highlight first collected field
			for (a = 0; a < this.props.fieldSets.length; a += 1) {
				for (b = 0; b < this.props.fieldSets[a].fields.length; b += 1) {
					key = 'field-' + this.props.fieldSets[a].fields[b].name;

					if (this.props.fieldSets[a].fields[b].type !== 'hidden' &&
						this.ui.refs.fields[key]) {
						this.ui.refs.fields[key].focus();
						a = this.props.fieldSets.length;
						break;
					}
				}
			}
		} else if (this.props.buttons && this.props.buttons.length) {
			// highlight first collected button
			this.props.buttons.forEach((button, index) => {
				var key = 'button-' + index;

				if (this.ui.refs.buttons[key] && button.type === 'submit') {
					this.ui.refs.buttons[key].focus();
				}
			});
		}
	}

	/**
	 * @description
	 * Iterate through the `buttons` object in `props` and produce a list of Button
	 * components.
	 */
	getButtons() {
		var buttons = [];

		if (this.props.buttons && this.props.buttons.length) {
			this.props.buttons.forEach((button, index) => {
				var key = 'button-' + index,
					click_function;

				click_function = ((component) => {
					return function() {
						if (button.type === 'cancel') {
							// cancel button
							component.props.onCancel();
						} else if (button.type !== 'submit') {
							// anything except submit
							component.onSubmit(null, button.type, button.data);
						}
					};
				})(this, button.onClick);

				buttons.push(
					<Button
						key={key}
						refCollector={this.collectButtonRef(key)}
						type={button.type}
						label={button.label}
						className={button.className}
						onClick={click_function}
						settings={this.props.settings}/>
				);
			});
		}

		return buttons;
	}

	render() {
		return (
			<form action="" onSubmit={this.componentOnSubmit.bind(this)}>
				<div className="fields">
					{this.getFieldSets()}
				</div>
				<fieldset className="buttons">
					{this.getButtons()}
				</fieldset>
			</form>
		);
	}
}

/**
 * @property {function} onCancel - invoked when the form is cancelled
 * @property {FormOnSubmit} onSubmit - invoked when the form is submitted
 * @property {FormFieldSets} fieldSets - fieldsets for display
 */
Form.propTypes = {
	settings: PropTypes.object.isRequired,
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
	fieldSets: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string,
		legend: PropTypes.string,
		fields: PropTypes.array
	})),
	buttons: PropTypes.array
};

Form.defaultProps = {
	onCancel: () => {},
	onSubmit: () => {},
	fieldSets: []
};

export default Form;