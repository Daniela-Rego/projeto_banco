import { Conta } from "../../entities/conta";
import { ContaRepository } from "../contaRepository";

export class ContaRepositoryInMemory implements ContaRepository{
    private contas: Conta[] = [] 
    
     async save(conta: Conta): Promise<void> {
       const insertArray = this.contas.push(conta);
       console.log('insertArray repository: ',insertArray);
       console.log('depois do insert: ',this.contas);
     }
     async procurar(numeroConta:Number): Promise<Conta| undefined>{
        console.log('entrou em procurar conta',numeroConta);
        console.log("this.contas procurar conta",this.contas)
       
        let contaEncontrada = this.contas.find((item)=> {
          console.log("nConta no find de contas",item);
         return item.numero_conta == numeroConta
        });
        
        console.log('contaEncontrada no procurar contas: ',contaEncontrada);

        return contaEncontrada;
     }
    async update(account:Conta,novoSaldo:number): Promise<Conta> {
      account.saldo = novoSaldo;
      console.log(' accountdepois da transferencia', account);
      return account;
    
     }
}

