import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

import Dialog from '@mui/material/Dialog';
import { Button, TextField } from "@mui/material";

export default function PromotionNewModal() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const router = useRouter()

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        const axiosInstance = axios.create({
            headers: {
                "content-type": "application/json",
                "access-token": Cookies.get("access-token") || "",
                client: Cookies.get("client") || "",
                uid: Cookies.get("uid") || "",
            },
        });
        (async () => {
            setIsError(false);
            setErrorMessage("");
            return await axiosInstance
            .post(`${process.env.NEXT_PUBLIC_BACK_URL}/promotions`, {
                title: data.get("title"),
                content: data.get("content"),
            })
            .then(function(response) {
                toast.success('Hello. This is test')
                router.push("/platform");
                //setCurrentUser(currentUser);
                //setShowModal(false);
                //console.log("success update");
            })
            .catch(function (error) {
                setIsError(true);
                setErrorMessage(error.response.data.errors[0]);
                console.log(error);
            });
        })();
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

    const newModal = (
        <Dialog open={showModal} onClose={handleCloseModal}>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <p>作成</p>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="outlined-basic" label="title" variant="outlined"
                        name="title"
                        required={true}
                        fullWidth
                        size="small"
                        placeholder="title"
                    />
                    <TextField
                        id="outlined-basic" label="content" variant="outlined"
                        name="content"
                        placeholder="500文字以内"
                        multiline
                        rows={4}
                        fullWidth
                        size="small"
                    />
                    <Button variant="contained" type="submit">作成</Button>
                    {isError ? (
                        <p onClick={() => {
                                setIsError(false);
                                setErrorMessage("");
                            }}
                        >
                            {errorMessage}
                        </p>
                    ) : null}
                </form>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleCloseModal}>
                    閉じる
                </button>
            </div>
        </Dialog>
    );

    return (
        <>
            <Button variant="text" onClick={handleOpenModal}>プロモ作成</Button>
            {newModal}
        </>
    );
}
