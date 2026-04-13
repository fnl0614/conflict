import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import useProfile from "../hooks/useProfile";
import Loading from "../../../shared/components/Loading";
import ProfileOpt from "../components/ui/ProfileOpt";

export default function ProfileHeader() {

    const { loading, user, relation } = useProfile();

    if (loading) return <Loading/>

    if (!user) return <Typography variant="h6">User not found</Typography>

    const avatarSize = [
        120,
        150,
        180
    ]

    return(
        <Stack alignContent={"center"} sx={{ mt: 2 }} >
            <Stack sx={{ position: 'relative'}}>
                <img alt="Cover Image" src={user.urlCover} className="w-full h-75 object-cover"/>
                <Box
                    justifyContent={'center'}
                    alignContent={'center'}
                    display={'flex'}
                    sx={{ 
                        position: 'absolute',
                        width: '100%',
                        top: {mobile: '65%', minitablet: '55%', tablet: '55%', laptop: '45%', desktop: '45%'},
                    }}>
                    <Avatar
                        src={user?.urlProfil}
                        sx={{
                            width: { mobile: avatarSize[0], minitablet: avatarSize[1], tablet: avatarSize[1], laptop: avatarSize[2], desktop: avatarSize[2]},
                            height: { mobile: avatarSize[0], minitablet: avatarSize[1], tablet: avatarSize[1], laptop: avatarSize[2], desktop: avatarSize[2]},
                        }}
                    />
                </Box>
            </Stack>
            <Paper sx={{ textAlign: 'center', paddingTop: 2, paddingX: 5, paddingBottom: 1 }} elevation={3}>
                {
                    user ? <Typography color="primary_2.main" variant="h5">{user.firstName} {user.lastName}</Typography>
                        : <Typography color="primary_2.main" variant="h5">User name</Typography>
                }
                {
                    user ? <Typography color="primary_2.main" variant="caption" >{user.email}</Typography>
                        : <Typography color="primary_2.main" variant="caption">No email available</Typography>
                }
                <ProfileOpt relation={relation} user_id={user.id} />
            </Paper>
        </Stack>
    )   
}
