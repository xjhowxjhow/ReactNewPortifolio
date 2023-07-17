
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeInLeft, fadeInUp } from 'react-animations';
import { CardleftSkillsSrcRefatorado } from '../global_texts/textos';
import { BsTerminal, BsGrid1X2 } from 'react-icons/bs'
import { AiOutlineMobile } from 'react-icons/ai'



// Estilização do componente
// aninmacao

const Animation = keyframes`${fadeInLeft}`;
const Animation2 = keyframes`${fadeInUp}`;

const Card = styled.div`
  width: 100%;
  height: 600px;
  background-size: 400% 400%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 10px;

  animation: gradient 15s ease infinite;

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
    

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 700px) {
    width: 97%;
    height: 100%;
    flex-direction: column;
    margin-bottom: 20px;
  }
`;


// LEFT SIDE

const CardContentLeft = styled.div`
    padding-top: 20px;
    width: 50%;
    height:auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    @media (max-width: 700px) {
        width: 100%;
        height: 100%;
        flex-direction: row;
        gap: 0px;
        justify-content: center;
        }

    
    `




const ItemContentLeft = styled.div`
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    z-index: 5;
    gap: 5px;

    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        transform: scale(1.05);
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

const CardContentMiddle = styled.div`
    width: 80%;
    height: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    @media (max-width: 700px) {
        width: 100%;
        height: 100%;

        flex-direction: row;
        margin-bottom: 20px;
        gap: 0px;
        justify-content: flex-start;
        }
        ::-webkit-scrollbar {
            display: none;
        }

    `



const SubItemContentLeft = styled.div`
    width: 60%;
    height: auto;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    margin: 10px;
    cursor: pointer;
    z-index: 5;
    animation: 1s ${props => props.isAnimationCateg ? Animation2 : ''};
    animation-fill-mode: forwards;
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
    text-align: center;

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



function CardGroupSkills() {

    const parse = require('html-react-parser');

    const [state, setState] = useState({
        title: 'asdasdsadas',
        subTitle: '',
        text: '',
        skills: [],
        bkg_img: 'https://img.icons8.com/color/48/000000/developer.png',
        //gif
        back_color: 'linear-gradient(-45deg, #4c4c4c, #262626, #000000, #4b4b4b)'
    });

    const [subItensStateData, setSubItensStateData] = useState({
        title: 'Skills',
        subTitle: ' Aqui voce vai encontrar as skills que eu tenho',
        text: ' Selecione uma das opções ao lado para ver as skills que eu tenho acordo com a categoria selecionada',
        skills: [],
        bkg_img: '',
        back_color: '',
    });

    const [activeButton, setActiveButton] = useState(null);
    const [isAnimation, setIsAnimation] = useState(false);
    const [isAnimationCateg, setIsAnimationCateg] = useState(false);

    const handleClick = (id) => {
        let newState = {};
        setActiveButton(id);


        switch (id) {
            case 'backend':
                newState = {
                    title: CardleftSkillsSrcRefatorado.backend.name_left,
                    subTitle: '',
                    text: '',
                    skills: CardleftSkillsSrcRefatorado.backend.items,
                    bkg_img: '',
                    back_color: CardleftSkillsSrcRefatorado.backend.back_color,
                };
                break;
            case 'frontend':
                newState = {
                    title: CardleftSkillsSrcRefatorado.frontend.name_left,
                    subTitle: '',
                    text: '',
                    skills: CardleftSkillsSrcRefatorado.frontend.items,
                    bkg_img: '',
                    back_color: CardleftSkillsSrcRefatorado.frontend.back_color,
                };
                break;
            case 'mobile':
                newState = {
                    title: CardleftSkillsSrcRefatorado.mobile.name_left,
                    subTitle: '',
                    text: '',
                    skills: CardleftSkillsSrcRefatorado.mobile.items,
                    bkg_img: '',
                    back_color: CardleftSkillsSrcRefatorado.mobile.back_color,
                };
                break;
            default:
                newState = {
                    title: 'Default Text',
                    subTitle: '',
                    text: 'Default Text',
                    skills: [],
                    bkg_img: '',
                    back_color: '',
                };
                break;
        }

        setState(newState);
        setIsAnimationCateg(true);
        setTimeout(() => {
            setIsAnimationCateg(false);
        }
            , 1000);

    };

    const handleClickSubItens = (id) => {
        let newState = {};

        switch (id) {
            case 'Python':
                newState = {
                    title: CardleftSkillsSrcRefatorado.backend.items[0].item,
                    subTitle: '',
                    text: CardleftSkillsSrcRefatorado.backend.items[0].text,
                    skills: CardleftSkillsSrcRefatorado.backend.items[0].skills,
                    bkg_img: '',
                    back_color: CardleftSkillsSrcRefatorado.backend.back_color,
                };
                break;
            case 'Java':
                newState = {
                    title: CardleftSkillsSrcRefatorado.backend.items[1].item,
                    subTitle: '',
                    text: CardleftSkillsSrcRefatorado.backend.items[1].text,
                    skills: CardleftSkillsSrcRefatorado.backend.items[1].skills,
                    bkg_img: '',
                    back_color: CardleftSkillsSrcRefatorado.backend.back_color,
                };
                break;
            case 'PL/SQL':
                newState = {
                    title: CardleftSkillsSrcRefatorado.backend.items[2].item,
                    subTitle: '',
                    text: CardleftSkillsSrcRefatorado.backend.items[2].text,
                    skills: CardleftSkillsSrcRefatorado.backend.items[2].skills,
                    bkg_img: '',
                    back_color: CardleftSkillsSrcRefatorado.backend.back_color,
                };
                break;
            default:
                newState = {
                    title: 'Default Text',
                    subTitle: '',
                    text: 'Default Text',
                    skills: [],
                    bkg_img: '',
                    back_color: '',
                };
                break;
        }

        setSubItensStateData(newState);
        setIsAnimation(true);
        setTimeout(() => {
            setIsAnimation(false);
        }, 1000);
    };




    return (
        <Card style={{ backgroundImage: state.back_color }}>
            <CardContentLeft>
                <ItemContentLeft onClick={() => handleClick('backend')} id="backend" style={{ backgroundColor: activeButton === 'backend' ? 'rgb(155 231 255)' : '' }}>
                    <BsTerminal size={35} color="#666" />
                    <ItemContentLeftText>{CardleftSkillsSrcRefatorado.backend.name_left}</ItemContentLeftText>
                </ItemContentLeft>

                <ItemContentLeft onClick={() => handleClick('frontend')} id="frontend" style={{ backgroundColor: activeButton === 'frontend' ? 'rgb(200, 185, 238)' : '' }}>
                    <BsGrid1X2 size={35} color="#666" />
                    <ItemContentLeftText>{CardleftSkillsSrcRefatorado.frontend.name_left}</ItemContentLeftText>
                </ItemContentLeft>

                <ItemContentLeft onClick={() => handleClick('mobile')} id="mobile" style={{ backgroundColor: activeButton === 'mobile' ? 'rgba(255, 179, 251,1)' : '' }}>
                    <AiOutlineMobile size={35} color="#666" />
                    <ItemContentLeftText>{CardleftSkillsSrcRefatorado.mobile.name_left}</ItemContentLeftText>
                </ItemContentLeft>
            </CardContentLeft>

            <CardContentMiddle>
                {state.skills.map((item, index) => (
                    <SubItemContentLeft
                        key={index}
                        onClick={() => handleClickSubItens(item.item)}
                        id={`back-item${index + 1}`}
                        isAnimationCateg={isAnimationCateg}
                    >
                        <ItemContentLeftImage src={item.icon} />
                        <ItemContentLeftText>{item.item}</ItemContentLeftText>
                    </SubItemContentLeft>
                ))}
            </CardContentMiddle>

            <CardContentRight>
                <CardTitle isAnimation={isAnimation} id="title-carrer">
                    {subItensStateData.title}
                </CardTitle>
                <CardSubTitle isAnimation={isAnimation} id="title-sub">
                    {subItensStateData.subTitle}
                </CardSubTitle>
                <CardText isAnimation={isAnimation} id="title-text-carrer">
                    {parse(subItensStateData.text)}

                </CardText>
                <SkillsEnvolved isAnimation={isAnimation} id="skills">
                    {subItensStateData.skills}
                </SkillsEnvolved>
                <CardImage isAnimation={isAnimation} src={state.bkg_img} />
            </CardContentRight>


        </Card>
    );
}

export default CardGroupSkills;