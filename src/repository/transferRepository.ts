import { Transfer } from '../entities/transferencia';
import { INewTransfer } from '../interfaces/transfer.type';

export interface TransferRepository {
  save(transfer: INewTransfer): Promise<Transfer>;
  findById(id: any): Promise<Transfer>;
}
