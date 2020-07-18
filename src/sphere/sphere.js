var scene;
var stateLine1, stateLine2, stateLine3, stateLine4;

export function initSpehere(size) {
    scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, 1, 1, 500);
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

    renderer.setSize(size.toString(), size.toString());
    const elem = document.getElementById("stateSphere")
    elem.style.margin = 10 + "px";
    elem.appendChild(renderer.domElement);
    

    var material = new THREE.MeshBasicMaterial({ color: 0xFF5733 });

    var radius = 50;

    var sGeometry = new THREE.SphereGeometry(radius, 32, 32);
    var sMaterial = new THREE.MeshBasicMaterial({ color: 0x979A9A, opacity: 0.3, transparent: true, wireframe: true });
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
    if (stateLine1) {
        scene.remove(stateLine1);
    }
    if (stateLine2) {
        scene.remove(stateLine2);
    }
    if (stateLine3) {
        scene.remove(stateLine3);
    }
    if (stateLine4) {
        scene.remove(stateLine4);
    }

    var stateLineMaterial1 = new THREE.LineBasicMaterial({ color: 0x74FE48, linewidth: 1, linecap: 'round', linejoin: 'round' });
    var geometry1 = new THREE.Geometry();
    geometry1.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry1.vertices.push(new THREE.Vector3(x, y, z));
    stateLine1 = new THREE.Line(geometry1, stateLineMaterial1);
    scene.add(stateLine1);

    var stateLineMaterial2 = new THREE.LineBasicMaterial({ color: 0x74FE48, linewidth: 1, linecap: 'round', linejoin: 'round' });
    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3(1, 0, 0));
    geometry2.vertices.push(new THREE.Vector3(x+1, y, z));
    stateLine2 = new THREE.Line(geometry2, stateLineMaterial2);
    scene.add(stateLine2);

    var stateLineMaterial3 = new THREE.LineBasicMaterial({ color: 0x74FE48, linewidth: 1, linecap: 'round', linejoin: 'round' });
    var geometry3 = new THREE.Geometry();
    geometry3.vertices.push(new THREE.Vector3(0, 1, 0));
    geometry3.vertices.push(new THREE.Vector3(x, y+1, z));
    stateLine3 = new THREE.Line(geometry3, stateLineMaterial3);
    scene.add(stateLine3);

    var stateLineMaterial4 = new THREE.LineBasicMaterial({ color: 0x74FE48, linewidth: 1, linecap: 'round', linejoin: 'round' });
    var geometry4 = new THREE.Geometry();
    geometry4.vertices.push(new THREE.Vector3(0, 0, 1));
    geometry4.vertices.push(new THREE.Vector3(x, y, z+1));
    stateLine4 = new THREE.Line(geometry4, stateLineMaterial4);
    scene.add(stateLine4);
}