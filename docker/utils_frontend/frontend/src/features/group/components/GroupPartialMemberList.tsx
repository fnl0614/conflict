import { Grid, Link, Paper, Stack, Typography } from "@mui/material";
import AvatarSquare from "../../../shared/components/ui/AvatarSquare";
import LoadingCircular from "../../../shared/components/LoadingCircular";
import CustomErrorPage from "../../../shared/pages/error/CustomErrorPage";

import type { Key } from "react";
import type { AuthData } from "../../authentication/data/authType";
import { getFullName } from "../../../shared/utils/stringUtils";
import { useUtils } from "../../../shared/hooks/useUtils";
import { useGroupMembers } from "../hooks/useGroupProfile";

const GroupPartialMemberList = ({ groupId } : { groupId : string }) => {
	const { t } = useUtils();
	const { items, memberStatus, memberError } = useGroupMembers(groupId, 0, 3);

	if (memberStatus === 'error')
		return <CustomErrorPage error={memberError?.message} />
	if (memberStatus === 'pending')
		return <LoadingCircular/>;

	const linkToAllMembers = `/group/${groupId}/members`;

	return (
		<Paper sx={{ p: 2 }} elevation={3}>
			<Stack direction="row" justifyContent="space-between">
				<Typography
					variant="h6"
					textTransform={'capitalize'}
				>{t("group.interaction.member")} : {items.length}</Typography>
				<Link
					href={linkToAllMembers}
					sx={{ textDecoration: 'none', color: 'accent_2.main' }}
				>{t("profile-page.see")}</Link>
			</Stack>
			<Grid
				direction="row"
				justifyContent={'space-between'}
				spacing={2}
				container
			>
				{ items.map((item: AuthData, index: Key | null | undefined) => (
					<Grid
						key={index}
						justifyContent='center'
						size={{ mobile: 'auto', minitablet: 'auto', tablet: 4, laptop: 4, desktop: 4}}
					>
						<AvatarSquare
							profileUrl={item.urlProfil}
							fullName={getFullName(item.firstName, item.lastName)}
							id={item.id}
							variant="user"
						/>
					</Grid>
				))}
			</Grid>
		</Paper>
	)
}

export default GroupPartialMemberList;