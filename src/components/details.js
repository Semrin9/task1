import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { icons } from "../utils/images";
import Timer from './timer';
import { useJobContext } from '../context/job_context';

const Details = () => {
    const { jobs } = useJobContext();
    const { id } = useParams();
    const job = jobs && jobs.length > 0 ? jobs[id] : null;

    const [heroContent, setHeroContent] = useState('Open');

    const determineHeroContent = () => {
        let timeDifference = Date.parse(job.expiry_date) - Date.now();
        const localStorageHeroContent = localStorage.getItem('heroContent');
        if (localStorageHeroContent === 'Verifying') {
            setHeroContent('Verifying');
        } else if (timeDifference > 0) {
            setHeroContent('Open');
        } else {
            setHeroContent('Closed');
        }
    };

    useEffect(() => {
        determineHeroContent();
    }, [job.expiry_date]);

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/screening-process')) {
            setHeroContent('Verifying');
        }
    }, []);

    const getHeroContent = () => {
        switch (heroContent) {
        case 'Open': {
            return (
                <div className='hero flex flex-between'>
                    <p className='open'>Open</p>
                    <Timer deadline={job.expiry_date} />
                    <img src={icons.questionMark} alt='question-mark' />
                </div>
            );
        } case 'Verifying': {
            return (
                <div className='hero-verifying flex flex-center'>
                    <img src={icons.time} alt='closed-icon' />
                    <p>Verifying</p>
                </div>
            );
        } case 'Closed': {
            return (
                <div className='hero-closed flex flex-center'>
                    <img src={icons.time} alt='closed-icon' />
                    <p>Closed</p>
                </div>
            );
        }
        default: {
            return (
                <div className='hero flex flex-between'>
                    <p className='open'>Open</p>
                    <Timer deadline={job.expiry_date} />
                    <img src={icons.questionMark} alt='question-mark' />
                </div>
            );
        
        }
        }
    };

    return (
        <DetailsWrapper>
            {getHeroContent()}
            
            <div className='details'>
                <div className='title-section flex'>
                    <div className='company-logo'>
                        <img src={job.image} alt='loading' />
                    </div>

                    <div className='role-details'>
                        <h2 className='flex'>{job.title} <img src={icons.clock} /></h2>
                        <div className='skills flex'>
                            {
                                job.skills.map((skill, index) => {
                                    return <h5 key={index} className='skill'>{skill}.</h5>
                                })
                            }
                        </div>
                        <h5>{job.job_type}. {job.location}. {job.industry} </h5>
                    </div>
                </div>
                <div className='role-description'>
                    <p>{job.description}</p>
                </div>
                <div className='role-responsibilities'>
                    <h3 className='flex'><img src={icons.minus} alt='minus'/> What is your job role?</h3>
                    <ul>
                        {
                            job.duties.map((duties, index) => {
                                return <li key={index}>{duties}</li>
                            })
                        }
                    </ul>
                </div>
                <div className='role-requirements'>
                    <h3 className='flex'><img src={icons.plus} alt='plus'/> Requirements</h3>
                    <ul>
                        {
                            job.requirements.map((requirements, index) => {
                                return <li key={index}><b>{requirements.title} :</b> {requirements.description}</li>
                            })
                        }
                    </ul>
                </div>
                <div className='role-benefits'>
                    <h3 className='flex'><img src={icons.plus} alt='plus'/> Benefits</h3>
                    <ul>
                        {
                            job.benefits.map((benefits, index) => {
                                return <li key={index}><b>{benefits.title}</b> : {benefits.description}</li>
                            })
                        }
                    </ul>
                </div>
            </div>

        </DetailsWrapper>
    );
};

const DetailsWrapper = styled.div`
background: var(--clr-dark-secondary);
    border-radius: 0.7rem;
    padding-bottom: 1.1rem;
    p {
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 1.8;
    }
    ul {
        font-size: 1.3rem;
        font-weight: 500; 
    }
    h2 {
        img {
            width: 2.1rem;
            height: 2.1rem;
            margin-left: 0.5rem;
        }
    }
    h3{
        img {
            width: 1.55rem;
            height: 1.55rem;
            margin-right: 0.5rem;
        }
    }
    .hero {
        padding: 1rem 1.5rem;
        background: var(--clr-violet);
        border-radius: 0.6rem 0.6rem 0 0;
        p {
            font-size: 1.5rem;
            font-weight: 600;
        }
        img {
            width: 1.6rem;
            height: 1.7rem;
        }
    }

    .hero-closed {
        padding: 1rem 1.5rem;
        background: var(--clr-red);
        border-radius: 0.6rem 0.6rem 0 0;
        gap: 0.5rem;
        p {
            font-size: 1.5rem;
            font-weight: 600;
        }
        img {
            width: 2rem;
            height: 2rem;
        }
    }

    .hero-verifying {
        padding: 1rem 1.5rem;
        background: var(--clr-light-secondary);
        border-radius: 0.6rem 0.6rem 0 0;
        gap: 0.5rem;
        p {
            font-size: 1.5rem;
            font-weight: 600;
        }
        img {
            width: 2rem;
            height: 2rem;
        }
    }

    .open {
        color: var(--clr-white);
        background: var(--clr-green);
        padding: 0.2rem 0.8rem;
        border-radius: 0.4rem;
        border: 1px solid var(--clr-white);
    }

    .closed {
        color: var(--clr-white);
        background: var(--clr-scarlet-v1);
        padding: 0.2rem 0.8rem;
        border-radius: 0.4rem;
        border: 1px solid var(--clr-white);
    }

    .details {
        display: flex;
        flex-direction: column;
        padding: 0.5rem 21rem 2rem 4rem;
        row-gap: 2rem;
    }
    .skills {
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .skill {
        width: fit-content;
    }
    
    img {
        width: 70px;
        height: 70px;
        border-radius: 1.5rem;
    }

    .title-section {
        gap: 1rem;
    }
    
    @media screen and (max-width: 1280px) {
        .details {
            padding: 0.5rem 8rem 2rem 4rem;
        }
    }

    @media screen and (max-width: 720px) {
        .details {
            padding: 0.5rem 3rem 2rem 3rem;
        }
    }

    @media screen and (max-width: 420px) {
        img {
            width: 75px;
            height: 75px;
        }

        h2 {
            font-size: 1.8rem;
        }

        h5 { 
            font-size: 1.1rem;
        }
    }

    .hide {
        display: none;
    }
`;

export default Details;