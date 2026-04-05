/* Local styles */
import './styles/blocks.scss';

/* Local scripts */
import {
	BlockProps,
	ButtonAttributesType,
	ButtonProps,
	FormProps,
	FormActionsProps,
	FormFieldProps,
	FormFieldWrapperProps,
} from './scripts/blocks-types';

export const Block = (props: BlockProps) => {
	let { children, className, columns } = props;
	const blockClass = className ? `${className} ` : '';

	return <div className={`${blockClass}block${columns ? ' block-columns' : ''} pixelated`}>{children}</div>;
};

export const Button = (props: ButtonProps) => {
	let { children, className, disabled, onClick } = props;
	const buttonClass = className ? `${className} ` : '';

	// Set up button attributes
	let buttonAttributes: ButtonAttributesType = {
		className: `${buttonClass}button pixelated`,
		type: `submit`,
		'aria-label': `${children} button`,
	};
	if (onClick) {
		buttonAttributes = {
			...buttonAttributes,
			type: `button`,
			onClick: (e) => onClick(e),
		};
	}
	if (disabled) {
		buttonAttributes = {
			...buttonAttributes,
			disabled: disabled,
		};
	}

	return (
		<button {...buttonAttributes}>
			<span>{children}</span>
		</button>
	);
};

export const Form = (props: FormProps) => {
	let { children, className, onSubmit } = props;
	const formClass = className ? `${className} ` : '';

	return (
		<form className={`${formClass}form spacing-reset`} onSubmit={(e) => onSubmit(e)}>
			{children}
		</form>
	);
};

export const FormActions = (props: FormActionsProps) => {
	let { children, className } = props;
	const formActionsClass = className ? `${className} ` : '';

	return <div className={`${formActionsClass}form-actions`}>{children}</div>;
};

export const FormField = (props: FormFieldProps) => {
	let { children, className, description, id, label } = props;
	const formFieldClass = className ? `${className} ` : '';

	return (
		<div className={`${formFieldClass}form-field flex-wrap flex-align-items-center flex-justify-content-center`}>
			{label ? id ? <label htmlFor={id}>{label}:</label> : <label>{label}:</label> : null}

			{children}

			{description ? <p className="form-field-description">{description}</p> : null}
		</div>
	);
};

export const FormFieldWrapper = (props: FormFieldWrapperProps) => {
	let { children, hasSelect } = props;

	return (
		<div className="form-field-wrapper pixelated">
			{children}

			{hasSelect ? <span className="form-field-arrow">^</span> : null}
		</div>
	);
};
