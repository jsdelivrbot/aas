// camera setting
var fov = 75;
var aspect = window.innerWidth / window.innerHeight;
var near = 0.1;
var far = 1000;
var container, stats, clock;
			var camera, scene, renderer, mixer;
// scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xff8080);
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

				clock = new THREE.Clock();
// box
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
  color: 0x00ff00
});
var cube = new THREE.Mesh(geometry, material);
cube.position.y = -1;
scene.add(cube);

// light
scene.add(new THREE.AmbientLight(0xffffff));

var loader = new THREE.ColladaLoader();
				loader.options.convertUpAxis = true;
				loader.load( "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/collada/avatar.dae", function ( collada ) {
					var object = collada.scene;
					mixer = new THREE.AnimationMixer( object );
					object.traverse( function ( child ) {
						if ( child instanceof THREE.SkinnedMesh ) {
							var clip = THREE.AnimationClip.parseAnimation( child.geometry.animation, child.geometry.bones );
							mixer.clipAction( clip, child ).play();
						}
					} );
					scene.add( object );
				} );
// render
var render = function() {
  requestAnimationFrame(render);

  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
var delta = clock.getDelta();
				if ( mixer !== undefined ) {
					mixer.update( delta );
				}

  renderer.render(scene, camera);

};

camera.position.z = 3;
render();
