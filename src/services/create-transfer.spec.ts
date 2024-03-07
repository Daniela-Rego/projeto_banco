import { Transfer } from "../entities/transferencia"
import { InMemoryTransferRepository } from "../repository/in-memory/inMemoryTransferRepository";
import { CreateTransfer } from "./create-transfer";
import { ContaRepositoryInMemory } from "../repository/in-memory/inMemoryContaRepository";
import { CreateConta } from "./create-conta"
import { RequestTransfer } from "./request-transfer";
import { Conta } from "../entities/conta";
describe("testando a criação da classe Create-Transfer",()=>{ 
 
    
    let contaRepository:ContaRepositoryInMemory;
    let requestTransfer:RequestTransfer;
    let createTransfer:CreateTransfer;
    let transferRepositoryInMory:InMemoryTransferRepository;

    beforeEach(async ()=>{

         transferRepositoryInMory = new InMemoryTransferRepository();
         contaRepository = new ContaRepositoryInMemory();
         requestTransfer = new RequestTransfer(transferRepositoryInMory,contaRepository);
         createTransfer = new CreateTransfer(transferRepositoryInMory, contaRepository,requestTransfer);

        const createContaBodyTest = {
            cliente: "Daniela",
            idade:20,
            numero_conta:1,
            saldo:1000
        }
        //Duvida: aqui deveria ser "createContaBodyTest2: Conta" ?
        const createContaBodyTest2= {
            cliente: "Dani",
            idade:21,
            numero_conta:2,
            saldo:1000
        }
        const createConta = new CreateConta(contaRepository);
       await createConta.execute(createContaBodyTest);
        await createConta.execute(createContaBodyTest2);

    });

    it("executa uma transferencia com sucesso", async () => {
        const request = {
            numberAccountSender: 1,
            numberAccountRecived: 2,
            valueTransfer: 15
        }
        
        console.log("createTransfer teste:", createTransfer);
        const results = await createTransfer.execute(request);
        console.log("results teste", results);
        expect(results).toBeInstanceOf(Transfer);
        expect(results).toHaveProperty("id");
        expect(()=>{createTransfer.execute(request)} ).not.toThrow();
        
    }); 
    //Duvida: Não funciona 
    /*it("Transferencia nao pode ser feito dia final de semana",async()=>{
        const request = new Transfer({ numberAccountSender: 1,
            numberAccountRecived: 2,
            valueTransfer: 15,
            created_at:new Date('2024-02-24')});

             expect(()=>{createTransfer.execute(request)} ).toThrow();
    });*/
       
       
          
        
        
       
     
    

})//describe