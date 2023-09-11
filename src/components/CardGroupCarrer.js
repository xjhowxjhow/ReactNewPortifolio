
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeInLeft } from 'react-animations';
import { CardleftCarrerSrc } from '../global_texts/textos';


// Estilização do componente
// aninmacao

const Animation = keyframes`${fadeInLeft}`;

const Card = styled.div`
    width: 100%;
    height: 500px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    transition: all 0.2s ease-in-out;
    
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        
        }
    @media (max-width: 700px) {
        width: 100%;
        height: 100%;
        flex-direction: column;
        margin-bottom: 20px;

        }

    `

// LEFT SIDE

const CardContentLeft = styled.div`

    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    @media (max-width: 700px) {
        width: 100%;
        height: 100%;
        flex-direction: row;
        margin-bottom: 20px;
        gap: 0px;
        justify-content: center;
        }

    
    `

const ItemContentLeft = styled.div`
    width: 80%;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    z-index: 5;
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        transform: scale(1.05);
        }
        &:active {
            background-color: rgba(0, 0, 0, 0.5)
        }
    @media (max-width: 700px) {
        width: 100%;
        height: 100%;
        flex-direction: row;
        margin: 20px;
        padding: 10px;
        gap: 10px;
        }
    

    `

const ItemContentLeftText = styled.p`
    font-size: 18px;
    color: #666;
    text-align: left;
    width: 80%;
    text-align: center;

    @media (max-width: 700px) {
        display:  none;
        }
    `
const ItemContentLeftImage = styled.img`
    width: 50px;
    height: 50px;
    
    background-size:cover;
    background-position: center;
    background-repeat: no-repeat;
    
    
    `








//  RIGHT SIDE

const CardContentRight = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    @media (max-width: 700px) {
        width: 100%;
        height: 700px;
        flex-direction: column;
        margin-bottom: 20px;
        gap: 10px;
        }

    `




const CardTitle = styled.h1`    
    width: 80%;
    font-size: 32px;
    color: rgb(255, 255, 255);
    text-align: left;
    filter: blur(0px);
    animation: 1s ${props => props.isAnimation ? Animation : ''};

        
    
`
const CardSubTitle = styled.h2`
    font-size: 24px;
    color: rgb(255, 255, 255);
    text-align: left;
    width: 80%;
    animation: 1s ${props => props.isAnimation ? Animation : ''};
`

const CardText = styled.p`
    font-size: 18px;
    color: rgb(255, 255, 255);
    text-align: left;
    width: 80%;
    animation: 1s ${props => props.isAnimation ? Animation : ''};
`
const SkillsEnvolved = styled.div`
    color: rgb(255, 255, 255)   ;
    width: 80%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
    animation: 1s ${props => props.isAnimation ? Animation : ''};
`


const CardImage = styled.img`
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 80px;
    height: 80px;
    border-radius: 10px;
    margin-bottom: 20px;
    animation: 1s ${props => props.isAnimation ? Animation : ''};
`



function CardGroudpCarrer({ title, text, image, image_background }) {
    // ESTADO / SETA ESTADO
    const [state, setState] = useState({
        title: CardleftCarrerSrc.empresa3,
        subTitle: CardleftCarrerSrc.cargo3,
        text: CardleftCarrerSrc.texto3,
        skills: CardleftCarrerSrc.habilidades3,
        bkg_img: CardleftCarrerSrc.fotoempresa3,
        back_color: CardleftCarrerSrc.back_color3,
    });

    //ESTADO / SETA ESTADO CURRENT ITEM
    const [activeButton, setActiveButton] = useState(null);

    // ESTADO / SETA ESTADO ANIMACAO
    const [isAnimation, setIsAnimation] = useState(false);

    const parse = require('html-react-parser');

    const handleClick = id => {
        switch (id) {
            case 'btn1carrer':
                setState({
                    title: CardleftCarrerSrc.empresa1,
                    subTitle: CardleftCarrerSrc.cargo1,
                    text: CardleftCarrerSrc.texto1,
                    skills: CardleftCarrerSrc.habilidades1,
                    bkg_img: CardleftCarrerSrc.fotoempresa1,
                    back_color: CardleftCarrerSrc.back_color1,
                });

                //SETA ESTADO TRUE E DEPOIS FALSE
                setActiveButton(id);
                setIsAnimation(true);
                setTimeout(() => {
                    setIsAnimation(false);
                }, 1000);


                break;
            case 'btn2carrer':
                setState({
                    title: CardleftCarrerSrc.empresa2,
                    subTitle: CardleftCarrerSrc.cargo2,
                    text: CardleftCarrerSrc.texto2,
                    skills: CardleftCarrerSrc.habilidades2,
                    bkg_img: CardleftCarrerSrc.fotoempresa2,
                    back_color: CardleftCarrerSrc.back_color2,
                });

                //SETA ESTADO TRUE E DEPOIS FALSE
                setActiveButton(id);
                setIsAnimation(true);
                setTimeout(() => {
                    setIsAnimation(false);
                }, 1000);

                break;
            case 'btn3carrer':
                setState({
                    title: CardleftCarrerSrc.universidade1,
                    subTitle: CardleftCarrerSrc.curso1,
                    text: CardleftCarrerSrc.texto4,
                    skills: CardleftCarrerSrc.habilidades4,
                    bkg_img: CardleftCarrerSrc.fotouniversidade1,
                    back_color: CardleftCarrerSrc.back_color4,
                });

                setActiveButton(id);
                setIsAnimation(true);
                setTimeout(() => {
                    setIsAnimation(false);
                }, 1000);


                break;
            case 'btn4carrer':
                setState({
                    title: CardleftCarrerSrc.empresa3,
                    subTitle: CardleftCarrerSrc.cargo3,
                    text: CardleftCarrerSrc.texto3,
                    skills: CardleftCarrerSrc.habilidades3,
                    bkg_img: CardleftCarrerSrc.fotoempresa3,
                    back_color: CardleftCarrerSrc.back_color3,
                });

                setActiveButton(id);
                setIsAnimation(true);
                setTimeout(() => {
                    setIsAnimation(false);
                }, 1000);
                break;
            default:
                break;
        }
    };

    return (
        <Card style={{ backgroundImage: state.back_color }}>

            <CardContentLeft>

                <ItemContentLeft onClick={() => handleClick('btn4carrer')} id="btn4carrer" style={{ backgroundColor: activeButton === 'btn4carrer' ? 'rgb(155 231 255)' : '' }}>
                    <ItemContentLeftImage src={CardleftCarrerSrc.fotoempresa3} />
                    <ItemContentLeftText>{parse(CardleftCarrerSrc.empresa3)}</ItemContentLeftText>
                </ItemContentLeft>

                <ItemContentLeft onClick={() => handleClick('btn1carrer')} id="btn1carrer" style={{ backgroundColor: activeButton === 'btn1carrer' ? 'rgba(255, 232 , 101,1)' : '' }}>
                    <ItemContentLeftImage src={CardleftCarrerSrc.fotoempresa1} />
                    <ItemContentLeftText>{parse(CardleftCarrerSrc.empresa1)}</ItemContentLeftText>
                </ItemContentLeft>

                <ItemContentLeft onClick={() => handleClick('btn2carrer')} id="btn2carrer" style={{ backgroundColor: activeButton === 'btn2carrer' ? 'rgba(255, 179, 251,1)' : '' }}>
                    <ItemContentLeftImage src={CardleftCarrerSrc.fotoempresa2} />
                    <ItemContentLeftText>{parse(CardleftCarrerSrc.empresa2)}</ItemContentLeftText>
                </ItemContentLeft>

                <ItemContentLeft onClick={() => handleClick('btn3carrer')} id="btn3carrer" style={{ backgroundColor: activeButton === 'btn3carrer' ? 'rgba(104, 255, 241,0.28)' : '' }}>
                    <ItemContentLeftImage src={CardleftCarrerSrc.fotouniversidade1} />
                    <ItemContentLeftText>{parse(CardleftCarrerSrc.universidade1)}</ItemContentLeftText>
                </ItemContentLeft>


            </CardContentLeft>
            {/* transicao */}

            <CardContentRight>
                <CardTitle isAnimation={isAnimation} id="title-carrer">{parse(state.title)}</CardTitle>
                <CardSubTitle isAnimation={isAnimation} id="title-sub">{state.subTitle}</CardSubTitle>
                <CardText isAnimation={isAnimation} id="title-text-carrer">{parse(state.text)}</CardText>
                <SkillsEnvolved isAnimation={isAnimation} id="skills">{state.skills}</SkillsEnvolved>
                <CardImage isAnimation={isAnimation} src={state.bkg_img} />
            </CardContentRight>
        </Card>
    );
}


export default CardGroudpCarrer;