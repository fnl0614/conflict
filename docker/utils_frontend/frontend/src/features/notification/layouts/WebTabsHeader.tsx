import { Badge, Box, Tab, Tabs} from "@mui/material";
import type { ComponentType } from "react";
import useWebHeader from "../../../shared/hooks/useWebHeader";

interface NotificationItem {
    title: string;
    count: number;
    Icon: ComponentType;
    link: string;
}

const HamburgerMenu = ({ notifArray} : {notifArray : NotificationItem[]} ) => {
    const {
        tabValue,
        navigate,
        handleChange
    } = useWebHeader();
    
    return (
        <Box
            alignSelf='flex-end'
            sx={{ bgcolor: 'white', zIndex: 1}}
            marginRight={8} marginTop={6} 
            position={'absolute'}
            display={{ mobile: 'none', minitablet: 'block', tablet: 'block', laptop: 'none', desktop: 'none' }}
        >
            <Tabs centered value={tabValue} onChange={handleChange} orientation="vertical">
                {
                    notifArray.map((item, index) => (
                        <Tab
                            key={index}
                            label={item.title}
                            icon ={<Badge badgeContent={item.count} color="error" ><Box sx={{ px : 1}}></Box></Badge>}
                            iconPosition="end"
                            onClick={() => { navigate(item.link)}}
                        />
                    ))
                }
            </Tabs>
        </Box>
    )
}


const HeaderTabIcon = ({ notifArray} : {notifArray : NotificationItem[]} ) => {
    const {
        tabValue,
        navigate,
        handleChange
    } = useWebHeader();

    return (
        <Tabs centered value={tabValue} onChange={handleChange}>
            {
                notifArray.map((item, index) => {
                    const IconComponent = item.Icon as React.ElementType;
                    return (<Tab
                    key={index}
                    icon ={<Badge badgeContent={item.count} color="error"><IconComponent/></Badge>}
                    onClick={() => { navigate(item.link)}}
                />)
                })
            }
        </Tabs>
    )
}

export { HamburgerMenu, HeaderTabIcon };