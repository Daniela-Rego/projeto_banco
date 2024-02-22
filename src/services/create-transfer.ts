import { Transfer } from "../entities/transferencia"
import { TransferRepository } from "../repository/transferRepository";
import { ContaRepository } from "../repository/contaRepository";
import { RequestTransfer } from "./request-transfer"
//body
export interface CreateTransferRequest {
    numberAccountSender: number,
    numberAccountRecived: Number,
    valueTransfer: number

}

//herda as propriedades da classe Transfer
type CreateTransferResponse = Transfer;

export class CreateTransfer {
    constructor(public repositoryTransfer: TransferRepository, public repositoryConta: ContaRepository, public requestTransfer: RequestTransfer) { }


    async execute(createTransferRequest: CreateTransferRequest): Promise<CreateTransferResponse> {
        console.log("entrei execute transfer", createTransferRequest);
        const accountSender = await this.repositoryConta.procurar(createTransferRequest.numberAccountSender);
        const accountRecived = await this.repositoryConta.procurar(createTransferRequest.numberAccountRecived);
        console.log("no transfer accountSender ", accountSender);
        console.log("no transfer accountRecived ", accountRecived);

        if (accountSender === undefined || accountRecived === undefined) {
            throw new Error('Não foi possível encontrar a conta');
        }

        const transfer = new Transfer(createTransferRequest);

        console.log("sai do transfer ainda no execute", transfer);
        await this.repositoryTransfer.save(transfer);
        
        console.log("Conta existe vamos fazer a transferencia")
        const transferExecute = await this.requestTransfer.executeTransfer(transfer, accountSender.saldo, accountRecived.saldo);
        console.log('transferExecute existe no create transfer?  ', transferExecute)
        if (transferExecute) {
            await this.repositoryConta.update(accountSender,transferExecute.novoSaldoSender);
            await this.repositoryConta.update(accountRecived,transferExecute.novoSaldoReived);
           
        }
        return transfer;

    }

}