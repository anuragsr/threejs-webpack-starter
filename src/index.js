import 'normalize.css/normalize.css'
import './styles/index.scss'

import $ from "jquery"
import BasicScene from './utils/BasicScene'
import { l, cl } from './utils/helpers'

$(() => {
  setTimeout(() => {
    const scene = new BasicScene({ ctn: $("#three-ctn") })
    scene.init()
  }, 50)
})