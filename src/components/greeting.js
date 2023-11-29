import React, { useState } from 'react';
import styled from 'styled-components';
import user from '../utils/users';

const Greeting = (props) => {
    const id  = 1;
    // const [activeUser, setActiveUser] = useState(id);
    // const { name } = props;
    return (
        <GreetingWrapper>
            {
            user.filter(user => user.id === id).map((user) => (
            <h2>Hello, {user.name}</h2>
            ))
        }
        </GreetingWrapper>
    );
}

const GreetingWrapper = styled.section`

`;

export default Greeting;