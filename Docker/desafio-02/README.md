# FullCycle Application

Este projeto utiliza Docker e Docker Compose para configurar uma aplicação que com oas seguintes tecnologias

1. **Nginx**: Servindo como proxy reverso.
2. **Node.js**: Aplicação que adiciona registros no banco de dados e retorna uma lista de nomes.
3. **MySQL**: Banco de dados para armazenar os registros.

### Requisitos do desafio

- [x] Quando um usuário acesse o nginx, o mesmo fará uma chamada em nossa aplicação node.js
- [x] A aplicação por sua vez adicionará um registro em nosso banco de dados mysql, cadastrando um nome na tabela people.
- [x] O retorno da aplicação node.js para o nginx deverá ser: <h1>Full Cycle Rocks!</h1> + Lista de nomes cadastrada no banco de dados.
- [x] Deve ser gerado um docker-compose de uma forma que basta apenas rodarmos: docker-compose up -d
- [x] A aplicação deve estar disponível na porta: 8080.
- [x] Deve ser colocado o volume na aplicação para o ambiente de desenvolvimento. 


## Como Rodar

1. Clone o repositório:

   ```sh
   git clone https://github.com/leandrovboas/fullcycle.git
   cd Docker/desafio-02
   
2. Construa e inicie os containers:
     ```sh
    docker-compose up -d
   
4. Acesse a aplicação em http://localhost:8080.

