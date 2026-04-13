import { Button, Stack } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export interface SwitchBtnItem {
    text: string;
    link: string;
}

interface SwitchBtnProps {
    buttons: SwitchBtnItem[];
    activeText: string;
    setActiveText: (text: string) => void;
}

const SwitchBtn: React.FC<SwitchBtnProps> = ({ buttons, activeText, setActiveText}) => {
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        buttons.forEach((button) => {
            if (location.pathname.includes(button.link)) {
                setActiveText(button.text);
            }
        })
    }, [location.pathname])

    const handleClick = (text: string) => {
        setActiveText(text);
        const clicked = buttons.find((toFind: SwitchBtnItem) => toFind.text === text);
        if (!clicked)
            return ;
        navigate(clicked.link);
    };

    return (
        <Stack
            sx={{
                alignItems: "center",
                width: "100%", /*UPDATE : Fixed width value doesn't work with responsive*/
            }}
            spacing={5}
        >
            <Stack direction='row' justifyContent='space-evenly' width='100%'>
                {
                    buttons.map((button) => {
                        const isActive = button.text === activeText;

                        return (
                            <Button
                                key={button.text}
                                onClick={() => handleClick(button.text)}
                                variant={isActive ? "contained" : "outlined"}
                                color="primary_2"
                                size="small"
                                sx={{
                                    boxShadow: 0,
                                    borderRadius: "15px",
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    px: 3,
                                    textTransform: "none",
                                    border: '1.5px solid'
                                }}
                            >
                                {button.text}
                            </Button>
                        );
                    })
                }
            </Stack>
        </Stack>
    );
};

export default SwitchBtn;

