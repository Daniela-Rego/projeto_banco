import { ContaRepository } from "../repository/contaRepository";
import { CreateConta } from "../services/create-conta";
import { ContaRepositoryInterface } from "../interfaces/contaRepositoryInterface";
import { CreatContaRequest } from "../interfaces/contaInterface";

export class AccountController{
  
    constructor(){}
//duvida o req é any mesmo ?
 async createAccount(req:any, res:any): Promise<void>{

        console.log("entrei controllers2");
        //duvida: devo utilizar ContaRepositoryInMemory ou ContaRepository ?
       const contaRepository = new ContaRepository;
        const createConta = new CreateConta(contaRepository);
        console.log("req.body",req.body)
       await createConta.execute(req.body)
        res.send('criação de conta ok')
    }
}
