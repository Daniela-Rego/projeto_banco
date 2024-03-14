import { Transfer } from "../entities/transferencia";


export interface TransferRepository {
    save(transfer:INewTransfer): Promise<Transfer>;
    findById(id:any): Promise<Transfer>;
}