import { TransferRepository } from "../interfaces/transferRepositoryInterface";
import { ContaRepositoryInterface } from "../interfaces/contaRepositoryInterface";
import { ContaRepositoryInMemory } from "../repository/in-memory/inMemoryContaRepository";
import { InMemoryTransferRepository } from '../repository/in-memory/inMemoryTransferRepository';
import { CreateTransfer } from "../services/create-transfer";

export class TransferController{
    async createTransfer(req:any, res:any){
        const transferRepositoryInMory= new InMemoryTransferRepository();
        const contaRepository = new ContaRepositoryInMemory();
        const createTranfer = new CreateTransfer(transferRepositoryInMory,contaRepository);

        await createTranfer.execute(req.body);
        
        return res.status(201).send('transferencia criada')
       
  
    }
}