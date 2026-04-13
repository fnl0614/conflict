import { Grid  } from "@mui/material"
import type { ListingProps } from "../../data/sharedType"

export default function RegularGrid({ items, resourceName, ItemComponent }: ListingProps) {

  return (
	<Grid 
		container
		spacing={10}
		justifyContent={'center'}
	>
		{
			items.map((item, index) => {
				return (
					<Grid
						key={index}
						size={'auto'}
						justifyContent={'center'}
					>
					{ItemComponent && <ItemComponent {...{ [resourceName]: item }} />}
					</Grid>
				)
			})
		}
	</Grid>
  )
}
