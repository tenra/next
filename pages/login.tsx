import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
    const router = useRouter();
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

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
            .post("users/sign_in", {
                email: data.get("email"),
                password: data.get("password"),
            })
            .then(function (response) {
                // Cookieにトークンをセットしています
                Cookies.set("uid", response.headers["uid"]);
                Cookies.set("client", response.headers["client"]);
                Cookies.set("access-token", response.headers["access-token"]);
                router.push("/profile");
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
                <p>ログイン</p>
                <form onSubmit={handleSubmit}>
                    <input
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <input
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <button type="submit">ログイン</button>
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
