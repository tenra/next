import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Modal from 'react-modal';
import axios from "axios";
import Cookies from "js-cookie";
import { useCurrentUserContext } from 'lib/CurrentUserContext';

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
        }).then(() => {
            router.reload()
            //setCurrentUser(currentUser);
            //setShowModal(false);
            //console.log("success update");
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
        <Modal
            style={customStyles}
            //className="top-[50%] left-[50%] bottom-auto right-auto bg-black"
            //overlayClassName="overlay"
            isOpen={showModal}
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleCloseModal}
            ariaHideApp={false}>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <p>編集</p>
                <form onSubmit={handleSubmit}>
                    <input
                        id="name"
                        name="name"
                        defaultValue={currentUser.name}
                        onChange={(e) => setName(e.target.value)}
                        className="block my-1 p-1"
                        placeholder="name"
                    />
                    <textarea
                        id="sentence"
                        name="sentence"
                        defaultValue={currentUser.sentence}
                        onChange={(e) => setSentence(e.target.value)}
                        className="block my-1 p-1"
                        placeholder="sentence"
                    />
                    <button type="submit"className="bg-slate-500">保存</button>
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
        </Modal>
    );

    return (
        <>
            <button onClick={handleOpenModal} className="bg-slate-500">current_user_edit</button>
            {editModal}
        </>
    );
}
