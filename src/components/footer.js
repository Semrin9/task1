import React from 'react';
import styled from "styled-components";
import { images } from "../utils/images";

const Footer = () => {
    return (
        <FooterWrapper>   
            <footer className='flex flex-center flex-column'>
                <span><b>Why am I receiving this invitation?</b></span>

                <div className='flex flex-center flex-column'>
                    <p>This Invitation is automatically sent to you, once Job opportunity match your public profile to invite you for job hiring process.</p>
                    <p>To stop receiving these emails, please <b>Send "unsubscribe" email to jobtalents@talentspace.al</b></p>
                </div>

                <img src={images.talentspace2} alt='talentspace' />
            </footer>
        </FooterWrapper>
    );
}

const FooterWrapper = styled.div`
    p, span {
        font-size: 1.15rem;
        font-weight: 400;
    }

    span {
        margin: 1.3rem 0;
    }

    img {
        width: 10rem;
        height: 3rem;
        margin: 1.5rem 0;
    }

    @media screen and (max-width: 720px) {
        span {
            margin: 1rem 0;
        }
        p {
            margin-bottom: 0.5rem;
        }
        p, span {
            font-size: 1rem;
            text-align: center;            
        }
        img {
            margin: 0.7rem 0 2rem 0 ;
        }
    }
`; 

export default Footer;