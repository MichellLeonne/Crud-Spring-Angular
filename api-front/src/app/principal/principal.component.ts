import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  providers: [ClienteService],
  imports: [CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})

export class PrincipalComponent {

    //Objeto do tipo cliente
    cliente = new Cliente();

    // Variavel para visibilidade dos botões
    btnCadastro:boolean = true;

    //Variavel para visibilidade da tabela
    tabela:boolean = true;

    //JSON de clientes
    clientes:Cliente[] = [];
 
    constructor(private servico:ClienteService){}

    //Metodo de selecão
    selecionar():void{
      this.servico.selecionar()
      .subscribe(retorno => this.clientes = retorno);
    }

    //Metodo de cadastro
    cadastrar():void{
      this.servico.cadastrar(this.cliente)
      .subscribe(retorno => { 
        
        //Cadastrar o cliente no vetor
        this.clientes.push(retorno); 

        //Limpar o formulario
        this.cliente = new Cliente();

        //Mensagem
        alert('Cliente cadastrado com sucesso!');
      });
    }

    //Metodo para selecionar um cliente especifico
    selecionarCliente(posicao:number):void{
     
      //selecionar cliente no vetor
      this.cliente = this.clientes[posicao];

      //visibilidade dos botões
      this.btnCadastro = false;

      //Visibilidade da tabela
      this.tabela = false;
    }

    //Metodo para editar clientes
    editar():void{

      this.servico.editar(this.cliente)
      .subscribe(retorno => {

        //obter posição do vetor onde esta o cliente
        let posicao = this.clientes.findIndex(obj => {
          return obj .codigo == retorno.codigo;
        });

        //Altera os dados do cliente no vetor
        this.clientes[posicao] = retorno;

        //limpar formulario
        this.cliente = new Cliente();

        //visibilidade dos botões
        this.btnCadastro = true;

        //visibilidade da tabela
        this.tabela = true

        //Mensagem
        alert('Cliente alterado com sucesso!');
      })
    }
    //Metodo para remover clientes
    remover():void{

      this.servico.remover(this.cliente.codigo)
      .subscribe(retorno => {

        //obter posição do vetor onde esta o cliente
        let posicao = this.clientes.findIndex(obj => {
          return obj .codigo == this.cliente.codigo;
        });

        //remover cliente do vertor
        this.clientes.splice(posicao, 1);

        //limpar formulario
        this.cliente = new Cliente();

        //visibilidade dos botões
        this.btnCadastro = true;

        //visibilidade da tabela
        this.tabela = true

        //Mensagem
        alert('Cliente removido com sucesso!');        
      })
     }
     
    //Metodo para cancelar
    cancelar(){

      //limpar formulario
      this.cliente = new Cliente();

      //visibilidade dos botões
      this.btnCadastro = true;
 
      //visibilidade da tabela
       this.tabela = true
    }

    //Metodo de inicialização
    ngOnInit(){
      this.selecionar();
    }
}
