import React from 'react'
import Footer from '../components/Footer/MainFooter'
import MainNav from '../components/Nav/MainNav'

export default function MainLayout({ children }) {
    return (
        <>
            <MainNav />
            <main className='min-h-[100vh]'>{children}</main>
            <Footer />
        </>
    )
}
