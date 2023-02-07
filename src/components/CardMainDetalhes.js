import React from 'react';
import styled from 'styled-components';



const Card = styled.div`
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    
    width: 70%;
    height: 500px;
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



const CardTitle = styled.h1`    
    width: 80%;
    font-size: 32px;
    color: #fff;
    text-align: left;
    
    

        
    &:hover {
        color: #f00;
    }
`

const CardText = styled.p`
    font-size: 20px;
    color:#fff;
    text-align: left;
    width: 80%;
    
`

const CardImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 20px;
`

function CardMainComponent({title, text, image,image_background}) {
    return (
        <Card src={image_background}>
            <CardTitle>{title}</CardTitle>
            <CardText>{text}</CardText>
            <CardImage src={image}/>
        </Card>
    );
}


export default CardMainComponent;