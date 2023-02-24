import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useCurrentUserContext } from 'lib/CurrentUserContext'
import { signOut } from "lib/auth";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

import Avatar from '@mui/material/Avatar';
import { Stack, Button } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const Header: React.FC = () => {
    const currentUserContext = useCurrentUserContext()
    const {isSignedIn, setIsSignedIn} = currentUserContext;
    const {currentUser, setCurrentUser} = currentUserContext;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                setOpen(false);
                toast.success('Hello. This is test')
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
                {isSignedIn && currentUser ?
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Link href="/platform" className="">logo</Link>
                        <Link href={`/users/${currentUser.id}`}>
                            <Stack direction="row" alignItems="center">
                                {currentUser?.name}
                                <Avatar src={currentUser?.avatar?.url} alt={currentUser?.name} />
                            </Stack>
                        </Link>
                        <button onClick={handleClickOpen}>ログアウト</button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">ログアウトの確認</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    本当にログアウトしますか？
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions style={{justifyContent: 'center'}}>
                                <Button onClick={handleClose}>キャンセル</Button>
                                <Button onClick={handleSignOut} variant="contained" autoFocus>決定</Button>
                            </DialogActions>
                        </Dialog>
                    </Stack>
                :
                    <>
                        <Link href="/" className="">logo</Link>/
                        <Link href="/login" className="">ログイン</Link>/
                        <Button href="/signup" variant="outlined">ユーザー登録</Button>
                    </>
                }
            </header>
        </>
    )
}
