import ImageIcon from '@mui/icons-material/Image';
import { Stack } from '@mui/material';

const CoverFill = () => {
    return (
        <Stack
            justifyContent={'center'}
            alignItems={'center'}
            display={'flex'}
            sx={{ width: '100%', height: 300, bgcolor: 'secondary_2.main'}}
        >
            <ImageIcon sx={{ color: 'white', width: '30%', height: '30%' }} />
        </Stack>
    )
}

const CoverImage = ({src} : {src : string}) => {

    if (src)
        return <img alt="Cover Image" src={src} className="w-full h-75 object-cover"/>;

    return <CoverFill />
}

export { CoverFill, CoverImage }