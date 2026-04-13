import { useMediaQuery } from "react-responsive";

const useScreenMobile = () => {
    return useMediaQuery({ maxWidth: 750 });
}

export default useScreenMobile;