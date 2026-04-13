import { List, ListItem } from "@mui/material"
import NotifElement from "./NotifElement"
import type { NotifELementProps } from "./NotifElement";

export interface NotifListProps{
    notifArray: NotifELementProps[]
}

export default function NotifList( { notifArray } : NotifListProps) {
	return (
        <List>
            {
                notifArray.map(notif => {
                    return (
                        <ListItem key={notif.id} sx={{ mb: 2 }}>
                            <NotifElement
                                id={notif.id}
                                firstName={notif.firstName}
                                lastName={notif.lastName}
                                urlProfil={notif.urlProfil}
                                content={notif.content}
                            />
                        </ListItem>
                    )
                })
            }
        </List>
	)
}
