import { Box, Typography } from "@mui/material";

interface ResultProps {
    stateResult: string;
    isSuccess: boolean;
}

const Result = ({stateResult, isSuccess} : ResultProps) => {
    const color = isSuccess ? 'success' : 'error';

    return ( 
        <Box paddingY={2} justifyContent={'center'} textAlign={'center'}>
            <Typography variant='body1' color={color}>{stateResult}</Typography>
        </Box>)
}

export default Result;