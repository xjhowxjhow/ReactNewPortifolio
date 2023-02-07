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
        
        }`




const FooterAuthor = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    
    `



function CardFooter() {
    return (
        <Card>
            <FooterAuthor>
                <p>Created by: <a href="">
                    <span>Jhonatan Deni</span>
                </a></p>
                <p> Powered by: <a href="">
                    <span>React</span>
                </a></p>

                <p>Icons by: <a href="">
                    <span>Font Awesome</span>
                </a></p>

                <p> All rights reserved</p>
                <p> © 2023</p>

                <p>Version: 1.0.0</p>

                < p>License: MIT</p>

                <p > <a href="">Terms of Service</a></p>
                <p> <a href="">Privacy Policy</a></p>

                <p> Hosted on: <a href="">
                    <span>Netlify</span>
                </a></p>



            </FooterAuthor>
        </Card>
    )
}

export default CardFooter