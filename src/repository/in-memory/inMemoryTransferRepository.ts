import { Transfer } from "../../entities/transferencia";
import { TransferRepository } from "../transferRepository";


export class InMemoryTransferRepository implements  TransferRepository {
    private transfers: Transfer[] = [];

    async save(transfer: Transfer): Promise<void>{
        console.log("Salvando transferência",transfer);
        this.transfers.push(transfer);
       console.log("save InMemoryTransferRepository::",this.transfers)
        
    };
   async  findById(id: any):Promise<Transfer>{
        console.log("findById::",id);
        console.log("findById this.transfers",this.transfers);
        const transferEncontrada = this.transfers.filter((transfer)=>{return transfer.id === id })
       console.log("transfer no findbyid",transferEncontrada);
       return transferEncontrada[0];
    };
}