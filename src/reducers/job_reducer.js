import { GET_JOBS, GET_SINGLE_JOB, GET_JOB_STATUS } from "../actions";

const JobReducer = (state, action) => {
    switch (action.type) {
        case GET_JOBS:
        return {
            ...state,
            jobs: action.payload
        };
        case GET_SINGLE_JOB:
        return {
            ...state,
            job: action.payload
        };
        case GET_JOB_STATUS:
            const updatedJob = {
                ...state.job,
                deadline: action.payload.deadline
            };
            return {
                ...state,
                job: updatedJob
            };
        default:
        throw new Error(`No matching "${action.type}" - action type`)
    }
}

export default JobReducer;