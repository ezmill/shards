if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;

var camera, scene, renderer;

var uniforms;

init();
animate();

function init() {

	container = document.getElementById( 'container' );
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.001, 200000 );
	camera.position.set(0,0,800);
	camera.lookAt(scene.position);

	renderer = new THREE.WebGLRenderer({preserveDrawingBuffer:true});
	renderer.setClearColor(0xffffff, 1);
	renderer.autoClearColor = false;
	renderer.setSize(window.innerWidth,window.innerHeight);
	container.appendChild( renderer.domElement );

	controls = new THREE.OrbitControls(camera);
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,0,-400);
	scene.add(light);
	var light2 = new THREE.AmbientLight(0xffffff);
	// light.position.set(0,0,50);
	scene.add(light2);

	// var geometry = new THREE.BoxGeometry( 40, 40,40 );
	// var textures = [];

	// for(var i = 1; i < 16; i++){
	// 	// var texture = new THREE.ImageUtils.loadTexture("textures/diamond" + i + ".jpg");
	// 	var image = new Image();
	// 	image.src = "textures/diamond" + i + ".jpg";
	// 	var texture = new THREE.Texture( image );
	// 	texture.wrapS = THREE.RepeatWrapping;
	// 	texture.wrapT = THREE.RepeatWrapping;
	// 	texture.repeat.set( 30, 30 );
	// 	textures.push(texture);
	// }
	// var texture = new THREE.ImageUtils.loadTexture("textures/diamonds.jpg");
	// 			texture.wrapS = THREE.RepeatWrapping;
	// 			texture.wrapT = THREE.RepeatWrapping;
	// 			texture.repeat.set( 40, 40 );
	globalUniforms = {
		time: { type:'f', value: 0.0 },
		resolution: { type:'v2', value: new THREE.Vector2() }
	}
	spinner = new THREE.Object3D();

	function addTexture(t, index){
		// textures.push(t);
		// var geometry = new THREE.PlaneBufferGeometry(t.image.width,t.image.height);
		var geometry = new THREE.PlaneBufferGeometry(400,400);

		var uniforms = {
			texture: { type:'t', value: t },
			time: globalUniforms.time,
			resolution: globalUniforms.resolution
		}

		var material = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: document.getElementById( 'vertexShader' ).textContent,
			fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
			side: THREE.DoubleSide
		});
		// var material = new THREE.MeshBasicMaterial({
		// 	map: t,
		// 	transparent: true,
		// 	side: THREE.DoubleSide
		// })
		var mesh = new THREE.Mesh(geometry, material);
		// mesh.position.set((i*30)-(15*15), i,-50);
		mesh.position.set(Math.sin(360/index)*400*4,0,Math.cos(360/index)*400*4);
		mesh.rotation.y = 360/index;
		// mesh.rotation.x = Math.cos(360/index);
		// scene.add(mesh);
		spinner.add(mesh);
	}
	textures = [];

	function createTexture(index){
		texture = new THREE.ImageUtils.loadTexture("textures/diamond"+(index+1)+".jpg", undefined, function(t){
			addTexture(t, index);
		});

	}
	var pWidth,pHeight;
	for (var index = 0; index < 56; index++){

		createTexture(index);

	}
	spinner.position.set(0,0,0);
	scene.add(spinner);

	// for(var i = 0; i < textures.length)

	// stats = new Stats();
	// stats.domElement.style.position = 'absolute';
	// stats.domElement.style.top = '0px';
	// container.appendChild( stats.domElement );

	onWindowResize();

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize( event ) {

	globalUniforms.resolution.value.x = window.innerWidth;
	globalUniforms.resolution.value.y = window.innerHeight;


	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

	requestAnimationFrame( animate );

	render();
	// stats.update();

}

function render() {

	globalUniforms.time.value += 0.05;
	spinner.rotation.y = Date.now() * 0.0001;
	spinner.rotation.z = Date.now() * 0.1;
	spinner.rotation.x = Date.now() * 0.1;
	// mesh.rotation.x = Date.now() * 0.0005;
	// mesh.rotation.y = Date.now() * 0.0002;	
	// mesh.rotation.z = Date.now() * 0.0005;	// stats.update();
	renderer.render( scene, camera );
	controls.update();

}
