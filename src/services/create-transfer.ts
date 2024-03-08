import { Transfer } from '../entities/transferencia';
import { TransferRepository } from '../repository/transferRepository';
import { ContaRepository } from '../repository/contaRepository';
import { INewTransfer } from '../interfaces/transfer.type';

export class CreateTransfer {
  constructor(
    public repositoryTransfer: TransferRepository,
    public repositoryConta: ContaRepository
  ) {}

  async execute(createTransferRequest: INewTransfer): Promise<Transfer> {
    console.log('entrei execute transfer', createTransferRequest);

    const accountSender = await this.repositoryConta.procurar(
      createTransferRequest.numberAccountSender
    );

    const accountRecived = await this.repositoryConta.procurar(
      createTransferRequest.numberAccountRecived
    );

    console.log('no transfer accountSender ', accountSender);
    console.log('no transfer accountRecived ', accountRecived);

    if (accountSender === undefined || accountRecived === undefined) {
      throw new Error('Não foi possível encontrar a conta');
    }

    const createdTransfer = await this.repositoryTransfer.save(
      createTransferRequest
    );

    return createdTransfer;
  }
}
