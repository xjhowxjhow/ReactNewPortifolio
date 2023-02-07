import React from 'react';
import styled from 'styled-components';



const Card = styled.div`
    width: 100%;
    height: 50px;
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




const GridSection = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;`

const CardSectionText = styled.h1`
    font-size: 28px;
    text-align: left;
    font-weight: 100;
    `


function CardSection({textSection}) {
    return (
        <Card>
            <GridSection>
                <CardSectionText>{textSection}</CardSectionText>
            </GridSection>
        </Card>
    )
}

export default CardSection