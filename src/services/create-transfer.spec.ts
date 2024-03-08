import { Transfer } from '../entities/transferencia';
import { InMemoryTransferRepository } from '../repository/in-memory/inMemoryTransferRepository';
import { CreateTransfer } from './create-transfer';
import { ContaRepositoryInMemory } from '../repository/in-memory/inMemoryContaRepository';
import { CreateConta } from './create-conta';
import { RequestTransfer } from './request-transfer';
import { InMemoryMockedTransferRepository } from '../test/repository/inMemoryMockedTransferRepository';

describe('testando a criação da classe Create-Transfer', () => {
  let inMemoryContaRepository: ContaRepositoryInMemory;
  let inMemoryTransferRepository: InMemoryTransferRepository;
  let inMemoryMockedTransferRepository: InMemoryMockedTransferRepository;
  let requestTransfer: RequestTransfer;
  let mockedRequestTransfer: RequestTransfer;
  let createTransfer: CreateTransfer;
  let mockedCreateTransfer: CreateTransfer;

  beforeEach(async () => {
    inMemoryTransferRepository = new InMemoryTransferRepository();
    inMemoryMockedTransferRepository = new InMemoryMockedTransferRepository();
    inMemoryContaRepository = new ContaRepositoryInMemory();

    requestTransfer = new RequestTransfer(
      inMemoryTransferRepository,
      inMemoryContaRepository
    );

    mockedRequestTransfer = new RequestTransfer(
      inMemoryMockedTransferRepository,
      inMemoryContaRepository
    );

    createTransfer = new CreateTransfer(
      inMemoryTransferRepository,
      inMemoryContaRepository
    );

    mockedCreateTransfer = new CreateTransfer(
      inMemoryMockedTransferRepository,
      inMemoryContaRepository
    );

    const createContaBodyTest = {
      cliente: 'Daniela',
      idade: 20,
      numero_conta: 1,
      saldo: 1000,
    };

    const createContaBodyTest2 = {
      cliente: 'Dani',
      idade: 21,
      numero_conta: 2,
      saldo: 1000,
    };

    const createConta = new CreateConta(inMemoryContaRepository);

    await createConta.execute(createContaBodyTest);
    await createConta.execute(createContaBodyTest2);
  });

  it('Cria uma transferencia com sucesso', async () => {
    const request = {
      numberAccountSender: 1,
      numberAccountRecived: 2,
      valueTransfer: 15,
    };

    expect(() => {
      createTransfer.execute(request);
    }).not.toThrow();

    const transferResult = await createTransfer.execute(request);

    expect(transferResult).toBeInstanceOf(Transfer);
    expect(transferResult).toHaveProperty('id');
  });

  it('Não executa uma transferencia no final de semana', async () => {
    const request = {
      numberAccountSender: 1,
      numberAccountRecived: 2,
      valueTransfer: 15,
    };

    const transferResult = await mockedCreateTransfer.execute(request);

    expect(() => {
      mockedRequestTransfer.executeTransfer(transferResult, 1000, 1000);
    }).toThrow(Error);
  });
});
