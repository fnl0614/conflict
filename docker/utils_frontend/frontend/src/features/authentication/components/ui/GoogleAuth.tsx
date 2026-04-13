import { Stack } from '@mui/material'
import GoogleIconButton from './GoogleIconButton'

interface GoogleAuthProps{
    continueString: string,
    action: string,
    link: string,
    linkString: string
}

export default function GoogleAuth({
    continueString,
    action,
    link,
    linkString
} : GoogleAuthProps ) {
  return (
    <Stack spacing={2} alignItems='center' justifyContent='center'>
        <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
            <p>{continueString}</p>
            <GoogleIconButton/>
        </Stack>
        <p>{action}<a href={link} className='underline text-secondary-1'>{linkString}</a></p>
    </Stack>
  )
}
