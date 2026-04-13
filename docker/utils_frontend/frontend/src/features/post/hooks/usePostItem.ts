import { useState } from "react";

const usePostItem = () => {
    const [openImgModal, setOpenImgModal] = useState(false);
    const handleOpenImage = () => setOpenImgModal(true);
    const handleCloseImage = () => setOpenImgModal(false);
    const [openDltModal, setOpenDltModal] = useState(false);
    const handleOpenDelete = () => setOpenDltModal(true);
    const handleCloseDelete = () => setOpenDltModal(false);

    return ({
        openImgModal,
        handleOpenImage,
        handleCloseImage,
        openDltModal,
        handleOpenDelete,
        handleCloseDelete
    });
};

export default usePostItem;
