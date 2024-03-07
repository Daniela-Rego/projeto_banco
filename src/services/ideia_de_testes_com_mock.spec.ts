import { Transfer } from "../entities/transferencia"
import { InMemoryTransferRepository } from "../repository/in-memory/inMemoryTransferRepository";
import { CreateTransfer } from "./create-transfer";
import { ContaRepositoryInMemory } from "../repository/in-memory/inMemoryContaRepository";
import { CreateConta } from "./create-conta"
import { RequestTransfer } from "./request-transfer";
import  mocks  from "./_mocks_/Arq.mockTransferRepository"

describe("",()=>{
   console.log
   /* Ideia>>  {
      numberAccountSender: 1,
      numberAccountRecived: 2,
      valueTransfer: 15,
      id: '80000000-0193-44d8-bbac-e687771b5ac8',
      created_at: 2024-03-04T01:58:31.000Z
    } */
  test('Transferência não ocorre em sábado ou domingo', async () => {
    const transferMock= mocks.params;
   
    const mockTransferRepository = mocks;
      
      const mockContaRepository = {
        procurar: jest.fn(() => Promise.resolve({}))(),
        update: jest.fn(() => Promise.resolve({}))(),
      };
      
      const mockRequestTransfer = {
        executeTransfer: jest.fn(() => Promise.resolve({}))(),
      };
    const createTransfer = new CreateTransfer(
      mockTransferRepository,
      mockContaRepository,
      mockRequestTransfer 
    );

    // Defina uma data de sábado (6) ou domingo (0)
    const dataFinalDeSemana = new Date('2024-02-25T12:00:00.000Z');

    // Chame o método execute com uma data de final de semana (deveria falhar)
    await expect(createTransfer.execute({
      numberAccountSender: 123,
      numberAccountRecived: 456,
      valueTransfer: 100,
      created_at: dataFinalDeSemana,
    })).rejects.toThrow('Transferencias não podem ser feitas em final de semana');

    // Verifique se os métodos dos repositórios não foram chamados
    expect(mockTransferRepository.save).not.toHaveBeenCalled();
    expect(mockContaRepository.procurar).not.toHaveBeenCalled();
    expect(mockContaRepository.update).not.toHaveBeenCalled();
    expect(mockRequestTransfer.executeTransfer).not.toHaveBeenCalled();
  });

  // Outros
   
})



  
        