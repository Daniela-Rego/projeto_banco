import { v4 as uuidv4 } from 'uuid';

//parametros que a conta usa
export interface ParamsTransfer{
  numberAccountSender:number,
  numberAccountRecived:Number,
  valueTransfer:number
  id?:uuidv4;
  created_at?:Date
}

export class Transfer{
  private params:ParamsTransfer;


  constructor(attributes:ParamsTransfer){
    this.isValidate(attributes);
    this.params = attributes;
    this.params.id =uuidv4();
    console.log("parametros do transfer",this.params)
   
  }

  get numberAccountSender(){
    return this.params.numberAccountSender;
  }

  get numberAccountRecived(){
    return this.params.numberAccountRecived;
  }

  get valueTransfer(){
    return this.params.valueTransfer;
  }
   get id(){
    return this.params.id;
   }




  isValidate(attributes:ParamsTransfer){
    const {numberAccountSender,numberAccountRecived,valueTransfer}= attributes;
        if(!!numberAccountSender && !!numberAccountRecived && !!valueTransfer ){
          
          return;
       }
         throw new Error('Numero da conta inavlido');
  }
}