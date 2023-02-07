import React from 'react';
import styled from 'styled-components';
import {SiFacebook,SiGithub,SiLinkedin} from "react-icons/si";


// footer Contacts

const Card = styled.div`
    width: 100%;
    height: 400px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    transition: all 0.2s ease-in-out;
    
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        
        }`


const CardTtitle = styled.h1`
    font-size: 25px;
    font-weight: 700;
    color: #fff;
    `

const CardItemContent = styled.a`
    text-decoration: none;
    width: 80%;
    height: 80px;
    gap: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: #fff;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    z-index: 5;
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        transform: scale(1.05);
        }

    `

const IconSocial = styled.div`

margin-left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    `

const TextSocial = styled.h1`
    font-size: 18px;
    font-weight: 400;
    color: #000;
    `




function CardGroupContactSocial() {


    return (
        <Card style={{backgroundImage:'linear-gradient(10deg, #63bcd9, #53408b)'}}>
            <CardTtitle>Redes Sociais</CardTtitle>
            <CardItemContent href='https://github.com/xjhowxjhow'>
                <IconSocial>
                    <SiGithub style={{color:'666666'}}/>
                </IconSocial>
                <TextSocial>GitHub</TextSocial>
                
            </CardItemContent>

            <CardItemContent href='https://www.linkedin.com/in/jhonatan-deni/'>
                <IconSocial>
                    <SiLinkedin style={{color:'0a66c2'}}/>
                </IconSocial>
                <TextSocial>LinkedIn</TextSocial>
                
            </CardItemContent>
            <CardItemContent>
                <IconSocial>
                    <SiFacebook style={{color:'046de6'}}/>
                </IconSocial>
                <TextSocial>Facebook</TextSocial>
                
            </CardItemContent>
        </Card>
        
    )
}

export default CardGroupContactSocial
                  
