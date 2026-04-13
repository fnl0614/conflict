import GoogleIcon from '@mui/icons-material/Google';
import AuthModal from '../AuthModal';
import CustomIconBtn from '../../../../shared/components/ui/CustomIconBtn';
import useGoogleAuthForm from '../../hooks/useGoogleAuthForm';

// import { GoogleLogin } from '@react-oauth/google';

export default function GoogleIconButton(){

    const { show, setShow, googleLogin } = useGoogleAuthForm();

    return(
        <>
            <AuthModal show={show} setter={setShow} />
            {/* <GoogleLogin onSuccess={responseMessage} onError={() => console.log("Error")} /> */}
            <CustomIconBtn bgColor={'secondary_1'} Icon={GoogleIcon} onClick={googleLogin} />
        </>
    )
}