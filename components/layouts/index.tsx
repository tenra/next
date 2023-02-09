import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from 'components/layouts/Header';
import { Footer } from 'components/layouts/Footer';

const Layouts = (props: any) => {

    return (
        <>
            <div>
                <Header />
                <main>
                    {props.children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layouts
