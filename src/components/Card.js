
import React from 'react';
import styled from 'styled-components';


const Card = styled.div`

    width: 30%;
    height: 500px;
    background-color: #fff;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    transition: all 0.2s ease-in-out;
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
    
    @media (max-width: 700px) {
        width: 100%;
        height: 100%;
        margin-bottom: 20px;

      }
        
`

const CardTitle = styled.h1`
    font-size: 24px;

    
`

const CardText = styled.p`
    font-size: 16px;
    color: #666;
`

const CardImage = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 50%;
    margin-bottom: 20px;
`


const GroupButton = styled.div`
    display: flex;
    gap: 10px;
    justify-content: left;
    width: 100%;
    padding:  20px;
    margin-left: 20px;


`   


const CardButton = styled.button`
    width: 80px;
    height: 40px;
    background-color: #f00;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-family: 'Josefin Sans', sans-serif;
    &:hover {
        background-color: #333;
    }
    
`


function CardComponent({title, text, image,button1, button2,img_back} ) {
    return (
        <Card className='card' src={img_back}>
            <CardTitle>{title}</CardTitle>
            <CardImage src={image} />
            <CardText>{}</CardText>
            <GroupButton>
                <CardButton>{button1}</CardButton>
                <CardButton>{button2}</CardButton>
            </GroupButton>
        </Card>
    )
}
   


export default CardComponent;