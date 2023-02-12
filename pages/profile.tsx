import * as React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps, signOut } from "lib/auth";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("/users/profile");

const Profile = (props: any) => {
    console.log(props)

    const router = useRouter();

    const handleSignOut = () => {
        signOut();
        router.push("/");
    }

    return (
        <>
        <div className="">
            <h1 className="">Profile</h1>
            {props.is_login ? "true": "false"}
            <p className="">{props.data?.email}</p>
        </div>
        <button onClick={handleSignOut}>ログアウト</button>
        </>
    );
};

export default Profile;
