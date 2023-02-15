import * as React from "react";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "lib/auth";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("/auth/profile");

const Profile = (props: any) => {
    console.log(props)

    return (
        <>
        <div className="">
            <h1 className="">Profile</h1>
            <p className="">{props.data?.name}</p>
            <p className="">{props.data?.email}</p>
        </div>
        </>
    );
};

export default Profile;
