
import React from 'react';
import Container from './components/Container';
import CardComponent from './components/Card';
import HeaderComponent from './components/Header';
import CardMainComponent from './components/CardMainDetalhes';
import CardGroudpCarrer from './components/CardGroupCarrer';
import CardGroupRepo from './components/CardGroupRepo';
import CardGroupContactSocial from './components/CardGroupContactSocial';
import CardGroupContactInfo from './components/CardGroupContactInfo';
import CardGroupContactDesc from './components/CardGroupContactDesc';
import CardFooter from './components/CardFooter';
import CardSection from './components/CardSections';
import './App.css';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes"

// variaveis src
import { CardRightHomeSrc, CardleftHomeSrc } from './global_texts/textos';




function App() {



    const [theme, setTheme] = React.useState('light');

    React.useEffect(() => {
        const localTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(localTheme);
        
    }, []);



    const themeToggler = () => {
        console.log('themeToggler')
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }



    return (

        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            <div className="App">
                {/* <HeaderComponent/> */}
                <Container>
                    <HeaderComponent themeToggler={themeToggler} />
                </Container>


                <Container>
                    <CardComponent title={CardleftHomeSrc.titulo} text={CardleftHomeSrc.texto} image={CardleftHomeSrc.imagem} button1={CardleftHomeSrc.botao} button2={CardleftHomeSrc.botao2} img_back={CardleftHomeSrc.image_background}/>
                    <CardMainComponent title={CardRightHomeSrc.titulo} text={CardRightHomeSrc.texto} image={CardRightHomeSrc.imagem} image_background={CardRightHomeSrc.image_background} />
                </Container>
                <Container>
                    <CardSection textSection="Experiências" />
                </Container>
                <Container>
                    <CardGroudpCarrer title={CardRightHomeSrc.titulo} text={CardRightHomeSrc.texto} image={CardRightHomeSrc.imagem} image_background={CardRightHomeSrc.image_background} />
                </Container>
                <Container>
                    <CardSection textSection="Portifólio" />
                </Container>
                <Container>
                    <CardGroupRepo title={CardRightHomeSrc.titulo} text={CardRightHomeSrc.texto} image={CardRightHomeSrc.imagem} image_background={CardRightHomeSrc.image_background} />
                </Container>

                <Container>
                    <CardSection textSection="Contatos" />
                </Container>

                <Container>
                    <CardGroupContactSocial />
                    <CardGroupContactInfo />
                    <CardGroupContactDesc />
                </Container>


                <Container>
                    <CardFooter />
                </Container>



            </div>
        </ThemeProvider>
    );
}

export default App;
