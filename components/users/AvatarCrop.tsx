import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "lib/Crop";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { useCurrentUserContext } from 'lib/CurrentUserContext';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, IconButton, Slider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

type Prop = {
  image: any;
  user: any;
}

const AvatarCrop = ({ user }: Prop) => {
  const currentUserContext = useCurrentUserContext()
  const {currentUser, setCurrentUser} = currentUserContext;
  
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

  const onFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
            if (reader.result) {
              setImgSrc(reader.result.toString() || "");
              setShowModal(true);
            }
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    },
    []
  );

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(imgSrc,croppedAreaPixels);
      console.log("done", { croppedImage });
      setCroppedImage(croppedImage);

      const data = croppedImage;
      axios.patch(`${process.env.NEXT_PUBLIC_BACK_URL}/users/${user.id}`,{
          avatar: data,
      },{
          headers: {
              "Content-Type": "multipart/form-data",// 画像ファイルを取り扱うのでform-dataで送信
              "access-token": Cookies.get("access-token") || "",
              client: Cookies.get("client") || "",
              uid: Cookies.get("uid") || "",
          },
      }).then(function(response) {
          setCurrentUser(response.data.data);
          setShowModal(false);
          toast.success('Hello. This is test')
      })
      .catch((error) => {
          setIsError(true);
          setErrorMessage(error.response.data.errors[0]);
          console.log(error);
      });
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imgSrc, setCurrentUser, user.id]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
    setShowModal(false);
  }, []);

  const handleCloseModal = () => {
      setCroppedImage(null);
      setShowModal(false);
  };

  return (
    <>
      <Dialog open={showModal} onClose={handleCloseModal}>
        <DialogTitle style={{background: 'white', zIndex: 1, textAlign: 'right', padding: 0}}>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="large" color="disabled" />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{width: 500, height: 500}}>
          <Cropper
            image={imgSrc}
            crop={crop}
            zoom={zoom}
            zoomSpeed={4}
            maxZoom={3}
            zoomWithScroll={true}
            showGrid={true}
            aspect={4 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </DialogContent>
        <DialogActions style={{display: 'block', background: 'white', zIndex: 1, textAlign: 'center', padding: 15}}>
          <Box>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="zoom"
              onChange={(e, value) => {
                if (typeof value === "number") {
                  setZoom(value);
                }
              }}
              className="range"
            />
          </Box>
          <Button variant="contained" onClick={showCroppedImage} size="large">決定</Button>
          {isError ? (
              <p onClick={() => {setIsError(false); setErrorMessage("");}}>
                {errorMessage}
              </p>
          ) : null}
        </DialogActions>
      </Dialog>
      <label className="bg-slate-500">
          UploadImage
          <input type="file"
              id='file-input'
              name="cover"
              onChange={onFileChange}
              accept="img/*"
              style={{ display: "none" }}
          />
      </label>
    </>
  );
};

export default AvatarCrop;
