import Loading from "../../../shared/components/Loading";
import useFriendListing from "../hooks/useFriendListing";
import CountingList from "../../../shared/components/list/CountingList";
import { Typography } from "@mui/material";

interface CountingListChildrenProps {
    title: string;
    requestNb?: number;
}

export default function CountingListChildren ( { title, requestNb }: CountingListChildrenProps ){
    const { loading } = useFriendListing();

    if (loading)
        return (<Loading />);
    if (requestNb === undefined)
        return (
            <Typography
                variant="h4"
                textAlign={'center'}
                sx={{ mb: 3 }}
                color="primary_2"
                textTransform={'capitalize'}
            >{title}
            </Typography>
        );
    return (
        <CountingList
            arrayLength={requestNb}
			title={title}
		/>
	);
}