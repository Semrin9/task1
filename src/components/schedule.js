import React from "react";
import styled from "styled-components";
import { icons } from "../utils/images";
import { images } from "../utils/images";
import { useNavigate, useLocation } from "react-router-dom";

const Schedule = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        localStorage.setItem('heroContent', 'Verifying');
        const segments = location.pathname.split("/").filter(Boolean);
        const jobIdIndex = segments.indexOf("job");
        if (jobIdIndex !== -1 && jobIdIndex < segments.length - 1) {
            const jobId = segments[jobIdIndex + 1];
            navigate(`/job/${jobId}`);
        } else {
            console.error("Job ID not found in the path.");
        }
    };

    return (
        <ScheduleWrapper>
            <div className='hero flex'>
                <img src={icons.arrowLeft} alt='arrow-left' />
                <h3>Screening Interview</h3>
            </div>
            <div className="main flex">
                <div className="video-template">
                    <img src={images.welcomeVideo} alt='video-icon' />
                </div>
                
                <div className="videoask-template flex flex-center">
                    <button className="btn-primary" onClick={handleClick}>Let's go</button>
                </div>
            </div>
        </ScheduleWrapper>
    );
}

const ScheduleWrapper = styled.div`
    .hero {
        padding: 1rem 3.5rem;
        background: var(--clr-default-dark);
        border-radius: 1rem 1rem 0 0;
        p {
            font-size: 1.5rem;
            font-weight: 600;
        }
        img {
            width: 2.5rem;
            height: 2.5rem;
            margin-right: 1rem;
        }
        h3 {
            color: var(--clr-white);
        }
    }

    .main {
        background: var(--clr-white);
        border-radius: 0 0 1rem 1rem;
    }

    .video-template, .videoask-template {
        width: 100%;
        height: 100%;
        img {
            border-radius: 0 0 0 1rem;
        }
        button {
            background: var(--clr-violet-v1);
            width: 75%;
            height: 6.75rem;
            font-size: 1.6rem;
            font-weight: 700;
            border-radius: 1.5rem;
        }
    }
`;

export default Schedule;