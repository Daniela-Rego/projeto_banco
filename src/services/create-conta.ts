import { Conta } from "../entities/conta"
import { CreatContaRequest } from "../interfaces/contaInterface";
import {  ContaRepositoryInterface } from "../interfaces/contaRepositoryInterface";



/*interface CreatContaRequest{
    cliente: string,
    idade:number,
    numero_conta:number,
    saldo:number
}*/
type CreatContaResponse = Conta;
export class CreateConta {
    constructor( private repository: ContaRepositoryInterface){}
   

    async execute(contaRequest:CreatContaRequest): Promise<CreatContaResponse>{
        console.log('contaRequest_body',contaRequest);
        const createConta = new Conta(contaRequest);
        const contaExiste = await this.repository.findAccount(createConta.numero_conta);
       console.log('contaExiste no execute conta',contaExiste);
        if( contaExiste){
            throw new Error('Numero de conta ja existe');
        }
       
        await this.repository.save(createConta);
        console.log('criou conta',createConta)
        return createConta;

        

    }

   

}