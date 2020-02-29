import $ from 'jquery'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

import GUI from './utils/gui'
import { l, cl } from './utils/helpers'

export default class THREEStarter {
  constructor(opts){
    this.ctn = opts.ctn
    this.w = this.ctn.width()
    this.h = this.ctn.height()
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(45, this.w / this.h, 1, 10000)

    this.origin = new THREE.Vector3(0, 0, 0)
    this.cameraStartPos = new THREE.Vector3(0, 500, 0)
    this.axesHelper = new THREE.AxesHelper(500)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.floor = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000, 32, 32),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('pink'), side: THREE.DoubleSide,
        transparent: true, opacity: .1, wireframe: true
      })
    )

    this.spotLightMesh1 = new THREE.Mesh(
      new THREE.SphereGeometry(5, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2),
      new THREE.MeshPhongMaterial({ color: 0xffff00 })
    )
    this.spotLight1 = new THREE.DirectionalLight(0xffffff, 1)
    this.lightPos1 = new THREE.Vector3(500, 350, 500)
    this.spotLightMesh2 = new THREE.Mesh(
      new THREE.SphereGeometry(5, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2),
      new THREE.MeshPhongMaterial({ color: 0xffff00 })
    )
    this.spotLight2 = new THREE.DirectionalLight(0xffffff, 1)
    this.lightPos2 = new THREE.Vector3(-500, 350, -500)
  }
  init(){
    let { 
      ctn, w, h,
      camera, scene, renderer,
      cameraStartPos, origin, floor,
      spotLightMesh1, spotLight1, lightPos1,
      spotLightMesh2, spotLight2, lightPos2
    } = this

    // Renderer settings
    renderer.setClearColor(0x000000, 1)    
    renderer.setSize(w, h)
    $(renderer.domElement).css({
      position: "absolute",
      top: 0, left: 0
    })
    ctn.append(renderer.domElement)

    // Cameras and ambient light
    camera.position.copy(cameraStartPos)
    camera.lookAt(origin)
    scene.add(camera)    
    scene.add(new THREE.AmbientLight(0xffffff, .2))

    // Spotlight and representational mesh
    spotLightMesh1.position.copy(lightPos1)  
    spotLight1.position.copy(lightPos1)
    scene.add(spotLight1)    
    
    spotLightMesh2.position.copy(lightPos2)
    spotLight2.position.copy(lightPos2)
    scene.add(spotLight2)

    // Plane  
    floor.rotation.x = Math.PI / 2
    
    // Initialize the scene
    this.initGUI()
    this.toggleHelpers(1)
    this.addObjects()
    this.addListeners()
  }
  initGUI() {
    let guiObj = new GUI()
    , gui = guiObj.gui
    , params = guiObj.getParams()

    let he = gui.add(params, 'helpers')
    he.onChange(value => this.toggleHelpers(value))

    gui.add(params, 'getState')
    gui.add(params, 'message')
  }
  toggleHelpers(val){
    let {
      scene, floor, axesHelper, 
      spotLightMesh1, spotLightMesh2
    } = this
    if(val){
      scene.add(floor)
      scene.add(axesHelper)
      scene.add(spotLightMesh1)
      scene.add(spotLightMesh2)
    } else{
      scene.remove(floor)
      scene.remove(axesHelper)
      scene.remove(spotLightMesh1)
      scene.remove(spotLightMesh2)
    }
  }
  addObjects(){
    let { scene } = this
    , geometry = new THREE.CylinderGeometry( 150, 150, 50, 32, 1, true )
    , material = new THREE.MeshBasicMaterial( { wireframe: true, color: 0xffffff} )
    , cylinder = new THREE.Mesh( geometry, material )

    cylinder.position.set(0, 25, 0)
    scene.add( cylinder )
  }  
  render() {
    let { renderer, scene, camera } = this
    renderer.render(scene, camera)
    // try{
    //   renderer.render(scene, camera)
    // } catch (err){
    //   l(err)
    //   TweenLite.ticker.removeEventListener("tick", render)
    // }
  }
  resize() {
    let {
      w, h, ctn, camera, renderer
    } = this
    
    w = ctn.width()
    h = ctn.height()
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  
    // splineCamera.aspect = w / h
    // splineCamera.updateProjectionMatrix()
  
    renderer.setSize(w, h)
  }
  addListeners(){
    gsap.ticker.add(this.render.bind(this))
    window.addEventListener("resize", this.resize.bind(this), false)
  }
}