import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Greeting from '../components/greeting';
import Interest from '../components/interest';
import Details from '../components/details';
import Rank from '../components/rank';
import Footer from '../components/footer';
import { useJobContext } from '../context/job_context';


const JobDetails = () => {
    const { jobs } = useJobContext();
    const { id } = useParams();
    const job = jobs && jobs.length > 0 ? jobs[id] : null;


    if (!job) {
        // edit this
        return <div>No job found!</div>;
    }
    const triggerToast = (message) => {
        toast.success(message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    return (
        <div className='holder'>
            <main className='container'>
                <Greeting />
                <Interest triggerToast={triggerToast} />
                <Details />
                <Rank />
                <Footer />
            </main>
        </div>
    );
}

export default JobDetails;