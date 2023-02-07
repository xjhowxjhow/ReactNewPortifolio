
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeInLeft } from 'react-animations';
import {imagesrepo1,imagesrepo2,imagesrepo3,imagesrepo4,imagesrepo5,imagesrepo6, TextsRepo1,TextsRepo2,TextsRepo3,TextsRepo4,TextsRepo5,TextsRepo6} from '../global_texts/textos';
import { FaGithub,FaPython, FaNodeJs} from "react-icons/fa";
import {SiFacebooklive,SiJavascript,SiHtml5,SiCss3,SiSqlite,SiQt,SiMicrosoftsqlserver,SiFastapi,SiCsharp} from "react-icons/si";
import Carousel from 'react-elastic-carousel';
import MyGallery from './Galery';
// Estilização do componente
// aninmacao

const Animation = keyframes`${fadeInLeft}`;

const Card = styled.div`
    
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0px 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
    flex-grow: 1;
    
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        
        }`









// Cart item 

const CardItem = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    margin: 10px;
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin-top:40px;

    `







// LEFT SIDE

const CardContentLeft = styled.div`

    width: 70%;
    height: 600px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
    flex-wrap: wrap;
    `







//  RIGHT SIDE

const CardContentRight = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `




const CardTitle = styled.h1`    
    width: 80%;
    font-size: 32px;
    color: rgb(255, 255, 255);
    text-align: left;
    filter: blur(0px);
    animation: 1s ${props => props.isAnimation ? Animation : ''};

        
    
`
const CardSubDescription = styled.h1`
    font-size: 18px;
    color: rgb(255, 255, 255);
    text-align: left;
    width: 80%;
    font-weight: 100;
    animation: 1s ${props => props.isAnimation ? Animation : ''};
`

const CardSubObjectives = styled.h1`
    font-size: 18px;
    color: rgb(255, 255, 255);
    text-align: left;
    width: 80%;
    font-weight: 100;
    animation: 1s ${props => props.isAnimation ? Animation : ''};
`

const CardSubUltilization = styled.h1`
    font-size: 18px;
    color: rgb(255, 255, 255);
    text-align: left;
    font-weight: 100;
    width: 80%;
    animation: 1s ${props => props.isAnimation ? Animation : ''};
`

const CardSubFunctions = styled.h1`
    margin-left: 5px;
    font-size: 16px;
    color: rgb(255, 255, 255);
    text-align: left;
    font-weight: 100;
    width: 80%;
    animation: 1s ${props => props.isAnimation ? Animation : ''};
`





const CardSubTechnologies = styled.h1`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    color: rgb(255, 255, 255);
    gap: 5px;

    `



const CardLinkLayout = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    `



const CardButtonLink = styled.a`
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    background-image: url(${props => props.image});
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #666;
    color: #666;

    /* icon */
    font-size: 40px;

    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin-top: 20px;
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        transform: scale(1.05);
        }
    `




// const CardButtonMaterualIcon = styled.img`
//     width: 50px;
//     height: 50px;




function CardGroupRepo({ title, text, image, image_background }) {
    
    // Textos
    const textsrepo1 = TextsRepo1;
    const textsrepo2 = TextsRepo2;
    const textsrepo3 = TextsRepo3;
    const textsrepo4 = TextsRepo4;
    const textsrepo5 = TextsRepo5;
    const textsrepo6 = TextsRepo6;

    const imgrepo1 = imagesrepo1;
    const imgrepo2 = imagesrepo2;
    const imgrepo3 = imagesrepo3;
    const imgrepo4 = imagesrepo4;
    const imgrepo5 = imagesrepo5;
    const imgrepo6 = imagesrepo6;

    return (
        
    <Card style={{backgroundImage: `url(${image_background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>

        <Carousel itemPadding = {[0, 0]} enableSwipe = {true} enableAutoPlay = {false} autoPlaySpeed = {10000} transitionMs = {1000} verticalMode={false} focusOnSelect={true} disableArrowsOnEnd={true} >

            <CardItem style={{backgroundImage: textsrepo1.background}}>
                <CardContentLeft>
                    <MyGallery images={imgrepo1} />
                </CardContentLeft>
                <CardContentRight>
                    <CardTitle>{textsrepo1.titulo}</CardTitle>
                    <CardSubDescription>{textsrepo1.texto1}</CardSubDescription>
                    <CardSubObjectives>{textsrepo1.texto2}</CardSubObjectives>
                    <CardSubUltilization>{textsrepo1.texto3}</CardSubUltilization>
                    <CardSubTechnologies>
                        <FaPython/>
                        <SiSqlite/>
                        <SiQt/>
                    </CardSubTechnologies>
                    <CardLinkLayout>
                        <CardButtonLink href= {textsrepo1.link} target="_blank" image={textsrepo1.image_link}>
                            <FaGithub/>
                        </CardButtonLink>
                    </CardLinkLayout>
                </CardContentRight>
            </CardItem>

            <CardItem style={{backgroundImage: textsrepo2.background}}>
                <CardContentLeft>
                    <MyGallery images={imgrepo2} />
                </CardContentLeft>
                <CardContentRight>
                    <CardTitle>{textsrepo2.titulo}</CardTitle>
                    <CardSubDescription>{textsrepo2.texto1}</CardSubDescription>
                    <CardSubObjectives>{textsrepo2.texto2}</CardSubObjectives>
                    <CardSubUltilization>{textsrepo2.texto3}</CardSubUltilization>
                    <CardSubTechnologies>
                        <FaPython/>
                        <SiQt/>
                    </CardSubTechnologies>
                    <CardLinkLayout>
                        <CardButtonLink href= {textsrepo2.link} target="_blank" image={textsrepo2.image_link}>
                            <FaGithub/>
                        </CardButtonLink>
                    </CardLinkLayout>
                </CardContentRight>
            </CardItem>


            <CardItem style={{backgroundImage: textsrepo3.background}}>
                <CardContentLeft>
                    <MyGallery images={imgrepo3} />
                </CardContentLeft>
                <CardContentRight>
                    <CardTitle style={{color:'black'}}>{textsrepo3.titulo}</CardTitle>
                    <CardSubDescription style={{color:'black',fontWeight:'400'}}>{textsrepo3.texto1}</CardSubDescription>
                    <CardSubObjectives style={{color:'black',fontWeight:'400'}}>{textsrepo3.texto2}</CardSubObjectives>
                    <CardSubUltilization style={{color:'black',fontWeight:'400'}}>{textsrepo3.texto3}</CardSubUltilization>
                    <CardSubTechnologies style={{color:'black'}}>
                        <FaPython/>
                        <SiSqlite/>
                        <SiQt/>
                    </CardSubTechnologies>
                    <CardLinkLayout>
                        <CardButtonLink href= {textsrepo3.link} target="_blank" image={textsrepo3.image_link}>
                            <FaGithub/>
                        </CardButtonLink>
                    </CardLinkLayout>
                </CardContentRight>
            </CardItem>


            <CardItem style={{backgroundImage: textsrepo4.background}}>
                <CardContentLeft>
                    <MyGallery images={imgrepo4} />
                </CardContentLeft>

                <CardContentRight>
                    <CardTitle>{textsrepo4.titulo}</CardTitle>
                    <CardSubDescription >{textsrepo4.texto1}</CardSubDescription>
                    <CardSubObjectives >{textsrepo4.texto2}</CardSubObjectives>
                    <CardSubUltilization >{textsrepo4.texto3}</CardSubUltilization>
                    <CardSubTechnologies >
                        
                        <SiHtml5/>
                        <SiCss3/>
                        <SiJavascript/>

                    </CardSubTechnologies>
                    <CardLinkLayout style={{gap:'5px'}}>
                        <CardButtonLink href= {textsrepo4.link_live} target="_blank">
                            <SiFacebooklive style={{color:'b58484'}}/>
                        </CardButtonLink>
                        <CardButtonLink href= {textsrepo4.link} target="_blank">
                            <FaGithub/>
                        </CardButtonLink>
                    </CardLinkLayout>
                </CardContentRight>
            </CardItem>



            <CardItem style={{backgroundImage: textsrepo5.background}}>
                <CardContentLeft>
                    <MyGallery images={imgrepo5} />
                </CardContentLeft>
                {/* ocultta ao sair ovberflor */}
                <CardContentRight style={{overflowY:'scroll', height:'500px',justifyContent:'flex-start'}}>
                    <CardTitle style={{color:'black'}}>{textsrepo5.titulo}</CardTitle>
                    <CardSubDescription style={{color:'black',fontWeight:'400'}}>{textsrepo5.texto1}</CardSubDescription>
                    <CardSubObjectives style={{color:'black',fontWeight:'400'}}>{textsrepo5.texto2}</CardSubObjectives>
                    <CardSubUltilization style={{color:'black',fontWeight:'400'}}>{textsrepo5.texto3}</CardSubUltilization>
                    <CardSubFunctions style={{color:'black',fontWeight:'400'}}>{textsrepo5.texto4}</CardSubFunctions>
                    <CardSubFunctions style={{color:'black',fontWeight:'400'}}>{textsrepo5.texto5}</CardSubFunctions>
                    <CardSubFunctions style={{color:'black',fontWeight:'400'}}>{textsrepo5.texto6}</CardSubFunctions>
                    <CardSubFunctions style={{color:'black',fontWeight:'400'}}>{textsrepo5.texto7}</CardSubFunctions>
                    <CardSubFunctions style={{color:'black',fontWeight:'400'}}>{textsrepo5.texto8}</CardSubFunctions>
                    <CardSubFunctions style={{color:'black',fontWeight:'700'}}>{textsrepo5.texto9}</CardSubFunctions>



                    <CardSubTechnologies style={{color:'black'}}>
                        <SiHtml5/>
                        <SiCss3/>
                        <SiJavascript/>
                        <FaNodeJs/>
                        <SiSqlite/>

                    </CardSubTechnologies>

                </CardContentRight>
            </CardItem>


            <CardItem style={{backgroundImage: textsrepo6.background}}>
                <CardContentLeft>
                    <MyGallery images={imgrepo6} />
                </CardContentLeft>

                <CardContentRight>
                    <CardTitle>{textsrepo6.titulo}</CardTitle>
                    <CardSubDescription >{textsrepo6.texto1}</CardSubDescription>
                    <CardSubTechnologies >
                        <SiMicrosoftsqlserver/>
                        <SiFastapi />
                        <SiCsharp />

                    </CardSubTechnologies>
                    <CardLinkLayout style={{gap:'5px'}}>

                        <CardButtonLink href= {textsrepo6.link} target="_blank">
                            <FaGithub/>
                        </CardButtonLink>

                    </CardLinkLayout>
                </CardContentRight>
            </CardItem>

        </Carousel>


    </Card>
    );
}
    

export default CardGroupRepo;