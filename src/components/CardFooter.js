import React from 'react';
import styled from 'styled-components';



const Card = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s ease-in-out;
    
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        
        }
        
    @media (max-width: 700px) {

        flex-direction: column;
        margin-bottom: 20px;
        overflow-y: scroll;
        
        }

    `




const FooterAuthor = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    
    @media (max-width: 700px) {
        width: 100%;
        height: 100%;
        flex-direction: row;
        gap: 100px;
        justify-content: flex-start;
        }

    
    `



function CardFooter() {
    return (
        <Card>
            <FooterAuthor>
                <p>Created by:
                    <span>Jhonatan Deni</span>
                </p>
                <p> Powered by: <a href="https://reactjs.org/">
                    <span>React</span>
                </a></p>
                <p>Icons by: <a href="https://fontawesome.com/">
                    <span>Font Awesome</span>
                </a></p>
                <p> All rights reserved</p>
                <p> © 2023</p>
                <p>Version: 1.0.0</p>
                <p>License: MIT</p>
                <p><a href="http://termcondition.com/">Terms of Service</a></p>
                <p><a href="http://termcondition.com/">Privacy Policy</a></p>
                <p> Hosted on: <a href="https://www.netlify.com/">
                    <span>Netlify</span>
                </a></p>



            </FooterAuthor>
        </Card>
    )
}

export default CardFooter