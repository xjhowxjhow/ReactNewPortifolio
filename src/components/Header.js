import React from 'react';
import styled from 'styled-components';


const Header = styled.header`

    width: 100%;
    height: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s ease-in-out;

    @media screen and (max-width: 700px) {
        width: 100%;
        height: 100%;
        flex-direction: column;
        padding:5px 0px ;

    }

`

const HeaderItems = styled.div`
    
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;

    @media screen and (max-width: 700px) {
        width: 100%;
        height: 100%;
        flex-direction: row;
        margin-bottom: 20px;
        
    }

    
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
