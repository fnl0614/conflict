import { Typography } from '@mui/material'

interface CountingListProps {
	arrayLength: number;
	title: string;
}

export default function CountingList({ arrayLength, title }: CountingListProps) {
  return (
	<Typography
		variant="h4"
		textAlign={'center'}
		sx={{ mb: 3 }}
		color="primary_2"
		textTransform={'capitalize'}
	>{title} : {arrayLength}
	</Typography>
  )
}
