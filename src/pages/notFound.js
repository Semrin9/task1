import styled from "styled-components";
import { icons } from '../utils/images';

const NotFound =() => {
    return (
        <NotFoundContainer>
            <h1 className='title'>Something is not right...</h1>
            <p className='text'>The page you are looking for does not exist.</p>
            <img src={icons.notFound} alt='not-found' />
        </NotFoundContainer>
    )
}

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;

    img {
        width: 50%;
        height: 50%;
    }
`;

export default NotFound;