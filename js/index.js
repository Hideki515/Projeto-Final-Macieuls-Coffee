$(document).ready(function () {
    const MENU_BOLOS = 'https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/v2/produto.php?token=3e27138784ce6fa7dcc5c67971117739b2fadfc7&idCategoria=1';

    const ADD_PEDIDO = 'https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/v2/pedido.php';

    const ADD_PRODUTO = 'https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/v2/pedido.php';

    let token = '3e27138784ce6fa7dcc5c67971117739b2fadfc7';

    let arrPedido = [];

    init();

    // Chama as funções necessárias para o funcionamento do programa
    function init() {
        componentInit();
        carregaMenuBolos();
        addRemoveItem();
        limparPedido();
        limparPedidoBtn();
        checkOrder();
        order();
        // Chama a função dropDown
        dropdown();
        // Chama a função que desabilita o botão caso os campos estejam vazios
        btn();
        // disableButton();
        // Chama a função de Adicionar Produtos
        // adicionarProduto();
    }

    function componentInit() {
        $.tab();
        $.tab('change tab', 'tab-bolos');
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

    function checkOrder() {
        $('#btn-confirmar').click(function () {
            $('#resumo-pedido').empty();
            $('.ui.modal').modal('show');
            let arrQuantidade = $('.quantidade');
            let nomeProduto;
            let valorUnitario;
            let valorTotal;
            let valorTotalPedido = 0;
            let conteudoResumo = '';
            let obj;

            // $('.quantidade').each(function(){
            //     console.log('--->', $(this).text());
            // });

            $.each(arrQuantidade, function (index, value) {
                quantidade = $(this).text();
                if (quantidade > 0) {
                    obj = {};
                    nomeProduto = $(this).attr('data-name');
                    valorUnitario = $(this).attr('data-price');
                    valorTotal = parseInt(quantidade) * valorUnitario;
                    valorTotalPedido += valorTotal;

                    // {nome: 'Ameixa', quantidade: '2'}
                    obj.nome = nomeProduto;
                    obj.quantidade = quantidade;
                    arrPedido.push(obj);

                    conteudoResumo += ` <tr>
                                            <td class="collapsing">${nomeProduto}</td>
                                            <td class="collapsing ui center aligned">${quantidade}</td>
                                            <td class="collapsing right">${us2brl(valorTotal)}</td>
                                        </tr>`;
                }
            });

            $('#resumo-pedido').append(conteudoResumo);
            $('#valor-total').text(us2brl(valorTotalPedido));

        });
    }

    function order() {
        $('#btn-realizar-pedido').click(function () {
            $.ajax({
                url: ADD_PEDIDO,
                method: 'POST',
                data: {
                    token: 'FE1508',
                    mesa: $('#numero-mesa').val(),
                    total: $('#valor-total').text(),
                    pedido: JSON.stringify(arrPedido)
                },
                success: function (a, b, c) {

                    if (c.status === 201) {
                        limparPedido();
                        $('.ui.modal').modal('hide');
                        Swal.fire({
                            title: "Uhulll",
                            text: "Pedido realizado com sucesso!",
                            timer: 3000,
                            icon: "success",
                            showConfirmButton: false,
                        });
                    } else {
                        Swal.fire({
                            title: "Erro!",
                            text: "Faça o pedido novamente!",
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

    function addRemoveItem() {
        $('#menu-bolos').on('click', '.adicionar-remover-item', function () {
            let $element = $(this).parent().find('.quantidade');
            let operacao = $(this).attr('data-item');
            let quantidade = operacao === 'del' ? parseInt($element.text()) - 1 : parseInt($element.text()) + 1;
            quantidade = quantidade < 0 ? 0 : quantidade;
            $element.text(quantidade);
        });
    }

    function limparPedido() {
        $('.quantidade').text('0');
        $('#numero-mesa').val('');
    }

    function limparPedidoBtn() {
        $('#btn-limpar-pedido').click(function () {
            limparPedido();
        });
    }

    function carregaMenuBolos() {
        let conteudoMenu = '';
        $.getJSON(MENU_BOLOS, function (response) {
            response.forEach((item) => {
                conteudoMenu += `<div class="ui card fluid">
                                              <div class="ui top brown attached label">${item.nome}</div>
                                              <div class="blurring dimmable image">
                                                  <div class="ui dimmer">
                                                      <div class="content">
                                                          <div class="center">
                                                              <div class="ui inverted button">${item.descricao}</div>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div class="ui green bottom right attached label">${us2brl(item.preco)}</div>
                                                  <img src="${item.foto}">
                                              </div>
                                              <div class="extra content">
                                                  <div class="ui three buttons">
                                                      <div class="ui icon button basic adicionar-remover-item" data-item="del">
                                                          <i class="minus icon"></i>
                                                      </div>
                                                      <div class="ui basic button quantidade" data-name="${item.nome}" data-price="${item.preco}">0
                                                      </div>
                                                      <div class="ui icon button basic adicionar-remover-item" data-item="add">
                                                          <i class="add icon"></i>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>`;
            });
            $('#menu-bolos').append(conteudoMenu);

        });

        // $.ajax({
        //     url: MENU_BOLOS,
        //     method: 'GET',
        //     dataType: 'json',
        //     success: function (response) {
        //         response.forEach((item) => {
        //             conteudoMenu += `<div class="ui card fluid">
        //                                 <div class="ui top brown attached label">${item.nome}</div>
        //                                 <div class="blurring dimmable image">
        //                                     <div class="ui dimmer">
        //                                         <div class="content">
        //                                             <div class="center">
        //                                                 <div class="ui inverted button">${item.descricao}</div>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                     <div class="ui green bottom right attached label">${item.preco}</div>
        //                                     <img src="${item.foto}">
        //                                 </div>
        //                                 <div class="extra content">
        //                                     <div class="ui three buttons">
        //                                         <div class="ui icon button basic adicionar-remover-item" data-item="del">
        //                                             <i class="minus icon"></i>
        //                                         </div>
        //                                         <div class="ui basic button quantidade">0
        //                                         </div>
        //                                         <div class="ui icon button basic adicionar-remover-item" data-item="add">
        //                                             <i class="add icon"></i>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>`;
        //         });
        //         $('#menu-bolos').append(conteudoMenu);
        //     },
        //     error: function (error) {
        //         console.log(error);
        //     }
        // });
    }
});

// Função para o funcionamento do botão DropDown
function dropdown() {
    $('.ui.dropdown')
        .dropdown();
};

// Função para desabilitar o botăo "Adicionar Produto" caso tenha campos obrigatorios vazios
// $(document).ready(function() {
//     // Chama a função disableButton inicialmente para verificar o estado dos campos ao carregar a página
//     disableButton();

//     // Monitora os campos de input para mudanças em tempo real
//     $("#nome-produto, #descricao-produto, #preco-produto").on('input', function() {
//         disableButton();
//     });

//     // Monitora a mudança na dropdown
//     $('.ui.dropdown').dropdown({
//         onChange: function(value, text, $selectedItem) {
//             disableButton();
//         }
//     });

//     function disableButton() {
//         let nome_produto = $("#nome-produto").val();
//         let descricao_produto = $("#descricao-produto").val();
//         let preco_produto = $("#preco-produto").val();
//         // let categoria_produto = $('.ui.dropdown').dropdown('get text')[1].trim();

//         let categoria_produto_selecionada = $('.ui.dropdown .item.selected'); 
//         let categoria_produto = categoria_produto_selecionada.length > 0 ? categoria_produto_selecionada.text().trim() : '';

//         if (!nome_produto || !descricao_produto || !preco_produto || !categoria_produto) {
//             $("#btn-adicionar").toggleCla("disabled");
//             // $("#btn-adicionar").addClass("disabled");
//             // $("#btn-adicionar").hide();
//         } else {
//             $("#btn-adicionar").removeClass("disabled"); 
//             // $("#btn-adicionar").show();
//         };
//     };
// });

function btn() {
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
        // let categoria_produto = $('.ui.dropdown').dropdown('get value');

        let categoria_selecionada = $('.ui.dropdown').dropdown('get text')[1].trim();

        console.log(categoria_selecionada);

        if (!nome_produto || !descricao_produto || !preco_produto) {
            $("#btn-adicionar").addClass("disabled");
        } else {
            categoria_selecionada !== "Selecione a categoria do produto" ? $("#btn-adicionar").removeClass("disabled") : null;
        };
    };
};

// Função para Adicionar Produto
function adicionarProduto() {
    $("#btn-adicionar").click(function () {
        let categoria_produto;

        let categoria_selecionada = $('.ui.dropdown').dropdown('get text')[1].trim();

        // Mapeamento do texto da categoria para o ID da categoria
        if (categoria_selecionada === "Bolos") {
            categoria_produto = "1";
        } else if (categoria_selecionada === "Bebidas") {
            categoria_produto = "2";
        } else {
            console.log("Categoria não reconhecida."); // Tratar outros casos conforme necessário
            return;
        }

        console.log("Categoria selecionada:", categoria_selecionada);

        console.log("ID da categoria selecionada", categoria_produto);

        // Realiza a envio dos valores para a API
        $.ajax({
            url: ADD_PRODUTO,
            method: 'POST',
            data: {
                token: '3e27138784ce6fa7dcc5c67971117739b2fadfc7',
                nome: $('#nome-produto').val(),
                descricao: $('#descricao-produto').val(),
                idCategoria: $("#categoria_produto").text(),
                preco: $('#preco-produto').val(),
                foto: $('#imagem-produto').val()
            },
            success: function (a, b, c) {

                if (c.status === 201) {
                    clearFieldsAdd();
                    $('.ui.modal').modal('hide');
                    Swal.fire({
                        title: "Uhulll",
                        text: "Produto adicionado com sucesso!",
                        timer: 3000,
                        icon: "success",
                        showConfirmButton: false,
                    });
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
    function limparCampos() {
        $("#nome-produto").val('');
        $("#descricao-produto").val('');
        $("#preco-produto").val('');
        $('.ui.dropdown').dropdown('clear');
    }
};