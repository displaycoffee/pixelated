/* Packages */
import { AnchorHTMLAttributes, HTMLAttributes, OlHTMLAttributes, ReactNode } from 'react';

/* Type definitions */
type BlockShared = {
	children: ReactNode;
	className?: string;
};

type Block = BlockShared & {
	columns?: boolean;
};

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

type Pixelated = BlockShared;

type LinkExternal = {
	children: ReactNode;
	className?: string;
	href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href' | 'rel' | 'target'>;

type List = {
	children: ReactNode;
	className?: string;
	variant?: 'ol' | 'ol-unstyled' | 'ul' | 'ul-unstyled';
} & Omit<OlHTMLAttributes<HTMLOListElement>, 'children' | 'className' | 'variant'>;

/* Export types */
export type DataAttributesType = DataAttributes;

/* Export prop types */
export type BlockProps = Block;

export type DataProps = Data;

export type DataColumnProps = DataColumn;

export type DataRowProps = DataRow;

export type LinkExternalProps = LinkExternal;

export type ListProps = List;

export type PixelatedProps = Pixelated;
