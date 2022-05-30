<div align="center">
  
  [![wakatime](https://wakatime.com/badge/user/8a52c0fd-ec78-403a-81d0-07c674c564b3/project/febb1508-8e8f-4538-a3a4-1722d18a498c.svg)](https://wakatime.com/badge/user/8a52c0fd-ec78-403a-81d0-07c674c564b3/project/febb1508-8e8f-4538-a3a4-1722d18a498c)
 </div>

<div align="center">
  <a href="https://github.com/celso-patiri/15-Boardcamp" target="_blank">
    <img src="https://github.com/celso-patiri/15-Boardcamp/blob/main/web/src/assets/images/logo.png" alt="Logo" width="200">
  </a>
  
  <h3 align="center">
     Board Game Rental Store
  </h3>
    <br />
</div>

<div align="center">
  
  ![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
  ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

 </div>

## ✅ Requirements

- CRUD de Categorias [Create|Read]

  - [x] **GET** `/categories`
  - [x] **POST** `/categories`
    - **Regras de Negócio**
      - [x] `name` não pode estar vazio ⇒ nesse caso, deve retornar **status 400**
      - [x] `name` não pode ser um nome de categoria já existente ⇒ nesse caso deve retornar **status 409**

- CRUD de Jogos [Create|Read]
  - [x] **GET** `/games`
    - **Regras de Negócio**
      - [x] Caso seja passado um parâmetro `name` na **query string** da requisição, os jogos devem ser filtrados para retornar somente os que começam com a string passada (case insensitive). Exemplo:
        - [x] Para a rota `/games?name=ba`, deve ser retornado uma array somente com os jogos que comecem com "ba", como "Banco Imobiliário", "Batalha Naval", etc
  - [x] **POST** `/games`
    - **Regras de Negócio**
      - [x] `name` não pode estar vazio; `stockTotal` e `pricePerDay` devem ser maiores que 0; `categoryId` deve ser um id de categoria existente; ⇒ nesses casos, deve retornar **status 400**
      - [x] `name` não pode ser um nome de jogo já existente ⇒ nesse caso deve retornar **status 409**
- CRUD de Clientes [Create|Read|Update]

  - [x] **GET** `/customers`

    - **Regras de Negócio**
      - [x] Caso seja passado um parâmetro `cpf` na **query string** da requisição, os clientes devem ser filtrados para retornar somente os com CPF que comecem com a string passada.

  - [x] **GET** `/customers/:id`
    - **Regras de Negócio:**
      - [x] Se o cliente com id dado não existir, deve responder com **status 404**
  - [x] **POST** `/customers`
    - **Regras de negócio**
      - [x] `cpf` deve ser uma string com 11 caracteres numéricos; `phone` deve ser uma string com 10 ou 11 caracteres numéricos; `name` não pode ser uma string vazia; `birthday` deve ser uma data válida; ⇒ nesses casos, deve retornar **status 400**
      - [x] `cpf` não pode ser de um cliente já existente; ⇒ nesse caso deve retornar **status 409**
  - [x] **PUT** `/customers/:id`
    - **Regras de negócio:**
      - [x] `cpf` deve ser uma string com 11 caracteres numéricos; `phone` deve ser uma string com 10 ou 11 caracteres numéricos; `name` não pode ser uma string vazia; `birthday` deve ser uma data válida ⇒ nesses casos, deve retornar **status 400**
      - [x] `cpf` não pode ser de um cliente já existente ⇒ nesse caso deve retornar **status 409**

- CRUD de Aluguéis [Create|Read|Update|Delete]

    <details>
    <summary>Schema</summary>

  - Formato de um aluguel (tabela `rentals`)

    ```jsx
    {
      id: 1,
      customerId: 1,
      gameId: 1,
      rentDate: '2021-06-20',    // data em que o aluguel foi feito
      daysRented: 3,             // por quantos dias o cliente agendou o aluguel
      returnDate: null,          // data que o cliente devolveu o jogo (null enquanto não devolvido)
      originalPrice: 4500,       // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
      delayFee: null             // multa total paga por atraso (dias que passaram do prazo vezes o preço por dia do jogo)
    }
    ```

    </details>

- [x] **GET** `/rentals`
  - **Response:** lista com todos os aluguéis, contendo o `customer` e o `game` do aluguel em questão em cada aluguel
    ```jsx
    [
      {
        id: 1,
        customerId: 1,
        gameId: 1,
        rentDate: "2021-06-20",
        daysRented: 3,
        returnDate: null, // troca pra uma data quando já devolvido
        originalPrice: 4500,
        delayFee: null,
        customer: {
          id: 1,
          name: "João Alfredo",
        },
        game: {
          id: 1,
          name: "Banco Imobiliário",
          categoryId: 1,
          categoryName: "Estratégia",
        },
      },
    ];
    ```
  - **Regras de Negócio**
    - [x] Caso seja passado um parâmetro `customerId` na **query string** da requisição, os aluguéis devem ser filtrados para retornar somente os do cliente solicitado. Exemplo:
      - Para a rota `/rentals?customerId=1`, deve ser retornado uma array somente com os aluguéis do cliente com id 1
    - [x] Caso seja passado um parâmetro `gameId` na **query string** da requisição, os aluguéis devem ser filtrados para retornar somente os do jogo solicitado. Exemplo:
      - Para a rota `/rentals?gameId=1`, deve ser retornado uma array somente com os aluguéis do jogo com id 1
- [x] **POST** `/rentals`
  - **Regras de Negócio**
    - [x] Ao inserir um aluguel, os campos `rentDate` e `originalPrice` devem ser populados automaticamente antes de salvá-lo:
      - `rentDate`: data atual no momento da inserção
      - `originalPrice`: `daysRented` multiplicado pelo preço por dia do jogo no momento da inserção
    - [x] Ao inserir um aluguel, os campos `returnDate` e `delayFee` devem sempre começar como `null`
    - [x] Ao inserir um aluguel, deve verificar se `customerId` se refere a um cliente existente. Se não, deve responder com **status 400**
    - [x] Ao inserir um aluguel, deve verificar se `gameId` se refere a um jogo existente. Se não, deve responder com **status 400**
    - [x] `daysRented` deve ser um número maior que 0. Se não, deve responder com **status 400**
    - [x] Ao inserir um aluguel, deve-se validar que existem jogos disponíveis, ou seja, que não tem alugueis em aberto acima da quantidade de jogos em estoque. Caso contrário, deve retornar **status 400**
- [x] **POST** `/rentals/:id/return`
  - **Regras de Negócio**
    - [x] Ao retornar um aluguel, o campo `returnDate` deve ser populado com a data atual do momento do retorno
    - [x] Ao retornar um aluguel, o campo `delayFee` deve ser automaticamente populado com um valor equivalente ao número de dias de atraso vezes o preço por dia do jogo no momento do retorno.
    - [x] Ao retornar um aluguel, deve verificar se o `id` do aluguel fornecido existe. Se não, deve responder com **status 404**
    - [x] Ao retornar um aluguel, deve verificar se o aluguel já não está finalizado. Se estiver, deve responder com **status 400**
- [x] **DELETE** `/rentals/:id`
  - **Regras de Negócio**
    - [x] Ao excluir um aluguel, deve verificar se o `id` fornecido existe. Se não, deve responder com **status 404**
    - [x] Ao excluir um aluguel, deve verificar se o aluguel já não está finalizado (ou seja, `returnDate` já está preenchido). Se estiver, deve responder com **status 400**

## ☑️ Bônus

- [x] Paginação
  - **GET** /categories, /games, /customers, /rentals
    - [x] Caso seja passado um parâmetro `offset` na **query string** da requisição, deve-se obter somente os registros no banco após o offset determinado. Ex: se for passado `offset=20` e existirem 100 produtos no banco, só devem ser retornados os 80 últimos (do 21º ao 100º)
      - **Dica**: pesquise por SQL OFFSET
    - [x] Caso seja passado um parâmetro `limit` na query string da requisição, deve-se limitar a quantidade de registros retornados a esse limite no máximo. Ex: se for passado `limit=30` e existirem 100 produtos no banco, só devem ser retornados os 30 primeiros
    - [x] Caso tanto `limit` quanto `offset` sejam passados, ambos devem ser aplicados. Ex: se for passado `offset=20&limit=30`, caso existam 100 produtos no banco, só devem ser retornados os produtos do 21º ao 50º.
- [x] Ordenação
  - **GET** /categories, /games, /customers, /rentals
    - [x] Caso seja passado um parâmetro `order` na **query string** da requisição, deve-se retornar os registros ordenados pela coluna passada em ordem ascendente. Ex: se for passado `order=name`, os registros devem ser ordenados alfabeticamente pela coluna `name`
    - [x] Caso seja passado também um parâmetro `desc` na **query string**, deve-se inverter esta ordem para descendente. Ex: se for passado `order=name&desc=true`, os registros devem ser ordenados alfabeticamente invertidos pela coluna `name`
- [x] Filtragem por data
  - **GET** /rentals
    - [x] Caso seja passado um parâmetro `status` na **query string** da requisição, os aluguéis devem ser filtrados para retornar somente aqueles que estão naquele estado. Exemplo:
      - Para a rota `/rentals?status=open`, deve ser retornado uma array somente com os aluguéis não finalizados
      - Para a rota `/rentals?status=closed`, deve ser retornado uma array somente com os aluguéis finalizados
    - [x] Caso seja passado um parâmetro `startDate` na **query string** da requisição, os aluguéis devem ser filtrados para retornar somente os que foram feitos a partir daquela data. Exemplo:
      - Para a rota `/rentals?startDate=2021-06-10`, deve ser retornado uma array somente com os aluguéis com `rentDate` maior ou igual a `2021-06-10`
- [x] Cálculo de faturamento
  - **GET** /rentals/metrics
    - [x] Implemente a nova rota acima que deve calcular:
      - `revenue`: o total de receita da loja (somando todos os preços e taxas recebidas nos aluguéis)
      - `rentals`: a quantidade total de aluguéis
      - `average`: e a média de receita por aluguel (divisão do total da receita pela quantidade de aluguéis)
    - Por exemplo, se em toda a história a loja teve de faturamento 1 milhão de reais, que vieram de 50 mil aluguéis, o retorno da rota deveria ser: (em centavos)
      ```jsx
      {
      	revenue: 100000000,
      	rentals: 50000,
      	average: 2000
      }
      ```
      **Dica**: pesquise por SQL **Sum** e **Count**
    - [x] Caso seja passado um parâmetro `startDate` e/ou `endDate` na **query string** da requisição, as métricas devem ser filtradas para retornar somente dados referentes aos aluguéis com `rentDate` dentro desse período (a partir da `startDate` inclusive e/ou até a endDate inclusive)
- [x] Quantidade de aluguéis
  - **GET** /games, /customers
    - [x] Sem aumentar o número de queries feitas no banco, adicione nos retornos das rotas acima, em uma propriedade `rentalsCount`, a quantidade de aluguéis já feitos para aquele cliente ou daquele jogo. Ex: se um jogo já foi alugado 10 vezes, em cada jogo deve ser incluído um campo `rentalsCount: 10`
      - **Dica:** Pesquise por SQL **Count** e **Group By**

## 🎲 Configure Database

1. Run the setup script

   ```bash
   bash ./server/psql_scripts/create-database
   ```

2. Configure DATABASE_URL environment variable in `.env`

   ```jsx
   DATABASE_URL=postgres://role:password@localhost:5432/boardcamp
   ```
