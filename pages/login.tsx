import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { useCurrentUserContext } from 'lib/CurrentUserContext';

import { Button, TextField } from "@mui/material";

const Login = () => {
    const router = useRouter();
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const currentUserContext = useCurrentUserContext()
    const {isSignedIn, setIsSignedIn} = currentUserContext;
    const {currentUser, setCurrentUser} = currentUserContext;

    const account_confirmation_success = router.query.account_confirmation_success;

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
            .post("auth/sign_in", {
                email: data.get("email"),
                password: data.get("password"),
            })
            .then(function (response) {
                // Cookieにトークンをセットしています
                Cookies.set("uid", response.headers["uid"]);
                Cookies.set("client", response.headers["client"]);
                Cookies.set("access-token", response.headers["access-token"]);
                //値を更新
                setIsSignedIn(true);
                setCurrentUser(response.data.data);
                toast.success('Hello. This is test')
                //router.replace(`/users/${response.data.data.id}`);
                router.replace("/platform");
            })
            .catch(function (error) {
                // Cookieからトークンを削除しています
                Cookies.remove("uid");
                Cookies.remove("client");
                Cookies.remove("access-token");
                setIsError(true);
                setErrorMessage(error.response.data.errors[0]);
            });
        })();
    };

    return (
        <div>
            <div>
                {account_confirmation_success === 'true' ? <p>ユーザー登録が完了しました。こちらからログインして下さい。</p>:null}
                <p>ログイン</p>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="email" label="email" variant="outlined"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        placeholder="user@example.com"
                        required={true}
                        fullWidth
                        size="small"
                    />
                    <TextField
                        id="password" label="password" variant="outlined"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="******"
                        required={true}
                        fullWidth
                        size="small"
                    />
                    <Button variant="contained" type="submit">ログイン</Button>
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
        </div>
    );
};
export default Login;
