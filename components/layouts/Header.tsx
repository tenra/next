import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useCurrentUserContext } from 'lib/CurrentUserContext'
import { signOut } from "lib/auth";

export const Header: React.FC = () => {
    const currentUserContext = useCurrentUserContext()
    const {isSignedIn, setIsSignedIn} = currentUserContext;
    const {currentUser, setCurrentUser} = currentUserContext;

    const router = useRouter();

    const handleSignOut = () => {
        signOut();
        //値を更新
        setIsSignedIn(false);
        setCurrentUser("");
        router.replace("/");
    }

    return (
        <>
            <header>
                <Link href="/" className="">home</Link>/
                {isSignedIn ?
                    <>
                        <p>My name is {currentUser?.name} 🙋🏻{currentUser?.email}</p>
                        <Link href="/profile" className="">profile</Link>
                        <button onClick={handleSignOut}>ログアウト</button>
                    </>
                :
                    <>
                        <Link href="/login" className="">login</Link>
                    </>
                }
            </header>
        </>
    )
}
