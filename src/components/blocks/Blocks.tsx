/* Styles */
import './styles/blocks.scss';

/* Scripts */
import {
	BlockProps,
	DataProps,
	DataAttributesType,
	DataColumnProps,
	DataRowProps,
	LinkExternalProps,
	ListProps,
	PixelatedProps,
} from './scripts/blocks-types';
import { useRespond } from '../../_config/scripts/hooks';
import { useAppContext } from '../../context/scripts/context-hooks';

export const Block = (props: BlockProps) => {
	const { children, className, columns } = props;
	const blockClass = className ? `${className} ` : '';

	return <div className={`${blockClass}block${columns ? ' block-columns' : ''} pixelated`}>{children}</div>;
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

export const LinkExternal = (props: LinkExternalProps) => {
	const { children, className, href, ...rest } = props;

	return (
		<a className={className} href={href} target="_blank" rel="noreferrer" {...rest}>
			{children}
			<span className="sr-only"> (opens in a new tab)</span>
		</a>
	);
};

export const List = (props: ListProps) => {
	const { children, className: propClassName, reversed, start, type: listType, variant = 'ul', ...rest } = props;
	const isOrdered = variant.includes('ol');
	const isUnstyled = variant.includes('unstyled');
	const Tag = isOrdered ? 'ol' : 'ul';
	const classes = `list-${isUnstyled ? 'unstyled' : isOrdered ? 'ordered' : 'unordered'}`;
	const className = propClassName ? `${propClassName} ${classes}` : classes;
	const olAttributes = isOrdered ? { reversed, start, type: listType } : {};

	return (
		<Tag className={className} {...rest} {...olAttributes}>
			{children}
		</Tag>
	);
};

export const Pixelated = (props: PixelatedProps) => {
	const { children, className } = props;
	const pixelatedClass = className ? `${className} ` : '';

	return <div className={`${pixelatedClass}pixelated`}>{children}</div>;
};
