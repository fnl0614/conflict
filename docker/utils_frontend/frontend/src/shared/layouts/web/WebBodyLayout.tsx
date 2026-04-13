import { Grid } from "@mui/material";

type WebBodyLayoutProps = {
	children: React.ReactNode[];
}

export default function WebBodyLayout({ children }: WebBodyLayoutProps) {

	const [ sidebar, outlet ] = children;
	const sizeSideBar = sidebar ? 4 : 0;
	const sizeOutlet = sidebar ? 8 : 12;

	return (
		<Grid
			container
			direction={'row'}
			spacing={sidebar ? 5 : 0}
			sx={{ bgcolor: 'primary_1.main'}}
			height={'100%'}
			minHeight={'100vh'}
			marginTop={3}
			position={'relative'}
			display={'flex'}
		>
			{ sidebar ?
					<>
						<Grid
							size={sizeSideBar}
							sx={{ bgcolor: 'white', height: '100%', minWidth: '300px' }}
							position={'fixed'}
						>{sidebar}</Grid>
						<Grid
							size={sizeOutlet}
							sx={{ bgcolor: 'white'}}
							marginLeft={`${(sizeSideBar / 12) * 100}%`}
						>{outlet}</Grid>
					</>
				: <Grid size={sizeOutlet} >{outlet}</Grid>
			}
		</Grid>
	)
}
