import { Stack } from "@mui/material";

type WebBodyLayoutProps = {
	children: React.ReactNode[];
}

export default function WebBodyLayout({ children }: WebBodyLayoutProps) {

	const [ sidebar, outlet ] = children;

	return (
		<Stack
			spacing={sidebar ? 3 : 0}
			sx={{ bgcolor: 'primary_1.main'}}
			height={'100%'}
			minHeight={'100vh'}
			marginTop={3}
			direction={'row'}
			display={'flex'}
		>
			{ sidebar ?
				<>
					<Stack
						sx={{
							bgcolor: 'white',
							height: '100%',
							minWidth: '30%',
							maxWidth: '40%',
							flexGrow: 0,
							overflowY: 'auto',
						}}
					>{sidebar}</Stack>
					<Stack
						sx={{
							bgcolor: 'white',
							flexGrow: 1,
							overflowY: 'auto'
						}}
					>{outlet}</Stack>
				</>
				: <Stack 
					sx={{
						width: '100%',
						maxWidth: 800,
						marginX: 'auto',
						flexGrow: 0,
					}}
				>{outlet}</Stack>
			}
		</Stack>
	)
}

