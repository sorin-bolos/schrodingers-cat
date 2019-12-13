var scene;
var stateLine;

export function initSpehere() {
    scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 100, 120);
    camera.lookAt(0, 0, 0);

    // Renderer
    var renderer;
    if (window.WebGLRenderingContext) {
        renderer = new THREE.WebGLRenderer({ alpha: true });
    }
    else {
        renderer = new THREE.CanvasRenderer({ alpha: true });
    }

    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var r = w / h;
    
    var rh = 150;
    var rw = rh * r;
    renderer.setSize(rw.toString(), rh.toString());
    document.getElementById("stateSphere").appendChild(renderer.domElement);

    var material = new THREE.MeshBasicMaterial({ color: 0xFF5733 });

    var radius = 50;

    var sGeometry = new THREE.SphereGeometry(radius, 32, 32);
    //var sMaterial = new THREE.MeshDepthMaterial({color: 0xFFDAD2, transparent: true, wireframe: true, wireframeLinewidth: 0});
    var sMaterial = new THREE.MeshBasicMaterial({ color: 0x979A9A, transparent: true, wireframe: true, wireframeLinewidth: 0 });
    var sphere = new THREE.Mesh(sGeometry, sMaterial);
    scene.add(sphere);

    var xAxeStart = -1 * radius - 10;
    var xGeometry = new THREE.Geometry();
    xGeometry.vertices.push(new THREE.Vector3(xAxeStart, 0, 0));
    xGeometry.vertices.push(new THREE.Vector3(radius, 0, 0));
    var xLine = new THREE.Line(xGeometry, material);
    scene.add(xLine);

    //var yMaterial = new THREE.LineBasicMaterial( {color: 0xFF5733, linewidth: 8, linecap: 'round', linejoin:  'round' } );
    var yAxeStart = -1 * radius - 10;
    var yGeometry = new THREE.Geometry();
    yGeometry.vertices.push(new THREE.Vector3(1, 0, yAxeStart));
    yGeometry.vertices.push(new THREE.Vector3(-1, 0, radius));
    var yLine = new THREE.Line(yGeometry, material);
    scene.add(yLine);

    var zAxeStart = -1 * radius - 10;
    var zGeometry = new THREE.Geometry();
    zGeometry.vertices.push(new THREE.Vector3(0, zAxeStart, 0));
    zGeometry.vertices.push(new THREE.Vector3(0, radius, 0));
    var zLine = new THREE.Line(zGeometry, material);
    scene.add(zLine);

    var loader = new THREE.FontLoader();
    var group = new THREE.Group();
    var xAxisText = "X";
    var yAxisText = "Y";
    var zAxisText = "Z";
    loader.load('assets/helvetiker_bold.typeface.json', function (font) {
        var xTextGeo = new THREE.TextGeometry(xAxisText, { font: font, size: 10, height: 1, curveSegments: 4, bevelThickness: 1, bevelSize: 0, bevelEnabled: false });
        var yTextGeo = new THREE.TextGeometry(yAxisText, { font: font, size: 10, height: 1, curveSegments: 4, bevelThickness: 1, bevelSize: 0, bevelEnabled: false });
        var zTextGeo = new THREE.TextGeometry(zAxisText, { font: font, size: 10, height: 1, curveSegments: 4, bevelThickness: 1, bevelSize: 0, bevelEnabled: false });

        var textMeshX = new THREE.Mesh(xTextGeo, material);
        textMeshX.position.x = xAxeStart;
        textMeshX.position.y = 0;
        textMeshX.position.z = 0;

        var textMeshY = new THREE.Mesh(yTextGeo, material);
        textMeshY.position.x = 0;
        textMeshY.position.y = 0;
        textMeshY.position.z = yAxeStart + 10;
        textMeshY.rotation.y = 1.5708;

        var textMeshZ = new THREE.Mesh(zTextGeo, material);
        textMeshZ.position.x = 0;
        textMeshZ.position.y = -1 * zAxeStart - 10;
        textMeshZ.position.z = 0;
        //textMeshZ.rotation.y = 1.5708;

        group.add(textMeshZ);
        group.add(textMeshX);
        group.add(textMeshY);
        scene.add(group);
    });

    var animate = function () {
        requestAnimationFrame(animate);

        //scene.rotation.x += 0.01;
        scene.rotation.y += 0.01;

        renderer.render(scene, camera);
    };

    animate();
}

 export function setState(x, y, z) {
    if (stateLine) {
        scene.remove(stateLine);
    }

    var stateLineMaterial = new THREE.LineBasicMaterial({ color: 0x74FE48, linewidth: 8, linecap: 'round', linejoin: 'round' });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(x, y, z));
    stateLine = new THREE.Line(geometry, stateLineMaterial);
    scene.add(stateLine);
}