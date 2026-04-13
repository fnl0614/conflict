import { List, ListItem } from "@mui/material"
import type { ListingProps } from "../../data/sharedType"

export default function RegularList({ items, resourceName, ItemComponent }: ListingProps) {

  return (
	<List>
		{
			items.map((item, index) => {
				return (
					<ListItem key={index} sx={{ mb: 2 }}>
					{ItemComponent && <ItemComponent {...{ [resourceName]: item }} />}
					</ListItem>
				)
			})
		}
	</List>
  )
}
