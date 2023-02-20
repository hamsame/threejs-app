import * as THREE from "three"
import "./style.css"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import GUI from "lil-gui"
const loader = new GLTFLoader()
import model from "./soldier.glb"

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

const clock = new THREE.Clock()

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

var ob
const animate = () => {
  controls.update()
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

loader.load(model, (glb) => {
  ob = glb.scene
  scene.add(ob)
  ob.rotation.y = 3.15
  gui.add(ob.position, "x", 0, 3).name("horizontal position")
  gui.add(ob.position, "y", -3, 3).name("vertical position")
  gui.add(ob.position, "z", -30, 3).name("closeness")
  gui.add(ob.rotation, "y", -3.15, 9.45).name("rotation")
  camera.position.set(0, 0, 10)
  animate()
})
