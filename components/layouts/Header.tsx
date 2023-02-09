import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Header: React.FC = () => {

    return (
        <>
            <header>
                <Link href="/" className="">home</Link>/
                <Link href="/login" className="">login</Link>/
                <Link href="/profile" className="">profile</Link>
            </header>
        </>
    )
}
