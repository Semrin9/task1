import React from "react";
import Greeting from "../components/greeting";
import Form from "../components/form";
import Footer from "../components/footer";

const Invite = () => {
    const handleCloseModal = () => {
    };
    return (
<div className='holder-light'>
            <main className='container'>
                <Greeting />
                <Form onCloseModal={handleCloseModal} />
                <Footer />
            </main>
        </div>
    );
}

export default Invite;