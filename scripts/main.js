(function () {
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Cube = function (_modularTHREE$MeshObj) {
  inherits(Cube, _modularTHREE$MeshObj);

  function Cube() {
    classCallCheck(this, Cube);
    return possibleConstructorReturn(this, _modularTHREE$MeshObj.call(this));
  }

  Cube.prototype.init = function init() {
    var texture = this.loadTexture('images/textures/crate.jpg');
    var geometry = new THREE.BoxBufferGeometry(20, 20, 20);
    var material = new THREE.MeshBasicMaterial({
      map: texture
    });
    this.mesh = new THREE.Mesh(geometry, material);
  };

  return Cube;
}(modularTHREE.MeshObject);

// The following spec objects are optional and can be omitted
//for the defaults shown
var rendererSpec = {
  canvasID: 'exampleDrawing',
  antialias: true,
  alpha: true, //true required for multiple scenes
  autoClear: true, //false required for multiple scenes
  clearColor: 0x6858bb,
  clearAlpha: 1.0,
  width: function () {
    return window.innerWidth;
  },
  height: function () {
    return window.innerHeight;
  },
  pixelRatio: window.devicePixelRatio,
  postprocessing: false,
  useGSAP: false,
  showStats: true
};

// Optional
var cameraSpec = {
  type: 'PerspectiveCamera', //Or 'OrthographicCamera'
  near: 10,
  far: -10,
  position: new THREE.Vector3(0, 0, 100),
  //PerspectiveCamera only
  fov: 45,
  aspect: function () {
    return window.innerWidth / window.innerHeight;
  },
  // OrthographicCamera only
  width: function () {
    return window.innerWidth;
  },
  height: function () {
    return window.innerHeight;
  }
};

var ExampleDrawing = function (_modularTHREE$Drawing) {
  inherits(ExampleDrawing, _modularTHREE$Drawing);

  function ExampleDrawing() {
    classCallCheck(this, ExampleDrawing);
    return possibleConstructorReturn(this, _modularTHREE$Drawing.call(this, rendererSpec, cameraSpec));
  }

  ExampleDrawing.prototype.init = function init() {
    this.initObjects();
    this.initCubeAnimation();
  };

  ExampleDrawing.prototype.initObjects = function initObjects() {
    this.cube = new Cube();
    this.scene.add(this.cube);
  };

  ExampleDrawing.prototype.initCubeAnimation = function initCubeAnimation() {
    var _this2 = this;

    var rotateCube = function () {
      _this2.cube.rotation.x += 0.005;
      _this2.cube.rotation.y += 0.01;
    };

    this.addPerFrameFunction(rotateCube);
  };

  return ExampleDrawing;
}(modularTHREE.Drawing);

var fadeLoader = function () {
  var loadingOverlay = document.querySelector('#loadingOverlay');

  loadingOverlay.style.opacity = 0;
  window.setTimeout(function () {
    loadingOverlay.classList.add('hide');
  }, 1000);
};

var initLoader = function () {
  //if we are using the loadingManager, wait for it to finish before
  //fading out the loader
  if (modularTHREE.config.useLoadingManager) {
    modularTHREE.loadingManager.onLoad = function () {
      fadeLoader();
    };
  }
  //otherwise fade it out straightaway
  else {
      fadeLoader();
    }
};

//Set any config options here
modularTHREE.config.useLoadingManager = false;

//Run init() AFTER setting config options
modularTHREE.init();

//Run initLoader() AFTER modularTHREE.init()
initLoader();

//Drawing set up and control goes next
var exampleDrawing = new ExampleDrawing();
exampleDrawing.render();

}());