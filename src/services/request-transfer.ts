import { Transfer } from "../entities/transferencia"
import { TransferRepository } from "../repository/transferRepository";
import { ContaRepository } from "../repository/contaRepository";

//Duvida, devo usar o type mesmo ?
type TransferExecute = {
    novoSaldoReived:number,
    novoSaldoSender: number
}

export class RequestTransfer {
    constructor( public repositoryTransfer: TransferRepository,public repositoryConta: ContaRepository) { }

    
    async executeTransfer(transfer, saldoSender, saldoRecived): Promise<TransferExecute> {
        //tenho que pegar o saldo das duas contas passar para fazer a diminuição do saldo entre as contas
        const transferEncontrada = await this.repositoryTransfer.findById(transfer.params.id);
        if(!transferEncontrada){
            throw new Error("Requisição de transferencia nao encontrada")
        }
        let transferExecute: TransferExecute;
        transferExecute = await this.transferRequest(transfer.valueTransfer, saldoSender, saldoRecived);
        console.log('transferExecute existe? no requestTransfer ', transferExecute)
       
       

        return transferExecute;

    }
    async transferRequest(valueTransfer, saldoSender, saldoRecived) {
        console.log("entrei V2,", saldoSender, saldoRecived);

        const novoSaldoReived = saldoRecived + valueTransfer;
        const novoSaldoSender = saldoSender - valueTransfer;

        return { novoSaldoReived, novoSaldoSender };


    }

}