import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { icons } from "../utils/images";

const Interest = ({ triggerToast }) => {
    const [isLookingForJob, setIsLookingForJob] = useState(null);
    const [reachOutTime, setReachOutTime] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleSelection = (value) => {
        setIsLookingForJob(value);
        if (value === 'Yes') {
            // Reset reachOutTime if the candidate selects 'Yes'
            triggerToast('You will receive an email with all new job openings!');

            setReachOutTime('');
            setShowForm(false);
        } else {
            setShowForm(true);
        }
    };

    const handleDateChange = (date) => {
        setReachOutTime(date);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (reachOutTime && isLookingForJob === 'No') {
            setShowForm(false);
            setIsLookingForJob('Yes');
            const time = formatDate(reachOutTime);
            triggerToast('We will reach out to you on ' + time);
         } else {
            triggerToast('Please select a date');
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setReachOutTime(null);
    };

    const formatDate = (date) => {
        return date ? format(date, 'dd/MM/yyyy') : '';
    };

    const renderForm = () => {
        return (
            <div className='modal-overlay'>
                <div className='modal-content'>
                    <button className='exit-button' onClick={handleCloseForm}><img src={icons.close} alt='file' /></button>
                    <form className="flex flex-column" onSubmit={handleSubmit}>
                        <label htmlFor='reachOutTime'>When can we reach out to you again?</label>
                        <DatePicker
                            selected={reachOutTime}
                            onChange={handleDateChange}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="Select date"
                        />
                        <button className="btn-primary" type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        isLookingForJob !== 'Yes' && (
            <InterestWrapper showForm={showForm}>
                <div className='content flex flex-between'>
                    <h3>Are you actively looking for a job?</h3>
                    <div className='btn-container flex flex-between'>
                        <div className='btns'>
                            <button className={`btn-primary ${isLookingForJob === 'Yes' ? 'active' : ''}`}
                                onClick={() => handleSelection('Yes')}>Yes</button>
                            <button className={`btn-secondary ${isLookingForJob === 'No' ? 'active' : ''}`}
                                onClick={() => handleSelection('No')}>No</button>
                        </div>  
                    </div>  
                </div>

                {showForm && renderForm()}
            </InterestWrapper>
        )
    );
}

const InterestWrapper = styled.div`
    background: var(--clr-light-main);
    color: var(--clr-black);
    padding: 1.7rem 3rem;
    border-radius: 1rem;
    img {
        width: 2rem;
        height: 2rem;
    }
    p {
        font-size: 1.5rem;
        font-weight: 600;
    }
    .btn-primary {
        margin: 0 2rem;
    }

    @media screen and (max-width: 1400px) {
        .btn-primary , .btn-secondary {
          font-size: 1.1rem;
        }
      }

    @media screen and (max-width: 1280px) {
        .btn-primary {
            margin: 0 1rem;
        }
    }

    @media screen and (max-width: 767px) {
        p {
            font-size: 1.3rem;
            font-weight: 600;
        }

        h3 {
            font-size: 1.5rem;
        }

        .content {
            flex-direction: column;
            row-gap: 1rem;
        }
        .btn-container {
            flex-direction: column;
            row-gap: 1rem;
        }
    }
    @media screen and (max-width: 420px) {
        padding: 1.5rem 0;
        h3 {
            font-size: 1.4rem;
        }
        .btn-primary , .btn-secondary {
            padding: 0.7rem 1.2rem;

        }
        .btn-primary {
            margin: 0 0.5rem 0 0;
        }
    }

    .modal-overlay {
        display: ${(props) => (props.showForm ? 'block' : 'none')};
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        z-index: 999;
        backdrop-filter: blur(4px); /* Blur the background */
      }
    
      .modal-content {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 1rem;
        width: 420px;
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

      label {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--clr-black);
        margin-bottom: 1rem;
        display: block;
      }

      input {
        padding: 1rem 1rem;
        border-radius: 1rem;
        border: 1px solid var(--clr-black);
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--clr-black);
        background: var(--clr-default-light);
        margin-bottom: 1rem;
        width: 100%;
      }
`;

export default Interest;