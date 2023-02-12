import { GetServerSideProps } from "next";
import Cookies from "js-cookie";
import axios from "axios";

export const withAuthServerSideProps = (url: string): GetServerSideProps => {
    return async (context) => {
        const { req, res } = context;

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/${url}`, {
            headers: {
                "Content-Type": "application/json" || "",
                uid: req.cookies["uid"] || "",
                client: req.cookies["client"] || "",
                "access-token": req.cookies["access-token"] || "",
            },
        });
        if (!response.ok && response.status === 401) {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false,
                },
            };
        }
        // TODO: 他にも500エラーを考慮した分岐も必要
        const props = await response.json();
        console.log(props)
        return { props };
    };
};

export const signOut = () => {
    return axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/users/sign_out`, {
        headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
        },
    });
};
