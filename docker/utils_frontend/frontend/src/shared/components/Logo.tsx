interface LogoProps{
    size?: string;
}

const Logo = ({ size }: LogoProps) => {

    switch(size){
        case 'sm':
            return(
                <h1 className="font-logo font-bold text-2xl text-center m-2 text-secondary-1">LIK<span className="text-accent-2">EO</span></h1>
            )
        case 'md':
            return(
                <h1 className="font-logo font-bold text-6xl text-center m-2 text-secondary-1">LIK<span className="text-accent-2">EO</span></h1>
            )
        default:
            return(
                <h1 className="font-logo font-bold text-8xl text-center m-2 text-secondary-1">LIK<span className="text-accent-2">EO</span></h1>
            )

    }
}

export default Logo;