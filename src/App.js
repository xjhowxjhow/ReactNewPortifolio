import React from 'react';
import Container from './components/Container';
import CardComponent from './components/Card';
// import HeaderComponent from './components/Header';
import CardMainComponent from './components/CardMainDetalhes';
import CardGroudpCarrer from './components/CardGroupCarrer';
import CardGroupRepo from './components/CardGroupRepo';
import CardGroupContactSocial from './components/CardGroupContactSocial';
import CardGroupContactInfo from './components/CardGroupContactInfo';
import CardGroupContactDesc from './components/CardGroupContactDesc';
import CardFooter from './components/CardFooter';

import './App.css';


// variaveis src
import { CardRightHomeSrc, CardleftHomeSrc } from './global_texts/textos';




function App() {
  return (
    <div className="App">
      {/* <HeaderComponent/> */}
      <Container>
        <CardComponent title={CardleftHomeSrc.titulo} text={CardleftHomeSrc.texto} image={CardleftHomeSrc.imagem} button1={CardleftHomeSrc.botao} button2={CardleftHomeSrc.botao2}/>
        <CardMainComponent title={CardRightHomeSrc.titulo} text={CardRightHomeSrc.texto} image={CardRightHomeSrc.imagem} image_background={CardRightHomeSrc.image_background}/>
      </Container>
      
      <Container>
        <CardGroudpCarrer title={CardRightHomeSrc.titulo} text={CardRightHomeSrc.texto} image={CardRightHomeSrc.imagem} image_background={CardRightHomeSrc.image_background}/>
      </Container>
      <Container>
        <CardGroupRepo title={CardRightHomeSrc.titulo} text={CardRightHomeSrc.texto} image={CardRightHomeSrc.imagem} image_background={CardRightHomeSrc.image_background}/>
      </Container>

      <Container>
        <CardGroupContactSocial/>
        <CardGroupContactInfo/>
        <CardGroupContactDesc/>
      </Container>
      
      
      <Container>
        <CardFooter/>
      </Container>

    </div>
  );
}

export default App;
