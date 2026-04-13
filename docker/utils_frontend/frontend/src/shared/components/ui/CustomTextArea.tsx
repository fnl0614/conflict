import { Stack } from "@mui/material";
import { useId } from "react";

interface CustomTextAreaProps {
	value?: string;
	size?: 'small' | 'medium' | 'large' | 'full';
	isDisabled?: boolean;
	variant?: 'display' | 'input';
	textColor?: string;
	backgroundColor: string;
	onChange?: (value: string) => void;
	inputRef?: React.Ref<HTMLTextAreaElement>;
	error?: boolean;
	helperText?: string;
}

const getHeight = (size : string) => {

	let maxHeight;

	switch (size) {
		case 'small':
			maxHeight = 25;
			break;
		case 'medium':
			maxHeight = 50;
			break;
		case 'large':
			maxHeight = 75;
			break;
		default :
			maxHeight = 100;
			break;
	}
	const maxHeightClass = maxHeight ? `max-h-${maxHeight}` : '';
	return maxHeightClass;
}

const CustomTextArea = ({ 
	backgroundColor,
	value,
	size = 'full',
	onChange,
	isDisabled = true,
	variant = 'display',
	textColor = 'text-primary-2',
	inputRef,
	helperText,
	error
} : CustomTextAreaProps) => {

	const id = useId();
	const isReadOnly = variant === 'display';

	return (
		<Stack 
			bgcolor={backgroundColor}
			padding={2}
			width={'100%'}
			alignItems="stretch"
			overflow={'hidden'}
			minWidth={0}
		>
			<textarea
				id={id}
				ref={inputRef}
				disabled={isDisabled}
				readOnly={isReadOnly}
				onChange={(e) => onChange?.(e.target.value)}
				className={`
					field-sizing-content
					overflow-y-auto
					w-full
					resize-none
					block
					max-w-full
					break-all
					focus:outline-none
					${getHeight(size)}
					${textColor}
					${error ? 'border border-red-500' : ''}
				`}
				value={value || ""}
			/>

			{error && helperText && (
				<span className="text-red-500 text-sm mt-1">
					{helperText}
				</span>
			)}
		</Stack>
	)
}

export default CustomTextArea;