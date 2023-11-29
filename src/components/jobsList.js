import React from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useJobContext } from '../context/job_context';

const JobsList = () => {
    const { jobs } = useJobContext();

    return( 
    <JobsListWrapper className="container">
        <h3>you have {jobs.length} job invitations</h3>
        {
            jobs.map((job, index) => {
                let timeDifference = Date.parse(job.expiry_date) - Date.now();
                
                return (
                    <Link key={index} to={`/job/${job.id}`} className='job flex flex-between'>
                        <div className='job-details flex'>
                            <div className='company-logo'>
                                <img src={job.image} alt='loading' />
                            </div>

                            <div className='job-description'>
                                <h3>{job.title}</h3>
                                <h5>{job.company}</h5>
                                <h5>{job.job_type}. {job.location}. {job.industry} </h5>
                                <div className='skills flex'>
                                    {
                                        job.skills.map((skill, index) => {
                                            return <h5 key={index} className='skill'>{skill}</h5>
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='job-status flex flex-center'>
                            {
                                timeDifference > 0 ? <p className='open'>Open</p> : <p className='closed'>Closed</p>
                            }
                        </div>
                    </Link>
                );
            })
        }
    </JobsListWrapper>
    );
};

const JobsListWrapper = styled.div`
    display: flex;
    .job {
        padding: 1rem 0;
        border-bottom: 1px solid #e5e5e5;
        @media (max-width: 767px) {
            flex-direction: column;
            h3 {
                font-size: 1.6rem;
            }

            h5 {
                font-size: 1.2rem;
            }
        }
    }

    .company-logo {
        img {
            width: 110px;
            height: 110px;
            border-radius: 1.5rem;
            @media (max-width: 767px) {
                width: 90px;
                height: 90px;
            }
        }
    }

    .job-details {
        width: 100%;
        gap: 1.2rem;
        @media (max-width: 767px) {
            flex-direction: column;
        }
    }

    .job-description {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0.5rem;
        @media (max-width: 767px) {
            justify-content: center;
            align-items: center;
            align-content: center;
            text-align: center;
        }
    }

    .job-status {
        width: fit-content;
        padding: 0.4rem 1rem;
        border-radius: 0.4rem;
    }

    .skills {
        gap: 1rem;
        flex-wrap: wrap;
        font-size: 1.3rem;
        @media (max-width: 767px) {
            justify-content: center;
            h5 {
                font-size: 1.1rem;
            }
        }
    }

    .skill {
        width: fit-content;
        padding: 0.4rem 1rem;
        border-radius: 0.4rem;
        border: 1px solid #e5e5e5;
        border-radius: 1rem;
        background: var(--clr-light-secondary);
    }

    .open {
        color: #00b074;
        font-weight: 600;
        @media (max-width: 767px) {
            margin-top: 1.5rem;
        }
    }

    .closed {
        color: #f44336;
        font-weight: 600;
        @media (max-width: 767px) {
            margin-top: 1rem;
        }
    }

`;

export default JobsList;