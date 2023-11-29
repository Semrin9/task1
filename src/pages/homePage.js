import React, { useEffect, useState } from 'react';
import Greeting from '../components/greeting';
import Footer from '../components/footer';
import JobsList from '../components/jobsList';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
    const location = useLocation();

    useEffect(() => {
        const { state } = location;
        const toastMessage = state && state.toastMessage;

        const toastShown = localStorage.getItem('toastShown');
        if (!toastShown && toastMessage) {
            toast.success(toastMessage, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            localStorage.setItem('toastShown', 'true');
        }
    }, [location]);

    return (
        <div className='holder'>
            <main className='container'>
                <Greeting />
                <JobsList />
                <Footer />
            </main>
        </div>
    );
}

export default HomePage;