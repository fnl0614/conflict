import { Box, Paper, Stack, Typography } from "@mui/material";
import GroupProfileOpt from "../components/GroupProfileOpt";
import type { GroupType } from "../data/groupType";
import CustomAvatar from "../../../shared/components/ui/CustomAvatar";
import { CoverImage } from "../../../shared/components/ui/CoverImage";

interface GroupProfileHeaderProps {
    groupData : GroupType
}

export default function GroupProfileHeader({ groupData } : GroupProfileHeaderProps) {
    const { group, role } = groupData;
    const { name, description, urlCover, urlProfil, id } = group;

    const avatarSize = [
        120,
        150,
        180
    ]

    const avatarSizeWithScreen = { 
        mobile: avatarSize[0],
        minitablet: avatarSize[1],
        tablet: avatarSize[1],
        laptop: avatarSize[2],
        desktop: avatarSize[2]
    }

    return(
        <Stack alignContent={"center"} sx={{ mt: 2 }} >
            <Stack sx={{ position: 'relative'}}>
                <CoverImage src={urlCover} />
                <Box
                    justifyContent={'center'}
                    alignContent={'center'}
                    display={'flex'}
                    sx={{ 
                        position: 'absolute',
                        width: '100%',
                        top: { mobile: '65%', minitablet: '55%', tablet: '55%', laptop: '45%', desktop: '45%' },
                    }}>
                    <CustomAvatar
                        urlProfil={urlProfil}
                        size={{
                            width: avatarSizeWithScreen,
                            height: avatarSizeWithScreen
                        }}
                        variant="group"
                        isNotClickable={true}
                    />
                </Box>
            </Stack>
            <Stack spacing={1}>
                <Paper sx={{ textAlign: 'center', padding: 3 }} elevation={3}>
                    <Typography color="primary_2.main" variant="h5">{name}</Typography>
                    <GroupProfileOpt role={role} groupId={id} />
                </Paper>
                <Paper sx={{ textAlign: 'center', paddingTop: 2, paddingX: 5, paddingBottom: 1 }} elevation={3}>
                    <Typography color="primary_2.main" variant="body2">{description}</Typography>
                </Paper>
            </Stack>
        </Stack>
    )   
}
