import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import stars from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import earthTexture from '../img/earth.jpg';
import marsTexture from '../img/mars.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import saturnTexture from '../img/saturn.jpg';
import uranusTexture from '../img/uranus.jpg';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';
import saturnRingTexture from '../img/saturn_ring.png';
import uranusRingTexture from '../img/uranus_ring.png';


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45, 
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    stars,
    stars,
    stars,
    stars,
    stars,
    stars
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
})
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanet(size, texture, position, ring){
    const Geo = new THREE.SphereGeometry(size, 30, 30);
    const Mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(Geo, Mat);
    const Obj = new THREE.Object3D();
    Obj.add(mesh);

    if(ring){
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius, 
            ring.outerRadius, 
            32
        );
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        Obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }

    scene.add(Obj);
    mesh.position.x = position;
    return {mesh, Obj};
}

const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44);
const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, marsTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);
const saturn  = createPlanet(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus  = createPlanet(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: saturnRingTexture
});
const neptune = createPlanet(7, neptuneTexture, 200);
const pluto = createPlanet(2.8, plutoTexture, 216);
// const mercuryGeo = new THREE.SphereGeometry(3.2, 30, 30);
// const mercuryMat = new THREE.MeshStandardMaterial({
//     map: textureLoader.load(mercuryTexture)
// });
// const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
// const mercuryObj = new THREE.Object3D();
// mercuryObj.add(mercury);
// scene.add(mercuryObj);
// mercury.position.x = 28;


// const saturnGeo = new THREE.SphereGeometry(10, 30, 30);
// const saturnMat = new THREE.MeshStandardMaterial({
//     map: textureLoader.load(saturnTexture)
// });
// const saturn = new THREE.Mesh(saturnGeo, saturnMat);
// const saturnObj = new THREE.Object3D();
// saturnObj.add(saturn);
// scene.add(saturnObj);
// saturn.position.x = 138;

// const saturnRingGeo = new THREE.RingGeometry(10, 20, 32);
// const saturnRingMat = new THREE.MeshBasicMaterial({
//     map: textureLoader.load(saturnRingTexture)
// });
// const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
// saturn.Obj.add(saturnRing);
// saturnRing.position.x = 138;
// saturnRing.rotation.x = -0.5 * Math.PI;


const pointLight = new THREE.PointLight(0xffffff, 7000, 300);
scene.add(pointLight);


function animate(){
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    mercury.Obj.rotateY(0.04);
    venus.mesh.rotateY(0.002);
    venus.Obj.rotateY(0.015);
    earth.mesh.rotateY(0.02);
    earth.Obj.rotateY(0.01);
    mars.mesh.rotateY(0.018);
    mars.Obj.rotateY(0.008);
    jupiter.mesh.rotateY(0.04);
    jupiter.Obj.rotateY(0.002);
    saturn.mesh.rotateY(0.038);
    saturn.Obj.rotateY(0.0009);
    uranus.mesh.rotateY(0.03);
    uranus.Obj.rotateY(0.0004);
    neptune.mesh.rotateY(0.032);
    neptune.Obj.rotateY(0.0001);
    pluto.mesh.rotateY(0.008);
    pluto.Obj.rotateY(0.00007);
    
    renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});