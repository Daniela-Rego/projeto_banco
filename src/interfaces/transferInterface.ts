export interface ITransfer {
    numberAccountSender: number;
    numberAccountRecived: number;
    valueTransfer: number;
    created_at: Date;
    id: string;
  }
  
  export interface INewTransfer {
    numberAccountSender: number;
    numberAccountRecived: number;
    valueTransfer: number;
  }
  