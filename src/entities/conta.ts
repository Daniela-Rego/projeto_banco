export  interface ParamsConta{
    cliente: string,
    idade:number,
    numero_conta:number
    saldo: number
    
    
}

export class Conta {

    private props: ParamsConta;
    //private saldo: number;
    
    constructor(atributos: ParamsConta){
        //this.saldo = 1000;
        console.log('entrei class CONTA',atributos)
        this.verificaConta(atributos.numero_conta);
        this.verificarIdade(atributos.idade);
        this.props = atributos;
      
    }

   

    get cliente(){
        return this.props.cliente;  
    }
    get idade(){
        return this.props.idade;  
    }
    get numero_conta(){
        return this.props.numero_conta;  
    }
    //duvida por que os metodos nao podem ter o mesmo nome que saldo ?
    /*get retornaSaldo(){
        return this.saldo;
    } 
    set novoSaldo(value:number){
            this.saldo = value;
    }*/
       
    get saldo(){   
        return this.props.saldo;
    }
    set saldo(value:number){
         this.props.saldo = value;
    }

    private verificaConta(numero_conta: number){
        if(numero_conta == 0){
            console.log("entrei no erro")
            throw new Error('Numero da conta nao pode ser zero');
           }
    }
    private verificarIdade(idade:number){
        if(idade < 18){
            throw new Error('Não pode ser menor que 18 anos');
           }
    }
   
}