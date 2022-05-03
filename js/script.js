console.log('lol');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.beckground = new THREE.Color({ color: 0x0000ff });
camera.position.set( 0, 0, 20 );

const geometryCube = new THREE.BoxGeometry(0.05,20,0.05);
const materialCube = new THREE.MeshBasicMaterial( { color: 0xff00cf } );
const cube = new THREE.Mesh(geometryCube, materialCube);
scene.add(cube);

const geometrySphere = new THREE.SphereGeometry(3, 50, 2);
const materialSphere = new THREE.MeshNormalMaterial( );

const sphere = new THREE.Mesh(geometrySphere,materialSphere);
sphere.position.set(0, 0, -100);
sphere.scale.set(100,100,2);
sphere.rotation.z = 40;
scene.add(sphere);



const pointLight = new THREE.PointLight(0xffe479, 10);
pointLight.position.set(1000, 1000, 1000);
scene.add(pointLight);



const geometryTorus = new THREE.TorusGeometry( 10, 0.2, 50, 300 );
const materialTorus = new THREE.MeshBasicMaterial( { color: 0x5ef795 } );
const torus = new THREE.Mesh(geometryTorus, materialTorus)
scene.add(torus);

// const light = new THREE.AmbientLight( 0x404040 );
// scene.add( light );
// console.log(torus);
let temp = null;
const loaderText = new THREE.GLTFLoader();
loaderText.load( '3d/three3d.glb', function ( gltf ) {
	temp = gltf;
	const scale = 5;
	gltf.scene.scale.set(scale,scale,scale);
	gltf.scene.position.z = 7;
	gltf.scene.children[0].rotation.z = 0;
	console.log(gltf.scene.children[0]);
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );
let perem = 1;

function increase() {
	perem = 1;
	cube.scale.x += 0.5;
	cube.scale.z += 0.5;
	torus.scale.x += 0.05;
	torus.scale.z += 0.05;
	temp.scene.children[0].rotation.z += 0.005;
	sphere.rotation.z += 0.05;
	if (cube.scale.x === 30) {
		perem = 0;
	}
}
function decrease() {
	perem = 0;
	cube.scale.x -= 0.5;
	cube.scale.z -= 0.5;
	torus.scale.x -= 0.05;
	torus.scale.z -= 0.05;
	temp.scene.children[0].rotation.z -= 0.005;
	sphere.rotation.z -= 0.05;
	if (cube.scale.x === 0.5) {
		perem = 1;
	}
}

function changeScale() {
	if (perem === 1) {
		increase()
	} else {
		decrease()
	}
}

function render() {
	requestAnimationFrame(render);
	cube.rotation.x += 0.1;
	cube.rotation.y += 0.05;
	cube.rotation.z += 0.005;
	if (temp) {
		changeScale();
	}
	// sphere.rotation.x += 0.05;
	// sphere.rotation.y += 0.05;
	// sphere.rotation.z += 0.005;
	torus.rotation.x += 0.01;
	torus.rotation.y += 0.05;
	torus.rotation.z += 0.005;
	renderer.render(scene,camera)
}

render ();