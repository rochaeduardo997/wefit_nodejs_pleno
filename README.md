## Backend - Wefit

### Para iniciar o banco de dados e o servidor de cache é necessario ter o docker-compose instalado em sua máquina e rodar o seguinte comando:

    docker-compose up -D

o docker-compose vai criar um container de um MySQL e você poderá acessar via localhost:3306 e a senha do usuário **root** é **senha_root_123**

Será necessário renomear o arquivo .env_example para .env antes de iniciar a aplicação/realizar os testes unitários

### Para iniciar o servidor express basta executar o seguinte comando:

    npm start
    ou
    yarn start

### Usuário default para gerar o token:

    login: support
    password: password

### Para realizar os testes unitários basta executar o seguinte comando:

    npm test
    ou
    yarn test

### Rota para a documentação gerada pelo swagger:

    http://localhost:4568/api-docs/#/
