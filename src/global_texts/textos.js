// arquivo para armazenar textos e imagens que serão usados em vários lugares do site

export const CardleftHomeSrc = {
    titulo: 'Olá, Sou o Jhonatan',
    texto: 'This is the first card',
    imagem: 'https://avatars.githubusercontent.com/u/58306583?v=4',
    botao: 'Github',
    botao2: 'Linkedin',
    image_background: '/repovideo/city.gif',
}

// 

export const CardRightHomeSrc = {
    titulo: 'Sobre mim',
    texto: 'Um apaixonado por tecnologia e desenvolvimento de software.<br><br> Possuo ampla experiência na construção de soluções incríveis e funcionais tanto para a web quanto para desktops.<br><br> Como um profissional dedicado, estou sempre em busca de aprimorar minhas habilidades e oferecer soluções criativas e inovadoras aos meus clientes. Além disso, gosto de trabalhar em equipe e colaborar com outros profissionais para alcançarmos juntos o sucesso de cada projeto. <br><br>Seja bem-vindo ao meu portfólio!',
    imagem: '/repovideo/coffe-gif.gif',
    // random images from https://picsum.photos/
    image_background: '/repovideo/foot.gif',
}

// exemplo para acessar o texto do título: Cardapresentacao.titulo



export const CardleftCarrerSrc = {
    empresa1: 'Parla! / Abai Group',
    cargo1: 'Suporte Tecnico',
    texto1: 'Analista de atendimento de Suporte técnico via Chat. /Suporte ao cliente /Omnichannel (Chat, Sms, E-Mail, Ura)',
    fotoempresa1: 'https://www.abaigroup.com/wp-content/uploads/2022/11/abai-logo-x2.jpg',
    habilidades1: '',
    back_color1: 'linear-gradient(to right, #00254b, #552d63, #9a305b, #c24f3a, #c28500)',

    empresa2: 'Teleperformance',
    cargo2: 'Backoffice Suporte ao Cliente II',
    texto2: 'Suporte ao cliente de programas de desenvolvimento:<br><br> • Microsoft Visual Studio<br> • Azure<br> • Active Directory<br> • Suporte a licenças por volume para empresas e instituições.',
    fotoempresa2: 'https://connekt-file.s3.amazonaws.com/gestor/logo/e0867bb0-cb2c-11e9-84bc-0933e15efe3b7193b95f-31ec-4b2e-8125-76438f547329.png',
    habilidades2: '',
    back_color2: 'radial-gradient(circle, #6f3768, #7a386a, #85396b, #903a6b, #9b3b6b)',

    empresa3: 'Nexo CS EHS Software',
    cargo3: 'Analista de Programação Trainee',
    texto3: '• Data integration e Export Data | Pentaho Data Integration/ PySpark/ Hadoop <br>• Implementação de fluxos de dados automatizados | ETL/ ELT/ WBS SOAP/ REST <br>• Desenvolvimento de RESTful APIs | FastAPi | Flask <br>• Configuração de pipelines de CI/CD <br>• POO | Python| PyQT UI Data <br>• PL/SQL/ Developer (Procedural Language/Structured Query Language)',
    habilidades3: ' GitLab · Java · JavaScript · Pentaho · Hoop · PL/SQL · Python · API REST · SOAP · Serviços Web RESTful · Git',
    fotoempresa3: 'https://s3.amazonaws.com/gupy5/production/companies/1924/career/2918/images/2021-03-04_16-23_logo.png',
    back_color3: 'radial-gradient(circle, #467e9f, #3e7092, #376285, #305578, #29486b)',

    universidade1: 'Universidade Estacio de Sá',
    curso1: 'Análise e Desenvolvimento de Sistemas',
    texto4: 'Atualmente estou cursando o 4º período do curso de Análise e Desenvolvimento de Sistemas na Universidade Estácio de Sá.<br><br> O curso tem como objetivo formar profissionais capacitados para atuar na área de desenvolvimento de sistemas, com conhecimentos em programação, análise e modelagem de sistemas, banco de dados, engenharia de software, entre outros.<br> O curso é dividido em 5 semestres, sendo 2 semestres de disciplinas teóricas e 3 semestres de disciplinas práticas.',
    habilidades4: '',
    fotouniversidade1: 'https://logodownload.org/wp-content/uploads/2014/12/estacio-logo-1.png',
    back_color4: 'linear-gradient(to right, #5d9fa9, #6ca7ad, #7bafb1, #8ab6b6, #98bebb)',
}




// Skills


export const CardleftSkillsSrcRefatorado = {

    // 1 backen d
    backend: {
        name_left: 'Back-End',
        icon_left: 'https://img.icons8.com/color/48/000000/python--v1.png',
        back_color: 'linear-gradient(-45deg, #4c4c4c, #262626, #000000, #4b4b4b)',
        // back items
        items: [
            {
                item: 'Python',
                icon: 'https://img.icons8.com/color/48/000000/python--v1.png',
                // right
                text: 'Componente Em Desenvolvimento ;).',
                skills: '..',
                color: 'linear-gradient(-45deg, #4c4c4c, #262626, #000000, #4b4b4b)',
            },
            {
                item: 'PL/SQL',
                icon: 'https://img.icons8.com/color/48/000000/sql.png',
                // right
                text: 'Componente Em Desenvolvimento ;).',
                skills: '..',
                color: 'radial-gradient(circle, #467e9f, #3e7092, #376285, #305578, #29486b)',
            },
            {
                item: 'Node.js',
                icon: 'https://img.icons8.com/color/48/000000/nodejs.png',
                // right
                text: 'Componente Em Desenvolvimento ;).',
                skills: '',
                color: 'radial-gradient(circle, #467e9f, #3e7092, #376285, #305578, #29486b)',
            },
        ],
    },

    // 2 front end
    frontend: {
        name_left: 'Front-End',
        icon_left: 'https://img.icons8.com/color/48/000000/javascript--v1.png',
        back_color: 'linear-gradient(to right,#7969f9,#ded3e9)',
        // front items
        items: [
            {
                item: 'JavaScript',
                icon: 'https://img.icons8.com/color/48/000000/javascript--v1.png',
                // right
                text: 'Componente Em Desenvolvimento ;)',
                skills: '',
                color: 'radial-gradient(circle, #467e9f, #3e7092, #376285, #305578, #29486b)',
            },
            {
                item: 'React',
                icon: 'https://img.icons8.com/color/48/000000/react-native.png',
                // right
                text: 'Componente Em Desenvolvimento ;)',
                skills: '',
                color: 'radial-gradient(circle, #467e9f, #3e7092, #376285, #305578, #29486b)',
            },
            {
                item: 'Qt Design',
                icon: 'https://img.icons8.com/48/2cb74e/qt',
                // right
                text: 'Componente Em Desenvolvimento ;)',
                skills: '',
                color: 'radial-gradient(circle, #467e9f, #3e7092, #376285, #305578, #29486b)',
            }
            
            
        ],
    },
    // 3 mobile
    mobile: {
        name_left: 'Mobile',
        icon_left: 'https://img.icons8.com/color/48/000000/react-native.png',
        back_color:'linear-gradient(221deg,#274cdb,#891fa4,#469495)',
        // mobile items
        items: [
            {
                item: 'React Native',
                icon: 'https://img.icons8.com/color/48/000000/react-native.png',
                // right
                text: 'Componente Em Desenvolvimento ;)',

                skills: '..',
                color: 'radial-gradient(circle, #467e9f, #3e7092, #376285, #305578, #29486b)',
            },
            {
                item:'Expo',
                icon:'https://img.icons8.com/color/48/000000/expo.png',
                // right
                text: 'Componente Em Desenvolvimento ;)',
                skills: '',
                color: 'radial-gradient(circle, #467e9f, #3e7092, #376285, #305578, #29486b)',
            }
        ],
    },

}



// Portifolio


export const imagesrepo1 = [
    {
        original: '/repoimages/repo1/1.png',
        thumbnail: '/repoimages/repo1/1.png',
    },
    {
        original: '/repoimages/repo1/2.png',
        thumbnail: '/repoimages/repo1/2.png',
    },
    {
        original: '/repoimages/repo1/3.png',
        thumbnail: '/repoimages/repo1/3.png',
    },
    {
        original: '/repoimages/repo1/4.png',
        thumbnail: '/repoimages/repo1/4.png',
    },
    {
        original: '/repoimages/repo1/5.png',
        thumbnail: '/repoimages/repo1/5.png',
    },
    {
        original: '/repoimages/repo1/6.png',
        thumbnail: '/repoimages/repo1/6.png',
    },
    {
        original: '/repoimages/repo1/7.png',
        thumbnail: '/repoimages/repo1/7.png',
    },

];
export const TextsRepo1 = {
    titulo: 'Home Application',
    texto1: 'Este é um projeto de software desktop para gerenciamento financeiro pessoal, que combina a interface gráfica com a poderosa Framework PySide2 e o banco de dados SQLite. O objetivo inicial deste projeto é fornecer uma plataforma de estudo universitário, para adquirir conhecimento e desenvolver habilidades na área de desenvolvimento de software.',
    texto2: 'O programa foi projetado para ser fácil e intuitivo, com uma interface gráfica simples e direta, para garantir que os usuários possam controlar suas finanças de maneira eficiente. Além disso, o banco de dados SQLite é armazenado localmente, garantindo a segurança das informações financeiras do usuário.',
    texto3: 'Com esta ferramenta, os usuários terão uma visão ampla de suas finanças, organização e gerenciamento, permitindo-lhes tomar decisões informadas e controlar seu dinheiro de maneira eficiente.',
    teconologias: 'Python, PySide2, SQLite',
    link: 'https://github.com/xjhowxjhow/HomeAplication1.0',
    background: 'radial-gradient(circle, #964ea5, #863d9d, #752c95, #631a8d, #4f0386)',
    link_yt: 'https://youtu.be/8hCQ1AKJnbc',
    libk_site: 'https://homeapplication.netlify.app/'

}

export const imagesrepo2 = [
    {
        original: '/repoimages/repo2/1.png',
        thumbnail: '/repoimages/repo2/1.png',
    },
    {
        original: '/repoimages/repo2/2.png',
        thumbnail: '/repoimages/repo2/2.png',
    },
    {
        original: '/repoimages/repo2/3.png',
        thumbnail: '/repoimages/repo2/3.png',
    },
];


export const TextsRepo2 = {
    titulo: 'Interface Gráfica Intel',
    texto1: 'Este é um projeto inspirado no software de Centro de Controle de Gráficos da Intel, com o objetivo de recriar a interface do zero utilizando a Framework PySide2. Além disso, o projeto inclui algumas funções básicas para alteração de resolução em monitores. É um dos primeiros layouts criados na plataforma PySide2.',
    texto2: ' O projeto se concentra em fornecer uma interface fácil de usar e intuitiva para ajustar as configurações de gráficos em dispositivos.',
    teconologias: 'Python, PySide2',
    link: 'https://github.com/xjhowxjhow/interface_intel',
    background: 'radial-gradient(circle, #0c1424, #101c2f, #13253a, #162e46, #183752)'
}




export const imagesrepo3 = [
    {
        original: '/repoimages/repo3/1.png',
        thumbnail: '/repoimages/repo3/1.png',
    },
    {
        original: '/repoimages/repo3/2.png',
        thumbnail: '/repoimages/repo3/2.png',
    },
    {
        original: '/repoimages/repo3/3.png',
        thumbnail: '/repoimages/repo3/3.png',
    },
    {
        original: '/repoimages/repo3/4.png',
        thumbnail: '/repoimages/repo3/4.png',
    }
];




export const TextsRepo3 = {
    titulo: 'YTMusic Online Pyside',
    texto1: 'O projeto consiste em um software de buscas e execução de músicas online, que extrai informações do YouTube. Para desenvolvimento deste software, foram utilizadas as bibliotecas yt_dlp e youtubesearchpython, com o objetivo de aprender sobre manipulação de Threads na framework Pyside2.',
    texto2: ' Ele permite armazenar temporariamente as músicas em formato .mp3 localmente, e após a sua execução, são excluidas. As bibliotecas yt_dlp e youtubesearchpython são responsáveis por buscar, extrair e armazenar todas as informações de músicas e imagens extraídas do YouTube.',
    texto3: 'yt_dlp é uma biblioteca Python que permite a extração de informações e conteúdo de mídia do YouTube. Com ela, é possível baixar vídeos, músicas e outros tipos de conteúdo em diferentes formatos, além de obter informações sobre o conteúdo, como títulos, descrições e miniaturas.',
    texto4: 'youtubesearchpython é uma biblioteca Python que permite realizar buscas em vídeos do YouTube. Ela fornece uma API para acesso ao sistema de busca do YouTube, permitindo realizar buscas por termos específicos e obter informações sobre os resultados.',
    teconologias: 'Python, PySide2, yt_dlp, youtubesearchpython',
    link: 'https://github.com/xjhowxjhow/YT-Music-Online---Pyside',
    background: 'radial-gradient(circle, #d3d1d3, #dedcde, #e8e8e9, #f4f3f4, #ffffff)'
}


export const imagesrepo4 = [
    {
        original: '/repoimages/repo4/1.png',
        thumbnail: '/repoimages/repo4/1.png',
    },
    {
        original: '/repoimages/repo4/2.png',
        thumbnail: '/repoimages/repo4/2.png',
    },
    {
        original: '/repoimages/repo4/3.png',
        thumbnail: '/repoimages/repo4/3.png',
    },
    {
        original: '/repoimages/repo4/4.png',
        thumbnail: '/repoimages/repo4/4.png',
    }
];

export const TextsRepo4 = {
    titulo: 'FaceBook Dark Mode',
    texto1: 'Neste projeto, meu objetivo foi recriar o layout do feed principal do Facebook, incluindo as postagens, usando apenas CSS e HTML puro. Este treinamento foi uma oportunidade para melhorar minhas habilidades em CSS e HTML.',
    texto2: 'Além do feed principal, também criei os menus de opções à esquerda e à direita, incluindo a lista de amigos online, opções de navegação do próprio Facebook, Reels, tudo de forma responsiva. O resultado final é uma réplica funcional e visualmente semelhante ao layout original do Facebook.',
    texto3: 'Voce pode conferir o Live Preview do projeto clicando no botão abaixo.',
    teconologias: 'HTML, CSS',
    link: 'https://github.com/xjhowxjhow/FaceBook--DarkMode--Layout',
    link_live: 'https://xjhowxjhow.github.io/FaceBook--DarkMode--Layout/',
    background: 'radial-gradient(circle, #0c1424, #101c2f, #13253a, #162e46, #183752)',
}

export const imagesrepo5 = [
    {
        original: '/repoimages/repo5/1.png',
        thumbnail: '/repoimages/repo5/1.png',
    },
    {
        original: '/repoimages/repo5/2.png',
        thumbnail: '/repoimages/repo5/2.png',
    },
    {
        original: '/repoimages/repo5/3.png',
        thumbnail: '/repoimages/repo5/3.png',
    },
    {
        original: '/repoimages/repo5/4.png',
        thumbnail: '/repoimages/repo5/4.png',
    },
    {
        original: '/repoimages/repo5/5.png',
        thumbnail: '/repoimages/repo5/5.png',
    },
    {
        original: '/repoimages/repo5/6.png',
        thumbnail: '/repoimages/repo5/6.png',
    },
    {
        original: '/repoimages/repo5/7.png',
        thumbnail: '/repoimages/repo5/7.png',
    },
    {
        original: '/repoimages/repo5/8.png',
        thumbnail: '/repoimages/repo5/8.png',
    }
];


export const TextsRepo5 = {
    titulo: 'Sistema De Painel de Senhas',
    texto1: 'Este projeto é uma solução de direcionamento de senhas desenvolvida em Node.js utilizando juntamente com Express, HandleBars e Socket.io. Ele foi criado para ajudar pequenas clínicas ou comércios a organizarem o atendimento ao cliente, permitindo gerenciar filas de espera com senhas em tempo real.',
    texto2: 'Ele possui dois pavimentos: a Recepção, onde o cliente é encaminhado para ser atendido, e as Salas de Atendimento, onde o cliente é direcionado para finalizar o atendimento ou ser redirecionado para outra sala.',
    texto3: 'As principais funcionalidades incluem:',
    texto4: '• Rede local: O software pode ser iniciado e acessado na rede local, permitindo que máquinas conectadas ao servidor principal possam acessá-lo através de um navegador ou dispositivo móvel.',
    texto5: '• Atendimento múltiplo: É possível cadastrar vários guichês/salas para atender vários clientes ao mesmo tempo, mantendo a ordem de chegada das senhas.',
    texto6: '• Guichês/salas personalizáveis: É possível personalizar o nome e função dos guichês e salas.',
    texto7: '• Cronologia de senhas: O sistema mantém a ordem de chegada das senhas, garantindo um fluxo correto.',
    texto8: '• Exibição de senhas: É possível exibir a senha por número ou nome do cliente, conforme a preferência do atendente.',
    texto9: '• Obs: Projeto nao disponivel no GitHub, pois sera utilizado em um projeto real.',
    teconologias: 'Node.js, Express, HandleBars, Socket.io',
    link: '',
    background: 'radial-gradient(circle, #d3d1d3, #dedcde, #e8e8e9, #f4f3f4, #ffffff)'
}


export const imagesrepo6 = [
    {
        original: '/repoimages/repo6/1.png',
        thumbnail: '/repoimages/repo6/1.png',
    },
    {
        original: '/repoimages/repo6/2.png',
        thumbnail: '/repoimages/repo6/2.png',
    }
];

export const TextsRepo6 = {
    titulo: 'CRUD C# SQLServer Api IBGE',
    texto1: 'Este é um projeto básico de CRUD em C# usando o Windows Forms, com integração da API IBGE. O foco deste projeto não foi a interface gráfica, mas sim o treinamento da linguagem C#, incluindo a manipulação dinâmica de widgets e o consumo de uma API REST. A aplicação adiciona objetos dinamicamente a partir das tabelas do banco de dados conectado ao Sql Server.',
    link: 'https://github.com/xjhowxjhow/CRUD-C-with-SQLServer-API-IBGE',
    background: 'linear-gradient(to right, #b0e0e6, #79bed6, #4a9ac9, #3375b7, #3e4c9c)',
    teconologias: 'C#, SQL Server, API IBGE'
}





export const TextsRepo7 = {
    titulo: 'ReactNativeExpo-Bank6C',
    texto1: 'meu primeiro projeto para Android e iOS, desenvolvido utilizando React Native e Expo. Trata-se de uma "réplica" do aplicativo C6 Bank, que considero um dos aplicativos bancários mais bem projetados. Neste projeto, explorei diversas características importantes. Uma delas é a autenticação biométrica, que permite aos usuários acessarem sua "conta" utilizando a impressão digital. Além disso, implementei a funcionalidade de "Drag and Drop", que permite ao usuário escolher o layout mais adequado para a sua navegação, com a capacidade de visualizar em tempo real as mudanças nos componentes.',
    link: 'https://github.com/xjhowxjhow/ReactNativeExpo-Bank6C',
    background: 'linear-gradient(90deg, hsla(0, 0%, 18%, 1) 0%, hsla(0, 0%, 22%, 1) 100%)',
    teconologias: 'React-Native, Expo,'

}

export const imagesrepo7 = [
    {
        original: '/repoimages/repo7/1.png',
        thumbnail: '/repoimages/repo7/1.png',
    },
    {
        original: '/repoimages/repo7/2.png',
        thumbnail: '/repoimages/repo7/2.png',
    },
    {
        original: '/repoimages/repo7/3.png',
        thumbnail: '/repoimages/repo7/3.png',
    },
    {
        original: '/repoimages/repo7/4.png',
        thumbnail: '/repoimages/repo7/4.png',
    },
    {
        original: '/repoimages/repo7/5.png',
        thumbnail: '/repoimages/repo7/5.png',
    },
    {
        original: '/repoimages/repo7/6.png',
        thumbnail: '/repoimages/repo7/6.png',
    },
    {
        original: '/repoimages/repo7/7.png',
        thumbnail: '/repoimages/repo7/7.png',
    }
];





