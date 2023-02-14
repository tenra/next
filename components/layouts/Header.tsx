import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useCurrentUserContext } from 'lib/CurrentUserContext'
import { signOut } from "lib/auth";
import Cookies from "js-cookie";

export const Header: React.FC = () => {
    const currentUserContext = useCurrentUserContext()
    const {isSignedIn, setIsSignedIn} = currentUserContext;
    const {currentUser, setCurrentUser} = currentUserContext;

    const router = useRouter();

    const handleSignOut = async () => {
        try {
            const res = await signOut()
            if (res.data.success === true) {
                //各Cookieを削除
                Cookies.remove("access-token")
                Cookies.remove("client")
                Cookies.remove("uid")
                //値を更新
                setIsSignedIn(false);
                setCurrentUser("");
                router.replace("/");
                console.log("Succeeded in sign out")
            } else {
                console.log("Failed in sign_out")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <header>
                <Link href="/" className="">home</Link>/
                {isSignedIn && currentUser ?
                    <>
                        <span>{currentUser?.name} 🙋🏻</span>
                        <Link href="/profile" className="">profile</Link>
                        <button onClick={handleSignOut} className="bg-slate-500">ログアウト</button>
                    </>
                :
                    <>
                        <Link href="/login" className="">login</Link>/
                        <Link href="/signup" className="">signup</Link>/
                    </>
                }
            </header>
        </>
    )
}
