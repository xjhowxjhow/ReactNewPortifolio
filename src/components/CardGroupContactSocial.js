import React from 'react';
import styled from 'styled-components';
import {SiGithub,SiLinkedin,SiYoutube} from "react-icons/si";


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
    background-image:linear-gradient(10deg, #63bcd9, #53408b);
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        
        }
    
    @media screen and (max-width: 700px) {
        gap: 10px;
        width: 100%;
        justify-content: center;
    }
    `


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
        <Card className='cardcontactsocial'>
            <CardTtitle>Redes Sociais</CardTtitle>
            <CardItemContent href='https://github.com/xjhowxjhow' className='btn_social1'>
                <IconSocial>
                    <SiGithub style={{color:'666666'}}/>
                </IconSocial>
                <TextSocial className='textsocial'>GitHub</TextSocial>
                
            </CardItemContent>

            <CardItemContent href='https://www.linkedin.com/in/jhonatan-deni/' className='btn_social2'>
                <IconSocial>
                    <SiLinkedin style={{color:'0a66c2'}}/>
                </IconSocial>
                <TextSocial  className='textsocial' >LinkedIn</TextSocial>
                
            </CardItemContent>
            <CardItemContent  href='https://www.youtube.com/@jhonatan79500' className='btn_social3'>
                <IconSocial>
                    <SiYoutube style={{color:'ff0000'}}/>
                </IconSocial>
                <TextSocial className='textsocial'>Youtube Channel</TextSocial>
                
            </CardItemContent>
        </Card>
        
    )
}

export default CardGroupContactSocial
                  
