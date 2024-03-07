import { v4 as uuidv4 } from 'uuid';



//parametros que a conta usa
export interface ParamsTransfer{
  numberAccountSender: Number ,
  numberAccountRecived: Number,
  valueTransfer: Number,
  created_at?: Date,
  id?: string
  
  
}

export class Transfer {
  private params: ParamsTransfer;


  constructor(attributes: ParamsTransfer) {
    this.isValidate(attributes);
    this.params = attributes;
    this.params.id = uuidv4();
    //this.params.created_at= "2024-02-27T02:02:45.086Z" 
    this.params.created_at = new Date()
    console.log("parametros do transfer", this.params)

  }

  get numberAccountSender() {
    return this.params.numberAccountSender;
  }

  get numberAccountRecived() {
    return this.params.numberAccountRecived;
  }

  get valueTransfer() {
    return this.params.valueTransfer;
  }
  get id() {
    return this.params.id;
  }

get created_at(){
  return this.params.created_at;
}
set created_at(value){
   this.params.created_at = value;
}

  isValidate(attributes: ParamsTransfer) {
    const { numberAccountSender, numberAccountRecived, valueTransfer } = attributes;
    if (!!numberAccountSender && !!numberAccountRecived && !!valueTransfer) {

      return;
    }
    throw new Error('Numero da conta inavlido');
  }
}