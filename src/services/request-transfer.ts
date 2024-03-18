import { Transfer } from "../entities/transferencia"
import { TransferRepository } from "../interfaces/transferRepositoryInterface";
import { ContaRepositoryInterface } from "../interfaces/contaRepositoryInterface";
import { ITransfer } from "../interfaces/transferInterface";

export class RequestTransfer {
    constructor( public repositoryTransfer: TransferRepository,public repositoryConta: ContaRepositoryInterface) { }

    
    async executeTransfer(transfer:ITransfer, saldoSender:number, saldoRecived:number): Promise<Transfer> {
        const transferEncontrada = await this.repositoryTransfer.findById(transfer.id);
        
        if(!transferEncontrada){
            throw new Error("Requisição de transferencia nao encontrada")
        }

        this.verifyIfWeekeend(transferEncontrada.created_at);
       
        const novoSaldoReived =
        saldoRecived + Number(transferEncontrada.valueTransfer);
      const novoSaldoSender =
        saldoSender - Number(transferEncontrada.valueTransfer);
  
      await this.repositoryConta.update(
        transferEncontrada.numberAccountSender,
        novoSaldoSender
      );
  
      await this.repositoryConta.update(
        transferEncontrada.numberAccountRecived,
        novoSaldoReived
      );
  
      return transferEncontrada;

    }
    async verifyIfWeekeend(date: Date) {
        const dayOfWeek = date.getDay();
    
        if (dayOfWeek == 5 || dayOfWeek == 6) {
          throw new Error(
            'Não é possível realizar transferencia no final de semana'
          );
        }
        return;
      }

  /* async function validaFeriado(date) {

            const url='https://brasilapi.com.br/api/feriados/v1/2024';
            const listaFeriados = await axios.get(url);
            console.log('listaFeriados::',listaFeriados)
            console.log("typeof de listaFeriados:::>>",typeof(listaFeriados));
        } */  

}