# Projeto-Final-Macieuls-Coffee
Desenvolvimento front-end para consumir a API Macieuls Coffee - interface e integração com a API.

## Sobre o Projeto

O projeto consiste em implementar o caso de uso **MANTER PRODUTO**, que engloba as seguintes funcionalidades:

* **Listar todos os produtos:** Exibir todos os produtos em ordem alfabética por categoria. Permitir edição e exclusão de cada produto. Incluir um campo de pesquisa e um botão para adicionar um novo produto.
* **Pesquisar um produto:** Filtrar os produtos em tempo real à medida que o usuário digita o nome do produto no campo de pesquisa. A pesquisa deve ser case-insensitive e listar todos os produtos quando o campo estiver vazio.
* **Adicionar um produto:** Fornecer um formulário com os campos obrigatórios: nome, categoria (bolo | bebida), descrição e preço. O campo foto é opcional e deve receber uma URL da imagem. O botão de adicionar deve ser habilitado apenas quando todos os campos obrigatórios estiverem preenchidos. Ao clicar em adicionar, a API de inclusão de registros deve ser chamada. Caso o produto seja adicionado com sucesso, o usuário deve ser redirecionado para a tela de listagem. Caso contrário, uma mensagem de erro deve ser exibida. Um link para voltar à listagem completa deve estar disponível.
* **Editar um produto:** Utilizar o mesmo formulário da funcionalidade "Adicionar um produto", mas pré-preenchido com os dados do produto selecionado.
* **Excluir um produto:** Exibir uma mensagem de confirmação antes de excluir um produto da base de dados. A exclusão deve ser realizada apenas se o usuário confirmar a operação.

## Interface (2 pontos)

A interface deve ser implementada utilizando algum framework CSS (Bootstrap, Materialize, Bulma, Tailwind, Semantic UI, etc).

**Nota:** A pontuação da interface será zerada se a integração com a API não for realizada.

## Funcionalidades (8 pontos)

**Listar todos os produtos (2 pontos):**

* Exibir todos os produtos ordenados por categoria e ordem alfabética.
* Permitir a edição e exclusão de cada produto.
* Incluir um campo de pesquisa para filtrar produtos pelo nome.
* Incluir um botão para adicionar um novo produto.
* A API não retorna os produtos na ordem desejada. A ordem deve ser implementada no front-end.

**Pesquisar um produto (1 ponto):**

* Implementar a pesquisa em tempo real.
* Filtrar os produtos conforme o usuário digita o nome do produto.
* Mostrar todos os produtos quando o campo de pesquisa estiver vazio.
* A pesquisa deve ser case-insensitive.

**Adicionar um produto (1,5 pontos):**

* Criar um formulário com os campos obrigatórios: nome, categoria, descrição e preço.
* O campo foto é opcional e deve aceitar uma URL de imagem.
* O botão de adicionar deve ser habilitado apenas quando todos os campos obrigatórios estiverem preenchidos.
* Chamar a API de inclusão de registros ao clicar em adicionar.
* Redirecionar o usuário para a tela de listagem em caso de sucesso.
* Exibir uma mensagem de erro em caso de falha.
* Incluir um link para voltar à listagem completa.

**Editar um produto (2 pontos):**

* Utilizar o mesmo formulário da funcionalidade "Adicionar um produto", mas pré-preenchido com os dados do produto selecionado.

**Excluir um produto (1,5 pontos):**

* Exibir uma mensagem de confirmação antes de excluir um produto.
* Excluir o produto apenas se o usuário confirmar a operação.

## Documentação da API

**Token de acesso:** Um token de acesso é necessário para realizar qualquer operação. Entre em contato para obter o seu.

**Endpoint:**

```
https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/v2/produto
```

**Listar produtos:**

* **Query Param:** `token` - seu token de acesso.

**Adicionar um produto:**

* **Body Param:** Objeto JSON com as propriedades:
    * `token` - seu token de acesso.
    * `nome` - nome do produto.
    * `idCategoria` - categoria do produto (1 = bolos, 2 = bebidas).
    * `foto` (opcional) - URL da imagem do produto.
    * `preco` - preço do produto.
    * `descricao` - descrição do produto.

**Editar um produto:**

* **Query Param:** `token` - seu token de acesso.
* **Body Param:** Objeto JSON com as propriedades:
    * `idProduto` - identificação do produto a ser editado.
    * `produto` - objeto com as propriedades:
        * `nome` - nome do produto.
        * `idCategoria` - categoria do produto (1 = bolos, 2 = bebidas).
        * `foto` (opcional) - URL da imagem do produto.
        * `preco` - preço do produto.
        * `descricao` - descrição do produto.

**Excluir um produto:**

* **Query Param:**
    * `token` - seu token de acesso.
    * `idProduto` - identificação do produto a ser excluído.

## Mais Informações

* O projeto pode ser realizado em dupla.
* Apenas 1 integrante da dupla deve entregar o projeto.
* Renomeie o diretório RAIZ do projeto para o nome da dupla (ex: joaoMaria).
* Após renomear o diretório, compacte-o com zip/rar (ex: joaoMaria.zip/rar).

**Observação:** Este documento está formatado para Markdown. Você pode copiá-lo e colá-lo em um editor de texto que suporte Markdown para visualização correta.
