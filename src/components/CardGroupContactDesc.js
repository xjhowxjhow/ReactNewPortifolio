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

const CardItemContent = styled.div`
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


const Text = styled.h1`
    color: #fff;
    width: 80%;
    font-size: 18px;
    font-weight: 100;
    `







function CardGroupContactDesc() {
    return (
        <Card style={{backgroundImage:'linear-gradient(69deg, #601485, #3d2962)'}}>
            <CardTtitle>Info</CardTtitle>
            <Text>
            Este é o meu portfólio pessoal, onde compartilho meus projetos e ideias. Todos os trabalhos apresentados são de minha autoria.
            Este portfólio é uma jornada de auto-descoberta e auto-evolução, onde compartilho minha evolução e crescimento profissional com o mundo.
            Acredito que o compartilhamento é o melhor caminho para o crescimento e aprimoramento, então, espero que você se divirta explorando meu trabalho e que possa ser inspirado a criar algo incrível também.
            </Text>
        </Card>
        
    )
}

export default CardGroupContactDesc
                  
