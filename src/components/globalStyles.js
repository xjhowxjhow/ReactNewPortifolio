import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
    filter: ${({ theme }) => theme.filtergrey};

    
  }
  
  
    
    .card {
        
        background: ${({ theme }) => theme.card};
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;
      
    }
    .card:hover {
        background: ${({ theme }) => theme.body};
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