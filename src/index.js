import * as THREE from "three"
import "./style.css"
import gsap from "gsap"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
const loader = new GLTFLoader()
import car from "./ferrari.glb"

const scene = new THREE.Scene()

const size = {
  width: 800,
  height: 600,
}

const { width, height } = size

// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: "red" })
// const mesh = new THREE.Mesh(geometry, material)

const camera = new THREE.PerspectiveCamera(75, width / height)
camera.position.z = 3
scene.add(camera)

const canvas = document.querySelector("canvas.webgl")
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(width, height)

// x,y,z
camera.position.set(0, 1, 2)

const light = new THREE.DirectionalLight("#fff", 10)
light.position.set(2, 2, 5)
scene.add(light)

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

loader.load(car, (glb) => {
  console.log(glb)
  scene.add(glb.scene)
})

animate()
