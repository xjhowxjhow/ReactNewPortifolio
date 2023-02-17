import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;

  }
  
  /* radial-gradient(circle, #4f4f4f, #434343, #363636, #282828, #171717); */
    
    .cardcontactdesc{
        background-image: ${({ theme }) => theme.cardcontactdesc};
    }
    .cardcontactinfo{
        background-image: ${({ theme }) => theme.cardcontactinfo};
    }
    .cardcontactsocial{
        background-image: ${({ theme }) => theme.cardcontactsocial};
    }

    .btn_social1{
        background-color: ${({ theme }) => theme.btn_social1};
        
    }
    .btn_social2{
        background-color: ${({ theme }) => theme.btn_social2};
    }
    .btn_social3{
        background-color: ${({ theme }) => theme.btn_social3};
    }

    .textsocial{
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;
    }


    .card {
        
        background: ${({ theme }) => theme.card};
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;
      
    }
    .card:hover {

        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;
        
    }
    .card img {
        /* remove filter  */
        
        
        
    }
    .container {
        
        background-color: ${({ theme }) => theme.container};
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;
    }
    .CardSection {
        background-color: ${({ theme }) => theme.CardSection};
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;
    }
    .CardFooter {
        background-color: ${({ theme }) => theme.CardFooter};
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;
    }
    .CardHeader {
        background-color: ${({ theme }) => theme.CardHeader};
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;
    }
    .Header_bts {
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;
    }


  `