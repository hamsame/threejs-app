import * as THREE from "three"
import "./style.css"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import GUI from "lil-gui"
const loader = new GLTFLoader()
import model from "./soldier.glb"
import gsap from "gsap"

const scene = new THREE.Scene()
const gui = new GUI()

const size = {
  width: 800,
  height: 600,
}

const { width, height } = size

const camera = new THREE.PerspectiveCamera(25, width / height)
scene.add(camera)

const canvas = document.querySelector("canvas.webgl")
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(width, height)

const light = new THREE.DirectionalLight("#fff", 10)
const lighs = new THREE.DirectionalLight("#fff", 10)
// x,y,z
light.position.set(1, 1, 10)
lighs.position.set(1, 1, -10)
scene.add(light)
scene.add(lighs)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

var ob
const animate = () => {
  controls.update()
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

var params = {
  color: 0xff0000,
  move: () => {
    gsap.to(ob.position, { duration: 1, x: ob.position.x - 0.5 })
  },
  rotate90deg: () => {
    gsap.to(ob.rotation, { duration: 0.1, y: ob.rotation.y + Math.PI * 0.5 })
  },
}

const scaleObj = () => {
  let scaleFactor = ob.scale.x
  ob.scale.set(scaleFactor, scaleFactor, scaleFactor)
}

loader.load(model, (glb) => {
  ob = glb.scene
  scene.add(ob)
  ob.rotation.y = 3.15
  const posFolder = gui.addFolder("Object Positioning")
  posFolder.add(ob.position, "x", -3, 3).name("horizontal position")
  posFolder.add(ob.position, "y", -3, 3).name("vertical position")
  posFolder.add(ob.position, "z", -30, 3).name("closeness")
  posFolder.add(params, "move").name("Move obj left")

  const transformations = gui.addFolder("Transform Object")
  transformations.add(ob.rotation, "y", -3.15, 9.45).name("Rotation")
  transformations.add(ob.scale, "x", 0, 5, 0.5).onChange(scaleObj).name("Scale")
  transformations.add(params, "rotate90deg").name("Rotate Right by 90 deg")
  gui.add(ob, "visible").name("show")
  camera.position.set(0, 0, 10)
  animate()
})
