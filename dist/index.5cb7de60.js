// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"8Ye98":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "69f74e7f31319ffd";
module.bundle.HMR_BUNDLE_ID = "92d425515cb7de60";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F1() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                } // Render the fancy html overlay
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>\n          ").concat(stack, "\n        </pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>' + hint + '</div>';
            }).join(''), "\n        </div>\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"6cF5V":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _webgl2Renderer = require("./Webgl2Renderer");
var _webgl2RendererDefault = parcelHelpers.interopDefault(_webgl2Renderer);
const texAtlasUrl = "http://localhost:1234/texatlas.png";
const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
};
const image = new Image();
image.src = texAtlasUrl;
image.addEventListener("load", ()=>{
    const renderer = new _webgl2RendererDefault.default({
        image,
        cnvQry: "#viewport",
        viewport
    });
    const frame = {
        "x": 606,
        "y": 302,
        "rotation": 0,
        "width": 88,
        "height": 88
    };
    const rand = (n)=>Math.floor(Math.random() * n)
    ;
    const rects = Array(100).fill(0).map(()=>{
        return {
            x: rand(renderer.canvas.width - frame.width),
            y: rand(renderer.canvas.height - frame.height)
        };
    });
    let lastTs = 0;
    let dt, angle = 0;
    const start = (ts)=>{
        dt = (ts - lastTs) / 1000;
        lastTs = ts;
        angle += dt * Math.PI / 4;
        // console.log(`FRAME RATE: ${1/dt}`)
        renderer.clear();
        rects.forEach(({ x , y  })=>{
            renderer.drawFrame(frame.x, frame.y, frame.width, frame.height, x, y, angle);
        });
        requestAnimationFrame(start);
    };
    requestAnimationFrame(start);
});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc","./Webgl2Renderer":"ekYp1"}],"JacNc":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule') return;
        // Skip duplicate re-exports when they have the same value.
        if (key in dest && dest[key] === source[key]) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"ekYp1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getContext = require("./utils/getContext");
var _getContextDefault = parcelHelpers.interopDefault(_getContext);
var _createShader = require("./utils/createShader");
var _createShaderDefault = parcelHelpers.interopDefault(_createShader);
var _createProgram = require("./utils/createProgram");
var _createProgramDefault = parcelHelpers.interopDefault(_createProgram);
var _vertexShader = require("./shaders/vertexShader");
var _vertexShaderDefault = parcelHelpers.interopDefault(_vertexShader);
var _fragmentShader = require("./shaders/fragmentShader");
var _fragmentShaderDefault = parcelHelpers.interopDefault(_fragmentShader);
var _matrix = require("./utils/Matrix");
var _matrixDefault = parcelHelpers.interopDefault(_matrix);
class Webgl2Renderer {
    constructor({ image , cnvQry ="#viewport" , viewport  }){
        const gl = _getContextDefault.default(cnvQry);
        const program = _createProgramDefault.default(gl, _createShaderDefault.default(gl, _vertexShaderDefault.default, gl.VERTEX_SHADER), _createShaderDefault.default(gl, _fragmentShaderDefault.default, gl.FRAGMENT_SHADER));
        this.canvas = document.querySelector(cnvQry);
        this.image = image;
        this.gl = gl;
        // webgl uniforms, attributes and buffers
        const aVertPosLocation = gl.getAttribLocation(program, "a_vert_pos");
        const aTexCoordsLocation = gl.getAttribLocation(program, "a_tex_coords");
        const posBuffer = gl.createBuffer();
        const texBuffer = gl.createBuffer();
        this.uResLocation = gl.getUniformLocation(program, "u_resolution");
        this.uMatLocation = gl.getUniformLocation(program, "u_matrix");
        this.uTexMatLocation = gl.getUniformLocation(program, "u_tex_matrix");
        this.matrixUtil = new _matrixDefault.default();
        this.uMatrix = this.matrixUtil.create() // identity matrix
        ;
        this.uTexMatrix = this.matrixUtil.create();
        // texture and position attributes initialization tasks
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -0.5,
            -0.5,
            0.5,
            -0.5,
            -0.5,
            0.5,
            0.5,
            -0.5,
            0.5,
            0.5,
            -0.5,
            0.5
        ]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(aVertPosLocation);
        gl.vertexAttribPointer(aVertPosLocation, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0,
            0,
            1,
            0,
            0,
            1,
            1,
            0,
            1,
            1,
            0,
            1
        ]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(aTexCoordsLocation);
        gl.vertexAttribPointer(aTexCoordsLocation, 2, gl.FLOAT, true, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        // texture states setup
        const texture = gl.createTexture();
        const uTexUnitLocation = gl.getUniformLocation(program, "u_tex_unit");
        const texUnit = 0;
        gl.useProgram(program);
        gl.activeTexture(gl.TEXTURE0 + texUnit);
        gl.uniform1i(uTexUnitLocation, texUnit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
        this.blendMode = "source-over";
        this.resize(viewport);
        this.clearColor = [
            0,
            0,
            0,
            1
        ];
    // viewport.on("change", this.resize.bind(this))
    }
    set clearColor(arr) {
        this.gl.clearColor(...arr);
    }
    set blendMode(val) {
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }
    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    resize({ width , height  }) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.gl.viewport(0, 0, width, height);
        this.gl.uniform2f(this.uResLocation, width, height);
    }
    drawFrame(srcX, srcY, width, height, destX, destY, angle) {
        const { matrixUtil , uMatrix , uTexMatrix , uMatLocation , uTexMatLocation , image: image1 , gl: gl1  } = this;
        matrixUtil.identity(uMatrix);
        matrixUtil.scale(uMatrix, width, height);
        angle && matrixUtil.rotate(uMatrix, angle);
        matrixUtil.translate(uMatrix, destX + width / 2, destY + height / 2);
        matrixUtil.identity(uTexMatrix);
        matrixUtil.scale(uTexMatrix, width / image1.width, height / image1.height);
        matrixUtil.translate(uTexMatrix, srcX / image1.width, srcY / image1.height);
        gl1.uniformMatrix3fv(uMatLocation, false, uMatrix);
        gl1.uniformMatrix3fv(uTexMatLocation, false, uTexMatrix);
        gl1.drawArrays(gl1.TRIANGLES, 0, 6);
    }
    render() {
    }
    renderRec() {
    }
}
exports.default = Webgl2Renderer;

},{"./utils/getContext":"bzbcp","./utils/createShader":"djIcq","./utils/createProgram":"itjX6","./shaders/vertexShader":"7S0u1","./shaders/fragmentShader":"aXirM","./utils/Matrix":"8nDwv","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"bzbcp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = (cnvSelector)=>{
    const canvas = document.querySelector(cnvSelector);
    const gl = canvas.getContext("webgl2");
    if (!gl) throw new Error(`Webgl support not available`);
    return gl;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"djIcq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = (gl, shaderSrc, shaderType)=>{
    const shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSrc);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) throw new Error(`Couldn't compile shader: ${gl.getShaderInfoLog(shader)}`);
    return shader;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"itjX6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = (gl, vertShader, fragShader)=>{
    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) throw new Error(`Couldnt link shaders: ${gl.getProgramInfoLog(program)}`);
    return program;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"7S0u1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = vertexShaderSrc = `   #version 300 es\n\n    in vec2 a_vert_pos;\n    in vec2 a_tex_coords;\n    \n    uniform vec2 u_resolution;\n    uniform mat3 u_matrix;\n    uniform mat3 u_tex_matrix;\n\n    out vec2 v_tex_coords;\n\n    void main() {\n        \n        v_tex_coords = (u_tex_matrix * vec3(a_tex_coords, 1)).xy;\n        \n        vec2 pos_vec = (u_matrix * vec3(a_vert_pos, 1)).xy;\n\n        // converting to clipspace\n        vec2 normalized = pos_vec / u_resolution;\n        vec2 clipspace = (normalized * 2.0) - 1.0;\n        gl_Position = vec4(clipspace * vec2(1, -1), 0, 1);\n    }\n`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"aXirM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = fragShaderSrc = `   #version 300 es\n    precision highp float;\n\n    in vec2 v_tex_coords;\n    uniform sampler2D u_tex_unit;\n    out vec4 out_color;\n    void main() {\n        out_color = texture(u_tex_unit, v_tex_coords);\n    }\n`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"8nDwv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class IMatrix {
    static create() {
        return [
            1,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            1
        ];
    }
    static cast(mat) {
        mat[0] = 1;
        mat[1] = 0;
        mat[2] = 0;
        mat[3] = 0;
        mat[4] = 1;
        mat[5] = 0;
        mat[6] = 0;
        mat[7] = 0;
        mat[8] = 1;
        return mat;
    }
    constructor(){
        this.tMat = IMatrix.create();
        this.sMat = IMatrix.create();
        this.rMat = IMatrix.create();
    }
    scaled(x, y = x) {
        // transform operations on identity matrix return the same array by mutating (transforming) it everytime they are called
        const mat = this.sMat;
        mat[0] = x;
        mat[4] = y;
        return mat;
    }
    rotated(rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const mat = this.rMat;
        mat[0] = c;
        mat[1] = s;
        mat[3] = -s;
        mat[4] = c;
        return mat;
    }
    translated(x, y) {
        const mat = this.tMat;
        mat[6] = x;
        mat[7] = y;
        return mat;
    }
}
class Matrix {
    constructor(){
        this.iMat = new IMatrix();
        this.temp = this.create();
    }
    create() {
        return IMatrix.create();
    }
    identity(mat) {
        return IMatrix.cast(mat);
    }
    multiply(a, b) {
        /**
         * transpose(matB * matA) = transpose(matA) * transpose(matB)
         */ /**       A                     B
         *  _           _        _           _
         * |             |      |             |
         * |  0   1   2  |      |  0   1   2  |
         * |  3   4   5  |  *   |  3   4   5  |
         * |  6   7   8  |      |  6   7   8  |
         * |_           _|      |_           _|
         *                   =
         * [
         *      a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
         *      a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
         *      a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
         * 
         *      a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
         *      a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
         *      a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
         * 
         *      a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
         *      a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
         *      a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
         * ]
         * 
         */ const { temp  } = this;
        temp[0] = a[0] * b[0] + a[1] * b[3] + a[2] * b[6];
        temp[1] = a[0] * b[1] + a[1] * b[4] + a[2] * b[7];
        temp[2] = a[0] * b[2] + a[1] * b[5] + a[2] * b[8];
        temp[3] = a[3] * b[0] + a[4] * b[3] + a[5] * b[6];
        temp[4] = a[3] * b[1] + a[4] * b[4] + a[5] * b[7];
        temp[5] = a[3] * b[2] + a[4] * b[5] + a[5] * b[8];
        temp[6] = a[6] * b[0] + a[7] * b[3] + a[8] * b[6];
        temp[7] = a[6] * b[1] + a[7] * b[4] + a[8] * b[7];
        temp[8] = a[6] * b[2] + a[7] * b[5] + a[8] * b[8];
        for(let i = 0; i < 9; i++)a[i] = temp[i];
    }
    rotate(mat, rad) {
        return this.multiply(mat, this.iMat.rotated(rad));
    }
    scale(mat, x, y) {
        return this.multiply(mat, this.iMat.scaled(x, y));
    }
    translate(mat, x, y) {
        return this.multiply(mat, this.iMat.translated(x, y));
    }
}
exports.default = Matrix;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}]},["8Ye98","6cF5V"], "6cF5V", "parcelRequire889a")

//# sourceMappingURL=index.5cb7de60.js.map
