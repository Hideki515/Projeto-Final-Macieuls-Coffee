$(document).ready(function () {
    const MENU_ALL = 'https://cipaon.com.br/api/produto.php?token=3e27138784ce6fa7dcc5c67971117739b2fadfc7';

    const MENU_BOLOS = 'https://cipaon.com.br/api/produto.php?token=3e27138784ce6fa7dcc5c67971117739b2fadfc7&idCategoria=1';

    const MENU_CAFES = 'https://cipaon.com.br/api/produto.php?token=3e27138784ce6fa7dcc5c67971117739b2fadfc7&idCategoria=2';

    const ADD_PEDIDO = 'https://cipaon.com.br/api/produto.php';

    const PRODUTO = 'https://cipaon.com.br/api/produto.php';

    const EDIT_PRODUTO = 'https://cipaon.com.br/api/produto.php?token=3e27138784ce6fa7dcc5c67971117739b2fadfc7';

    let token = '3e27138784ce6fa7dcc5c67971117739b2fadfc7';

    let arrPedido = [];

    init();

    // Chama as funções necessárias para o funcionamento do programa
    function init() {
        componentInit();
        carregaMenuAll();
        carregaMenuBolos();
        carregaMenuCafes();
        addRemoveItem();
        limparPedido();
        limparPedidoBtn();
        // checkOrder();
        order();
        // Chama a função dropDown
        dropdown();
        // Chama a função que faz o SearchBox funcionar
        searchBox();
        // Chama a função que desabilita o botão caso os campos estejam vazios
        verificarCamponsButton();
        // Chama a função de Adicionar Produtos
        adicionarProduto();
        // Chama a função para mascara de preço
        maskPrice();
    }

    function componentInit() {
        $.tab();
        $.tab('change tab', 'tab-all');
        $('#menu .menu-item').click(function () {
            let abaAtiva = $(this).attr('data-tab-name');
            $.tab('change tab', abaAtiva);
        });
        $('.special.cards .image').dimmer({ on: 'click' });
    }

    function us2brl(valor) {
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function carregaMenuAll() {
        // Limpa o conteúdo atual do menu de bebidas
        $('#menu-all').empty();

        var conteudoMenuAll = '';

        $.getJSON(MENU_ALL, function (response) {
            // Ordena o array de produtos por nome em ordem alfabética
            response.sort((a, b) => a.nome.localeCompare(b.nome));

            response.forEach((produto) => {
                conteudoMenuAll += `
                    <div class="ui card" data-id="${produto.idProduto}" data-cat="${produto.idCategoria}">
                        <!-- Imagem do produto -->
                        <div class="image imagemProduto">
                            <img src="${produto.foto}">
                            <!-- Coloca o preço no canto direta da esqueda em baixo da imagem -->
                            <div class="ui green basic bottom right attached label precoProduto">
                                R$ ${(produto.preco)}
                            </div>
                        </div>
                        <div class="content">
                            <!-- Coloca o nome produto em baixo da imagem -->
                            <div class="header nomeProduto">
                                ${produto.nome}
                            </div>
                            <!-- Descrição da bedida -->
                            <div class="description descricaoProduto">
                                ${produto.descricao}
                            </div>
                        </div>
                        <!-- Coloca os botôes de edit e delete -->
                        <div class="ui two bottom attached buttons">
                            <!-- Botão delete -->
                            <div class="ui inverted red button delete-button">
                                <i class="trash alternate outline icon"></i>
                                Delete
                            </div>
                            <!-- Botão edit -->
                            <div class="ui inverted green button edit-button">
                                <i class="edit outline icon"></i>
                                Edit
                            </div>
                        </div>
                    </div>`;
            });
            $('#menu-all').append(conteudoMenuAll);

            // Chama a função de deletar Produto
            deleteProduto();

            // Chama a função de editar Produto
            editProduto();
        });
    }

    function carregaMenuBolos() {
        // Limpa o conteúdo atual do menu de bolos
        $('#menu-bolos').empty();

        let conteudoMenuBolos = '';

        $.getJSON(MENU_BOLOS, function (response) {
            // Filtra apenas os produtos com idCategoria igual a 1
            const produtosBolos = response.filter(bolo => bolo.idCategoria === "1");

            // Ordena os produtos em ordem alfabética pelo nome
            produtosBolos.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { caseFirst: 'upper' }));

            // Itera sobre cada produto de bolo
            produtosBolos.forEach((bolo) => {
                conteudoMenuBolos += `
                    <div class="ui card" data-id="${bolo.idProduto}" data-cat="${bolo.idCategoria}">
                        <!-- Imagem do bolo -->
                        <div class="image imagemProduto">
                            <img src="${bolo.foto}">
                            <!-- Coloca o preço no canto direta da esqueda em baixo da imagem -->
                            <div class="ui green basic bottom right attached label precoProduto">
                                R$ ${(bolo.preco)}
                            </div>
                        </div>
                        <div class="content">
                            <!-- Coloca o nome bolo em baixo da imagem -->
                            <div class="header nomeProduto">
                                ${bolo.nome}
                            </div>
                            <!-- Descrição da bedida -->
                            <div class="description descricaoProduto">
                                ${bolo.descricao}
                            </div>
                        </div>
                        <!-- Coloca os botôes de edit e delete -->
                        <div class="ui two bottom attached buttons">
                            <!-- Botão delete -->
                            <div class="ui inverted red button delete-button">
                                <i class="trash alternate outline icon"></i>
                                Delete
                            </div>
                            <!-- Botão edit -->
                            <div class="ui inverted green button edit-button">
                                <i class="edit outline icon"></i>
                                Edit
                            </div>
                        </div>
                    </div>`;
            });
            $('#menu-bolos').append(conteudoMenuBolos);

            // Chama a função de deletar Produto
            deleteProduto();

            // Chama a função de editar Produto
            editProduto();
        });
    }

    function carregaMenuCafes() {
        // Limpa o conteúdo atual do menu de bebidas
        $('#menu-cafes').empty();

        let conteudoMenu = '';

        $.getJSON(MENU_CAFES, function (response) {
            // Filtra apenas os produtos com idCategoria igual a 2
            const produtosCafes = response.filter(cafe => cafe.idCategoria === "2");

            // Ordena os produtos em ordem alfabética pelo nome
            produtosCafes.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { caseFirst: 'upper' }));

            // Itera sobre cada produto de café
            produtosCafes.forEach((cafe) => {
                conteudoMenu += `
                    <div class="ui card" data-id="${cafe.idProduto}" data-cat="${cafe.idCategoria}">
                        <!-- Imagem do cafe -->
                        <div class="image imagemProduto">
                            <img src="${cafe.foto}">
                            <!-- Coloca o preço no canto direta da esqueda em baixo da imagem -->
                            <div class="ui green basic bottom right attached label precoProduto">
                                R$ ${(cafe.preco)}
                            </div>
                        </div>
                        <div class="content">
                            <!-- Coloca o nome cafe em baixo da imagem -->
                            <div class="header nomeProduto">
                                ${cafe.nome}
                            </div>
                            <!-- Descrição da bedida -->
                            <div class="description descricaoProduto">
                                ${cafe.descricao}
                            </div>
                        </div>
                        <!-- Coloca os botôes de edit e delete -->
                        <div class="ui two bottom attached buttons">
                            <!-- Botão delete -->
                            <div class="ui inverted red button delete-button">
                                <i class="trash alternate outline icon"></i>
                                Delete
                            </div>
                            <!-- Botão edit -->
                            <div class="ui inverted green button edit-button">
                                <i class="edit outline icon"></i>
                                Edit
                            </div>
                        </div>
                    </div>`;
            });
            $('#menu-cafes').append(conteudoMenu);

            // Chama a função de deletar Produto
            deleteProduto();

            // Chama a função de editar Produto
            editProduto();
        });
    }

    // Função para o funcionamento do botão DropDown
    function dropdown() {
        $('.ui.dropdown').dropdown();
    };

    function searchBox() {
        let produtos = [];

        // Manipulador de eventos para o botão clear-search
        $('#clear-search').on('click', function () {
            // Limpar o valor do campo de pesquisa
            $('#box-shearch').val('');

            // Exibir todos os produtos novamente
            $('.ui.card').show();

            console.log("Clear field");
        });

        // Verifica se ocorreu digitação no campo de pesquisa
        $('#box-shearch').on('input', function () {
            // Obtém o termo de pesquisa atual
            let searchTerm = $(this).val().trim().toLowerCase();

            // Percorre todos os cards de produtos
            $('.ui.card').each(function () {
                // Obtém o texto do card
                let cardText = $(this).text().toLowerCase();

                // Verifica se o texto do card contém o termo de pesquisa
                if (cardText.includes(searchTerm)) {
                    // Se sim, mostra o card
                    $(this).show();
                } else {
                    // Se não, oculta o card
                    $(this).hide();
                }
            });

            // Verifica se há texto no campo de entrada
            if ($(this).val().trim() !== '') {
                // Se houver texto, muda o ícone da lupa para um ícone de limpar
                $('#clear-search').removeClass('search').addClass('close');
            } else {
                // Se não houver texto, muda o ícone de volta para a lupa
                $('#clear-search').removeClass('close').addClass('search link');
            }
        });
    }

    //Função para Desabilitar/Habilitar o botão "Adicionar Produto"
    function verificarCamponsButton() {
        disableButton();

        // Monitora os campos de input para mudanças em tempo real
        $("#nome-produto, #descricao-produto, #preco-produto").on('input', function () {
            disableButton();
        });

        // Monitora a mudança na dropdown
        $('.ui.dropdown').dropdown({
            onChange: function (value, text, $selectedItem) {
                disableButton();
            }
        });

        function disableButton() {
            let nome_produto = $("#nome-produto").val();
            let descricao_produto = $("#descricao-produto").val();
            let preco_produto = $("#preco-produto").val();

            let categoria_selecionada = $("#categoria-produto").val();

            console.log(categoria_selecionada);

            if (!nome_produto || !descricao_produto || !preco_produto || !categoria_selecionada) {
                $("#btn-adicionar").addClass("disabled");
            } else {
                $("#btn-adicionar").removeClass("disabled");
            };
        };
    };

    // Função para Mascara do campo preço
    function maskPrice() {
        $('#preco-produto').mask('000,00', { reverse: true, placeholder: "000,00" });
        $('#upPreco-produto').mask('000,00', { reverse: true });
    };

    // Função para Adicionar Produto
    function adicionarProduto() {
        $('#btn-adicionarProduto').click(function () {
            $('#form-addProduct').modal('show');
        });

        $("#btn-adicionar").click(function () {
            let urlVazio = $("#imagem-produto").val();

            if (!urlVazio) {
                $('#imagem-produto').val('https://www.quitandadelivery.com/images/geral/sem_foto_big.jpg')
            }

            console.log("---------------------------------------------------------");
            console.log("Nome produto: ", $("#nome-produto").val());
            console.log('Categoria:', $('#categoria-produto').val());
            console.log("Preço:", $('#preco-produto').val());
            console.log("Descrição:", $("#descricao-produto").val());
            console.log("Imagem", $('#imagem-produto').val());
            console.log("---------------------------------------------------------");
            // Realiza a envio dos valores para a API
            $.ajax({
                url: PRODUTO,
                method: 'POST',
                data: {
                    token: '3e27138784ce6fa7dcc5c67971117739b2fadfc7',
                    nome: $('#nome-produto').val(),
                    idCategoria: $('#categoria-produto').val(),
                    foto: $('#imagem-produto').val(),
                    preco: $('#preco-produto').val(),
                    descricao: $('#descricao-produto').val()
                },
                success: function (a, b, c) {
                    // Caso de sucesso fazer
                    if (c.status === 201) {
                        clearFieldsAdd();
                        carregaMenuBolos();
                        carregaMenuAll();
                        carregaMenuCafes();
                        $('.ui.modal').modal('hide');
                        Swal.fire({
                            title: "👍😁",
                            text: "Produto adicionado com sucesso!",
                            timer: 3000,
                            icon: "success",
                            showConfirmButton: false,
                        });
                        // Caso de erro 
                    } else {
                        Swal.fire({
                            title: "Erro!",
                            text: "Produto não cadastrado!",
                            timer: 3000,
                            icon: "error",
                            showConfirmButton: false,
                        });
                    }
                },
                error: function (error) {
                    console.error('Erro:', error);
                }
            });
        });
    };

    // Função para limpar os campos
    function clearFieldsAdd() {
        $("#nome-produto").val('');
        $("#descricao-produto").val('');
        $("#preco-produto").val('');
        $('.ui.dropdown').dropdown('clear');
    };

    function editProduto() {
        $('.edit-button').click(function () {
            $('#form-editProduct').modal('show');
            const cardSelect = $(this).closest(".card");
            const produtoId = cardSelect.data("id");
            const categoriaId = cardSelect.data("cat");

            const nomeProduto = cardSelect.find('.nomeProduto').text().trim();
            const descricaoProduto = cardSelect.find('.descricaoProduto').text().trim();
            const precoProduto = parseFloat(cardSelect.find('.precoProduto').text().trim().replace('R$ ', '').replace(',', '.'));
            const idCategoriaProduto = cardSelect.data('cat');
            const imagemProduto = cardSelect.find('.imagemProduto img').attr('src');

            // Preenchendo os campos do formulário de edição
            $('#upID-produto').val(produtoId);
            $('#upNome-produto').val(nomeProduto);
            $('#upDescricao-produto').val(descricaoProduto);
            $('#upPreco-produto').val(precoProduto);
            // Selecionando a opção correta no dropdown com base no idCategoriaProduto
            $('#upCategoria-produto').dropdown('set selected', idCategoriaProduto);
            $('#upImagem-produto').val(imagemProduto);
        });

        $('#button-edit').off().on('click', function () {
            const cardSelect = $(this).closest(".card");
            const produtoId = cardSelect.data("id");

            let urlVazio = $("#upImagem-produto").val();

            if (!urlVazio) {
                $('#upImagem-produto').val('https://www.quitandadelivery.com/images/geral/sem_foto_big.jpg')
            }

            let produto = {
                nome: $('#upNome-produto').val(),
                idCategoria: $('#upCategoria-produto').val(),
                foto: $('#upImagem-produto').val(),
                preco: $('#upPreco-produto').val(),
                descricao: $('#upDescricao-produto').val()
            };

            $.ajax({
                url: EDIT_PRODUTO,
                method: 'PUT',
                data: {
                    idProduto: $('#upID-produto').val(),
                    produto: JSON.stringify(produto),
                },
                success: function (a, b, c) {
                    // Caso de sucesso fazer
                    if (c.status === 204) {
                        clearFieldsAdd();
                        carregaMenuBolos();
                        carregaMenuAll();
                        carregaMenuCafes();
                        $('.ui.modal').modal('hide');
                        Swal.fire({
                            title: "👍😁",
                            text: "Produto editado com sucesso!",
                            timer: 3000,
                            icon: "success",
                            showConfirmButton: false,
                        });
                        // Caso de erro 
                    } else {
                        Swal.fire({
                            title: "Erro!",
                            text: "Não foi possível editar Produto!",
                            timer: 3000,
                            icon: "error",
                            showConfirmButton: false,
                        });
                    }
                },
                error: function (error) {
                    console.error('Erro:', error);
                }
            });
        });
    }

    // Função para deletar Produto
    function deleteProduto() {
        $('.delete-button').click(function () {
            let cardSelect = $(this).closest(".card");
            let produtoId = cardSelect.data("id");

            let deleteProduto = PRODUTO + '?token=' + token + '&idProduto=' + produtoId;
            console.log(deleteProduto);

            console.log(produtoId);

            Swal.fire({
                title: "Tem certeza?",
                text: "Você não poderá reverter isso!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, exclua-o!",
                cancelButtonText: "Cancelar!"
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: deleteProduto,
                        method: 'DELETE',
                        success: function (a, b, c) {
                            // Caso de sucesso
                            if (c.status === 204) {
                                // Realiza ações de sucesso
                                console.log('Produto excluído com sucesso!');
                                carregaMenuBolos();
                                carregaMenuAll();
                                carregaMenuCafes();
                                // Exemplo de uso do SweetAlert para mostrar uma mensagem de sucesso
                                Swal.fire({
                                    title: "👍😁",
                                    text: "Produto excluído com sucesso!",
                                    timer: 3000,
                                    icon: "success",
                                    showConfirmButton: false,
                                });
                            } else {
                                // Caso de erro
                                console.error('Erro ao excluir produto:', c.statusText);
                                // Exemplo de uso do SweetAlert para mostrar uma mensagem de erro
                                Swal.fire({
                                    title: "Erro!",
                                    text: "Erro ao excluir produto!",
                                    timer: 3000,
                                    icon: "error",
                                    showConfirmButton: false,
                                });
                            }
                        }
                    });
                }
            });
        });
    }

});