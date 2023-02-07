import React from 'react';
import styled from 'styled-components';
import {MdOutlineMail} from "react-icons/md";
import {FaTelegram} from "react-icons/fa";
import {BsWhatsapp} from "react-icons/bs";
import {BiChevronRight} from "react-icons/bi";


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
  width: 70%;
  height: 80px;
  gap: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  z-index: 5;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid #fff;
    animation: line-animation 3.0s ease-out;
  }
 

  @keyframes line-animation {
    from {
      border-bottom-width: 2px;
      
    }
    to {
      border-bottom-width: 2px;
      
      /* stop */
    
    }
  }
`

const IconContact = styled.div`

margin-left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    `

const TextItem = styled.h1`
    font-size: 20px;
    font-weight: 400;
    color: #fff;
    `



function CardGroupContactInfo() {

    return (
        <Card style={{backgroundImage:'linear-gradient(108deg, #5039a3, #c51422)'}}>
            <CardTtitle>Contato</CardTtitle>


            
            <CardItemContent>
                <IconContact>
                    <FaTelegram style={{color:'fff'}}/>
                </IconContact>
                <TextItem>@jhonatandeni</TextItem>
                <IconContact>
                    <BiChevronRight style={{color:'fff'}}/>
                </IconContact>
            </CardItemContent>

            <CardItemContent href='https://wa.me/5511995190899'>
                <IconContact>
                    <BsWhatsapp style={{color:'fff'}}/>
                </IconContact>
                <TextItem style={{fontSize:'16px'}}>+55 11 995190899</TextItem>
                <IconContact>
                    <BiChevronRight style={{color:'fff'}}/>
                </IconContact>
            </CardItemContent>

            <CardItemContent href='mailto:jhonatan.deni@outlçook.com'>
                <IconContact>
                    <MdOutlineMail style={{color:'fff'}}/>
                </IconContact>
                <TextItem style={{fontSize:'14px'}}>jhonatan.deni@outlook.com</TextItem>
                <IconContact>
                    <BiChevronRight style={{color:'fff'}}/>
                </IconContact>
            </CardItemContent>
        </Card>
        
    )
}



export default CardGroupContactInfo
                  
