import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { icons } from "../utils/images";
import MyDropzone from "./uploadResume";
import { useLocation, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../context/user_context';

const Form = ({ onCloseModal }) => {
    const { users } = useUserContext();
    const location = useLocation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        linkedin: '',
        phone: '',
    });

    const [showSubmitButton, setShowSubmitButton] = useState(false);

    useEffect(() => {
        if (users && users.length > 0) {
            const user = users[0];
            setFormData({
                name: user.name || '',
                email: user.email || '',
                linkedin: user.linkedin || '',
                phone: user.phone || '',
            });
        }
        setShowSubmitButton(!location.pathname.includes('/screening') && !location.pathname.includes('/invite'));
    }, [users, location.pathname]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call or form submission logic
        // Replace this with the actual form submission logic

        onCloseModal();
        let toastMessage = '';
            if (location.pathname.includes('/screening')) {
                toastMessage = 'Screening is starting!';
            } else if (location.pathname.includes('/invite')) {
                toastMessage = 'Invitation sent successfully!';
            } else {
                toastMessage = 'Information confirmed successfully!';
            }
            setShowSubmitButton(false);
    };
    let heroContent = '';
    let buttonContent = '';
    let link = '';
    if (location.pathname.includes('/screening')) {
        heroContent = 'Enter your information';
        buttonContent = 'Start Screening';
        link = location.pathname + '/screening-process';
    } else if (location.pathname.includes('/invite')) {
        heroContent = 'Invite A friend';
        buttonContent = 'Invite to job';
        link = '../../';
        localStorage.removeItem('toastShown');
    } else {
        heroContent = 'Confirm your information';
        buttonContent = 'Confirm';
        link = '../';
    }
    return (
        <FormWrapper>
            <div className='hero flex'>
                <img src={icons.arrowLeft} alt='arrow-left' />
                <h3>{heroContent}</h3>
            </div>
 
            <div className='form flex flex-column'>
                <div className="message flex flex-center">
                    <h4>Please validate & update all the Following information carefully.</h4>
                </div>

                <form className='form-group flex-column' onSubmit={handleSubmit}>
                    <div className='form-row flex flex-between'>
                        <div className='form-item'>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                id='name'
                                placeholder='Your name'
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className='form-item'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                id='email'
                                placeholder='Your email'
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className='form-row flex flex-between'>
                        <div className='form-item'>
                            <label htmlFor='linkedin'>Linkedin URL</label>
                            <input
                                type='url'
                                id='linkedin'
                                placeholder='Your linkedin'
                                value={formData.linkedin}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className='form-item'>
                            <label htmlFor='phone'>Phone number</label>
                            <input
                                type='phone'
                                id='phone'
                                placeholder='Your phone'
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className='form-row'>
                        <div className='form-item'>
                            <p className="text-center">Updated Resume</p>
                            <MyDropzone />
                        </div>
                    </div>

                    <div className='policy flex flex-center text-center'>
                        <p className='flex flex-center'>By updating your information you confirm the privacy policy agreement</p>
                    </div>

                    <div className=' screening flex flex-center'>
                        {showSubmitButton ? (
                            <button type='submit' className='btn btn-primary'>
                                {buttonContent}
                            </button>
                        ) : (
                            <Link className='btn btn-primary' to={link} state={{ toastMessage: 'Invitation sent successfully!' }} >{buttonContent}</Link>
                        )}
                    </div>
                </form>
            </div>
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
    .hero {
        padding: 1rem 3.5rem;
        background: var(--clr-light-secondary);
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

    label {
        font-size: 1.2rem;
        font-weight: 700;
        margin-left: 0.2rem;
    }

    input {
        background: var(--clr-default-light);
        color: var(--clr-black);
        width: 100%;
        height: 3.9rem;
        border-radius: .5rem;
        border: none;
        outline: none;
        padding: 0 0.6rem 0 1rem;
        font-size: 1.5rem;
        font-weight: 600;
    }

    input[type="url"]:focus {
        font-size: 1.35rem;
        font-weight: 500;
    }

    input[type="text"]:focus,
    input[type="email"]:focus,
    input[type="phone"]:focus,
    input[type="url"]:focus {
        box-shadow: 0 0 0 1.5px var(--clr-blu);
    }

    input[type="text"]::placeholder,
    input[type="email"]::placeholder,
    input[type="phone"]::placeholder,
    input[type="url"]::placeholder {
        color: var(--clr-black);
        font-size: 1.25rem;
    }

    input[type="text"]:focus::placeholder,
    input[type="email"]:focus::placeholder,
    input[type="phone"]:focus::placeholder,
    input[type="url"]:focus::placeholder {
        color: transparent;
    }

    .form {
        background: var(--clr-white);
        gap: 1.2rem;
        border-radius: 0 0 1rem 1rem;
        padding-bottom: 5rem;
    }

    .message {
        padding: 0 29rem;
        margin-top: 2.8rem;
    }

    .form-group {
        display: flex;
        padding: 0 12rem;
        width: 100%;
        row-gap: 2.5rem;
    }

    .form-row {
        column-gap: 6rem;
        p {
            font-size: 1.3rem;
            font-weight: 700;
        }
    }

    .form-item {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 0.5rem;
    }

    .policy {
        padding: 1.5rem 20rem;
        p {
            font-size: 1.1rem;
        }
    }

    .btn {
        padding: 1.1rem 3rem;
        border-radius: 1rem;
        font-size: 1.2rem;
        font-weight: 600;
    }

    @media screen and (max-width: 1400px) {
        h4 {
            font-size: 1.5rem;
            text-align: center;
        }
    }

    @media screen and (max-width: 1280px) {
        h4 {
            font-size: 1.45rem;
            text-align: center;
        }

        .message {
            padding: 0 21.5rem;
        }

        .form-group {
            padding: 0 7.5rem;
        }

        .policy {
            padding: 1.5rem 5rem;
        }

        .form-row {
            column-gap: 4rem;
            p {
                font-size: 1.2rem;
            }
        }

        .form-item {
            gap: 0.5rem;
        }

        input {
            padding: 0 0.6rem 0 0.6rem;
        }
    }

    @media screen and (max-width: 720px) {
        .message {
            padding: 0 3rem;
        }

        .form-group {
            row-gap: 1.5rem;
            padding: 0 3rem;
        }
        
        .form-row {
            column-gap: 4rem;
            p {
                font-size: 1.15rem;
            }
        }

        .btn {
            padding: 1.1rem 2rem;
        }
    }

    @media screen and (max-width: 630px) {
        h4 {
            font-size: 1.3rem;
        }
    }

    @media screen and (max-width: 420px) {
        h4 {
            font-size: 1.25rem;
        }
        .form-group {
            row-gap: 1rem;
            padding: 0 1.5rem;
        }
        
        .form-row {
            column-gap: 2rem;
        }

        .message {
            padding: 0 1rem;
        }

        .policy {
            padding: 1.5rem 1rem;
        }
    }
`;

export default Form;