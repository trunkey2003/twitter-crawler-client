import React from 'react'
import Footer from '../components/Footer/MainFooter'
import HomeNav from '../components/Nav/HomeNav'

export default function HomeLayout({ children }) {
    return (
        <>
            <HomeNav />
            <main className='min-h-[100vh]'>{children}</main>
            <Footer />
        </>
    )
}
