import { CardMedia } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";

interface PostBodyProps {
  imageUrl?: string | null;
  handleOpen: () => void;
}

export default function PostImage({ imageUrl, handleOpen }: PostBodyProps) {
  const maxHeight = useOutletContext() === 'mb' ? '30vh' : '40vh';
  const [t] = useTranslation("global");

  if (!imageUrl)
    return (null);
  return (
    <CardMedia
      component="img"
      src={imageUrl}
      alt={t('post-page.postImageAlt')}
      sx={{
        maxHeight: maxHeight,
        cursor: "pointer",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&:hover': {
          opacity: 0.75
        },
        borderRadius: 1,
        objectPosition: 'center',
      }}
      onClick={handleOpen}
    />
  );
}
