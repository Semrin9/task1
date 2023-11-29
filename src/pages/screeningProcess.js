import React from "react";
import Greeting from "../components/greeting";
import Schedule from "../components/schedule";
import Footer from "../components/footer";

const ScreeningProcess = () => {
    return(
        <div className='holder-light'>
            <main className='container'>
                <Greeting />
                <Schedule />
                <Footer />
            </main>
        </div>
    )
}

export default ScreeningProcess;