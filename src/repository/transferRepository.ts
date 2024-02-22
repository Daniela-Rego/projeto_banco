import { Transfer } from "../entities/transferencia";


export interface TransferRepository {
    save(transfer:Transfer): Promise<void>;
    findById(id:any): Promise<Transfer>;
}