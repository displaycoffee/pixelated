/* React */
import { ButtonHTMLAttributes, SubmitEventHandler } from 'react';

/* Type definitions */
type BlockShared = {
	children: ReactNode;
	className?: string;
};

type Block = BlockShared & {
	columns?: boolean;
};

type Button = BlockShared & {
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

type Form = BlockShared & {
	onSubmit: SubmitEventHandler<HTMLFormElement>;
};

type FormActions = BlockShared;

type FormField = BlockShared & {
	description?: string;
	id?: string;
	label?: string;
};

type FormFieldWrapper = {
	children: ReactNode;
	hasSelect?: boolean;
};

/* Export types */
export type ButtonAttributesType = ButtonAttributes;

/* Export prop types */
export type BlockProps = Block;

export type ButtonProps = Button;

export type FormProps = Form;

export type FormActionsProps = FormActions;

export type FormFieldProps = FormField;

export type FormFieldWrapperProps = FormFieldWrapper;
