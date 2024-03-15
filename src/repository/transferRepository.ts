import { Transfer } from "../entities/transferencia";
import { INewTransfer } from "../interfaces/transferInterface";

export interface TransferRepository {
    save(transfer:INewTransfer): Promise<Transfer>;
    findById(id:any): Promise<Transfer>;
    // findAllByConta(conta:any): Promise<Transfer>;
}