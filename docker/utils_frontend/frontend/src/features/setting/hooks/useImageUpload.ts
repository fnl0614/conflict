import { useState } from "react";
import { useTranslation } from "react-i18next";

const useImageUpload = () => {
    const [t] = useTranslation("global");
    const [filePreview, setFilePreview] = useState<string | null>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>,
        setFile: (file: File | null) => void) {
        const img = e.target.files?.[0];

        if (!img)
            return ;
        if (!img.type.startsWith("image")) {
            console.error("Please select an image");
            return ;
        }
        setFile(img);
        setFilePreview(URL.createObjectURL(img));
    };
    return ({
        t,
        filePreview,
        handleFileChange
    });
}

export default useImageUpload;
