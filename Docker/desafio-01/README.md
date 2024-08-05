## Full Cycle Docker Image

Esta imagem Docker é uma aplicação simples em Go que imprime a mensagem "Full Cycle Rocks!!".
Essa imagem faz parate de um desafio de docker.

### Requisitos

- [x] Quando rodar a imagem temos que ter o seguinte resultado: Full Cycle Rocks!!
- [x] A imagem deve ser disponibilizanod no docker Hub ( docker run <seu-user>/fullcycle )
- [x] A imagem de nosso projeto Go precisa ter menos de 2MB =)

### Como usar

1. **Puxe a imagem do Docker Hub:**

   ```bash
   docker pull leandrovboas/fulcycle
   ```

2. **Execute a imagem:**

   ```bash
   docker run leandrovboazs/fulcycle
   ```

   - Saída esperada: `Full Cycle Rocks!!`


### Detalhes da imagem

- **Image build:** `golang:alpine`
- **Image final:** `scratch`
- **Linguagem:** Go
- **Tamanho:** 1.81 MB
- **Saída:** "Full Cycle Rocks!!"

### Link da imagem no Docker Hub

[leandrovboas/fullcycle](https://hub.docker.com/repository/docker/leandrovboas/fullcycle)

### Autor

Leandro Vilas Boas

### Licença

[MIT](https://opensource.org/licenses/MIT)