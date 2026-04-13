import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

const MarkdownTitle = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box sx={{ borderBottom: '1px solid', borderColor: 'divider', mt: 3, mb: 1 }}>
			<Typography
				variant="h6"
				color="secondary_1"
			>{children}</Typography>
		</Box>
	)
}

const MarkdownBody = ({ children }: { children: React.ReactNode }) => {
	return <Typography variant="body1" color="primary_2">{children}</Typography>
}

const MarkdownList = ({ children }: { children: React.ReactNode }) => {
	return <ul className="list-disc pl-6 text-primary-2">{children}</ul>
}

const CustomMarkdown = ({ text }: { text : string}) => {
	return (
		<ReactMarkdown
			components={{
				h2: ({ children }) => <MarkdownTitle>{children}</MarkdownTitle>,
				p: ({ children }) => <MarkdownBody>{children}</MarkdownBody>,
				ul: ({ children }) => <MarkdownList>{children}</MarkdownList>,
			}}
		>{text}</ReactMarkdown>
	)
}

export default CustomMarkdown;