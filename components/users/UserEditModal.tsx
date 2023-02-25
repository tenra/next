import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { useCurrentUserContext } from 'lib/CurrentUserContext';

import Dialog from '@mui/material/Dialog';
import { Button, TextField } from "@mui/material";

export default function UserEditModal() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const currentUserContext = useCurrentUserContext()
    const {currentUser, setCurrentUser} = currentUserContext;
    //console.log("currentUser", currentUser)

    const [name, setName] = useState(currentUser.name);
    const [sentence, setSentence] = useState(currentUser.sentence);

    const router = useRouter()

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        axios.patch(`${process.env.NEXT_PUBLIC_BACK_URL}/users/${currentUser.id}`,{
            name: name,
            sentence: sentence,
        },{
            headers: {
                "content-type": "application/json",
                "access-token": Cookies.get("access-token") || "",
                client: Cookies.get("client") || "",
                uid: Cookies.get("uid") || "",
            },
        }).then(function(response) {
            setCurrentUser(response.data.data);
            setShowModal(false);
            toast.success('Hello. This is test')
            router.replace(`/users/${currentUser.id}`);
        })
        .catch((error) => {
            setIsError(true);
            setErrorMessage(error.response.data.errors[0]);
            console.log(error);
        });
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: "black",
        },
    };

    const editModal = (
        <Dialog open={showModal} onClose={handleCloseModal}>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <p>編集</p>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="outlined-basic" label="Name" variant="outlined"
                        name="name"
                        defaultValue={currentUser.name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="user_name"
                        required={true}
                        fullWidth
                        size="small"
                    />
                    <TextField
                        id="outlined-basic" label="Sentence" variant="outlined"
                        name="sentence"
                        defaultValue={currentUser.sentence}
                        onChange={(e) => setSentence(e.target.value)}
                        placeholder="500文字以内"
                        multiline
                        rows={4}
                        fullWidth
                        size="small"
                    />
                    <Button variant="contained" type="submit">保存</Button>
                    {isError ? (
                        <p onClick={() => {setIsError(false); setErrorMessage("");}}>
                            {errorMessage}
                        </p>
                    ) : null}
                </form>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                    variant="text"
                    type="button"
                    onClick={handleCloseModal}>
                    閉じる
                </Button>
            </div>
        </Dialog>
    );

    return (
        <>
            <Button variant="text" onClick={handleOpenModal}>編集</Button>
            {editModal}
        </>
    );
}
