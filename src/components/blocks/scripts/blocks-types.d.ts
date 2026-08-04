/* Packages */
import { ButtonHTMLAttributes, HTMLAttributes, MouseEvent, SubmitEventHandler } from 'react';

/* Type definitions */
type BlockShared = {
	children: ReactNode;
	className?: string;
};

type Block = BlockShared & {
	columns?: boolean;
};

type Button = BlockShared & {
	ariaLabel?: string;
	disabled?: boolean;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

type Data = {
	children: ReactNode;
	label: string;
};

type DataAttributes = HTMLAttributes<HTMLDivElement>;

type DataColumn = {
	label: string;
	value?: string | number;
};

type DataRow = {
	children: ReactNode;
};

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

export type DataAttributesType = DataAttributes;

/* Export prop types */
export type BlockProps = Block;

export type ButtonProps = Button;

export type DataProps = Data;

export type DataColumnProps = DataColumn;

export type DataRowProps = DataRow;

export type FormProps = Form;

export type FormActionsProps = FormActions;

export type FormFieldProps = FormField;

export type FormFieldWrapperProps = FormFieldWrapper;
