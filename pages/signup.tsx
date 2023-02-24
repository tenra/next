import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useCurrentUserContext } from 'lib/CurrentUserContext';

import { Button, TextField } from "@mui/material";

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
            .post("auth", {
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
                        <TextField
                            id="outlined-basic" label="name" variant="outlined"
                            name="name"
                            autoFocus
                            placeholder="name"
                            required={true}
                            fullWidth
                            size="small"
                        />
                        <TextField
                            id="outlined-basic" label="email" variant="outlined"
                            name="email"
                            autoComplete="email"
                            placeholder="user@example.com"
                            required={true}
                            fullWidth
                            size="small"
                        />
                        <TextField
                            name="password"
                            type="password"
                            id="outlined-basic" label="password" variant="outlined"
                            autoComplete="current-password"
                            placeholder="******"
                            required={true}
                            fullWidth
                            size="small"
                        />
                        <TextField
                            type="password"
                            id="outlined-basic" label="password_confirmation" variant="outlined"
                            name="password_confirmation"
                            placeholder="******"
                            required={true}
                            fullWidth
                            size="small"
                        />

                        <Button variant="contained" type="submit">登録メール送信</Button>
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
