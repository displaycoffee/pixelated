/* Packages */
import { ButtonHTMLAttributes, HTMLAttributes, MouseEvent } from 'react';

/* Type definitions */
type BlockShared = {
	children: ReactNode;
	className?: string;
};

type Block = BlockShared & {
	columns?: boolean;
};

type Pixelated = BlockShared;

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

/* Export types */
export type ButtonAttributesType = ButtonAttributes;

export type DataAttributesType = DataAttributes;

/* Export prop types */
export type BlockProps = Block;

export type PixelatedProps = Pixelated;

export type ButtonProps = Button;

export type DataProps = Data;

export type DataColumnProps = DataColumn;

export type DataRowProps = DataRow;
