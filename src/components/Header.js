import React from 'react';
import styled from 'styled-components';


const Header = styled.header`

    position: fixed;
    width: 100%;
    height: 60px;
    background-color:rgb(229, 229, 229);
    color: rgb(1, 1, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #191a21;
    z-index: 100;
`

const HeaderItems = styled.div`
    
    display: flex;
    gap: 20px;
    justify-content: center;
    padding: 0 20px;
    margin-left: 20px;
    margin-right: 20px;
`

const HeaderButton = styled.button`
    width: 80px;
    height: 40px;
    border: none;
    cursor: pointer;
    background-color: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.2s ease-in-out;
    font-size: 20px;
    &:hover {
        border-bottom: 1px solid rgba(0, 0, 0, 1);
    }


`


const HeaderLogo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: url(${props => props.src});
    margin-left: 20px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 100;

`







const HeaderComponent = () => {
    return (
        <Header>
            <HeaderLogo src="https://avatars.githubusercontent.com/u/58306583?v=4"></HeaderLogo>
            <HeaderItems>
                <HeaderButton href="/">Home</HeaderButton>
                <HeaderButton href="/">Carrer</HeaderButton>
                <HeaderButton href="/">Skills</HeaderButton>
                <HeaderButton href="/">Projects</HeaderButton>
                <HeaderButton href="/">Contact</HeaderButton>
            </HeaderItems>
        </Header>
    )
}

export default HeaderComponent
