import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import Form from "./form";
import { useJobContext } from '../context/job_context';

//This will be changed when we have a talent pool in the backend.
const random = Math.floor(Math.random() * 100) + 1;

const Rank = () => {
    const [showVerifyInfo, setShowVerifyInfo] = useState(false);
    const { jobs } = useJobContext();
    const { id } = useParams();
    const location = useLocation();
    const job = jobs && jobs.length > 0 ? jobs[id] : null;
    const invitationDate = job.candidates[0].invitation_date;
    const localStorageHeroContent = localStorage.getItem('heroContent');

    const isInvitationOutdated = () => {
        const time = Date.now() - Date.parse(invitationDate);
        const months = Math.floor(time / (1000 * 60 * 60 * 24 * 30));
            
        return months > 4;
    }
    const outdated = isInvitationOutdated();

    const handleVerifyClick = () => {
        setShowVerifyInfo(true);
    };

    const handleCloseModal = () => {
        setShowVerifyInfo(false);
    };

    
    return (
        <RanKWrapper>
            <div className='accept-role flex flex-center flex-column'>
                <h4>You rank { random } compared to other candidates</h4>
                <div className='buttons flex'>
                    {outdated ? (
                        <button className='btn-primary' onClick={handleVerifyClick}>
                            Accept the invitation
                        </button>
                    ) : (
                        localStorageHeroContent === 'Verifying' ? (
                            <button className='btn-primary'>Start Vetting</button>
                        ) : (
                            <Link to={`${location.pathname}/screening`}>
                                <button className='btn-primary'>Accept the invitation</button>
                            </Link>
                        ))
                    }
                    <Link to={`${location.pathname}/invite`}>
                        <button className='btn-secondary'>Pass to a Friend</button>
                    </Link>
                </div>
            </div>
            {showVerifyInfo && (
                <VerifyInfoWrapper>
                    <div className='modal-overlay' onClick={handleCloseModal}>
                        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                            <Form onCloseModal={handleCloseModal} />
                        </div>
                    </div>
                </VerifyInfoWrapper>
            )}
        </RanKWrapper>
    );
};

const RanKWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0 0.5rem 0;

    h4 {
        margin-bottom: 1rem;
    }

    .buttons {
        gap: 1rem;
    }

    @media screen and (max-width: 420px) {
        h4 {
            font-size: 1.25rem;
        }
    }
`;

const VerifyInfoWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--clr-black);

    .modal-content {
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 1rem;
        width: 47%;
        height: 200px;
        z-index: 1000;
    
        @media screen and (max-width: 1400px) {
            width: 30%;
        }
    
        @media screen and (max-width: 1280px) {
            width: 40%;
        }
    
        @media screen and (max-width: 1024px) {
            width: 50%;
        }
    
        @media screen and (max-width: 767px) { 
            width: 80%;
        }
      }
`;

export default Rank;