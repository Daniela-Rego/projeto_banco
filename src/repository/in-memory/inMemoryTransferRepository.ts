import { Transfer } from '../../entities/transferencia';
import { INewTransfer } from '../../interfaces/transfer.type';
import { TransferRepository } from '../transferRepository';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryTransferRepository implements TransferRepository {
  private transfers: Transfer[] = [];

  async save(transfer: INewTransfer) {
    const date = new Date();
    const id = uuidv4();

    const newTransfer = new Transfer({
      numberAccountSender: transfer.numberAccountSender,
      numberAccountRecived: transfer.numberAccountRecived,
      valueTransfer: transfer.valueTransfer,
      created_at: date,
      id: id,
    });

    this.transfers.push(newTransfer);

    return newTransfer;
  }

  async findById(id: any) {
    console.log('findById::', id);
    console.log('findById this.transfers', this.transfers);
    const transferEncontrada = this.transfers.filter((transfer) => {
      return transfer.id === id;
    });
    console.log('transfer no findbyid', transferEncontrada);
    return transferEncontrada[0];
  }
}
