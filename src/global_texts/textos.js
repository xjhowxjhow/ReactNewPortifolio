// arquivo para armazenar textos e imagens que serão usados em vários lugares do site

export const CardleftHomeSrc = {
    titulo: 'Olá, Sou o Jhonatan',
    texto: 'This is the first card',
    // imagem: 'https://avatars.githubusercontent.com/u/58306583?v=4',
    imagem: '/user.png',
    botao: 'Hello',
    botao2: 'World',
    image_background: '/repovideo/city.gif',
}

// 

export const CardRightHomeSrc = {
    titulo: 'Sobre mim',
    texto: 'Engenheiro de Dados com foco em cloud computing (Azure) e arquitetura DataLake/Lakehouse. Atualmente na NEXOCS/Vela Sustainability Technologies, desenho e implemento pipelines e plataformas de dados escaláveis no Azure Databricks, assegurando governança, segurança e alto desempenho. <br><br> Sou formado em Análise e Desenvolvimento de Sistemas pela Universidade Estácio de Sá. Minha rotina inclui a coleta, unificação e sincronização de dados de múltiplas fontes, além da automação de processos ETL/ELT com rastreabilidade ponta a ponta. <br><br>Seja bem-vindo ao meu portfólio!',
    imagem: '/repovideo/coffe-gif.gif',
    // random images from https://picsum.photos/
    image_background: '/repovideo/foot.gif',
}




export const CardleftCarrerSrc = {
    empresa1: '<div style="text-align:center;">Parla! / Abai Group<br> <custom style="font-size:15px;">mai de 2019 - jan de 2021 · 1 ano 9 meses</custom></div>',
    cargo1: 'Suporte Tecnico',
    texto1: 'Analista de atendimento de Suporte técnico via Chat. /Suporte ao cliente /Omnichannel (Chat, Sms, E-Mail, Ura)',
    fotoempresa1: 'https://www.abaigroup.com/wp-content/uploads/2022/11/abai-logo-x2.jpg',
    habilidades1: '',
    back_color1: 'linear-gradient(to right, #00254b, #552d63, #9a305b, #c24f3a, #c28500)',

    empresa2: '<div style="text-align:center;">Teleperformance <br>  <custom style="font-size:15px;">mar de 2021 - nov de 2022 · 1 ano 9 meses</custom></div>',
    cargo2: 'Backoffice Suporte ao Cliente II',
    texto2: 'Suporte ao cliente de programas de desenvolvimento:<br><br> • Microsoft Visual Studio<br> • Azure<br> • Active Directory<br> • Suporte a licenças por volume para empresas e instituições.',
    fotoempresa2: 'https://connekt-file.s3.amazonaws.com/gestor/logo/e0867bb0-cb2c-11e9-84bc-0933e15efe3b7193b95f-31ec-4b2e-8125-76438f547329.png',
    habilidades2: '',
    back_color2: 'radial-gradient(circle, #6f3768, #7a386a, #85396b, #903a6b, #9b3b6b)',

    empresa3: 'Nexo EHS Software / Vela Sustainability Technologies <br> nov de 2022 - Atualmente',
    cargo3: 'Data Enginner Jr.',
    texto3: "• Azure Databricks | Apache Spark | Lakehouse Architecture <br>• Azure Databricks Genie IA | Delta Live Tables (DLT) | Databricks Workflows <br>• Azure Databricks Apps (Streamlit, Flask) deployments <br>• DBFS | Delta Tables | Unity Catalog | Data Governance <br>• Databricks Mosaics | Delta Views & Functions <br>• Databricks MLflow | AutoML <br>• Delta Sharing | Data Lineage | Table ACLs | Row-Level Security (RLS) <br>• Structured Streaming | Autoloader | Change Data Feed (CDF) <br>• Performance Tuning: Z-Ordering | Optimize | Caching | Photon Engine <br>• Cluster & VM Management (Azure) | Autoscaling | Job Clusters | Serverless SQL warehouse <br>• Init Scripts | Metastore Permissions Management | Python .whl Deployment in Clusters <br><br>• Integration with ERPs: SAP SuccessFactors (OData v2/EC), SAP ECC (RFCs), Oracle Integration Cloud, Sankhya, Senior, ADP, TOTVS <br><br>• Data Integration (Legacy Support – Migration to Databricks): Pentaho (PDI), Hop <br>• Orchestration & Processing: Apache Airflow, Spark Jobs <br><br>• ETL/ELT | Data Pipelines | API Integration (REST/SOAP) <br>• Python Development: OOP, FastAPI, Flask, PyQt, PySide <br>• Data Analysis: Pandas, JupyterLab, Streamlit <br>• SQL & PL/SQL | Oracle <br>• Azure DevOps | Repos | Pipelines | CI/CD <br>• Power BI | Power BI Gateway",
    habilidades3: ' Azure DevOps · Airflow · Python · JavaScript · Pentaho · Hoop · PL/SQL · API REST · SOAP · Serviços Web RESTful · Git  ',
    fotoempresa3: 'https://attachments.gupy.io/production/companies/1924/career/2918/images/2021-03-04_16-23_logo.png',
    back_color3: 'radial-gradient(circle, #467e9f, #3e7092, #376285, #305578, #29486b)',

    universidade1: 'Curso Superior de Tecnologia (CST) Estacio de Sá<br> nov de 2021 - 2024',
    curso1: 'Análise e Desenvolvimento de Sistemas',
    texto4: 'Finalizado! O curso tem como objetivo formar profissionais capacitados para atuar na área de desenvolvimento de sistemas, com conhecimentos em programação, análise e modelagem de sistemas, banco de dados, engenharia de software, entre outros.<br>É dividido em 5 semestres, sendo 2 semestres de disciplinas teóricas e 3 semestres de disciplinas práticas.',
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
                text: (

                    <div style={{ textAlign: 'left', display: 'flex', gap: '2px', flexDirection: 'column', width: '100%', alignItems: 'flex-start' }}>
                        <h1 style={{ fontSize: '35px' }}>FrameWorks/ PaaS:</h1>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

                            <h1 style={{ fontSize: '20px' }}>•  Azure Databricks (Spark | Pyspark) :</h1>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '' }}>
                               <h1 style={{ fontSize: '20px', fontWeight: 'lighter', wordWrap: 'inherit' }}>
                                - Trabalho com processamento de dados em larga escala utilizando Python com a API PySpark, manipulando dados em DataFrames, RDDs e também com SQL API para consultas e transformações.<br />
                                - Experiência em arquitetura Lakehouse no Azure Databricks, incluindo ingestão, transformação e consumo de dados em pipelines modernos.<br />
                                - Principais recursos e práticas que aplico no ambiente Databricks:<br />
                                • Azure Databricks | Apache Spark | Lakehouse Architecture<br />
                                • Azure Databricks Genie IA | Delta Live Tables (DLT) | Databricks Workflows<br />
                                • Delta Tables | Unity Catalog | Data Governance<br />
                                • Databricks Mosaics | Delta Views & Functions<br />
                                • Databricks MLflow | AutoML | Feature Store<br />
                                • Delta Sharing | Data Lineage | Table ACLs | Row-Level Security (RLS)<br />
                                • Structured Streaming | Autoloader | Change Data Feed (CDF)<br />
                                • Performance Tuning: Z-Ordering | Optimize | Caching | Photon Engine<br />
                                • Cluster & VM Management (Azure) | Autoscaling | Job Clusters | Serverless SQL Warehouse<br />
                                • Init Scripts | Metastore Permissions Management | Python .whl Deployment em Clusters<br /><br />
                                - Integrações com ERPs: SAP SuccessFactors (OData v2/EC), SAP ECC (RFCs), Oracle Integration Cloud, Sankhya, Senior, ADP, TOTVS.<br />
                                - Suporte a integrações legadas e migração para Databricks: Pentaho (PDI), Hop.<br />
                                - Orquestração e processamento com Apache Airflow e Spark Jobs.<br />
                                - Desenvolvimento em Python (OOP, FastAPI, Flask, PyQt, PySide) e análises com Pandas, JupyterLab, Streamlit.<br />
                                - SQL & PL/SQL (Oracle) e integração com Azure DevOps (Repos, Pipelines, CI/CD).<br />
                                - Dashboards e relatórios com Power BI e Power BI Gateway.
                                </h1>
                            </div>


                            <h1 style={{ fontSize: '20px' }}>• PySide2 | PySide6 - PyQT5 | PyQT6:</h1>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '' }}>
                                <h1 style={{ fontSize: '20px', fontWeight: 'lighter', wordWrap: 'inherit' }}>
                                    Uma das minhas favoritas e principal Framework que utilizo para Interface Graficas em Python.
                                    <br />
                                    Tenho vasto conhecimento na manipulação de Widgets da Framework, e também na manipulação de Threads/ThreadPools e Signals/Slots para desenvolvimento de aplicacoes de processamento em paralelo.
                                    Consigo transformar qualquer bloco de codigo que utilizem qualquer Bilioteca Python desde que a versao Suporte QT em interface grafica usando o mesmo trazendo aplicacoes CLI para GUI. de uma forma simples e rapida.
                                </h1>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}></div>
                            <h1 style={{ fontSize: '20px' }}>• FastAPI / Flask</h1>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '' }}>
                                <h1 style={{ fontSize: '20px', fontWeight: 'lighter', wordWrap: 'inherit' }}>
                                    Um dos micros-Framework que utilizo para desenvolvimento rapido para pequenas solucoes de APIs em Python.
                                    <br />
                                    Tenho conhecimento na manipulação de rotas, autenticação, segurança, documentação, testes, etc.
                                    Utilizei muito para criação de pequenos services para integracao de Dados| ETL utilizando Pentaho Data Integration, onde tambem alem de dados para processamento de arquivos.

                                </h1>
                            </div>
                        </div>
                        <h1 style={{ fontSize: '35px' }}>Bibliotecas:</h1>
                        <div>
                            <h1 style={{ fontSize: '20px' }}> • Pandas </h1>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '' }}>
                                <h1 style={{ fontSize: '20px', fontWeight: 'lighter', wordWrap: 'inherit' }}>
                                    Gostaria de destacar esta biblioteca que é uma das minhas favoritas e a que mais utilizo para a manipulação de dados. Eu a utilizo principalmente para trabalhar com DataFrames.
                                    Também é minha escolha quando é necessário criar uma interface em conjunto com o PySide2, especialmente para manipulação de dados em tabelas QTableWidget.
                                    Dependendo da complexidade e do tamanho dos dados, utilizo uma combinação do Pandas com Threads| ThreadPools. Isso me permite dividir os DataFrames em partes e processá-los em paralelo, utilizando a orientação a objetos do Python para serializar e deserializar os dados.
                                    Tenho experiência em lidar com várias operações em DataFrames, como Series, GroupBy, Merge, Join, Concat, entre outras se tratando de ETL.
                                </h1>
                            </div>
                            <h1 style={{ fontSize: '20px' }}>Demais Utilizados no meu Dia a Dia:</h1>
                            <h1 style={{ fontSize: '20px' }}>PySpark, Numpy, Matplotlib, Requests, BeautifulSoup, Sqlite3, Cx_Oracle</h1>
                        </div>
                    </div>
                ),
                skills: 'print("Hello Python 🐍")',
                color: 'linear-gradient(-45deg, #4c4c4c, #262626, #000000, #4b4b4b)',
            },
{
            item: 'SQL',
            icon: 'https://img.icons8.com/color/48/000000/sql.png',
            text: (
                <div
                    style={{
                        textAlign: 'left',
                        display: 'flex',
                        gap: '2px',
                        flexDirection: 'column',
                        width: '100%',
                        alignItems: 'flex-start',
                    }}
                >
                    <h1 style={{ fontSize: '35px' }}>Banco de Dados:</h1>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <h1 style={{ fontSize: '20px' }}>• Conhecimentos e Experiências</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <h1 style={{ fontSize: '20px', fontWeight: 'lighter', wordWrap: 'inherit' }}>
                                Tenho experiência avançada em gerenciamento de bancos de dados relacionais e analíticos, com foco em
                                Oracle 19c e Databricks Lakehouse. Atuo em pipelines complexos de ingestão, transformação e governança
                                de dados, aplicando boas práticas de modelagem e otimização de consultas SQL.
                            </h1>
                        </div>

                        <h1 style={{ fontSize: '20px' }}>• PL/SQL Avançado</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <h1 style={{ fontSize: '20px', fontWeight: 'lighter', wordWrap: 'inherit' }}>
                                - Desenvolvimento avançado de <strong>Stored Procedures</strong>, <strong>Functions</strong> e
                                <strong> Packages</strong> em Oracle 19c.<br />
                                - Depuração e análise de desempenho via PL/SQL Developer (Jobs, Loops, blocos anônimos).<br />
                                - Otimização de consultas complexas, análise de planos de execução e indexação inteligente.<br />
                                - Integrações entre Oracle e Databricks via ODBC/JDBC para pipelines híbridos.
                            </h1>
                        </div>

                        <h1 style={{ fontSize: '20px' }}>• Views | Views Materializadas | Triggers</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <h1 style={{ fontSize: '20px', fontWeight: 'lighter', wordWrap: 'inherit' }}>
                                - Criação e manutenção de <strong>views materializadas</strong> no Databricks para consultas otimizadas
                                e redução de latência em workloads analíticos.<br />
                                - Desenvolvimento de <strong>Triggers</strong> para auditoria e controle de alterações em tabelas Delta
                                e Oracle.<br />
                                - Criação de <strong>Delta Views</strong> e funções no Databricks para simplificar visualizações e
                                relatórios.<br />
                            </h1>
                        </div>

                        <h1 style={{ fontSize: '20px' }}>• Unity Catalog | Governança e Otimização</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <h1 style={{ fontSize: '20px', fontWeight: 'lighter', wordWrap: 'inherit' }}>
                                - Implementação e gestão de <strong>Unity Catalog</strong> com controle de acesso em nível de tabela,
                                coluna e linha (RLS).<br />
                                - Configuração de <strong>metastore</strong>, gerenciamento de permissões e integração com Active
                                Directory.<br />
                                - Uso das principais funções de otimização do Unity Catalog: lineage tracking, data discovery,
                                auditabilidade e versionamento.<br />
                                - Criação e manutenção de <strong>Delta Sharing</strong> para compartilhamento seguro de dados entre
                                workspaces.<br />
                            </h1>
                        </div>

                        <h1 style={{ fontSize: '20px' }}>• Clusters e SQL Warehouse</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <h1 style={{ fontSize: '20px', fontWeight: 'lighter', wordWrap: 'inherit' }}>
                                - Configuração e tuning de <strong>Job Clusters</strong>, <strong>All-purpose Clusters</strong> e
                                <strong> Serverless SQL Warehouse</strong> no Azure Databricks.<br />
                                - Monitoramento de performance com uso de <strong>Photon Engine</strong> e cache otimizado.<br />
                                - Aplicação de boas práticas de <strong>Z-Ordering</strong>, <strong>Optimize</strong> e
                                <strong> Vacuum</strong> para alto desempenho.<br />
                            </h1>
                        </div>

                        <h1 style={{ fontSize: '20px' }}>• Oracle + Pentaho Data Integration</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <h1 style={{ fontSize: '20px', fontWeight: 'lighter', wordWrap: 'inherit' }}>
                                Utilizo o Pentaho (PDI) para construção e manutenção de ETLs integrando Oracle 19c e Databricks.
                                Experiência com ingestão, transformação e exportação de dados entre diferentes ERPs:<br />
                                - SAP SuccessFactors (EC / OData v2)<br />
                                - Oracle Integration Cloud<br />
                                - Sankhya<br />
                                - Senior<br />
                                - TOTVS<br /><br />
                                O SQL é utilizado como base para integração, modelagem e construção de pipelines de dados escaláveis e
                                de alta performance.
                            </h1>
                        </div>
                    </div>
                </div>
            ),
            skills: 'DELETE FROM TABLE WHERE 1 = 0 -- Never;',
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
        back_color: 'linear-gradient(221deg,#274cdb,#891fa4,#469495)',
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
                item: 'Expo',
                icon: 'https://img.icons8.com/color/48/000000/expo.png',
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
    teconologias: 'Node.js, Express, HandleBars, Socket.io',
    link: 'https://github.com/xjhowxjhow/PAINEL_HOST',
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




export const TextsRepo8 = {
    titulo: 'Crud GuiDbBOOT OpenSea',
    texto1: 'Freelancer <br/><br/>O cliente solicitou uma interface para visualização gráfica do seu banco de dados, onde são armazenadas as configurações de seu Bot de NFTs via OpenSea, lista de compras, vendas e alvos para trade.<br/> <br/>Toda a modelagem e entrada de dados foram oferecidas pelo banco de dados do cliente.Minha responsabilidade foi transferir em tempo real os dados do banco para a interface construída. <br/><br/> Foi solicitado com três critérios:<br/><br/> 1 - Página CRUD: Responsável por adicionar, remover, atualizar e criar coleções de itens de preços para o Bot do cliente operar, juntamente com a API da OpenSea para buscar informações e coleta de dados para adição na sua biblioteca de alvos. <br/><br/>2 - Página de configuração: Configurações armazenadas em JSON, para que o bot opere de acordo com o definido.<br/><br/> 3 - Página de dashboard: Visualização dos valores ganhos, vendidos e lucro. Uma visão geral do funcionamento do bot.',
    link: 'https://github.com/xjhowxjhow/GuiDBCrudBoot-V1',
    background: 'radial-gradient(circle, #21252b, #272b31, #2c3037, #32363d, #383c43)',
    teconologias: 'Python, PySide2, SQLite, OpenSea API'
}

export const imagesrepo8 = [
    {
        original: '/repoimages/repo8/1.png',
        thumbnail: '/repoimages/repo8/1.png',
    },
    {
        original: '/repoimages/repo8/2.png',
        thumbnail: '/repoimages/repo8/2.png',
    },
    {
        original: '/repoimages/repo8/3.png',
        thumbnail: '/repoimages/repo8/3.png',
    },
    {
        original: '/repoimages/repo8/4.png',
        thumbnail: '/repoimages/repo8/4.png',
    },
    {
        original: '/repoimages/repo8/5.png',
        thumbnail: '/repoimages/repo8/5.png',
    },
    {
        original: '/repoimages/repo8/6.png',
        thumbnail: '/repoimages/repo8/6.png',
    }
];




export const certifications = {
    "certificacoes": [
        {
            "nome": "Engenharia de dados com Azure Databricks",
            "descricao": "A formação de Databricks busca preparar estudantes para trabalhar com Ciência de Dados e Engenharia de Dados, utilizando recursos do Apache Spark e linguagens como Python e SQL e processamento em nuvem.",
            "emissor": "Alura",
            "data_emissao": "2025-03-19",
            "topicos": [
                "ETL/ELT com Azure Databricks",
                "SPARK SQL",
                "Databricks Workflows",
                "Data Lake",
                "Cloud Computing (Azure) Azure Key Vault | Azure Data Factory| Azure Data Lake Storage Gen2",
            ],
            "link_certificacao": "https://cursos.alura.com.br/degree/certificate/5c4b1139-ffc4-4349-b040-ccbefccbdd2a",
            "imgs": [
                {
                    original: '/certimages/cert_5.png',
                    thumbnail: '/certimages/cert_5.png',
                },
                {
                    original: '/certimages/cert_5_back.png',
                    thumbnail: '/certimages/cert_5_back.png',
                },
            ]
        },
        {
            "nome": "Apache Airflow",
            "descricao": "Certificação para profissionais que desejam comprovar conhecimentos em Apache Airflow.",
            "emissor": "Alura",
            "data_emissao": "2024-02-19",
            "topicos": [
                "Experiência com Python",
                "Conhecimentos em ETL",
                "Conhecimento em Docker e Kubernetes",
                "Celery"
            ],
            "link_certificacao": "https://cursos.alura.com.br/degree/certificate/cb49a154-beda-4175-921b-ea4965e5eae2",
            "imgs": [
                {
                    original: '/certimages/cert_2.png',
                    thumbnail: '/certimages/cert_2.png',
                },
                {
                    original: '/certimages/cert_2_back.png',
                    thumbnail: '/certimages/cert_2_back.png',
                },
            ]
        },
        {
            "nome": "BI e Data Warehouse com Pentaho",
            "descricao": "Certificação para profissionais que desejam comprovar conhecimentos em Business Intelligence e Data Warehouse com a ferramenta Pentaho.",
            "emissor": "Alura",
            "data_emissao": "2024-07-16",
            "topicos": [
                "Pentaho Data Integration",
                "ETL/ELT",
                "Data Warehouse",
                "SQL e modelagem de dados",
                "Data Lake",

            ],
            "link_certificacao": "https://cursos.alura.com.br/degree/certificate/8566e346-3a78-4cf3-bc45-3bac5fb38a7b?lang",
            "imgs": [
                {
                    original: '/certimages/cert_1.png',
                    thumbnail: '/certimages/cert_1.png',
                },
                {
                    original: '/certimages/cert_1_back.png',
                    thumbnail: '/certimages/cert_1_back.png',
                },
            ]
        },
        {
            "nome": "PROGRAMAÇÃO PARA DISPOSITIVOS MÓVEIS",
            "descricao": "Certificação para desenvolvimento da competência PROGRAMAÇÃO PARA DISPOSITIVOS MÓVEIS",
            "emissor": "Universidade Estácio de Sá",
            "data_emissao": "2024-07-29",
            "topicos": [
                "Node.js",
                "React Native",
                "Expo",
                "JavaScript",
                "HTML e CSS"

            ],
            "link_certificacao": "https://certificado.estacio.br/5f568d6fa7639d624864801",
            "imgs": [
                {
                    original: '/certimages/cert_3.png',
                    thumbnail: '/certimages/cert_3.png',
                },
                {
                    original: '/certimages/cert_3_back.png',
                    thumbnail: '/certimages/cert_3_back.png',
                },
            ]
        },
        {
            "nome": "ALGORITMOS ESCALÁVEIS",
            "descricao": "Certificação para desenvolvimento da competência PROGRAMAÇÃO DE ALGORITMOS ESCALÁVEIS",
            "emissor": "Universidade Estácio de Sá",
            "data_emissao": "2024-01-09",
            "validade": "-",
            "nivel": "Intermediário",
            "modalidade": "Online",
            "topicos": [
                "Lógica de programação",
                "Desing Patterns",
                "Estrutura de Dados",
                "Linguagem de Programação C",
                "Paradigmas de Programação POO"

            ],
            "link_certificacao": "https://certificado.estacio.br/0a3e7f2825c311709e17aec",
            "imgs": [
                {
                    original: '/certimages/cert_4.png',
                    thumbnail: '/certimages/cert_4.png',
                },
                {
                    original: '/certimages/cert_4_back.png',
                    thumbnail: '/certimages/cert_4_back.png',
                },
            ]
        }
    ]
}
