import { strCapitalize } from "../../../../shared/utils/stringUtils"

interface NavigateAuthProps {
    introduction: string,
    link: string,
    linkText: string
}

const NavigateAuth = ({ introduction, link, linkText } : NavigateAuthProps) => {
    return (
        <p>{introduction}
            <a href={link} className='underline text-secondary-1'>
                {strCapitalize(linkText)}
            </a>
        </p>
    )
}

export default NavigateAuth;