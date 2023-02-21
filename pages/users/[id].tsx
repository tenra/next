import React, { useState, useCallback } from "react";
import Image from 'next/image';
import { useCurrentUserContext } from 'lib/CurrentUserContext';
import UserEditModal from 'components/users/UserEditModal';
import PromotionNewModal from 'components/promotions/PromotionNewModal';
import AvatarCrop from "components/users/AvatarCrop";

type UserProp = {
    user: any;
}

export async function getServerSideProps(context: any) {

    const { id } = context.params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/users/${id}`, {
        headers: {
            "Content-type": "application/json",
            uid: context.req.cookies['uid'],
            client: context.req.cookies['client'],
            "access-token": context.req.cookies['access-token']
        }
    });
    if (!res.ok && res.status === 401) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    const user = await res.json();
    console.log(res)

    return { props: { user } };

}

const UserShow = ({ user }: UserProp) => {
    console.log(user)

    const currentUserContext = useCurrentUserContext()
    const {currentUser, setCurrentUser} = currentUserContext;
    //console.log("currentUser", currentUser)

    const [image, setImage] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    //const handleImageUpload = async (e) => {
    //    setImage(URL.createObjectURL(e.target.files[0]));
    //};
    const onFileChange = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                if (reader.result) {
                    setImage(reader.result.toString() || "");
                    setIsOpen(true);
                }
                });
                reader.readAsDataURL(e.target.files[0]);
            }
        },
        []
    );

    return (
        <>
            {currentUser && currentUser.id === user.id ?
                <>
                    <UserEditModal />/
                    <PromotionNewModal />/
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
                    <AvatarCrop image={image} user={user} />
                </>
            : null}
            {user.avatar?.url ?
                <Image src={user.avatar.url}
                    alt={user.name}
                    width={100}
                    height={100}
                    unoptimized={true}
                />
            : null}
            <h1 className="text-3xl">{user?.name}</h1>
            <p>{user?.sentence}</p>
        </>
    )
}
export default UserShow;
