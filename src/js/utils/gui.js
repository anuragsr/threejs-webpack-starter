import * as dat from 'dat.gui'

export default class GUI{
  constructor(params){
    this.params = params
    this.gui = new dat.GUI()
  }
  getParams(){ return this.params }
}