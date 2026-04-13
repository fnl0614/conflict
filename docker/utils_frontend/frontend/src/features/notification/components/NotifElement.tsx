import { getFullName } from "../../../shared/utils/stringUtils";

import { Card, CardActionArea, CardActions, CardContent, Stack, Typography } from "@mui/material";
import UserAvatar from "../../profile/components/ui/UserAvatar";
import CustomIconBtn from "../../../shared/components/ui/CustomIconBtn";

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export type NotifELementProps = {
	id: string;
	urlProfil: string;
	firstName: string;
	lastName: string;
	content: string;
}

export default function NotifElement({id, urlProfil, firstName, lastName, content}: NotifELementProps) {

	const iconSize = {width: 24, height: 24};

	return (
		<Card sx={{ width: '100%', bgcolor: 'primary_1.main' }}>
			<Stack direction={'row'} alignItems={'center'}>
				<CardActionArea sx={{ width: '90%' }} >
					<CardContent>
						<Stack direction={'row'} alignItems={'center'} gap={2} sx={{ width: '100%' }}>
							<UserAvatar 
								id={id}
								urlProfil={urlProfil}
								size={{ width: 60, height: 60 }}
								isNotClickable={true}
							/>
							<Stack alignItems={'left'} gap={1} sx={{ flexGrow: 1, minWidth: 10 }}>
								<Typography
									variant='subtitle1'
									color="secondary_1"
									fontWeight={'bold'}
									noWrap
								>{getFullName(firstName, lastName)}</Typography>
								<Typography
									variant='body2' 
									color="primary_2"
									fontWeight={'light'}
									noWrap
								>{content}</Typography>
							</Stack>
						</Stack>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Stack>
						<CustomIconBtn
							size={iconSize}
							bgColor="accent_2"
							Icon={CheckIcon}
						/>
						<CustomIconBtn
							size={iconSize}
							bgColor="accent_1"
							Icon={CloseIcon}
						/>
					</Stack>
				</CardActions>
			</Stack>
		</Card>
	)
}