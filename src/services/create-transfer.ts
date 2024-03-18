import { Transfer } from "../entities/transferencia"
import { TransferRepository } from "../interfaces/transferRepositoryInterface";
import { ContaRepositoryInterface as ContaRepository  } from "../interfaces/contaRepositoryInterface";
import { RequestTransfer } from "./request-transfer"
import { INewTransfer } from "../interfaces/transferInterface";


export class CreateTransfer {
    constructor(public repositoryTransfer: TransferRepository, public repositoryConta: ContaRepository) { }


    async execute(createTransferRequest: INewTransfer): Promise<Transfer> {
        console.log("entrei execute transfer", createTransferRequest);

        const accountSender = await this.repositoryConta.findAccount(createTransferRequest.numberAccountSender);
        const accountRecived = await this.repositoryConta.findAccount(createTransferRequest.numberAccountRecived);

        console.log("no transfer accountSender ", accountSender);
        console.log("no transfer accountRecived ", accountRecived);

        if (accountSender === undefined || accountRecived === undefined) {
            throw new Error('Não foi possível encontrar a conta');
        }

      
        
        const createdTransfer = await this.repositoryTransfer.save(createTransferRequest);
        
        console.log("Conta existe vamos fazer a transferencia")
       
        return createdTransfer;

    }

}