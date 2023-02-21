import { useCallback, useState } from "react";
//import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import getCroppedImg from "lib/Crop";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

type Prop = {
  image: any;
  user: any;
}

const AvatarCrop = ({ image, user }: Prop) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  //const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(image,croppedAreaPixels);
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
          //setCurrentUser(response.data.data);
          //setShowModal(false);
          toast.success('Hello. This is test')
          //router.replace(`/users/${currentUser.id}`);
      })
      .catch((error) => {
          //setIsError(true);
          //setErrorMessage(error.response.data.errors[0]);
          console.log(error);
      });
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, image, user]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <div>
      <button onClick={showCroppedImage} style={{display: image === null || croppedImage !== null ? "none" : "block"}} className="bg-slate-500">
        Crop
      </button>
      <div className="flex flex-col relative" style={{display: image === null || croppedImage !== null ? "none" : "block"}}>
        <div className="w-[600px] h-[600px]">
          <Cropper
            image={image}
            crop={crop}
            //rotation={rotation}
            zoom={zoom}
            zoomSpeed={4}
            maxZoom={3}
            zoomWithScroll={true}
            showGrid={true}
            aspect={4 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            //onRotationChange={setRotation}
          />
        </div>
        <div className="flex flex-col w-[600px] absolute -bottom-3">
          <label>
            Zoom
            {/*<Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="zoom"
              onChange={(e, zoom) => setZoom(zoom)}
              className="range"
            />*/}
          </label>
        </div>
      </div>
      <div className="flex flex-col">
        {croppedImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="h-[300px] w-[300px]" src={croppedImage} alt="cropped" />
        )}
        {croppedImage && <button onClick={onClose}>close</button>}
      </div>
    </div>
  );
};

export default AvatarCrop;
