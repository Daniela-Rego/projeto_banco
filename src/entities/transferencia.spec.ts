import { Transfer } from "./transferencia"

describe("testando a entitie Tranferencia",()=>{

 it("transfer foi declarada",()=>{
    //para verificar que uma variável não "undefined"
    expect(Transfer).toBeDefined();
 })   
    it("Criar uma transferencia ",()=>{
        
        const request = {
            
            numberAccountSender:1,
            numberAccountRecived:2,
            valueTransfer:15
        }
        const response = new Transfer(request);
        console.log("testeee",response);
        expect(response).toBeInstanceOf(Transfer)
    });
    it("Nao é possivel criar uma transferecia quando o numberContaSender é 0 ",()=>{
        const request = {
            numberAccountSender:0,
            numberAccountRecived:2,
            valueTransfer:15
        }
       
        
       expect(()=>{new Transfer(request)}).toThrow(Error);
      
    });
    

 
})

