import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useCurrentUserContext } from 'lib/CurrentUserContext';

const Signup = () => {
    const [sendConfirm, setSendConfirm] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const currentUserContext = useCurrentUserContext()
    const {isSignedIn, setIsSignedIn} = currentUserContext;
    const {currentUser, setCurrentUser} = currentUserContext;


    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_BACK_URL,
            headers: {
                "content-type": "application/json",
            },
        });
        (async () => {
            setIsError(false);
            setErrorMessage("");
            return await axiosInstance
            .post("users", {
                name: data.get("name"),
                email: data.get("email"),
                password: data.get("password"),
                password_confirmation: data.get("password_confirmation"),
                confirm_success_url: `${process.env.NEXT_PUBLIC_FRONT_URL}/login`,
            })
            .then(function (response) {
                setSendConfirm(true);
            })
            .catch(function (error) {
                setIsError(true);
                setErrorMessage(error.response.data.errors[0]);
            });
        })();
    };

    return (
        <>
            {!sendConfirm ?
                <div>
                    <p>新規ユーザー登録</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            id="name"
                            name="name"
                            autoFocus
                            placeholder="name"
                        />
                        <input
                            id="email"
                            name="email"
                            autoComplete="email"
                            placeholder="user@example.com"
                        />
                        <input
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            placeholder="******"
                        />
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder="******"
                        />

                        <button type="submit">登録メール送信</button>
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
            :
                <p>登録メールを送信しました。メール内のリンクから本登録をおこなって下さい。</p>
            }
        </>
    );
};
export default Signup;
