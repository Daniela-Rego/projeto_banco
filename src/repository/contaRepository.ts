import { Conta } from '../entities/conta';

export interface ContaRepository {
  save(conta: Conta): Promise<void>;
  procurar(numeroConta: Number): Promise<Conta | undefined>;
  update(account: number, novoSaldo: number): Promise<Conta>;
}
