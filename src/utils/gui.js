import * as dat from 'dat.gui'
import { l, cl } from './helpers'

export default class GUI{
  constructor(){
    this.gui = new dat.GUI()
  }
  getParams(){
    return {
      helpers: true, 
      message: 'Customize here',
      getState: function () { l(this) },
    }
  }
}