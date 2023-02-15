import { GetServerSideProps } from "next";
import Cookies from "js-cookie";
import client from "lib/client";

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
                    destination: "/",
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

export const getCurrentUser = () => {
    if (
        !Cookies.get("access-token") ||
        !Cookies.get("client") ||
        !Cookies.get("uid")
    )
    return;
    return client.get("/auth/base", {
        headers: {
            "access-token": Cookies.get("access-token") || "",
            client: Cookies.get("client") || "",
            uid: Cookies.get("uid") || "",
        },
    });
};

export const signOut = () => {
    return client.delete("/auth/sign_out", {
        headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
        },
    });
};
