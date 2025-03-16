import React from 'react';
import styled from 'styled-components';
import {FaExternalLinkAlt} from 'react-icons/fa';
import { SiPython, SiSqlite, SiQt, SiReact, SiExpo, SiJavascript, SiHtml5, SiCss3, SiMicrosoftsqlserver, SiFastapi, SiCsharp } from 'react-icons/si';
import Carousel from 'react-elastic-carousel';
import MyGallery from './Galery';

// Styled Components

const Card = styled.div`
  position: relative;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(122deg,rgb(36, 91, 143),rgb(71, 135, 138));
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: box-shadow 0.2s ease-in-out;
  
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const CardItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 10px 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const CardContentLeft = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const CardContentRight = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  text-transform: uppercase;
`;

const CardParagraph = styled.p`
  margin: 10px 0;
  line-height: 1.5;
  text-align: justify;
  text-justify: inter-word;
`;

const CardList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin: 10px 0;
  text-align: justify;
  text-justify: inter-word;
`;

const CardListItem = styled.li`
  margin-bottom: 5px;
`;

const Technologies = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  
  & > span {
    margin-right: 10px;
    font-size: 24px;
    color: #fff;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  
  & a {
    margin-right: 15px;
    font-size: 28px;
    color: #fff;
    transition: transform 0.2s;
    
    &:hover {
      transform: scale(1.2);
    }
  }
`;

// Componente

function CardGroupCertificacao({ certificacoes }) {
  const parse = require('html-react-parser');
  
  return (
    <Card className='card'>
      <Carousel 
        itemPadding={[0, 0]} 
        enableSwipe={true} 
        enableAutoPlay={false} 
        autoPlaySpeed={10000} 
        transitionMs={1000} 
        verticalMode={false} 
        focusOnSelect={true} 
        disableArrowsOnEnd={true}
      >
        {certificacoes.certificacoes.map((certificacao, index) => (
          <CardItem 
            key={index} 
            style={{ backgroundImage: `url(${certificacao.background || ''})` }}
          >
            <CardContentLeft>
              {certificacao.imgs && <MyGallery images={certificacao.imgs} />}
            </CardContentLeft>
            <CardContentRight>
              <CardTitle>{certificacao.nome}</CardTitle>
              <CardParagraph>{parse(certificacao.descricao)}</CardParagraph>
              <CardParagraph><strong>Emissor:</strong> {certificacao.emissor}</CardParagraph>
              <CardParagraph><strong>Data de Emissão:</strong> {certificacao.data_emissao}</CardParagraph>
              <CardParagraph><strong>Validade:</strong> {certificacao.validade}</CardParagraph>
              <CardParagraph><strong>Nível:</strong> {certificacao.nivel}</CardParagraph>
              <CardParagraph><strong>Modalidade:</strong> {certificacao.modalidade}</CardParagraph>
              <CardParagraph><strong>Requisitos:</strong></CardParagraph>
              <CardList>
                {certificacao.requisitos.map((requisito, reqIndex) => (
                  <CardListItem key={reqIndex}>{requisito}</CardListItem>
                ))}
              </CardList>
              <Technologies>
                {certificacao.tecnologias && certificacao.tecnologias.map((tech, techIndex) => (
                  <span key={techIndex}>
                    {tech === 'Python' && <SiPython />}
                    {tech === 'SQLite' && <SiSqlite />}
                    {tech === 'Qt' && <SiQt />}
                    {tech === 'React' && <SiReact />}
                    {tech === 'Expo' && <SiExpo />}
                    {tech === 'Javascript' && <SiJavascript />}
                    {tech === 'HTML5' && <SiHtml5 />}
                    {tech === 'CSS3' && <SiCss3 />}
                    {tech === 'Microsoft SQL Server' && <SiMicrosoftsqlserver />}
                    {tech === 'FastAPI' && <SiFastapi />}
                    {tech === 'C#' && <SiCsharp />}
                  </span>
                ))}
              </Technologies>
              <Links>
                {certificacao.link_certificacao && (
                  <a href={certificacao.link_certificacao} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt  />
                  </a>
                )}
              </Links>
            </CardContentRight>
          </CardItem>
        ))}
      </Carousel>
    </Card>
  );
}

export default CardGroupCertificacao;
