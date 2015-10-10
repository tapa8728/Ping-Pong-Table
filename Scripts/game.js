//game.js

/*
			Three.JS includes 6 important elements
				Scene
				Renderer
				Camera
				Mesh
				Light
				Material

			The renderer is attached to whichever HTML DOM element you wish to render the scene to, and a render() call is made each frame to the renderer in order to draw the Three.js scene.
		*/
		// set the scene size
		var WIDTH = 640;
		var	HEIGHT = 360;

		/****************   CAMERA    ****************/
		//set up the attributes
		var CAMERA_ANGLE = 45; 	//45 degrees wrt the origin in our space
		var ASPECT_RATIO = WIDTH/HEIGHT;
		var NEAR_PLANE = 0.1; 	//clipping plane slghtly in front of the camera
		var FAR_PLANE = 10000;
		//create the camera & add the attributes
		var camera = new THREE.PerspectiveCamera(
					    CAMERA_ANGLE,
					    ASPECT_RATIO,
					    NEAR_PLANE,
					    FAR_PLANE);
		//set the useful position of the camera - z-axis implies that it is pointing outwards from the screen
		camera.position.z = 300;

		// -----------------------------------------------------------------------------------------
		/****************   SCENE    ****************/
		//define the scene 
		var scene = new THREE.Scene();
		//add the camera to the scene
		scene.add(camera);

		// -----------------------------------------------------------------------------------------
		/****************   RENDERER    ****************/
		//create the WebGL renderer
		var renderer = new THREE.WebGLRenderer();
		//start the renderer
		renderer.setSize(WIDTH, HEIGHT);
		//add the DOM element where you want the renderer to work its magic
		var c = document.getElementById("gameCanvas");
		c.appendChild(renderer.domElement);

		// ------------------------------------------------------------------------------------------
		/****************   PING PONG BALL    ****************/
		// Set up the sphere values
		// lower 'segment' and 'ring' values will increase performance
		var radius = 10,
			segments = 25,
			rings = 25;
		//create the sphere's material - 
		var sphereMaterial = new THREE.MeshLambertMaterial(
		{
			color: 0xD43001,
		});
		//create the ping pong ball
		var ball = new THREE.Mesh(
				new THREE.SphereGeometry(
						radius,
						segments,
						rings),
						sphereMaterial
					);
		//add the ball to the scene
		scene.add(ball);

		// ------------------------------------------------------------------------------------------
		/****************   POINT LIGHT    ****************/
		var pointLight = new THREE.PointLight(0xF8D898);
		// set its position
		pointLight.position.x = -1000;
		pointLight.position.y = 0;
		pointLight.position.z = 1000;
		pointLight.intensity = 2.9;
		pointLight.distance = 10000;
		//add it to the scene
		scene.add(pointLight);

		// ------------------------------------------------------------------------------------------
		/****************   PLANE    ****************/
		// create the plane's material	
		var planeMaterial =	new THREE.MeshLambertMaterial(
		{
		    color: 0x4BD121
		});

		var planeQuality = 15;
		var planeWidth = WIDTH;
		var planeHeight = HEIGHT;
		// create the playing surface plane
		var plane = new THREE.Mesh(
		    new THREE.PlaneGeometry(
		    planeWidth * 0.95,	// 95% of table width, since we want to show where the ball goes out-of-bounds
		    planeHeight,
		    planeQuality,
		    planeQuality),   planeMaterial);

		scene.add(plane);

		//called on body load
		function setup()
		{
		  draw();
		}

		function draw()
		{
			//Draw the Three.js Scene
			renderer.render(scene, camera);
			//loop he draw() function
			requestAnimationFrame(draw);
		}



