import { Transfer } from '../entities/transferencia';
import { InMemoryTransferRepository } from '../repository/in-memory/inMemoryTransferRepository';
import { CreateTransfer } from './create-transfer';
import { ContaRepositoryInMemory } from '../repository/in-memory/inMemoryContaRepository';
import { CreateConta } from './create-conta';
import { RequestTransfer } from './request-transfer';

describe('testando a criação de uma classe', () => {
  let createTransfer: CreateTransfer;
  let transferRepositoryInMory: InMemoryTransferRepository;
  let contaRepository: ContaRepositoryInMemory;
  let requestTransfer: RequestTransfer;

  beforeEach(async () => {
    transferRepositoryInMory = new InMemoryTransferRepository();
    contaRepository = new ContaRepositoryInMemory();
    requestTransfer = new RequestTransfer(
      transferRepositoryInMory,
      contaRepository
    );
    createTransfer = new CreateTransfer(
      transferRepositoryInMory,
      contaRepository
    );

    const createContaBodyTest = {
      cliente: 'Daniela',
      idade: 20,
      numero_conta: 1,
      saldo: 1000,
    };
    //Duvida: aqui deveria ser "createContaBodyTest2: Conta" ?
    const createContaBodyTest2 = {
      cliente: 'Dani',
      idade: 21,
      numero_conta: 2,
      saldo: 1000,
    };
    const createConta = new CreateConta(contaRepository);
    await createConta.execute(createContaBodyTest);
    await createConta.execute(createContaBodyTest2);
  });

  it('Salvando uma transferência no banco', async () => {
    const request = {
      numberAccountSender: 1,
      numberAccountRecived: 2,
      valueTransfer: 15,
    };

    console.log('createTransfer teste:', createTransfer);
    const results = await createTransfer.execute(request);
    console.log('results teste', results);
    expect(results).toBeInstanceOf(Transfer);
    expect(results).toHaveProperty('id');
  });

  it('executa uma transferencia com sucesso', async () => {
    const newRequestTransfer = {
      numberAccountSender: 1,
      numberAccountRecived: 2,
      valueTransfer: 15,
    };

    expect(() => {
      createTransfer.execute(newRequestTransfer);
    }).not.toThrow();
  });
});
