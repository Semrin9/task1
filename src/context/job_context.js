import React, {useContext, useReducer, useEffect} from "react";
import { GET_JOBS, GET_SINGLE_JOB, GET_JOB_STATUS } from "../actions";
import reducer from "../reducers/job_reducer";
import jobs from "../utils/jobs";

const initialState = {
    jobs: [],
    job: {}
};

const JobContext = React.createContext();

export const JobProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getJobs = () => {
        dispatch({type: GET_JOBS, payload: jobs})
    };

    const getSingleJob = (id) => {
        const job = jobs.find(item => item.id === id);
        dispatch({type: GET_SINGLE_JOB, payload: job})
    };

    const updateJobStatus = (job) => {
        dispatch({ type: GET_JOB_STATUS, payload: job });
    };

    useEffect(() => {   
        getJobs();
    }, []);

    return (
        <JobContext.Provider value={{...state, getSingleJob}}>
            {children}
        </JobContext.Provider>
    )
}

export const useJobContext = () => {
    return useContext(JobContext);
}