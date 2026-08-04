/* Styles */
import './styles/blocks.scss';

/* Scripts */
import {
	BlockProps,
	ButtonAttributesType,
	ButtonProps,
	DataProps,
	DataAttributesType,
	DataColumnProps,
	DataRowProps,
	FormProps,
	FormActionsProps,
	FormFieldProps,
	FormFieldWrapperProps,
} from './scripts/blocks-types';
import { useRespond } from '../../_config/scripts/hooks';
import { useAppContext } from '../../context/scripts/context-hooks';

export const Block = (props: BlockProps) => {
	const { children, className, columns } = props;
	const blockClass = className ? `${className} ` : '';

	return <div className={`${blockClass}block${columns ? ' block-columns' : ''} pixelated`}>{children}</div>;
};

export const Button = (props: ButtonProps) => {
	const { ariaLabel, children, className, disabled, onClick } = props;
	const buttonClass = className ? `${className} ` : '';

	// Set up button attributes
	// Note: only set aria-label when overriding the visible text (e.g. an abbreviated label);
	// otherwise let the browser derive the accessible name from the button's own content
	let buttonAttributes: ButtonAttributesType = {
		className: `${buttonClass}button pixelated`,
		type: `submit`,
	};
	if (ariaLabel) {
		buttonAttributes = {
			...buttonAttributes,
			'aria-label': ariaLabel,
		};
	}
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

export const Data = (props: DataProps) => {
	const { children, label } = props;
	const { theme } = useAppContext();
	const isDesktop = useRespond(theme.bps.bp02 as number);

	// Set data attributes
	let dataAttributes: DataAttributesType = {
		className: `data block pixelated`,
	};
	if (isDesktop) {
		dataAttributes = {
			...dataAttributes,
			'aria-label': label,
			role: 'table',
		};
	}

	return <div {...dataAttributes}>{children}</div>;
};

export const DataRow = (props: DataRowProps) => {
	const { children } = props;
	const { theme } = useAppContext();
	const isDesktop = useRespond(theme.bps.bp02 as number);

	// Set row attributes
	let rowAttributes: DataAttributesType = {
		className: `data-row row row-wrap row-spacing-${isDesktop ? 10 : 5}`,
	};
	if (isDesktop) {
		rowAttributes = {
			...rowAttributes,
			role: 'row',
		};
	}

	return <div {...rowAttributes}>{children}</div>;
};

export const DataColumn = (props: DataColumnProps) => {
	const { label, value } = props;
	const { theme, utils } = useAppContext();
	const isDesktop = useRespond(theme.bps.bp02 as number);
	const isHeader = value === undefined;

	// Set column attributes
	let columnAttributes: DataAttributesType = {
		className: `data-column column ${utils.handleize(label)}`,
	};
	if (isDesktop) {
		columnAttributes = {
			...columnAttributes,
			role: isHeader ? 'columnheader' : 'cell',
		};
	}

	return (
		<div {...columnAttributes}>
			{isHeader ? (
				<strong>{label}</strong>
			) : isDesktop ? null : (
				<>
					<strong>{label}:</strong>{' '}
				</>
			)}
			{value ? value : ''}
		</div>
	);
};

export const Form = (props: FormProps) => {
	const { children, className, onSubmit } = props;
	const formClass = className ? `${className} ` : '';

	return (
		<form className={`${formClass}form margin-trim`} onSubmit={(e) => onSubmit(e)}>
			{children}
		</form>
	);
};

export const FormActions = (props: FormActionsProps) => {
	const { children, className } = props;
	const formActionsClass = className ? `${className} ` : '';

	return <div className={`${formActionsClass}form-actions`}>{children}</div>;
};

export const FormField = (props: FormFieldProps) => {
	const { children, className, description, id, label } = props;
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
	const { children, hasSelect } = props;

	return (
		<div className="form-field-wrapper pixelated">
			{children}

			{hasSelect ? (
				<span className="form-field-arrow" aria-hidden="true">
					^
				</span>
			) : null}
		</div>
	);
};
