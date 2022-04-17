//Rolagem do Tittle na aba do navegador:

message = "Mercado Dev - A sua calculadora de compras! ";

function step() {
    message = message.substr(1) + message.substr(0, 1);
    document.title = message.substr(0, 90);
}

class Item {

    constructor() {
        this.id = 1;
        this.arrayItens = [];
        this.alteraId = null;
    }

    adicionar() {
        let item = this.registros();

        if (this.validacao(item)) {
            if (this.alteraId == null) {
                this.adicionartab(item);
            } else {
                this.atualizartab(this.alteraId, item);
            }
        }

        this.listarTabela();
        this.remover();
    }

    //Adiciona coluna, linhas, checkbox e soma valores

    listarTabela() {
        let tbody = document.getElementById('tabela');
        tbody.innerText = '';

        for (let i = 0; i < this.arrayItens.length; i++) {
            let tr = tbody.insertRow();

            let td_check = tr.insertCell();
            let td_id = tr.insertCell();
            let td_item = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_excluir = tr.insertCell();

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = ('check(' + this.arrayItens[i].id + ')');
            checkbox.setAttribute('onclick', 'item.alterar(' + JSON.stringify(this.arrayItens[i]) + ')');
            let modalBg = document.querySelector('.modal-bg');
            let modalClose = document.querySelector('.modal-fechar');
            checkbox.addEventListener('click', function () {
                modalBg.classList.add('bg-active');
            })
            modalClose.addEventListener('click', function () {
                modalBg.classList.remove('bg-active');
            })

            td_check.appendChild(checkbox);

            td_item.innerText = this.arrayItens[i].nomeProduto;
            td_valor.innerText = this.arrayItens[i].valor;
            td_valor.setAttribute('class', 'valor')

            const imgDel = document.createElement('img');
            imgDel.src = 'imagens/delete.png';
            imgDel.setAttribute("onclick", "item.excluir(" + this.arrayItens[i].id + ")");

            td_excluir.appendChild(imgDel);

            let calc = document.getElementsByClassName("valor");
            let somatorio = 0;
            [].forEach.call(calc, function (as) {
                somatorio += parseFloat(as.innerHTML)
            });

            document.getElementById("resultado_soma").innerHTML = somatorio;

        }
    }

    adicionartab(item) {
        this.arrayItens.push(item);
        this.id++;
    }

    atualizartab(id, item) {
        for (let i = 0; i < this.arrayItens.length; i++) {
            if (this.arrayItens[i].id == id) {
                this.arrayItens[i].nomeProduto = item.nomeProduto;
                this.arrayItens[i].valor = item.valor;
            }
        }
    }

    remover() {
        document.getElementById('item').value = '';
        document.getElementById('add').innerText = 'Adicionar Item'
        this.alteraId = null;
    }

    registros() {
        let item = {}

        item.id = this.id;
        item.nomeProduto = document.getElementById('item').value;
        item.valor = document.getElementById('valor').value;
        return item;
    }

    alterar(edit) {
        this.alteraId = edit.id;
        document.getElementById('item').value = edit.nomeProduto;
        document.getElementById('valor').value = edit.valor;
        document.getElementById('add').innerText = 'Atualizar';
    }

    validacao(item) {

        let msg = '';

        if (item.nomeProduto == '') {
            msg += 'Informe o nome do item \n';
        }

        if (msg != '') {
            alert(msg);
            return false
        }
        return true;
    }

    // exclusão do produto/item
    excluir(id) {

        let tbody = document.getElementById('tabela');

        for (let i = 0; i < this.arrayItens.length; i++) {
            if (this.arrayItens[i].id == id) {
                this.arrayItens.splice(i, 1);
                tbody.deleteRow(i);
            }
        }

        //refaz o calculo após excluir

        let calc = document.getElementsByClassName("valor");
        let somatorio = 0;
        [].forEach.call(calc, function (as) {
            somatorio += parseFloat(as.innerHTML);
        });

        document.getElementById("resultado_soma").innerHTML = somatorio;
    }
}

let item = new Item();