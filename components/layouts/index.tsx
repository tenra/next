import React from 'react';
import { Header } from 'components/layouts/Header';
import { Footer } from 'components/layouts/Footer';

const Layouts = (props: any) => {

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    {props.children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layouts
