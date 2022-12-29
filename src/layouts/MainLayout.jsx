import React from 'react'
import Footer from '../components/Footer/MainFooter'
import Nav from '../components/Nav/MainNav'

export default function MainLayout({ children }) {
    return (
        <>
            <Nav />
            <main className='min-h-[100vh]'>{children}</main>
            <Footer />
        </>
    )
}
