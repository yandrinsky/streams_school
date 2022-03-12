var streams;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/compat-data/native-modules.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/compat-data/native-modules.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./data/native-modules.json */ "./node_modules/@babel/compat-data/data/native-modules.json");


/***/ }),

/***/ "./node_modules/@babel/compat-data/plugins.js":
/*!****************************************************!*\
  !*** ./node_modules/@babel/compat-data/plugins.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./data/plugins.json */ "./node_modules/@babel/compat-data/data/plugins.json");


/***/ }),

/***/ "./node_modules/@babel/helper-compilation-targets/lib/debug.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/helper-compilation-targets/lib/debug.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getInclusionReasons = getInclusionReasons;

var _semver = __webpack_require__(/*! semver */ "./node_modules/semver/semver.js");

var _pretty = __webpack_require__(/*! ./pretty */ "./node_modules/@babel/helper-compilation-targets/lib/pretty.js");

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/@babel/helper-compilation-targets/lib/utils.js");

function getInclusionReasons(item, targetVersions, list) {
  const minVersions = list[item] || {};
  return Object.keys(targetVersions).reduce((result, env) => {
    const minVersion = (0, _utils.getLowestImplementedVersion)(minVersions, env);
    const targetVersion = targetVersions[env];

    if (!minVersion) {
      result[env] = (0, _pretty.prettifyVersion)(targetVersion);
    } else {
      const minIsUnreleased = (0, _utils.isUnreleasedVersion)(minVersion, env);
      const targetIsUnreleased = (0, _utils.isUnreleasedVersion)(targetVersion, env);

      if (!targetIsUnreleased && (minIsUnreleased || _semver.lt(targetVersion.toString(), (0, _utils.semverify)(minVersion)))) {
        result[env] = (0, _pretty.prettifyVersion)(targetVersion);
      }
    }

    return result;
  }, {});
}

/***/ }),

/***/ "./node_modules/@babel/helper-compilation-targets/lib/filter-items.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/helper-compilation-targets/lib/filter-items.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = filterItems;
exports.isRequired = isRequired;
exports.targetsSupported = targetsSupported;

var _semver = __webpack_require__(/*! semver */ "./node_modules/semver/semver.js");

var _plugins = __webpack_require__(/*! @babel/compat-data/plugins */ "./node_modules/@babel/compat-data/plugins.js");

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/@babel/helper-compilation-targets/lib/utils.js");

function targetsSupported(target, support) {
  const targetEnvironments = Object.keys(target);

  if (targetEnvironments.length === 0) {
    return false;
  }

  const unsupportedEnvironments = targetEnvironments.filter(environment => {
    const lowestImplementedVersion = (0, _utils.getLowestImplementedVersion)(support, environment);

    if (!lowestImplementedVersion) {
      return true;
    }

    const lowestTargetedVersion = target[environment];

    if ((0, _utils.isUnreleasedVersion)(lowestTargetedVersion, environment)) {
      return false;
    }

    if ((0, _utils.isUnreleasedVersion)(lowestImplementedVersion, environment)) {
      return true;
    }

    if (!_semver.valid(lowestTargetedVersion.toString())) {
      throw new Error(`Invalid version passed for target "${environment}": "${lowestTargetedVersion}". ` + "Versions must be in semver format (major.minor.patch)");
    }

    return _semver.gt((0, _utils.semverify)(lowestImplementedVersion), lowestTargetedVersion.toString());
  });
  return unsupportedEnvironments.length === 0;
}

function isRequired(name, targets, {
  compatData = _plugins,
  includes,
  excludes
} = {}) {
  if (excludes != null && excludes.has(name)) return false;
  if (includes != null && includes.has(name)) return true;
  return !targetsSupported(targets, compatData[name]);
}

function filterItems(list, includes, excludes, targets, defaultIncludes, defaultExcludes, pluginSyntaxMap) {
  const result = new Set();
  const options = {
    compatData: list,
    includes,
    excludes
  };

  for (const item in list) {
    if (isRequired(item, targets, options)) {
      result.add(item);
    } else if (pluginSyntaxMap) {
      const shippedProposalsSyntax = pluginSyntaxMap.get(item);

      if (shippedProposalsSyntax) {
        result.add(shippedProposalsSyntax);
      }
    }
  }

  if (defaultIncludes) {
    defaultIncludes.forEach(item => !excludes.has(item) && result.add(item));
  }

  if (defaultExcludes) {
    defaultExcludes.forEach(item => !includes.has(item) && result.delete(item));
  }

  return result;
}

/***/ }),

/***/ "./node_modules/@babel/helper-compilation-targets/lib/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/helper-compilation-targets/lib/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "TargetNames", ({
  enumerable: true,
  get: function () {
    return _options.TargetNames;
  }
}));
exports["default"] = getTargets;
Object.defineProperty(exports, "filterItems", ({
  enumerable: true,
  get: function () {
    return _filterItems.default;
  }
}));
Object.defineProperty(exports, "getInclusionReasons", ({
  enumerable: true,
  get: function () {
    return _debug.getInclusionReasons;
  }
}));
exports.isBrowsersQueryValid = isBrowsersQueryValid;
Object.defineProperty(exports, "isRequired", ({
  enumerable: true,
  get: function () {
    return _filterItems.isRequired;
  }
}));
Object.defineProperty(exports, "prettifyTargets", ({
  enumerable: true,
  get: function () {
    return _pretty.prettifyTargets;
  }
}));
Object.defineProperty(exports, "unreleasedLabels", ({
  enumerable: true,
  get: function () {
    return _targets.unreleasedLabels;
  }
}));

var _browserslist = __webpack_require__(/*! browserslist */ "./node_modules/browserslist/index.js");

var _helperValidatorOption = __webpack_require__(/*! @babel/helper-validator-option */ "./node_modules/@babel/helper-validator-option/lib/index.js");

var _nativeModules = __webpack_require__(/*! @babel/compat-data/native-modules */ "./node_modules/@babel/compat-data/native-modules.js");

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/@babel/helper-compilation-targets/lib/utils.js");

var _targets = __webpack_require__(/*! ./targets */ "./node_modules/@babel/helper-compilation-targets/lib/targets.js");

var _options = __webpack_require__(/*! ./options */ "./node_modules/@babel/helper-compilation-targets/lib/options.js");

var _pretty = __webpack_require__(/*! ./pretty */ "./node_modules/@babel/helper-compilation-targets/lib/pretty.js");

var _debug = __webpack_require__(/*! ./debug */ "./node_modules/@babel/helper-compilation-targets/lib/debug.js");

var _filterItems = __webpack_require__(/*! ./filter-items */ "./node_modules/@babel/helper-compilation-targets/lib/filter-items.js");

const ESM_SUPPORT = _nativeModules["es6.module"];
const v = new _helperValidatorOption.OptionValidator("@babel/helper-compilation-targets");

function validateTargetNames(targets) {
  const validTargets = Object.keys(_options.TargetNames);

  for (const target of Object.keys(targets)) {
    if (!(target in _options.TargetNames)) {
      throw new Error(v.formatMessage(`'${target}' is not a valid target
- Did you mean '${(0, _helperValidatorOption.findSuggestion)(target, validTargets)}'?`));
    }
  }

  return targets;
}

function isBrowsersQueryValid(browsers) {
  return typeof browsers === "string" || Array.isArray(browsers) && browsers.every(b => typeof b === "string");
}

function validateBrowsers(browsers) {
  v.invariant(browsers === undefined || isBrowsersQueryValid(browsers), `'${String(browsers)}' is not a valid browserslist query`);
  return browsers;
}

function getLowestVersions(browsers) {
  return browsers.reduce((all, browser) => {
    const [browserName, browserVersion] = browser.split(" ");
    const normalizedBrowserName = _targets.browserNameMap[browserName];

    if (!normalizedBrowserName) {
      return all;
    }

    try {
      const splitVersion = browserVersion.split("-")[0].toLowerCase();
      const isSplitUnreleased = (0, _utils.isUnreleasedVersion)(splitVersion, browserName);

      if (!all[normalizedBrowserName]) {
        all[normalizedBrowserName] = isSplitUnreleased ? splitVersion : (0, _utils.semverify)(splitVersion);
        return all;
      }

      const version = all[normalizedBrowserName];
      const isUnreleased = (0, _utils.isUnreleasedVersion)(version, browserName);

      if (isUnreleased && isSplitUnreleased) {
        all[normalizedBrowserName] = (0, _utils.getLowestUnreleased)(version, splitVersion, browserName);
      } else if (isUnreleased) {
        all[normalizedBrowserName] = (0, _utils.semverify)(splitVersion);
      } else if (!isUnreleased && !isSplitUnreleased) {
        const parsedBrowserVersion = (0, _utils.semverify)(splitVersion);
        all[normalizedBrowserName] = (0, _utils.semverMin)(version, parsedBrowserVersion);
      }
    } catch (e) {}

    return all;
  }, {});
}

function outputDecimalWarning(decimalTargets) {
  if (!decimalTargets.length) {
    return;
  }

  console.warn("Warning, the following targets are using a decimal version:\n");
  decimalTargets.forEach(({
    target,
    value
  }) => console.warn(`  ${target}: ${value}`));
  console.warn(`
We recommend using a string for minor/patch versions to avoid numbers like 6.10
getting parsed as 6.1, which can lead to unexpected behavior.
`);
}

function semverifyTarget(target, value) {
  try {
    return (0, _utils.semverify)(value);
  } catch (error) {
    throw new Error(v.formatMessage(`'${value}' is not a valid value for 'targets.${target}'.`));
  }
}

const targetParserMap = {
  __default(target, value) {
    const version = (0, _utils.isUnreleasedVersion)(value, target) ? value.toLowerCase() : semverifyTarget(target, value);
    return [target, version];
  },

  node(target, value) {
    const parsed = value === true || value === "current" ? process.versions.node : semverifyTarget(target, value);
    return [target, parsed];
  }

};

function generateTargets(inputTargets) {
  const input = Object.assign({}, inputTargets);
  delete input.esmodules;
  delete input.browsers;
  return input;
}

function resolveTargets(queries, env) {
  const resolved = _browserslist(queries, {
    mobileToDesktop: true,
    env
  });

  return getLowestVersions(resolved);
}

function getTargets(inputTargets = {}, options = {}) {
  var _browsers;

  let {
    browsers,
    esmodules
  } = inputTargets;
  const {
    configPath = "."
  } = options;
  validateBrowsers(browsers);
  const input = generateTargets(inputTargets);
  let targets = validateTargetNames(input);
  const shouldParseBrowsers = !!browsers;
  const hasTargets = shouldParseBrowsers || Object.keys(targets).length > 0;
  const shouldSearchForConfig = !options.ignoreBrowserslistConfig && !hasTargets;

  if (!browsers && shouldSearchForConfig) {
    browsers = _browserslist.loadConfig({
      config: options.configFile,
      path: configPath,
      env: options.browserslistEnv
    });

    if (browsers == null) {
      {
        browsers = [];
      }
    }
  }

  if (esmodules && (esmodules !== "intersect" || !((_browsers = browsers) != null && _browsers.length))) {
    browsers = Object.keys(ESM_SUPPORT).map(browser => `${browser} >= ${ESM_SUPPORT[browser]}`).join(", ");
    esmodules = false;
  }

  if (browsers) {
    const queryBrowsers = resolveTargets(browsers, options.browserslistEnv);

    if (esmodules === "intersect") {
      for (const browser of Object.keys(queryBrowsers)) {
        const version = queryBrowsers[browser];

        if (ESM_SUPPORT[browser]) {
          queryBrowsers[browser] = (0, _utils.getHighestUnreleased)(version, (0, _utils.semverify)(ESM_SUPPORT[browser]), browser);
        } else {
          delete queryBrowsers[browser];
        }
      }
    }

    targets = Object.assign(queryBrowsers, targets);
  }

  const result = {};
  const decimalWarnings = [];

  for (const target of Object.keys(targets).sort()) {
    var _targetParserMap$targ;

    const value = targets[target];

    if (typeof value === "number" && value % 1 !== 0) {
      decimalWarnings.push({
        target,
        value
      });
    }

    const parser = (_targetParserMap$targ = targetParserMap[target]) != null ? _targetParserMap$targ : targetParserMap.__default;
    const [parsedTarget, parsedValue] = parser(target, value);

    if (parsedValue) {
      result[parsedTarget] = parsedValue;
    }
  }

  outputDecimalWarning(decimalWarnings);
  return result;
}

/***/ }),

/***/ "./node_modules/@babel/helper-compilation-targets/lib/options.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/helper-compilation-targets/lib/options.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TargetNames = void 0;
const TargetNames = {
  node: "node",
  chrome: "chrome",
  opera: "opera",
  edge: "edge",
  firefox: "firefox",
  safari: "safari",
  ie: "ie",
  ios: "ios",
  android: "android",
  electron: "electron",
  samsung: "samsung",
  rhino: "rhino"
};
exports.TargetNames = TargetNames;

/***/ }),

/***/ "./node_modules/@babel/helper-compilation-targets/lib/pretty.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/helper-compilation-targets/lib/pretty.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.prettifyTargets = prettifyTargets;
exports.prettifyVersion = prettifyVersion;

var _semver = __webpack_require__(/*! semver */ "./node_modules/semver/semver.js");

var _targets = __webpack_require__(/*! ./targets */ "./node_modules/@babel/helper-compilation-targets/lib/targets.js");

function prettifyVersion(version) {
  if (typeof version !== "string") {
    return version;
  }

  const parts = [_semver.major(version)];

  const minor = _semver.minor(version);

  const patch = _semver.patch(version);

  if (minor || patch) {
    parts.push(minor);
  }

  if (patch) {
    parts.push(patch);
  }

  return parts.join(".");
}

function prettifyTargets(targets) {
  return Object.keys(targets).reduce((results, target) => {
    let value = targets[target];
    const unreleasedLabel = _targets.unreleasedLabels[target];

    if (typeof value === "string" && unreleasedLabel !== value) {
      value = prettifyVersion(value);
    }

    results[target] = value;
    return results;
  }, {});
}

/***/ }),

/***/ "./node_modules/@babel/helper-compilation-targets/lib/targets.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/helper-compilation-targets/lib/targets.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.unreleasedLabels = exports.browserNameMap = void 0;
const unreleasedLabels = {
  safari: "tp"
};
exports.unreleasedLabels = unreleasedLabels;
const browserNameMap = {
  and_chr: "chrome",
  and_ff: "firefox",
  android: "android",
  chrome: "chrome",
  edge: "edge",
  firefox: "firefox",
  ie: "ie",
  ie_mob: "ie",
  ios_saf: "ios",
  node: "node",
  op_mob: "opera",
  opera: "opera",
  safari: "safari",
  samsung: "samsung"
};
exports.browserNameMap = browserNameMap;

/***/ }),

/***/ "./node_modules/@babel/helper-compilation-targets/lib/utils.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/helper-compilation-targets/lib/utils.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getHighestUnreleased = getHighestUnreleased;
exports.getLowestImplementedVersion = getLowestImplementedVersion;
exports.getLowestUnreleased = getLowestUnreleased;
exports.isUnreleasedVersion = isUnreleasedVersion;
exports.semverMin = semverMin;
exports.semverify = semverify;

var _semver = __webpack_require__(/*! semver */ "./node_modules/semver/semver.js");

var _helperValidatorOption = __webpack_require__(/*! @babel/helper-validator-option */ "./node_modules/@babel/helper-validator-option/lib/index.js");

var _targets = __webpack_require__(/*! ./targets */ "./node_modules/@babel/helper-compilation-targets/lib/targets.js");

const versionRegExp = /^(\d+|\d+.\d+)$/;
const v = new _helperValidatorOption.OptionValidator("@babel/helper-compilation-targets");

function semverMin(first, second) {
  return first && _semver.lt(first, second) ? first : second;
}

function semverify(version) {
  if (typeof version === "string" && _semver.valid(version)) {
    return version;
  }

  v.invariant(typeof version === "number" || typeof version === "string" && versionRegExp.test(version), `'${version}' is not a valid version`);
  const split = version.toString().split(".");

  while (split.length < 3) {
    split.push("0");
  }

  return split.join(".");
}

function isUnreleasedVersion(version, env) {
  const unreleasedLabel = _targets.unreleasedLabels[env];
  return !!unreleasedLabel && unreleasedLabel === version.toString().toLowerCase();
}

function getLowestUnreleased(a, b, env) {
  const unreleasedLabel = _targets.unreleasedLabels[env];
  const hasUnreleased = [a, b].some(item => item === unreleasedLabel);

  if (hasUnreleased) {
    return a === hasUnreleased ? b : a || b;
  }

  return semverMin(a, b);
}

function getHighestUnreleased(a, b, env) {
  return getLowestUnreleased(a, b, env) === a ? b : a;
}

function getLowestImplementedVersion(plugin, environment) {
  const result = plugin[environment];

  if (!result && environment === "android") {
    return plugin.chrome;
  }

  return result;
}

/***/ }),

/***/ "./node_modules/@babel/helper-validator-option/lib/find-suggestion.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/helper-validator-option/lib/find-suggestion.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.findSuggestion = findSuggestion;
const {
  min
} = Math;

function levenshtein(a, b) {
  let t = [],
      u = [],
      i,
      j;
  const m = a.length,
        n = b.length;

  if (!m) {
    return n;
  }

  if (!n) {
    return m;
  }

  for (j = 0; j <= n; j++) {
    t[j] = j;
  }

  for (i = 1; i <= m; i++) {
    for (u = [i], j = 1; j <= n; j++) {
      u[j] = a[i - 1] === b[j - 1] ? t[j - 1] : min(t[j - 1], t[j], u[j - 1]) + 1;
    }

    t = u;
  }

  return u[n];
}

function findSuggestion(str, arr) {
  const distances = arr.map(el => levenshtein(el, str));
  return arr[distances.indexOf(min(...distances))];
}

/***/ }),

/***/ "./node_modules/@babel/helper-validator-option/lib/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/helper-validator-option/lib/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "OptionValidator", ({
  enumerable: true,
  get: function () {
    return _validator.OptionValidator;
  }
}));
Object.defineProperty(exports, "findSuggestion", ({
  enumerable: true,
  get: function () {
    return _findSuggestion.findSuggestion;
  }
}));

var _validator = __webpack_require__(/*! ./validator */ "./node_modules/@babel/helper-validator-option/lib/validator.js");

var _findSuggestion = __webpack_require__(/*! ./find-suggestion */ "./node_modules/@babel/helper-validator-option/lib/find-suggestion.js");

/***/ }),

/***/ "./node_modules/@babel/helper-validator-option/lib/validator.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/helper-validator-option/lib/validator.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OptionValidator = void 0;

var _findSuggestion = __webpack_require__(/*! ./find-suggestion */ "./node_modules/@babel/helper-validator-option/lib/find-suggestion.js");

class OptionValidator {
  constructor(descriptor) {
    this.descriptor = descriptor;
  }

  validateTopLevelOptions(options, TopLevelOptionShape) {
    const validOptionNames = Object.keys(TopLevelOptionShape);

    for (const option of Object.keys(options)) {
      if (!validOptionNames.includes(option)) {
        throw new Error(this.formatMessage(`'${option}' is not a valid top-level option.
- Did you mean '${(0, _findSuggestion.findSuggestion)(option, validOptionNames)}'?`));
      }
    }
  }

  validateBooleanOption(name, value, defaultValue) {
    if (value === undefined) {
      return defaultValue;
    } else {
      this.invariant(typeof value === "boolean", `'${name}' option must be a boolean.`);
    }

    return value;
  }

  validateStringOption(name, value, defaultValue) {
    if (value === undefined) {
      return defaultValue;
    } else {
      this.invariant(typeof value === "string", `'${name}' option must be a string.`);
    }

    return value;
  }

  invariant(condition, message) {
    if (!condition) {
      throw new Error(this.formatMessage(message));
    }
  }

  formatMessage(message) {
    return `${this.descriptor}: ${message}`;
  }

}

exports.OptionValidator = OptionValidator;

/***/ }),

/***/ "./node_modules/@babel/preset-env/lib/debug.js":
/*!*****************************************************!*\
  !*** ./node_modules/@babel/preset-env/lib/debug.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.logPlugin = void 0;

var _helperCompilationTargets = __webpack_require__(/*! @babel/helper-compilation-targets */ "./node_modules/@babel/helper-compilation-targets/lib/index.js");

const logPlugin = (item, targetVersions, list) => {
  const filteredList = (0, _helperCompilationTargets.getInclusionReasons)(item, targetVersions, list);
  const support = list[item];

  if (!support) {
    console.log(`  ${item}`);
    return;
  }

  let formattedTargets = `{`;
  let first = true;

  for (const target of Object.keys(filteredList)) {
    if (!first) formattedTargets += `,`;
    first = false;
    formattedTargets += ` ${target}`;
    if (support[target]) formattedTargets += ` < ${support[target]}`;
  }

  formattedTargets += ` }`;
  console.log(`  ${item} ${formattedTargets}`);
};

exports.logPlugin = logPlugin;

/***/ }),

/***/ "./tasks/streams/API.js":
/*!******************************!*\
  !*** ./tasks/streams/API.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_storage_save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/storage/save */ "./tasks/streams/js/storage/save.js");
/* harmony import */ var _js_Store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/Store */ "./tasks/streams/js/Store.js");
/* harmony import */ var _js_storage_recover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/storage/recover */ "./tasks/streams/js/storage/recover.js");
/* harmony import */ var _js_analyzeGraph_analyze__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/analyzeGraph/analyze */ "./tasks/streams/js/analyzeGraph/analyze.js");
/* harmony import */ var _js_CNV_library__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/CNV/library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./css/style.scss */ "./tasks/streams/css/style.scss");
/* harmony import */ var _js_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./js/css */ "./tasks/streams/js/css.js");
/* harmony import */ var _js_eventHandlers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./js/eventHandlers */ "./tasks/streams/js/eventHandlers.js");
/* harmony import */ var _js_graphHandlers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./js/graphHandlers */ "./tasks/streams/js/graphHandlers.js");
/* harmony import */ var _js_drawingLine__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./js/drawingLine */ "./tasks/streams/js/drawingLine.js");
/* harmony import */ var _js_shiftHandlers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./js/shiftHandlers */ "./tasks/streams/js/shiftHandlers.js");
/* harmony import */ var _js_zHandlers__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./js/zHandlers */ "./tasks/streams/js/zHandlers.js");
/* harmony import */ var _js_SETTINGS__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./js/SETTINGS */ "./tasks/streams/js/SETTINGS.js");
/* harmony import */ var _js_firstDraw__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./js/firstDraw */ "./tasks/streams/js/firstDraw.js");
/* harmony import */ var _js_UI__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./js/UI */ "./tasks/streams/js/UI.js");



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


















var Streams = /*#__PURE__*/function () {
  function Streams(settings) {
    _classCallCheck(this, Streams);

    _js_Store__WEBPACK_IMPORTED_MODULE_3__["default"].API = this;
    this.settings = settings;
  }

  _createClass(Streams, [{
    key: "id",
    value: function id() {
      return "streams" + this.settings.level;
    }
  }, {
    key: "initialize",
    value: function initialize(domNode, kioapi, preferred_width) {
      this.kioapi = kioapi;
      this.domNode = domNode;
      console.log("before SET", _js_SETTINGS__WEBPACK_IMPORTED_MODULE_14__["default"].getAll().NUMERIC_POWER);
      _js_SETTINGS__WEBPACK_IMPORTED_MODULE_14__["default"].set(this.settings);
      console.log("after SET", _js_SETTINGS__WEBPACK_IMPORTED_MODULE_14__["default"].getAll().NUMERIC_POWER);
      window.problem.hidden = true;
      var power = prompt("Введите входную мощность");
      var outer = prompt("Введите выходные выходные мощности через точку с запятой. Пример: 1;3;4");
      window.problem.hidden = false;
      console.log(power);
      console.log(outer.split(";"));
      _js_SETTINGS__WEBPACK_IMPORTED_MODULE_14__["default"].changeProperty("TASK", outer.split(";"));
      _js_SETTINGS__WEBPACK_IMPORTED_MODULE_14__["default"].changeProperty("START_POWER", power); //---------------------------- copy from streams.js

      var _SETTINGS$getAll = _js_SETTINGS__WEBPACK_IMPORTED_MODULE_14__["default"].getAll(),
          BRANCHES = _SETTINGS$getAll.BRANCHES,
          LINE_WIDTH = _SETTINGS$getAll.LINE_WIDTH,
          STACK_LIMIT = _SETTINGS$getAll.STACK_LIMIT,
          SHOW_PATH = _SETTINGS$getAll.SHOW_PATH,
          CONTROL_SUM_WARNING = _SETTINGS$getAll.CONTROL_SUM_WARNING,
          STACK = _SETTINGS$getAll.STACK,
          SHOW_CYCLES = _SETTINGS$getAll.SHOW_CYCLES,
          SHOW_PRIORITIES = _SETTINGS$getAll.SHOW_PRIORITIES,
          START_POWER = _SETTINGS$getAll.START_POWER,
          NUMERIC_POWER = _SETTINGS$getAll.NUMERIC_POWER,
          LINE_DIVISION = _SETTINGS$getAll.LINE_DIVISION,
          LINE_WIDTH_MIN = _SETTINGS$getAll.LINE_WIDTH_MIN,
          LOOPS = _SETTINGS$getAll.LOOPS,
          MERGES = _SETTINGS$getAll.MERGES,
          FINISH_LIMITS = _SETTINGS$getAll.FINISH_LIMITS;

      domNode.innerHTML = "\n                            <div class=\"dark hidden\"></div>\n\n                            <canvas id=\"canvas\">\n                            </canvas>\n                            \n<!--                            <button id=\"btn_award\" class=\"btn_reset\">-->\n<!--                                <i class=\"fas fa-award\"></i>-->\n<!--                            </button>-->\n<!--                            <button id=\"btn_info\" class=\"btn_reset hidden\">-->\n<!--                                <i class=\"fas fa-info\"></i>-->\n<!--                            </button>-->\n<!--                            <button id=\"btn_save\" class=\"btn_reset\">-->\n<!--                                <i class=\"fas fa-save\"></i>-->\n<!--                            </button>-->\n                            <button id=\"btn_pen\" class=\"btn_reset pen_active\">\n                                \u0421\u0442\u0440\u043E\u0438\u0442\u044C\n                                <i class=\"fas fa-pen\"></i>\n                            </button>\n                            <button id=\"btn_delete\" class=\"btn_reset\">\n                                \u0423\u0434\u0430\u043B\u0438\u0442\u044C\n                                <i class=\"fas fa-backspace\"></i>\n                            </button>\n                            <button id=\"btn_prev\" class=\"btn_reset\">\n                                \u041D\u0430\u0437\u0430\u0434\n                            </button>\n                            <button id=\"btn_next\" class=\"btn_reset\">\n                                \u0412\u043F\u0435\u0440\u0435\u0434\n                            </button>\n                            \n                            <div class=\"warning hidden\">\n                            \n                            </div>\n                            \n                            <div class=\"setting_warning hidden\">\n                                <ul id=\"setting_list\"></ul>\n                            </div>\n                            <!--<h2 id=\"mode\">\u0420\u0435\u0436\u0438\u043C: \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435</h2>-->\n                            <input class=\"saved_code\">\n                            <!--<button id=\"delLine\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043B\u0438\u043D\u0438\u044E</button>-->\n<!--                            <button id=\"save\">\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u0434</button>-->\n<!--                            <input id=\"recover_input\" placeholder=\"\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u0434\">-->\n<!--                            <button id=\"recover_btn\">\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C</button>-->\n<!--                            <input class=\"saved_code\">-->\n\n                    ";
      var canvas = document.querySelector("#canvas");
      var saveBtn = document.querySelector("#save");
      var recoverInput = document.querySelector("#recover_input");
      var recoverBtn = document.querySelector("#recover_btn");
      var savedCodeField = document.querySelector(".saved_code");
      var KIOcontainer = document.querySelector(".kio-base-info-panels-container");
      var KIOsaves = document.querySelector(".kio-base-solutions-container");
      var context = canvas.getContext("2d");
      KIOsaves.id = "KIOsaves";

      window.onresize = function (e) {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = window.innerHeight - KIOcontainer.getBoundingClientRect().height - 40;
        _js_CNV_library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
      };

      window.onload = function (e) {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = window.innerHeight - KIOcontainer.getBoundingClientRect().height - 40;
      }; //Инициализация библиотеки CNV
      //Базовая настройка


      _js_CNV_library__WEBPACK_IMPORTED_MODULE_6__["default"].setContext(context);
      _js_CNV_library__WEBPACK_IMPORTED_MODULE_6__["default"].setCanvas(canvas);
      _js_CNV_library__WEBPACK_IMPORTED_MODULE_6__["default"].setCSS(_js_css__WEBPACK_IMPORTED_MODULE_8__["default"]);
      _js_CNV_library__WEBPACK_IMPORTED_MODULE_6__["default"].settings.draggableCanvas = false;

      _js_CNV_library__WEBPACK_IMPORTED_MODULE_6__["default"].settings.draggableCanvasObserver = function (x, y) {
        canvas.style.backgroundPositionY = y + "px";
        canvas.style.backgroundPositionX = x + "px";
      };

      canvas.addEventListener("click", function (e) {
        if (window.pageYOffset !== 0) {
          $([document.documentElement, document.body]).animate({
            scrollTop: $("#canvas").offset().top
          }, 300);
        }
      }); //запуск

      _js_CNV_library__WEBPACK_IMPORTED_MODULE_6__["default"].start(); //Инициализация store

      _js_Store__WEBPACK_IMPORTED_MODULE_3__["default"].setCanvas(canvas);
      _js_Store__WEBPACK_IMPORTED_MODULE_3__["default"].setContext(context);
      (0,_js_firstDraw__WEBPACK_IMPORTED_MODULE_15__["default"])(canvas); //TODO initialization was here

      (0,_js_UI__WEBPACK_IMPORTED_MODULE_16__["default"])();
      /*const saveBtn = document.querySelector("#save");
      const recoverInput = document.querySelector("#recover_input");
      const recoverBtn = document.querySelector("#recover_btn");
      const savedCodeField = document.querySelector(".saved_code");
        recoverBtn.onclick = e => {
          recover(recoverInput.value);
          analyze(store.state.lines);
          recoverInput.value = ""
      }
        saveBtn.onclick = e => {
          saveBtn.classList.remove("saveOk");
          const disk = save({dont_save: true});
            savedCodeField.value = disk;
          savedCodeField.select();
            document.execCommand("copy");
          saveBtn.classList.add("saveOk");
          setTimeout(()=> {
              saveBtn.classList.remove("saveOk");
          }, 1000)
      }
      */

      window.addEventListener("keydown", _js_shiftHandlers__WEBPACK_IMPORTED_MODULE_12__.shiftDownHandler);
      (0,_js_zHandlers__WEBPACK_IMPORTED_MODULE_13__["default"])();
      "Object { number_of_branches: 0, number_of_plots: 0, number_of_mergers: 0, number_of_loops: 0 }"; //-----------------------------end copy from streams.js
    }
  }, {
    key: "parameters",
    value: function parameters() {
      console.log("params");
      var params = [{
        name: "number_of_branches",
        //название параметра
        title: "Количество делений потка: ",
        //отображение названия для пользователя
        ordering: 'minimize',
        // 'maximize' - надо как можно больше, 'minimize' - как можно меньше
        view: "" // отображение значения параметра пользователю. Можно не указывать.
        // Если задана строка, как в этом примере, она означает постфикс, т.е. если значение
        // параметра равно, например, 42, пользователь увидит 42ш.
        // Либо это может быть функция от одного аргумента, значения параметра, она
        // должна возвращать строку для отображения пользователю,

      }, {
        name: "number_of_finish",
        title: "Количество стоков: ",
        ordering: 'minimize'
      }, {
        name: "number_of_loops",
        title: "Количество петель: ",
        ordering: 'minimize'
      }, {
        name: "number_of_mergers",
        title: "Количество слияний: ",
        ordering: 'minimize'
      }, {
        name: "number_of_results",
        title: "Результат: ",
        ordering: 'maximize',
        view: "%"
      }];

      if (_js_SETTINGS__WEBPACK_IMPORTED_MODULE_14__["default"].getAll().SHOW_NUMBER_OF_COLLISION) {
        params.push({
          name: "number_of_collision",
          title: "Пересечений: ",
          ordering: 'minimize',
          view: ""
        });
      }

      return params;
    }
  }, {
    key: "solution",
    value: function solution() {
      return (0,_js_storage_save__WEBPACK_IMPORTED_MODULE_2__["default"])({
        dont_save: true
      });
    }
  }, {
    key: "loadSolution",
    value: function loadSolution(solution) {
      //console.log("Store.API.emptySolution", Store.API.emptySolution);
      if (solution !== undefined) {
        if (typeof solution === "string") {
          (0,_js_storage_recover__WEBPACK_IMPORTED_MODULE_4__["default"])(solution);
          (0,_js_analyzeGraph_analyze__WEBPACK_IMPORTED_MODULE_5__["default"])(_js_Store__WEBPACK_IMPORTED_MODULE_3__["default"].state.lines);
          setTimeout(function () {
            _js_CNV_library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
          }, 0);
          solution = JSON.parse(solution);
        } //console.log("loadSolution", solution);


        if (solution) {
          this.kioapi.submitResult(solution);
        }
      }
    }
  }]);

  return Streams;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Streams);

/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/Shape.js":
/*!**********************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/Shape.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.link.js */ "./node_modules/core-js/modules/es.string.link.js");
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _library__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./geometry/geometry */ "./tasks/streams/js/CNV/Engine/geometry/geometry.js");
/* harmony import */ var _cssEngine_availableProperties__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cssEngine/availableProperties */ "./tasks/streams/js/CNV/Engine/cssEngine/availableProperties.js");







function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var Shape = /*#__PURE__*/function () {
  function Shape(link, id) {
    var _this = this;

    _classCallCheck(this, Shape);

    this.link = link;
    this.id = id;
    this.isPointer = false;
    this.styleProp = {};
    _cssEngine_availableProperties__WEBPACK_IMPORTED_MODULE_8__["default"].forEach(function (property) {
      link = _this.link;
      Object.defineProperty(_this.styleProp, property, {
        get: function get() {
          return link.style[property];
        },
        set: function set(arg) {
          link.style[property] = arg;
          _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
        }
      });
    });
  }

  _createClass(Shape, [{
    key: "system",
    get: function get() {
      var __this = this;

      return {
        get equation() {
          if (__this.link.type === "line") {
            var eq = (0,_geometry_geometry__WEBPACK_IMPORTED_MODULE_7__.getEquationFor2points)(__this.link.start.x, __this.link.start.y, __this.link.end.x, __this.link.end.y);
            eq.x3 = __this.link.check.x;
            eq.y3 = __this.link.check.y;
            eq.target = __this;
            return eq;
          }
        },

        get coordinates() {
          var _this$link$end, _this$link$end2, _this$link$check, _this$link$check2;

          var x1 = __this.link.start.x;
          var y1 = __this.link.start.y;
          var x2 = (_this$link$end = __this.link.end) === null || _this$link$end === void 0 ? void 0 : _this$link$end.x;
          var y2 = (_this$link$end2 = __this.link.end) === null || _this$link$end2 === void 0 ? void 0 : _this$link$end2.y;
          var x3 = (_this$link$check = __this.link.check) === null || _this$link$check === void 0 ? void 0 : _this$link$check.x;
          var y3 = (_this$link$check2 = __this.link.check) === null || _this$link$check2 === void 0 ? void 0 : _this$link$check2.y;
          return {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            x3: x3,
            y3: y3
          };
        },

        getCoordinatesX: function getCoordinatesX(y) {
          return (0,_geometry_geometry__WEBPACK_IMPORTED_MODULE_7__.getCoordinates)(this.equation, undefined, y);
        },
        getCoordinatesY: function getCoordinatesY(x) {
          return (0,_geometry_geometry__WEBPACK_IMPORTED_MODULE_7__.getCoordinates)(this.equation, x, undefined);
        },
        moveTo: function moveTo(move, x) {
          return (0,_geometry_geometry__WEBPACK_IMPORTED_MODULE_7__.moveTo)(this.equation, move, x);
        },

        get length() {
          return (0,_geometry_geometry__WEBPACK_IMPORTED_MODULE_7__.length)(this.equation);
        }

      };
    }
  }, {
    key: "classList",
    get: function get() {
      var link = this.link;
      return {
        add: function add(className) {
          if (!link.classList.includes(className)) {
            link.classList.push(className);
            _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
          }
        },
        remove: function remove(className) {
          var index = link.classList.indexOf(className);

          if (index !== -1) {
            link.classList.splice(index, 1);
            _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
          }
        },
        toggle: function toggle(className) {
          var index = link.classList.indexOf(className);

          if (index !== -1) {
            link.classList.splice(index, 1);
            _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
          } else {
            link.classList.push(className);
            _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
          }
        },
        contains: function contains(className) {
          return link.classList.includes(className);
        }
      };
    }
  }, {
    key: "style",
    get: function get() {
      return this.styleProp;
    }
  }, {
    key: "update",
    get: function get() {
      var link = this.link;
      return {
        get check() {
          return {
            set x(x) {
              link.check.x = x;
              _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
            },

            set y(y) {
              link.check.y = y;
              _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
            }

          };
        },

        get start() {
          return {
            set x(x) {
              link.start.x = x;
              _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
            },

            set y(y) {
              link.start.y = y;
              _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
            }

          };
        },

        get startPosition() {
          return {
            set x(x) {
              link.start.x = x;
              _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
            },

            set y(y) {
              link.start.y = y;
              _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
            }

          };
        },

        get end() {
          if (link.type === "line") {
            return {
              set x(x) {
                link.end.x = x;
                _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
              },

              set y(y) {
                link.end.y = y;
                _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
              }

            };
          }
        },

        get endPosition() {
          if (link.type === "line") {
            return {
              set x(x) {
                link.end.x = x;
                _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
              },

              set y(y) {
                link.end.y = y;
                _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
              }

            };
          }
        },

        set width(newWidth) {
          link.width = newWidth;
          _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
        },

        set height(newHeight) {
          link.height = newHeight;
          _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
        }

      };
    }
  }, {
    key: "pointer",
    set: function set(bool) {
      this.isPointer = !!bool;
      this.link.pointer = this.isPointer;
    }
  }, {
    key: "onmouseover",
    set: function set(callback) {
      _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.mouseover[this.id] = callback;

      if (!_library__WEBPACK_IMPORTED_MODULE_6__["default"].state.__mouseMoveTargets.includes(this.id)) {
        _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.__mouseMoveTargets.push(this.id);
      }
    }
  }, {
    key: "onmouseenter",
    set: function set(callback) {
      _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.mouseenter[this.id] = callback;

      if (!_library__WEBPACK_IMPORTED_MODULE_6__["default"].state.__mouseMoveTargets.includes(this.id)) {
        _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.__mouseMoveTargets.push(this.id);
      }
    }
  }, {
    key: "onmouseleave",
    set: function set(callback) {
      _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.mouseleave[this.id] = callback;

      if (!_library__WEBPACK_IMPORTED_MODULE_6__["default"].state.__mouseMoveTargets.includes(this.id)) {
        _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.__mouseMoveTargets.push(this.id);
      }
    }
  }, {
    key: "onclick",
    set: function set(callback) {
      if (!_library__WEBPACK_IMPORTED_MODULE_6__["default"].state.__mouseClickTargets.includes(this.id)) {
        _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.__mouseClickTargets.push(this.id);
      }

      _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.click[this.id] = callback;
    }
  }, {
    key: "isLine",
    get: function get() {
      var distance = 3;
      return Math.abs(this.link.start.x - this.link.check.x) < distance && Math.abs(this.link.start.y - this.link.check.y) < distance;
    }
  }, {
    key: "remove",
    value: function remove() {
      //удаляем информацию
      delete _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.__shapes[this.id]; //удаляем инстанс класса

      delete _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.shapes[this.id]; //удаляем слушатели событий

      delete _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.mouseenter[this.id];
      delete _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.mouseleave[this.id];
      delete _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.mouseenter[this.id];
      delete _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.click[this.id];
      var MMT = _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.__mouseMoveTargets;
      var MCT = _library__WEBPACK_IMPORTED_MODULE_6__["default"].state.__mouseClickTargets;

      if (MMT.indexOf(this.id) >= 0) {
        MMT.splice(MMT.indexOf(this.id), 1);
      }

      if (MCT.indexOf(this.id) >= 0) {
        MCT.splice(MCT.indexOf(this.id), 1);
      }

      _library__WEBPACK_IMPORTED_MODULE_6__["default"].render();
    }
  }]);

  return Shape;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Shape);

/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/cssEngine/availableProperties.js":
/*!**********************************************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/cssEngine/availableProperties.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//Скорее всего тут нужно указать еще и возможные значения, чтобы сделать валидацию
var availableProperties = ["padding", "color", "backgroundColor", "zIndex", "lineWidth", "radius", "position", "fontFamily", "fontSize", "visibility"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (availableProperties);

/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/cssEngine/cssEngine.js":
/*!************************************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/cssEngine/cssEngine.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cssEngine": () => (/* binding */ cssEngine),
/* harmony export */   "cssIndex": () => (/* binding */ cssIndex)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");
/* harmony import */ var core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_7__);









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function cssEngine(props) {
  var css = props.css,
      classes = props.classes,
      type = props.type,
      ownStyle = props.ownStyle;
  var common = {
    position: "static"
  };
  var std = {
    line: _objectSpread(_objectSpread({}, common), {}, {
      lineWidth: 5,
      color: "black"
    }),
    circle: _objectSpread(_objectSpread({}, common), {}, {
      startAngle: 0,
      endAngle: 2 * Math.PI,
      radius: 10,
      color: "black"
    }),
    text: _objectSpread(_objectSpread({}, common), {}, {
      fontSize: "14px",
      fontFamily: "serif",
      color: "black",
      padding: 0
    }),
    rect: _objectSpread(_objectSpread({}, common), {}, {
      backgroundColor: "white",
      padding: 0,
      position: "static"
    })
  };

  var custom = _objectSpread({}, std[type]);

  classes.forEach(function (className) {
    custom = _objectSpread(_objectSpread({}, custom), css[className]);
  });
  custom = _objectSpread(_objectSpread({}, custom), ownStyle);
  return custom;
}

function cssIndex(css, shapes) {
  var final = {};

  for (var id in shapes) {
    var shape = shapes[id];
    var index = void 0;
    shape.classList.forEach(function (CLS) {
      var _css$CLS;

      if ((_css$CLS = css[CLS]) !== null && _css$CLS !== void 0 && _css$CLS.zIndex) {
        index = css[CLS].zIndex;
      }
    });
    if (index === undefined) index = 0;

    if (final.hasOwnProperty(index)) {
      final[index].push(shape);
    } else {
      final[index] = [shape];
    }
  }

  if (final.hasOwnProperty(10)) {
    final[10].push({
      type: "__POINTERS_RENDER"
    });
  } else {
    final[10] = [{
      type: "__POINTERS_RENDER"
    }];
  }

  var keys = Object.keys(final).sort(function (a, b) {
    return a - b;
  });
  return {
    shapes: final,
    keys: keys
  };
}



/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/cssEngine/selecting.js":
/*!************************************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/cssEngine/selecting.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "querySelectorEngine": () => (/* binding */ querySelectorEngine),
/* harmony export */   "querySelectorAllEngine": () => (/* binding */ querySelectorAllEngine)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__);




function querySelectorEngine(selector, elements, shapes) {
  for (var id in elements) {
    var shape = elements[id];

    if (selector[0] === ".") {
      if (shape.classList.includes(selector.slice(1))) {
        return shapes[id];
      }
    } else if (selector[0] === "#") {
      if (shape.userId === selector.slice(1)) {
        return shapes[id];
      }
    } else {
      if (shape.type === selector) {
        return shapes[id];
      }
    }
  }
}

function querySelectorAllEngine(selector, elements, shapes) {
  var result = [];

  for (var id in elements) {
    var shape = elements[id];

    if (selector[0] === ".") {
      if (shape.classList.includes(selector.slice(1))) {
        result.push(shapes[id]);
      }
    } else if (selector[0] === "#") {
      if (shape.userId === selector.slice(1)) {
        result.push(shapes[id]);
      }
    } else {
      if (shape.type === selector) {
        result.push(shapes[id]);
      }
    }
  }

  return result;
}



/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/dragCanvas.js":
/*!***************************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/dragCanvas.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _library__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./geometry/geometry */ "./tasks/streams/js/CNV/Engine/geometry/geometry.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Store */ "./tasks/streams/js/CNV/Store.js");
/* harmony import */ var _mousePosition__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../mousePosition */ "./tasks/streams/js/mousePosition.js");












function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






function dragCanvas() {
  function onMouseDown(e) {
    if (_library__WEBPACK_IMPORTED_MODULE_11__["default"].state.draggableCanvas) {
      for (var i = 0; i < _library__WEBPACK_IMPORTED_MODULE_11__["default"].state.__mouseClickTargets.length; i++) {
        var link = _library__WEBPACK_IMPORTED_MODULE_11__["default"].state.__shapes[_library__WEBPACK_IMPORTED_MODULE_11__["default"].state.__mouseClickTargets[i]];

        var _mousePosition = (0,_mousePosition__WEBPACK_IMPORTED_MODULE_14__["default"])(e),
            _mousePosition2 = _slicedToArray(_mousePosition, 2),
            clientX = _mousePosition2[0],
            clientY = _mousePosition2[1];

        var res = (0,_geometry_geometry__WEBPACK_IMPORTED_MODULE_12__.nearDot)({
          distance: 5,
          userX: clientX,
          userY: clientY,
          x0: link.start.x + _library__WEBPACK_IMPORTED_MODULE_11__["default"].state.shift.x,
          y0: link.start.y + _library__WEBPACK_IMPORTED_MODULE_11__["default"].state.shift.y,
          e: e
        });
        if (res) return;
      }

      _library__WEBPACK_IMPORTED_MODULE_11__["default"].canvas.style.cursor = "grab";
      _library__WEBPACK_IMPORTED_MODULE_11__["default"].canvas.addEventListener("mousemove", onMouseMove);
    }
  }

  function onMouseUp(e) {
    if (_library__WEBPACK_IMPORTED_MODULE_11__["default"].state.draggableCanvas) {
      _library__WEBPACK_IMPORTED_MODULE_11__["default"].canvas.style.cursor = "default";
      _library__WEBPACK_IMPORTED_MODULE_11__["default"].canvas.removeEventListener("mousemove", onMouseMove);
    }
  }

  _library__WEBPACK_IMPORTED_MODULE_11__["default"].canvas.addEventListener("mousedown", onMouseDown);
  _library__WEBPACK_IMPORTED_MODULE_11__["default"].canvas.addEventListener("mouseup", onMouseUp);

  function onMouseMove(e) {
    _library__WEBPACK_IMPORTED_MODULE_11__["default"].canvas.style.cursor = "grabbing";

    if (_library__WEBPACK_IMPORTED_MODULE_11__["default"].state.draggableCanvas) {
      _library__WEBPACK_IMPORTED_MODULE_11__["default"].state.shift.x += e.movementX;
      _library__WEBPACK_IMPORTED_MODULE_11__["default"].state.shift.y += e.movementY;

      if (_Store__WEBPACK_IMPORTED_MODULE_13__["default"].draggableCanvasObserver) {
        _Store__WEBPACK_IMPORTED_MODULE_13__["default"].draggableCanvasObserver(_library__WEBPACK_IMPORTED_MODULE_11__["default"].state.shift.x, _library__WEBPACK_IMPORTED_MODULE_11__["default"].state.shift.y);
      }

      _library__WEBPACK_IMPORTED_MODULE_11__["default"].render();
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dragCanvas);

/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/eventsHandles/mouseClickEngine.js":
/*!***********************************************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/eventsHandles/mouseClickEngine.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../geometry/geometry */ "./tasks/streams/js/CNV/Engine/geometry/geometry.js");
/* harmony import */ var _selfEvent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./selfEvent */ "./tasks/streams/js/CNV/Engine/eventsHandles/selfEvent.js");
/* harmony import */ var _mousePosition__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../mousePosition */ "./tasks/streams/js/mousePosition.js");












function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





function mouseClickEngine(e) {
  var _this = this;

  var needToRedraw = false;

  var _mousePosition = (0,_mousePosition__WEBPACK_IMPORTED_MODULE_13__["default"])(e),
      _mousePosition2 = _slicedToArray(_mousePosition, 2),
      clientX = _mousePosition2[0],
      clientY = _mousePosition2[1];

  var _loop = function _loop(i) {
    var link = _this.state.__shapes[_this.state.__mouseClickTargets[i]];

    if (link.type === "line") {
      (0,_geometry_geometry__WEBPACK_IMPORTED_MODULE_11__.nearLine)({
        distance: 5,
        userX: clientX,
        userY: clientY,
        x1: link.start.x + _this.state.shift.x,
        y1: link.start.y + _this.state.shift.y,
        x2: link.end.x + _this.state.shift.x,
        y2: link.end.y + _this.state.shift.y,
        x3: link.check.x + _this.state.shift.x,
        y3: link.check.y + _this.state.shift.y,
        e: e
      }, function (e) {
        if (_this.state.click[link.id]) {
          _this.state.click[link.id]((0,_selfEvent__WEBPACK_IMPORTED_MODULE_12__["default"])(e, _this.state.shapes[link.id]));
        }
      });
    } else if (link.type === "circle") {
      (0,_geometry_geometry__WEBPACK_IMPORTED_MODULE_11__.nearDot)({
        distance: 5,
        userX: clientX,
        userY: clientY,
        x0: link.start.x + _this.state.shift.x,
        y0: link.start.y + _this.state.shift.y,
        e: e
      }, function (e) {
        if (_this.state.click[link.id]) {
          _this.state.click[link.id]((0,_selfEvent__WEBPACK_IMPORTED_MODULE_12__["default"])(e, _this.state.shapes[link.id]));
        }
      });
    }
  };

  for (var i = 0; i < this.state.__mouseClickTargets.length; i++) {
    _loop(i);
  }

  if (needToRedraw) {
    this.render();
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mouseClickEngine);

/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/eventsHandles/mouseMoveEngine.js":
/*!**********************************************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/eventsHandles/mouseMoveEngine.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../geometry/geometry */ "./tasks/streams/js/CNV/Engine/geometry/geometry.js");
/* harmony import */ var _selfEvent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./selfEvent */ "./tasks/streams/js/CNV/Engine/eventsHandles/selfEvent.js");
/* harmony import */ var _mousePosition__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../mousePosition */ "./tasks/streams/js/mousePosition.js");












function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





function mouseMoveEngine(e) {
  var _this = this;

  var needToRedraw = false;

  var _mousePosition = (0,_mousePosition__WEBPACK_IMPORTED_MODULE_13__["default"])(e),
      _mousePosition2 = _slicedToArray(_mousePosition, 2),
      clientX = _mousePosition2[0],
      clientY = _mousePosition2[1];

  var successCallback = function successCallback(link, e) {
    var selfE = (0,_selfEvent__WEBPACK_IMPORTED_MODULE_12__["default"])(e, _this.state.shapes[link.id]); //let selfE = {...e, target: this.state.shapes[link.id]};

    if (_this.state.mouseover[link.id]) {
      _this.state.mouseover[link.id](selfE);

      needToRedraw = true;
    }

    if (_this.state.mouseenter[link.id]) {
      if (!link.events.mouseenter) {
        _this.state.mouseenter[link.id](selfE);

        link.events.mouseenter = true;
        needToRedraw = true;
      }
    }

    if (_this.state.mouseleave[link.id]) {
      link.events.mouseleave = true;
    }
  };

  var failCallback = function failCallback(link, e) {
    var selfE = (0,_selfEvent__WEBPACK_IMPORTED_MODULE_12__["default"])(e, _this.state.shapes[link.id]);

    if (_this.state.mouseleave[link.id]) {
      // console.log("here", link.events.mouseenter)
      if (link.events.mouseenter) {
        _this.state.mouseleave[link.id](selfE);

        link.events.mouseenter = false;
        needToRedraw = true;
      }
    }

    if (_this.state.mouseenter[link.id]) {
      link.events.mouseenter = false;
    }
  };

  for (var i = 0; i < this.state.__mouseMoveTargets.length; i++) {
    var link = this.state.__shapes[this.state.__mouseMoveTargets[i]];

    if (link.type === "line") {
      var _link$end, _link$end2, _link$check, _link$check2;

      (0,_geometry_geometry__WEBPACK_IMPORTED_MODULE_11__.nearLine)({
        distance: 5,
        userX: clientX,
        userY: clientY,
        x1: link.start.x + this.state.shift.x,
        y1: link.start.y + this.state.shift.y,
        x2: ((_link$end = link.end) === null || _link$end === void 0 ? void 0 : _link$end.x) + this.state.shift.x || link.start.x + this.state.shift.x,
        y2: ((_link$end2 = link.end) === null || _link$end2 === void 0 ? void 0 : _link$end2.y) + this.state.shift.y || link.start.y + this.state.shift.y,
        x3: ((_link$check = link.check) === null || _link$check === void 0 ? void 0 : _link$check.x) + this.state.shift.x || link.start.x + this.state.shift.x,
        y3: ((_link$check2 = link.check) === null || _link$check2 === void 0 ? void 0 : _link$check2.y) + this.state.shift.y || link.start.y + this.state.shift.y
      }, successCallback.bind(this, link, e), failCallback.bind(this, link, e));
    } else if (link.type === "circle") {
      (0,_geometry_geometry__WEBPACK_IMPORTED_MODULE_11__.nearDot)({
        distance: 5,
        userX: clientX,
        userY: clientY,
        x0: link.start.x + this.state.shift.x,
        y0: link.start.y + this.state.shift.y
      }, successCallback.bind(this, link, e), failCallback.bind(this, link, e));
    }
  }

  if (needToRedraw) {
    this.render();
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mouseMoveEngine);

/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/eventsHandles/selfEvent.js":
/*!****************************************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/eventsHandles/selfEvent.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../Store */ "./tasks/streams/js/CNV/Store.js");
/* harmony import */ var _mousePosition__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../mousePosition */ "./tasks/streams/js/mousePosition.js");












function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




function selfEvent(e, target) {
  var state = _Store__WEBPACK_IMPORTED_MODULE_11__["default"].getState();

  var _mousePosition = (0,_mousePosition__WEBPACK_IMPORTED_MODULE_12__["default"])(e),
      _mousePosition2 = _slicedToArray(_mousePosition, 2),
      clientX = _mousePosition2[0],
      clientY = _mousePosition2[1];

  return {
    clientY: clientY,
    clientX: clientX,
    altKey: e.altKey,
    button: e.button,
    ctrlKey: e.ctrlKey,
    layerX: e.layerX,
    layerY: e.layerY,
    movementX: e.movementX,
    movementY: e.movementY,
    currentTarget: e.currentTarget,
    offsetX: e.offsetX,
    offsetY: e.offsetY,
    pageX: e.pageX,
    pageY: e.pageY,
    x: e.x - state.shift.x,
    y: e.y - state.shift.y,
    which: e.which,
    target: target,
    shiftKey: e.shiftKey
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (selfEvent);

/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/geometry/geometry.js":
/*!**********************************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/geometry/geometry.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCoordinates": () => (/* binding */ getCoordinates),
/* harmony export */   "getEquationFor2points": () => (/* binding */ getEquationFor2points),
/* harmony export */   "getEquationForLine": () => (/* binding */ getEquationForLine),
/* harmony export */   "moveTo": () => (/* binding */ moveTo),
/* harmony export */   "nearLine": () => (/* binding */ nearLine),
/* harmony export */   "nearDot": () => (/* binding */ nearDot),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "collision": () => (/* binding */ collision)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_number_is_nan_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.is-nan.js */ "./node_modules/core-js/modules/es.number.is-nan.js");
/* harmony import */ var core_js_modules_es_number_is_nan_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_is_nan_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_3__);





function length(equation) {
  return Math.sqrt(Math.pow(equation.x2 - equation.x1, 2) + Math.pow(equation.y2 - equation.y1, 2));
}

function getCoordinates(equation, x, y) {
  if (x !== undefined) {
    return x * equation.k - equation.b;
  } else if (y !== undefined) {
    return (y - equation.b) / equation.k;
  }
} // функции для поиска пересечений


function realLess(a, b) {
  var flag;
  var eps = 1e-4; //точность вычслений

  flag = b - a > eps;
  return flag;
}

function vektorMulti(ax, ay, bx, by) {
  // ax,ay - координаты a
  //  bx,by - координаты b 
  var vektormulti;
  vektormulti = ax * by - bx * ay;
  return vektormulti;
}

function linesCross(x1, y1, x2, y2, x3, y3, x4, y4) {
  //Пересекаются ли отрезки?
  var v1, v2, v3, v4;
  v1 = vektorMulti(x4 - x3, y4 - y3, x1 - x3, y1 - y3);
  v2 = vektorMulti(x4 - x3, y4 - y3, x2 - x3, y2 - y3);
  v3 = vektorMulti(x2 - x1, y2 - y1, x3 - x1, y3 - y1);
  v4 = vektorMulti(x2 - x1, y2 - y1, x4 - x1, y4 - y1);

  if (realLess(v1 * v2, 0) && realLess(v3 * v4, 0)) {
    //v1v2<0  и v3v4<0, отрезки пересекаются
    return true;
  } else return false;
} //На вход - куравнения двух линий - выход boolean.


function collision(equation1, equation2) {
  //Пересекаются ли 2 отрезка?
  var t = 0,
      t1 = 0;
  var x1 = 0;
  var y1 = 0;
  var x2 = 0;
  var y2 = 0;
  var x3 = 0;
  var y3 = 0;
  var x4 = 0;
  var y4 = 0;
  var distance = 0.2;
  var obj_collision = {
    result: false,
    target: undefined
  };

  if (equation1.x1 === equation1.x3 && equation2.x1 === equation2.x3) {
    obj_collision.result = linesCross(equation1.x1, equation1.y1, equation1.x2, equation1.y2, equation2.x1, equation2.y1, equation2.x2, equation2.y2);
    if (obj_collision.result) obj_collision.target = equation2.target;
    return obj_collision;
  } else if (equation1.x1 === equation1.x3 && equation2.x1 !== equation2.x3) {
    while (t <= 1) {
      x1 = Math.pow(1 - t, 2) * equation2.x1 + 2 * (1 - t) * t * equation2.x3 + Math.pow(t, 2) * equation2.x2;
      y1 = Math.pow(1 - t, 2) * equation2.y1 + 2 * (1 - t) * t * equation2.y3 + Math.pow(t, 2) * equation2.y2;

      if (t !== 0.9999999999999999) {
        x1 = Math.round(x1);
        y1 = Math.round(y1);
      }

      if (t !== 0) {
        x2 = Math.pow(1 - (t - 0.1), 2) * equation2.x1 + 2 * (1 - (t - 0.1)) * (t - 0.1) * equation2.x3 + Math.pow(t - 0.1, 2) * equation2.x2;
        y2 = Math.pow(1 - (t - 0.1), 2) * equation2.y1 + 2 * (1 - (t - 0.1)) * (t - 0.1) * equation2.y3 + Math.pow(t - 0.1, 2) * equation2.y2;
        x2 = Math.round(x2);
        y2 = Math.round(y2);
      } else {
        x2 = Math.pow(1 - (t + 0.1), 2) * equation2.x1 + 2 * (1 - (t + 0.1)) * (t + 0.1) * equation2.x3 + Math.pow(t + 0.1, 2) * equation2.x2;
        y2 = Math.pow(1 - (t + 0.1), 2) * equation2.y1 + 2 * (1 - (t + 0.1)) * (t + 0.1) * equation2.y3 + Math.pow(t + 0.1, 2) * equation2.y2;
        x2 = Math.round(x2);
        y2 = Math.round(y2);
      }

      if (linesCross(equation1.x1, equation1.y1, equation1.x2, equation1.y2, x2, y2, x1, y1)) {
        obj_collision.result = true;
        obj_collision.target = equation2.target;
      }

      t += distance;
    }

    return obj_collision;
  } else if (equation1.x1 !== equation1.x3 && equation2.x1 === equation2.x3) {
    while (t <= 1) {
      x1 = Math.pow(1 - t, 2) * equation1.x1 + 2 * (1 - t) * t * equation1.x3 + Math.pow(t, 2) * equation1.x2;
      y1 = Math.pow(1 - t, 2) * equation1.y1 + 2 * (1 - t) * t * equation1.y3 + Math.pow(t, 2) * equation1.y2;

      if (t !== 0.9999999999999999) {
        x1 = Math.round(x1);
        y1 = Math.round(y1);
      }

      if (t !== 0) {
        x2 = Math.pow(1 - (t - 0.1), 2) * equation1.x1 + 2 * (1 - (t - 0.1)) * (t - 0.1) * equation1.x3 + Math.pow(t - 0.1, 2) * equation1.x2;
        y2 = Math.pow(1 - (t - 0.1), 2) * equation1.y1 + 2 * (1 - (t - 0.1)) * (t - 0.1) * equation1.y3 + Math.pow(t - 0.1, 2) * equation1.y2;
        x2 = Math.round(x2);
        y2 = Math.round(y2);
      } else {
        x2 = Math.pow(1 - (t + 0.1), 2) * equation1.x1 + 2 * (1 - (t + 0.1)) * (t + 0.1) * equation1.x3 + Math.pow(t + 0.1, 2) * equation1.x2;
        y2 = Math.pow(1 - (t + 0.1), 2) * equation1.y1 + 2 * (1 - (t + 0.1)) * (t + 0.1) * equation1.y3 + Math.pow(t + 0.1, 2) * equation1.y2;
        x2 = Math.round(x2);
        y2 = Math.round(y2);
      }

      t += distance;

      if (linesCross(equation2.x1, equation2.y1, equation2.x2, equation2.y2, x2, y2, x1, y1)) {
        obj_collision.result = true;
        obj_collision.target = equation2.target;
      }
    }

    return obj_collision;
  } else {
    while (t <= 1) {
      x1 = Math.pow(1 - t, 2) * equation1.x1 + 2 * (1 - t) * t * equation1.x3 + Math.pow(t, 2) * equation1.x2;
      y1 = Math.pow(1 - t, 2) * equation1.y1 + 2 * (1 - t) * t * equation1.y3 + Math.pow(t, 2) * equation1.y2;

      if (t !== 0.9) {
        x1 = Math.round(x1);
        y1 = Math.round(y1);
      }

      if (t !== 0) {
        x2 = Math.pow(1 - (t - 0.1), 2) * equation1.x1 + 2 * (1 - (t - 0.1)) * (t - 0.1) * equation1.x3 + Math.pow(t - 0.1, 2) * equation1.x2;
        y2 = Math.pow(1 - (t - 0.1), 2) * equation1.y1 + 2 * (1 - (t - 0.1)) * (t - 0.1) * equation1.y3 + Math.pow(t - 0.1, 2) * equation1.y2;
        x2 = Math.round(x2);
        y2 = Math.round(y2);
      } else {
        x2 = Math.pow(1 - (t + 0.1), 2) * equation1.x1 + 2 * (1 - (t + 0.1)) * (t + 0.1) * equation1.x3 + Math.pow(t + 0.1, 2) * equation1.x2;
        y2 = Math.pow(1 - (t + 0.1), 2) * equation1.y1 + 2 * (1 - (t + 0.1)) * (t + 0.1) * equation1.y3 + Math.pow(t + 0.1, 2) * equation1.y2;
        x2 = Math.round(x2);
        y2 = Math.round(y2);
      }

      t += distance;
      t1 = 0;

      while (t1 <= 1) {
        x3 = Math.pow(1 - t1, 2) * equation2.x1 + 2 * (1 - t1) * t1 * equation2.x3 + Math.pow(t1, 2) * equation2.x2;
        y3 = Math.pow(1 - t1, 2) * equation2.y1 + 2 * (1 - t1) * t1 * equation2.y3 + Math.pow(t1, 2) * equation2.y2;

        if (t1 !== 0.9) {
          x3 = Math.round(x3);
          y3 = Math.round(y3);
        }

        if (t1 !== 0) {
          x4 = Math.pow(1 - (t1 - 0.1), 2) * equation2.x1 + 2 * (1 - (t1 - 0.1)) * (t1 - 0.1) * equation2.x3 + Math.pow(t1 - 0.1, 2) * equation2.x2;
          y4 = Math.pow(1 - (t1 - 0.1), 2) * equation2.y1 + 2 * (1 - (t1 - 0.1)) * (t1 - 0.1) * equation2.y3 + Math.pow(t1 - 0.1, 2) * equation2.y2;
          x4 = Math.round(x4);
          y4 = Math.round(y4);
        } else {
          x4 = Math.pow(1 - (t1 + 0.1), 2) * equation2.x1 + 2 * (1 - (t1 + 0.1)) * (t1 + 0.1) * equation2.x3 + Math.pow(t1 + 0.1, 2) * equation2.x2;
          y4 = Math.pow(1 - (t1 + 0.1), 2) * equation2.y1 + 2 * (1 - (t1 + 0.1)) * (t1 + 0.1) * equation2.y3 + Math.pow(t1 + 0.1, 2) * equation2.y2;
          x4 = Math.round(x4);
          y4 = Math.round(y4);
        }

        t1 += distance;

        if (linesCross(x2, y2, x1, y1, x4, y4, x3, y3)) {
          obj_collision.result = true;
          obj_collision.target = equation2.target;
        }
      }
    }

    return obj_collision;
  } //x1 === x3 && y1 === y3 - это прямая

}

function getEquationFor2points(x1, y1, x2, y2) {
  var xTop = -x1;
  var xBottom = x2 - x1;
  var yTop = -y1;
  var yBottom = y2 - y1;
  return {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    xTop: xTop,
    xBottom: xBottom,
    yTop: yTop,
    yBottom: yBottom,
    k: (y2 - y1) / (x2 - x1),
    //!== Infinity ? (y2 - y1) / (x2 - x1) : 1,
    b: x1 * (y2 - y1) / (x2 - x1) - y1 // !== Infinity ? (x1 * (y2 - y1) / (x2 - x1) - y1) : x2,

  };
}

function getEquationForLine(x1, y1, equation) {
  var k = -1 / equation.k;
  var a = Math.sqrt(Math.pow(equation.x1 - x1, 2) + Math.pow(equation.y1 - y1, 2));
  return {
    xTop: -x1,
    xBottom: -(equation.xTop || 1) / equation.xBottom,
    yTop: -y1,
    yBottom: (equation.yTop || 1) / equation.yBottom,
    k: k,
    b: (equation.y2 - equation.y1 >= 0 ? -1 : 1) * Math.sqrt(Math.pow(a * k, 2) + Math.pow(a, 2)) - (equation.y1 + equation.x1 / equation.k)
  };
}

function moveTo(equation, move, x) {
  var lenA = Math.sqrt(Math.pow(equation.x2 - equation.x1, 2) + Math.pow(equation.y2 - equation.y1, 2));
  var lenX = Math.abs(equation.x2 - equation.x1);
  var lenY = Math.abs(equation.y2 - equation.y1); //Чтобы узнать знак сдвига. То есть убывает или возрастает прямая, от этого всё зависит
  //move = move * (equation.x2 - equation.x1 < 0 ? -1 : 1);

  var alfa = equation.x2 - equation.x1 < 0 ? -1 : 1;
  var lenA2;

  if (x === undefined) {
    lenA2 = lenA + move;
  } else if (x !== undefined) {
    lenA2 = Math.sqrt(Math.pow(x - equation.x1, 2) + Math.pow(getCoordinates(equation, x) - equation.y1, 2)) + move;
  }

  var k = lenA2 / lenA;
  var newX;

  if (!Number.isNaN(k)) {
    newX = Math.abs(k * Math.abs(equation.x2 - equation.x1) + alfa * equation.x1);
  } else {
    newX = x + move;
  }

  return {
    x: newX,
    y: getCoordinates(equation, newX)
  };
}

function nearLine(config) {
  var callbackSuccess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var callbackFail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  !config.distance ? config.distance = 1 : config;

  if (callbackSuccess) {
    if (callbackSuccess instanceof Function) {
      callbackSuccess = [callbackSuccess];
    }
  }

  if (callbackFail) {
    if (callbackFail instanceof Function) {
      callbackFail = [callbackFail];
    }
  }

  var res;
  var userX = config.userX,
      userY = config.userY,
      x1 = config.x1,
      y1 = config.y1,
      y2 = config.y2,
      x2 = config.x2,
      x3 = config.x3,
      y3 = config.y3;
  var x0 = userX;
  var y0 = userY;

  if (x1 === x3 && y1 === y3) {
    res = isNearLineCalc({
      x0: x0,
      y0: y0,
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2
    });
  } else {
    res = isNearCurveCalc({
      start: {
        x: x1,
        y: y1
      },
      end: {
        x: x2,
        y: y2
      },
      check: {
        x: x3,
        y: y3
      }
    }, {
      x: x0,
      y: y0
    });
  }

  if (res) {
    callbackSuccess.forEach(function (callback) {
      callback(config.e);
    });
  } else {
    callbackFail.forEach(function (callback) {
      callback(config.e);
    });
  }

  return res;
}

function isNearLineCalc(config) {
  function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  var x0 = config.x0,
      y0 = config.y0,
      x1 = config.x1,
      y1 = config.y1,
      x2 = config.x2,
      y2 = config.y2;
  var r1 = dist(x0, y0, x1, y1);
  var r2 = dist(x0, y0, x2, y2);
  var r12 = dist(x1, y1, x2, y2);

  if (r1 < dist(r2, r12, 0, 0) && r2 < dist(r1, r12, 0, 0)) {
    var a = y2 - y1;
    var b = x1 - x2;
    var c = -x1 * (y2 - y1) + y1 * (x2 - x1);
    var t = dist(a, b, 0, 0);

    if (c > 0) {
      a = -a;
      b = -b;
      c = -c;
    }

    var r0 = (a * x0 + b * y0 + c) / t; // console.log('Расстояние от точки до отрезка=',r0);

    if (r0 > -5 && r0 < 5) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function isNearCurveCalc(line, mouse) {
  var t = 0;
  var x = 0;
  var y = 0;
  var flag = false;

  while (t <= 1) {
    x = Math.pow(1 - t, 2) * line.start.x + 2 * (1 - t) * t * line.check.x + Math.pow(t, 2) * line.end.x;
    y = Math.pow(1 - t, 2) * line.start.y + 2 * (1 - t) * t * line.check.y + Math.pow(t, 2) * line.end.y;
    x = Math.round(x);
    y = Math.round(y);

    for (var i = 0; i < 6; i++) {
      if (x + i === mouse.x && y + i === mouse.y) flag = true;
      if (x - i === mouse.x && y - i === mouse.y) flag = true;
    }

    t += 0.001;
  }

  return flag;
}

function nearDot(config) {
  var callbackSuccess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var callbackFail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  !config.distance ? config.distance = 1 : config;

  if (callbackSuccess) {
    if (callbackSuccess instanceof Function) {
      callbackSuccess = [callbackSuccess];
    } else {
      callbackSuccess = [function () {}];
    }
  }

  if (callbackFail) {
    if (callbackFail instanceof Function) {
      callbackFail = [callbackFail];
    } else {
      callbackFail = [function () {}];
    }
  }

  var userX = config.userX,
      userY = config.userY,
      x0 = config.x0,
      y0 = config.y0;

  if (userX < x0 + 10 && userX > x0 - 10 && userY < y0 + 10 && userY > y0 - 10) {
    callbackSuccess.forEach(function (callback) {
      callback(config.e);
    });
    return true;
  } else {
    callbackFail.forEach(function (callback) {
      callback(config.e);
    });
    return false;
  }
}



/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/render/circleRender.js":
/*!************************************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/render/circleRender.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.link.js */ "./node_modules/core-js/modules/es.string.link.js");
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_fill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.fill.js */ "./node_modules/core-js/modules/es.array.fill.js");
/* harmony import */ var core_js_modules_es_array_fill_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_fill_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cssEngine_cssEngine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cssEngine/cssEngine */ "./tasks/streams/js/CNV/Engine/cssEngine/cssEngine.js");


 //props: link, context, css, shift

function circleRender(props) {
  var style = (0,_cssEngine_cssEngine__WEBPACK_IMPORTED_MODULE_2__.cssEngine)({
    css: props.css,
    classes: props.link.classList,
    type: props.link.type,
    ownStyle: props.link.style
  });

  if (!(style.visibility === "hidden")) {
    props.context.beginPath();
    props.context.fillStyle = style.color;
    props.context.arc(props.link.start.x + props.shift.x, props.link.start.y + props.shift.y, style.radius, style.startAngle, style.endAngle);
    props.context.fill();
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (circleRender);

/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/render/clearCanvas.js":
/*!***********************************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/render/clearCanvas.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//props: context, canvas, backgroundColor
function clearCanvas(props) {
  props.context.clearRect(0, 0, props.canvas.width, props.canvas.height);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clearCanvas);

/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/render/lineRender.js":
/*!**********************************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/render/lineRender.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.link.js */ "./node_modules/core-js/modules/es.string.link.js");
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cssEngine_cssEngine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cssEngine/cssEngine */ "./tasks/streams/js/CNV/Engine/cssEngine/cssEngine.js");
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../geometry/geometry */ "./tasks/streams/js/CNV/Engine/geometry/geometry.js");
/* harmony import */ var _library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../library */ "./tasks/streams/js/CNV/library.js");



 //props: link, css, context, shift

function lineRender(props) {
  var style = (0,_cssEngine_cssEngine__WEBPACK_IMPORTED_MODULE_1__.cssEngine)({
    css: props.css,
    classes: props.link.classList,
    type: props.link.type,
    ownStyle: props.link.style
  });
  var x1 = (props.link.start.x + props.shift.x) / props.zoom;
  var x2 = (props.link.end.x + props.shift.x) / props.zoom;
  var xCheck = (props.link.check.x + props.shift.x) / props.zoom;
  var y1 = (props.link.start.y + props.shift.y) / props.zoom;
  var y2 = (props.link.end.y + props.shift.y) / props.zoom;
  var yCheck = (props.link.check.y + props.shift.y) / props.zoom;

  if (!(style.visibility === "hidden")) {
    props.context.beginPath();
    props.context.moveTo(x1, y1);

    if (!props.link.pointer) {
      // props.context.lineTo(props.link.end.x + props.shift.x, props.link.end.y + props.shift.y);
      // props.context.lineWidth = style.lineWidth;
      // props.context.strokeStyle = style.color; //config.color;
      // props.context.stroke();
      props.context.quadraticCurveTo(xCheck, yCheck, x2, y2);
      props.context.lineWidth = style.lineWidth;
      props.context.strokeStyle = style.color; //config.color;

      props.context.stroke();
    } else if (props.link.pointer && props.link.start.x === props.link.check.x && props.link.start.y === props.link.check.y) {
      var shape = _library__WEBPACK_IMPORTED_MODULE_3__["default"].getElementByUniqueId(props.link.id);
      var equation = shape.system.equation;
      var endPosition = (0,_geometry_geometry__WEBPACK_IMPORTED_MODULE_2__.moveTo)(equation, -5);
      props.context.lineTo(endPosition.x + props.shift.x, endPosition.y + props.shift.y);
      props.context.lineWidth = style.lineWidth;
      props.context.strokeStyle = style.color; //config.color;

      props.context.stroke();
    } else {
      // props.context.quadraticCurveTo(props.link.check.x, props.link.check.y, props.link.end.x, props.link.end.y);
      // props.context.lineWidth = style.lineWidth;
      // props.context.strokeStyle = style.color; //config.color;
      // props.context.stroke();
      props.context.quadraticCurveTo(props.link.check.x + props.shift.x, props.link.check.y + props.shift.y, props.link.end.x + props.shift.x, props.link.end.y + props.shift.y);
      props.context.lineWidth = style.lineWidth;
      props.context.strokeStyle = style.color; //config.color;

      props.context.stroke();
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lineRender);

/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/render/pointersRender.js":
/*!**************************************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/render/pointersRender.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_fill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.fill.js */ "./node_modules/core-js/modules/es.array.fill.js");
/* harmony import */ var core_js_modules_es_array_fill_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_fill_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.link.js */ "./node_modules/core-js/modules/es.string.link.js");
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _library__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../library */ "./tasks/streams/js/CNV/library.js");






var _require = __webpack_require__(/*! ../geometry/geometry */ "./tasks/streams/js/CNV/Engine/geometry/geometry.js"),
    getEquationFor2points = _require.getEquationFor2points,
    moveTo = _require.moveTo,
    getEquationForLine = _require.getEquationForLine,
    getCoordinates = _require.getCoordinates;

function pointer(line, context, shift) {
  var config = {
    x0: line.start.x + shift.x,
    y0: line.start.y + shift.y,
    x1: line.end.x + shift.x,
    y1: line.end.y + shift.y,
    x2: line.check.x + shift.x,
    y2: line.check.y + shift.y
  }; //Чтобы срелочки после выхода за границы экрана не творили дичь

  if (config.x1 < 3) return;
  var triangleRadius = 3;
  var eqInit = getEquationFor2points(config.x2, config.y2, config.x1, config.y1); //let eqInit = getEquationFor2points(config.x0, config.y0, config.x1, config.y1);

  var linePosition = moveTo(eqInit, -triangleRadius * 2);
  var equation = getEquationForLine(linePosition.x, linePosition.y, eqInit);
  var len = 50;
  equation.x1 = linePosition.x - len;
  equation.y1 = getCoordinates(equation, linePosition.x - len);
  equation.x2 = linePosition.x + len;
  equation.y2 = getCoordinates(equation, linePosition.x + len);
  var startPoint = moveTo(equation, -triangleRadius, linePosition.x);
  var endPoint = moveTo(equation, triangleRadius, linePosition.x);
  context.fillStyle = "black";
  context.beginPath();
  context.moveTo(startPoint.x, startPoint.y);
  context.lineTo(endPoint.x, endPoint.y);
  context.lineTo(config.x1, config.y1);
  context.fill();
} //props: context, shift


function pointersRender(props) {
  //console.log(CNV);
  _library__WEBPACK_IMPORTED_MODULE_4__["default"].querySelectorAll("line").forEach(function (shape) {
    if (shape.isPointer) {
      pointer(shape.link, props.context, props.shift);
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pointersRender);

/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/render/rectRender.js":
/*!**********************************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/render/rectRender.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.link.js */ "./node_modules/core-js/modules/es.string.link.js");
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cssEngine_cssEngine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cssEngine/cssEngine */ "./tasks/streams/js/CNV/Engine/cssEngine/cssEngine.js");



function rectRender(props) {
  var style = (0,_cssEngine_cssEngine__WEBPACK_IMPORTED_MODULE_1__.cssEngine)({
    css: props.css,
    classes: props.link.classList,
    type: props.link.type,
    ownStyle: props.link.style
  });
  var coords = style.position === "fixed" ? props.link.getOwnCoords() : props.link.getCalcCoords();
  props.context.beginPath();
  props.context.fillStyle = style.backgroundColor;
  props.context.fillRect(coords.start.x, coords.start.y, props.link.width, props.link.height);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rectRender);

/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/render/render.js":
/*!******************************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/render/render.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _cssEngine_cssEngine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cssEngine/cssEngine */ "./tasks/streams/js/CNV/Engine/cssEngine/cssEngine.js");
/* harmony import */ var _clearCanvas__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./clearCanvas */ "./tasks/streams/js/CNV/Engine/render/clearCanvas.js");
/* harmony import */ var _lineRender__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lineRender */ "./tasks/streams/js/CNV/Engine/render/lineRender.js");
/* harmony import */ var _circleRender__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./circleRender */ "./tasks/streams/js/CNV/Engine/render/circleRender.js");
/* harmony import */ var _pointersRender__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pointersRender */ "./tasks/streams/js/CNV/Engine/render/pointersRender.js");
/* harmony import */ var _textRender__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./textRender */ "./tasks/streams/js/CNV/Engine/render/textRender.js");
/* harmony import */ var _rectRender__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./rectRender */ "./tasks/streams/js/CNV/Engine/render/rectRender.js");










 //props: elements, css, context, canvas, shift

function render(props) {
  (0,_clearCanvas__WEBPACK_IMPORTED_MODULE_5__["default"])({
    backgroundColor: "white",
    context: props.context,
    canvas: props.canvas
  });
  var preRender = (0,_cssEngine_cssEngine__WEBPACK_IMPORTED_MODULE_4__.cssIndex)(props.css, props.elements);
  preRender.keys.forEach(function (key) {
    var shapes = preRender.shapes[key];
    shapes.forEach(function (shape) {
      var config = {
        link: shape,
        context: props.context,
        css: props.css,
        shift: props.shift,
        zoom: props.zoom
      };
      if (shape.type === "line") (0,_lineRender__WEBPACK_IMPORTED_MODULE_6__["default"])(config);else if (shape.type === "circle") (0,_circleRender__WEBPACK_IMPORTED_MODULE_7__["default"])(config);else if (shape.type === "text") (0,_textRender__WEBPACK_IMPORTED_MODULE_9__["default"])(config);else if (shape.type === "rect") (0,_rectRender__WEBPACK_IMPORTED_MODULE_10__["default"])(config);else if (shape.type === "__POINTERS_RENDER") (0,_pointersRender__WEBPACK_IMPORTED_MODULE_8__["default"])(config);
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./tasks/streams/js/CNV/Engine/render/textRender.js":
/*!**********************************************************!*\
  !*** ./tasks/streams/js/CNV/Engine/render/textRender.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.link.js */ "./node_modules/core-js/modules/es.string.link.js");
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _cssEngine_cssEngine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../cssEngine/cssEngine */ "./tasks/streams/js/CNV/Engine/cssEngine/cssEngine.js");







function textRender(props) {
  var style = (0,_cssEngine_cssEngine__WEBPACK_IMPORTED_MODULE_5__.cssEngine)({
    css: props.css,
    classes: props.link.classList,
    type: props.link.type,
    ownStyle: props.link.style
  });
  var coords = props.link.getCoords();
  var x = coords.start.x;
  var y = coords.start.y;
  props.context.font = "".concat(style.fontSize, " ").concat(style.fontFamily);
  var info = props.context.measureText(props.link.text);
  var padding = Number(String(style.padding).split("px")[0]);

  if (style.backgroundColor) {
    props.context.beginPath();
    props.context.fillStyle = style.backgroundColor;
    props.context.fillRect(x - padding, y + 2 + padding, info.width + padding * 2, -Number(style.fontSize.split("px")[0]) - padding * 2);
  }

  props.context.fillStyle = style.color;
  props.context.fillText(props.link.text, x, y);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (textRender);

/***/ }),

/***/ "./tasks/streams/js/CNV/Store.js":
/*!***************************************!*\
  !*** ./tasks/streams/js/CNV/Store.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  state: undefined,
  getState: function getState() {
    return this.state;
  },
  setState: function setState(newState) {
    this.state = newState;
  },
  initState: function initState() {
    this.state = this.createState();
  },
  createState: function createState() {
    return {
      __shapes: {},
      //id: {type: "line", start: {x, y}, end: {x, y}, classList: [], id},
      shapes: {},
      //"id: ShapeInstance"
      mouseover: {},
      mouseleave: {},
      mouseenter: {},
      click: {},
      __mouseMoveTargets: [],
      __mouseClickTargets: [],
      shouldRenderUpdates: true,
      shift: {
        x: 0,
        y: 0
      },
      draggableCanvas: false,
      zoom: 1
    };
  }
});

/***/ }),

/***/ "./tasks/streams/js/CNV/Templates/Circle.js":
/*!**************************************************!*\
  !*** ./tasks/streams/js/CNV/Templates/Circle.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Standard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Standard */ "./tasks/streams/js/CNV/Templates/Standard.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }











function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var Circle = /*#__PURE__*/function (_Standard) {
  _inherits(Circle, _Standard);

  var _super = _createSuper(Circle);

  function Circle(config) {
    var _this;

    _classCallCheck(this, Circle);

    _this = _super.call(this, config);
    _this.type = "circle";
    return _this;
  }

  return Circle;
}(_Standard__WEBPACK_IMPORTED_MODULE_9__["default"]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Circle);

/***/ }),

/***/ "./tasks/streams/js/CNV/Templates/Line.js":
/*!************************************************!*\
  !*** ./tasks/streams/js/CNV/Templates/Line.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Standard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Standard */ "./tasks/streams/js/CNV/Templates/Standard.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }











function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var Line = /*#__PURE__*/function (_Standard) {
  _inherits(Line, _Standard);

  var _super = _createSuper(Line);

  function Line(config) {
    var _this;

    _classCallCheck(this, Line);

    _this = _super.call(this, config);
    _this.type = "line";
    _this.end = {
      x: config.x1,
      y: config.y1
    };
    _this.check = {
      x: config.x2 || config.x0,
      y: config.y2 || config.y0
    };
    return _this;
  }

  return Line;
}(_Standard__WEBPACK_IMPORTED_MODULE_9__["default"]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Line);

/***/ }),

/***/ "./tasks/streams/js/CNV/Templates/Rectangle.js":
/*!*****************************************************!*\
  !*** ./tasks/streams/js/CNV/Templates/Rectangle.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Standard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Standard */ "./tasks/streams/js/CNV/Templates/Standard.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Store */ "./tasks/streams/js/CNV/Store.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }











function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var Rectangle = /*#__PURE__*/function (_Standard) {
  _inherits(Rectangle, _Standard);

  var _super = _createSuper(Rectangle);

  function Rectangle(config) {
    var _this;

    _classCallCheck(this, Rectangle);

    _this = _super.call(this, config);
    _this.type = "rect";
    _this.width = config.width;
    _this.height = config.height;
    return _this;
  }

  _createClass(Rectangle, [{
    key: "getOwnCoords",
    value: function getOwnCoords() {
      return {
        start: {
          x: this.start.x,
          y: this.start.y
        },
        end: {
          x: this.start.x,
          y: this.start.y
        }
      };
    }
  }, {
    key: "getCalcCoords",
    value: function getCalcCoords() {
      return {
        start: {
          x: this.start.x + _Store__WEBPACK_IMPORTED_MODULE_10__["default"].state.shift.x,
          y: this.start.y + _Store__WEBPACK_IMPORTED_MODULE_10__["default"].state.shift.y
        },
        end: {
          x: this.start.x + _Store__WEBPACK_IMPORTED_MODULE_10__["default"].state.shift.x + this.width,
          y: this.start.y + _Store__WEBPACK_IMPORTED_MODULE_10__["default"].state.shift.y + this.height
        }
      };
    }
  }]);

  return Rectangle;
}(_Standard__WEBPACK_IMPORTED_MODULE_9__["default"]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rectangle);

/***/ }),

/***/ "./tasks/streams/js/CNV/Templates/Standard.js":
/*!****************************************************!*\
  !*** ./tasks/streams/js/CNV/Templates/Standard.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _uniqueId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uniqueId */ "./tasks/streams/js/CNV/uniqueId.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Standard = function Standard(config) {
  _classCallCheck(this, Standard);

  this.id = config.uniqueId || (0,_uniqueId__WEBPACK_IMPORTED_MODULE_0__["default"])();

  if (config.className) {
    if (config.className instanceof Array) {
      this.classList = config.className;
    } else {
      this.classList = [config.className];
    }
  } else {
    this.classList = [];
  }

  this.style = {};
  this.start = {
    x: config.x0,
    y: config.y0
  };
  this.userId = config.id || undefined;
  this.events = {
    mouseenter: false
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Standard);

/***/ }),

/***/ "./tasks/streams/js/CNV/Templates/Text.js":
/*!************************************************!*\
  !*** ./tasks/streams/js/CNV/Templates/Text.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ "./node_modules/core-js/modules/es.reflect.construct.js");
/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Standard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Standard */ "./tasks/streams/js/CNV/Templates/Standard.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Store */ "./tasks/streams/js/CNV/Store.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }











function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var Text = /*#__PURE__*/function (_Standard) {
  _inherits(Text, _Standard);

  var _super = _createSuper(Text);

  function Text(config) {
    var _this;

    _classCallCheck(this, Text);

    _this = _super.call(this, config);
    _this.type = "text";
    _this.text = config.text;
    return _this;
  }

  _createClass(Text, [{
    key: "getCoords",
    value: function getCoords() {
      return {
        start: {
          x: this.start.x + _Store__WEBPACK_IMPORTED_MODULE_10__["default"].state.shift.x,
          y: this.start.y + _Store__WEBPACK_IMPORTED_MODULE_10__["default"].state.shift.y
        }
      };
    }
  }]);

  return Text;
}(_Standard__WEBPACK_IMPORTED_MODULE_9__["default"]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Text);

/***/ }),

/***/ "./tasks/streams/js/CNV/library.js":
/*!*****************************************!*\
  !*** ./tasks/streams/js/CNV/library.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Engine_cssEngine_selecting__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Engine/cssEngine/selecting */ "./tasks/streams/js/CNV/Engine/cssEngine/selecting.js");
/* harmony import */ var _Engine_eventsHandles_mouseMoveEngine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Engine/eventsHandles/mouseMoveEngine */ "./tasks/streams/js/CNV/Engine/eventsHandles/mouseMoveEngine.js");
/* harmony import */ var _Engine_eventsHandles_mouseClickEngine__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Engine/eventsHandles/mouseClickEngine */ "./tasks/streams/js/CNV/Engine/eventsHandles/mouseClickEngine.js");
/* harmony import */ var _Engine_dragCanvas__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Engine/dragCanvas */ "./tasks/streams/js/CNV/Engine/dragCanvas.js");
/* harmony import */ var _Engine_Shape__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Engine/Shape */ "./tasks/streams/js/CNV/Engine/Shape.js");
/* harmony import */ var _Engine_render_render__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Engine/render/render */ "./tasks/streams/js/CNV/Engine/render/render.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Store */ "./tasks/streams/js/CNV/Store.js");
/* harmony import */ var _Templates_Line__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Templates/Line */ "./tasks/streams/js/CNV/Templates/Line.js");
/* harmony import */ var _Templates_Circle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Templates/Circle */ "./tasks/streams/js/CNV/Templates/Circle.js");
/* harmony import */ var _Templates_Text__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Templates/Text */ "./tasks/streams/js/CNV/Templates/Text.js");
/* harmony import */ var _Templates_Rectangle__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Templates/Rectangle */ "./tasks/streams/js/CNV/Templates/Rectangle.js");
/* harmony import */ var _Engine_geometry_geometry__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Engine/geometry/geometry */ "./tasks/streams/js/CNV/Engine/geometry/geometry.js");








function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














function create(link) {
  this.state.__shapes[link.id] = link;
  var shape = new _Engine_Shape__WEBPACK_IMPORTED_MODULE_11__["default"](link, link.id);
  this.state.shapes[link.id] = shape;
  CNV.render();
  return shape;
}

var CNV = {
  context: undefined,
  canvas: undefined,
  css: undefined,
  state: function () {
    _Store__WEBPACK_IMPORTED_MODULE_13__["default"].initState();
    return _Store__WEBPACK_IMPORTED_MODULE_13__["default"].getState();
  }(),
  setCanvas: function setCanvas(canvas) {
    this.canvas = canvas;
  },
  setContext: function setContext(context) {
    this.context = context;
  },
  setCSS: function setCSS(css) {
    this.css = css;
  },
  start: function start() {
    (0,_Engine_dragCanvas__WEBPACK_IMPORTED_MODULE_10__["default"])();
    this.canvas.addEventListener("mousemove", _Engine_eventsHandles_mouseMoveEngine__WEBPACK_IMPORTED_MODULE_8__["default"].bind(this));
    this.canvas.addEventListener("click", _Engine_eventsHandles_mouseClickEngine__WEBPACK_IMPORTED_MODULE_9__["default"].bind(this));
  },
  settings: {
    set draggableCanvas(flag) {
      CNV.state.draggableCanvas = !!flag;
    },

    set draggableCanvasObserver(observer) {
      _Store__WEBPACK_IMPORTED_MODULE_13__["default"].draggableCanvasObserver = observer;
    }

  },
  querySelector: function querySelector(selector) {
    return (0,_Engine_cssEngine_selecting__WEBPACK_IMPORTED_MODULE_7__.querySelectorEngine)(selector, this.state.__shapes, this.state.shapes);
  },
  querySelectorAll: function querySelectorAll(selector) {
    return (0,_Engine_cssEngine_selecting__WEBPACK_IMPORTED_MODULE_7__.querySelectorAllEngine)(selector, this.state.__shapes, this.state.shapes);
  },
  getElementByUniqueId: function getElementByUniqueId(id) {
    return this.state.shapes[id];
  },
  createLine: function createLine(config) {
    var link = new _Templates_Line__WEBPACK_IMPORTED_MODULE_14__["default"](config);
    return create.call(this, link);
  },
  createText: function createText(config) {
    var link = new _Templates_Text__WEBPACK_IMPORTED_MODULE_16__["default"](config);
    return create.call(this, link);
  },
  createCircle: function createCircle(config) {
    var link = new _Templates_Circle__WEBPACK_IMPORTED_MODULE_15__["default"](config);
    return create.call(this, link);
  },
  createRect: function createRect(config) {
    var link = new _Templates_Rectangle__WEBPACK_IMPORTED_MODULE_17__["default"](config);
    return create.call(this, link);
  },
  text: function text(config) {
    this.context.font = "".concat(config.fontSize || 14, "px serif");
    this.context.fillStyle = config.color || "black";
    this.context.fillText(config.text, config.x, config.y);
  },
  render: function render() {
    if (this.state.shouldRenderUpdates) {
      (0,_Engine_render_render__WEBPACK_IMPORTED_MODULE_12__["default"])({
        css: this.css,
        canvas: this.canvas,
        context: this.context,
        shift: this.state.shift,
        elements: this.state.__shapes,
        zoom: this.state.zoom
      });
    }
  },
  lineCollision: function lineCollision(line1, line2, mode) {
    return (0,_Engine_geometry_geometry__WEBPACK_IMPORTED_MODULE_18__.collision)(line1.system.equation, line2.system.equation, mode);
  },
  preventRender: function preventRender(callback) {
    this.state.shouldRenderUpdates = false;
    callback();
    this.state.shouldRenderUpdates = true;
  },
  combineRender: function combineRender(callback) {
    this.state.shouldRenderUpdates = false;
    callback();
    this.state.shouldRenderUpdates = true;
    CNV.render();
  },
  save: function save() {
    var state = _Store__WEBPACK_IMPORTED_MODULE_13__["default"].getState();
    var preparedStore = {
      __shapes: {},
      draggableCanvas: state.draggableCanvas,
      shift: state.shift
    };

    for (var key in state.__shapes) {
      var _link$end, _link$end2, _link$check, _link$check2;

      var link = state.__shapes[key];
      preparedStore.__shapes[key] = {
        className: link.classList,
        x0: link.start.x,
        y0: link.start.y,
        x1: (_link$end = link.end) === null || _link$end === void 0 ? void 0 : _link$end.x,
        y1: (_link$end2 = link.end) === null || _link$end2 === void 0 ? void 0 : _link$end2.y,
        x2: (_link$check = link.check) === null || _link$check === void 0 ? void 0 : _link$check.x,
        y2: (_link$check2 = link.check) === null || _link$check2 === void 0 ? void 0 : _link$check2.y,
        uniqueId: link.id,
        type: link.type,
        text: link.text,
        id: link.userId,
        width: link.width,
        height: link.height,
        pointer: link.pointer,
        style: link.style
      };
    }

    return JSON.stringify(preparedStore);
  },
  recover: function recover(data) {
    var state = _objectSpread(_objectSpread({}, _Store__WEBPACK_IMPORTED_MODULE_13__["default"].createState()), JSON.parse(data));

    for (var key in state.__shapes) {
      var oldLink = state.__shapes[key];
      var link = oldLink;
      var pointer = link.pointer;
      if (link.type === "line") link = new _Templates_Line__WEBPACK_IMPORTED_MODULE_14__["default"](_objectSpread({}, link));else if (link.type === "circle") link = new _Templates_Circle__WEBPACK_IMPORTED_MODULE_15__["default"](_objectSpread({}, link));else if (link.type === "text") link = new _Templates_Text__WEBPACK_IMPORTED_MODULE_16__["default"](_objectSpread({}, link));else if (link.type === "rect") link = new _Templates_Rectangle__WEBPACK_IMPORTED_MODULE_17__["default"](_objectSpread({}, link));

      for (var _key in oldLink.style) {
        link.style[_key] = oldLink.style[_key];
      }

      state.__shapes[key] = link;
      state.shapes[key] = new _Engine_Shape__WEBPACK_IMPORTED_MODULE_11__["default"](link, key);
      state.shapes[key].pointer = pointer;
    }

    _Store__WEBPACK_IMPORTED_MODULE_13__["default"].setState(state);
    this.state = _Store__WEBPACK_IMPORTED_MODULE_13__["default"].getState();
    this.render();
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CNV);

/***/ }),

/***/ "./tasks/streams/js/CNV/uniqueId.js":
/*!******************************************!*\
  !*** ./tasks/streams/js/CNV/uniqueId.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__);



function uniqueId() {
  var id = String(Math.random());
  id.replace(".", "");
  return id;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uniqueId);

/***/ }),

/***/ "./tasks/streams/js/Fraction.js":
/*!**************************************!*\
  !*** ./tasks/streams/js/Fraction.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Fraction = /*#__PURE__*/function () {
  function Fraction(num) {
    var det = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    _classCallCheck(this, Fraction);

    var GCD = this.gcd(num, det);
    this.num = num / GCD;
    this.det = det / GCD;
  }

  _createClass(Fraction, [{
    key: "gcd",
    value: function gcd(n, m) {
      return m === 0 ? n : this.gcd(m, n % m);
    }
  }, {
    key: "nok",
    value: function nok(n, m) {
      return n * m / this.gcd(n, m);
    }
  }, {
    key: "getNum",
    value: function getNum() {
      return this.num;
    }
  }, {
    key: "getDet",
    value: function getDet() {
      return this.det;
    }
  }, {
    key: "setNum",
    value: function setNum(num) {
      var GCD = this.gcd(num, this.det);
      this.num = num / GCD;
      this.det /= GCD;
      return this;
    }
  }, {
    key: "setDet",
    value: function setDet(det) {
      var GCD = this.gcd(det, this.det);
      this.det = det / GCD;
      this.num /= GCD;
      return this;
    }
  }, {
    key: "plus",
    value: function plus(num) {
      var det = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (num instanceof Fraction) {
        det = num.getDet();
        num = num.getNum();
      }

      var NOK = this.nok(det, this.det);
      var NUM = this.num * NOK / this.det + num * NOK / det;
      var GCD = this.gcd(NOK, NUM);
      NOK /= GCD;
      NUM /= GCD;
      this.num = NUM;
      this.det = NOK;
      return this;
    }
  }, {
    key: "minus",
    value: function minus(num) {
      var det = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (num instanceof Fraction) {
        det = num.getDet();
        num = num.getNum();
      }

      var NOK = this.nok(det, this.det);
      var NUM = this.num * NOK / this.det - num * NOK / det;
      var GCD = this.gcd(NOK, NUM);
      NOK /= GCD;
      NUM /= GCD;
      this.num = NUM;
      this.det = NOK;
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(num) {
      var det = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (num instanceof Fraction) {
        det = num.getDet();
        num = num.getNum();
      }

      var GCD = this.gcd(this.num * num, this.det * det);
      this.num = this.num * num / GCD;
      this.det = this.det * det / GCD;
      return this;
    }
  }, {
    key: "divide",
    value: function divide(num) {
      var det = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (num instanceof Fraction) {
        det = num.getDet();
        num = num.getNum();
      }

      var GCD = this.gcd(this.num * det, this.det * num);
      this.num = this.num * det / GCD;
      this.det = this.det * num / GCD;
      return this;
    }
  }, {
    key: "getStr",
    value: function getStr() {
      if (this.det === 1) {
        return "".concat(this.num);
      } else if (this.num === 0) {
        return "0";
      } else {
        return "".concat(this.num, "/").concat(this.det);
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Fraction(this.num, this.det);
    }
  }]);

  return Fraction;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Fraction);

/***/ }),

/***/ "./tasks/streams/js/SETTINGS.js":
/*!**************************************!*\
  !*** ./tasks/streams/js/SETTINGS.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var _s = {};
_s.BRANCHES = 2; //Количество линий, которые могут выходить из конца прошлой

_s.STACK_LIMIT = 10; //максимальное количество сохранений в stack

_s.STACK = true; //сохранине в stack изменений

_s.SHOW_PATH = false; //показать путь обхода

_s.SHOW_CYCLES = false; //показать циклы

_s.CONTROL_SUM_WARNING = true; //выводить предупреждение о контрольной сумме

_s.SHOW_PRIORITIES = false;
_s.START_POWER = 2;
_s.NUMERIC_POWER = true;
_s.REDUCING_LINES = true;
_s.LINE_WIDTH_MIN = 3;
_s.LINE_WIDTH = 10;
_s.LINE_DIVISION = 1.1;
_s.LOOPS = false;
_s.MERGES = true;
_s.FINISH_LIMITS = false; //num //arr [1, 3] - range //false = no limits

_s.TASK = ["1/4", "3/4"];
_s.ALLOW_COLLISIONS = true;
_s.SHOW_COLLISION_LINES = false;
_s.SHOW_NUMBER_OF_COLLISION = true;
var SETTINGS = {
  changeProperty: function changeProperty(name, value) {
    _s[name] = value;
  },
  getAll: function getAll() {
    return this;
  },
  set: function set(settings) {
    for (var key in settings) {
      if (_s.hasOwnProperty(key)) {
        _s[key] = settings[key];
      }
    }
  }
};

var _loop = function _loop(key) {
  Object.defineProperty(SETTINGS, key, {
    get: function get() {
      return _s[key];
    }
  });
};

for (var key in _s) {
  _loop(key);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SETTINGS);

/***/ }),

/***/ "./tasks/streams/js/Store.js":
/*!***********************************!*\
  !*** ./tasks/streams/js/Store.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SETTINGS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SETTINGS */ "./tasks/streams/js/SETTINGS.js");
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../API */ "./tasks/streams/API.js");
/* harmony import */ var _babel_preset_env_lib_debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/preset-env/lib/debug */ "./node_modules/@babel/preset-env/lib/debug.js");
/* harmony import */ var _storage_save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage/save */ "./tasks/streams/js/storage/save.js");





var _SETTINGS$getAll = _SETTINGS__WEBPACK_IMPORTED_MODULE_0__["default"].getAll(),
    STACK_LIMIT = _SETTINGS$getAll.STACK_LIMIT;

var Store = {
  state: {
    delMode: false,
    mode: "draw",
    //draw, del
    deletingIndex: undefined,
    //индекс текущего удаляемого элемента (обновляется при наведении)
    isDragging: false,
    lines: {} //id: {line, startCircle, endCircle, children: [], parents: [], ids: {line, startCircle, endCircle}}

  },
  zMode: false,
  stack: {
    len: 0,
    stack_limit: STACK_LIMIT,
    current: -1
  },
  system: {
    canvas: undefined,
    context: undefined
  },
  setCanvas: function setCanvas(canvas) {
    this.system.canvas = canvas;
  },
  setContext: function setContext(context) {
    this.system.context = context;
  },
  getState: function getState() {
    return this.state;
  },
  getStackPrev: function getStackPrev() {
    if (this.stack.current - 1 >= 0) {
      this.stack.current = this.stack.current - 1;
    } else {
      this.stack.current = 0;
    }

    return this.stack[this.stack.current];
  },
  getStackNext: function getStackNext() {
    console.log("getStackNext");
    this.stack.current + 1 < this.stack.len ? this.stack.current += 1 : this.stack.current;
    return this.stack[this.stack.current];
  },
  addToStack: function addToStack(data) {
    console.log("addToStack");

    if (this.stack.len !== this.stack.current + 1) {
      for (var i = this.stack.current + 1; i < this.stack.stack_limit; i++) {
        delete this.stack[i];
      }

      this.stack.len = this.stack.current + 1;
      console.log("delete future stack");
    }

    if (this.stack.len < this.stack.stack_limit) {
      this.stack[this.stack.len] = data;
      this.stack.len += 1;
      this.stack.current += 1;
    } else {
      for (var _i = 1; _i < this.stack.len; _i++) {
        this.stack[_i - 1] = this.stack[_i];
      }

      this.stack[this.stack.len - 1] = data;
    }
  },
  showStack: function showStack() {
    console.log("store", Store);
    var data = {
      len: Store.stack.len,
      stack_limit: Store.stack.stack_limit,
      current: Store.stack.current
    };
    console.log(data);
  },

  get canvas() {
    return this.system.canvas;
  },

  get context() {
    return this.system.context;
  }

};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Store);

/***/ }),

/***/ "./tasks/streams/js/UI.js":
/*!********************************!*\
  !*** ./tasks/streams/js/UI.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CNV/library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Store */ "./tasks/streams/js/Store.js");
/* harmony import */ var _eventHandlers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./eventHandlers */ "./tasks/streams/js/eventHandlers.js");
/* harmony import */ var _graphHandlers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./graphHandlers */ "./tasks/streams/js/graphHandlers.js");
/* harmony import */ var _storage_save__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./storage/save */ "./tasks/streams/js/storage/save.js");
/* harmony import */ var _analyzeGraph_analyze__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./analyzeGraph/analyze */ "./tasks/streams/js/analyzeGraph/analyze.js");
/* harmony import */ var _firstDraw__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./firstDraw */ "./tasks/streams/js/firstDraw.js");











function setDelMode() {
  _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].settings.draggableCanvas = false;
  _Store__WEBPACK_IMPORTED_MODULE_4__["default"].state.mode = "del";
  (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_5__.resetAllEndCircleClick)();
  canvas.style.cursor = "crosshair"; //modeField.innerHTML = "Режим: удаление";

  var _loop = function _loop(key) {
    _Store__WEBPACK_IMPORTED_MODULE_4__["default"].state.lines[key].line.onclick = function (e) {
      var _CNV$querySelector;

      _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].querySelectorAll(".finishText").forEach(function (item) {
        return item.remove();
      });
      (_CNV$querySelector = _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].querySelector("#" + e.target.id + "_text")) === null || _CNV$querySelector === void 0 ? void 0 : _CNV$querySelector.remove();
      (0,_graphHandlers__WEBPACK_IMPORTED_MODULE_6__.removeEdge)(key); //охраняем изменения в стек

      _Store__WEBPACK_IMPORTED_MODULE_4__["default"].addToStack((0,_storage_save__WEBPACK_IMPORTED_MODULE_7__["default"])({
        dont_save: true
      }));
      (0,_analyzeGraph_analyze__WEBPACK_IMPORTED_MODULE_8__["default"])(_Store__WEBPACK_IMPORTED_MODULE_4__["default"].state.lines);
    };
  };

  for (var key in _Store__WEBPACK_IMPORTED_MODULE_4__["default"].state.lines) {
    _loop(key);
  }

  canvas.onclick = undefined;
}

function setDrawingMode() {
  _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].settings.draggableCanvas = true;

  if (Object.keys(_Store__WEBPACK_IMPORTED_MODULE_4__["default"].state.lines).length === 0) {
    (0,_firstDraw__WEBPACK_IMPORTED_MODULE_9__["default"])(canvas);
  }

  _Store__WEBPACK_IMPORTED_MODULE_4__["default"].state.mode = "draw";
  (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_5__.setAllEndCircleClick)();
  canvas.style.cursor = "default"; //modeField.innerHTML = "Режим: рисование";

  for (var key in _Store__WEBPACK_IMPORTED_MODULE_4__["default"].state.lines) {
    _Store__WEBPACK_IMPORTED_MODULE_4__["default"].state.lines[key].line.onclick = function (e) {
      return undefined;
    };
  }
}

function UIhandlers() {
  var delLineBtn = document.querySelector("#btn_delete");
  var drawLineBtn = document.querySelector("#btn_pen");
  var awardBtn = document.querySelector("#btn_award");
  var infoBtn = document.querySelector("#btn_info");
  var saveBtn = document.querySelector("#btn_save");
  var infoPanel = document.querySelector(".kio-base-info-panel.kio-base-results-info-panel");
  var awardsPanel = document.querySelector(".kio-base-info-panel.kio-base-record-info-panel");
  var savesPanel = document.querySelector(".kio-base-solutions-container");
  var dark = document.querySelector(".dark"); // awardsPanel.classList.add("hidden");
  // savesPanel.classList.add("hidden");

  delLineBtn.onclick = function (e) {
    setDelMode();
    delLineBtn.classList.add("del_active");
    drawLineBtn.classList.remove("pen_active");
  };

  drawLineBtn.onclick = function (e) {
    setDrawingMode();
    delLineBtn.classList.remove("del_active");
    drawLineBtn.classList.add("pen_active");
  }; // awardBtn.onclick = e => {
  //     awardBtn.classList.add("hidden");
  //     infoBtn.classList.remove("hidden");
  //
  //     infoPanel.classList.add("hidden");
  //     awardsPanel.classList.remove("hidden");
  // }
  //
  // infoBtn.onclick = e => {
  //     infoBtn.classList.add("hidden");
  //     awardBtn.classList.remove("hidden");
  //
  //     awardsPanel.classList.add("hidden");
  //     infoPanel.classList.remove("hidden");
  // }
  //
  // saveBtn.onclick = e => {
  //     savesPanel.classList.toggle("hidden");
  //     dark.classList.toggle("hidden");
  //     drawLineBtn.classList.toggle("hidden");
  //     delLineBtn.classList.toggle("hidden");
  // }
  //
  // dark.onclick = e => {
  //     savesPanel.classList.toggle("hidden");
  //     dark.classList.toggle("hidden");
  //     drawLineBtn.classList.toggle("hidden");
  //     delLineBtn.classList.toggle("hidden");
  // }
  //
  // window.addEventListener("keydown", e => {
  //     if(e.key === "Escape"){
  //         savesPanel.classList.add("hidden");
  //         dark.classList.add("hidden");
  //         drawLineBtn.classList.remove("hidden");
  //         delLineBtn.classList.remove("hidden");
  //     }
  // })

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UIhandlers);

/***/ }),

/***/ "./tasks/streams/js/allCollision.js":
/*!******************************************!*\
  !*** ./tasks/streams/js/allCollision.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CNV/library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Store */ "./tasks/streams/js/Store.js");
/* harmony import */ var _SETTINGS__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SETTINGS */ "./tasks/streams/js/SETTINGS.js");
/* harmony import */ var _analyzeGraph_analyzeState__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./analyzeGraph/analyzeState */ "./tasks/streams/js/analyzeGraph/analyzeState.js");








function lineCollision() {
  var notThis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var _SETTINGS$getAll = _SETTINGS__WEBPACK_IMPORTED_MODULE_5__["default"].getAll(),
      ALLOW_COLLISIONS = _SETTINGS$getAll.ALLOW_COLLISIONS,
      SHOW_COLLISION_LINES = _SETTINGS$getAll.SHOW_COLLISION_LINES;

  var isCollision;
  var collisionCount = 0;

  if (notThis instanceof Array === false) {
    notThis = [notThis];
  }

  _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].querySelectorAll(".line").forEach(function (line) {
    if (notThis.filter(function (item) {
      return item === line;
    }).length === 0) {
      _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].querySelectorAll(".line").forEach(function (curLine) {
        var curLineData = _Store__WEBPACK_IMPORTED_MODULE_4__["default"].state.lines[curLine.id];
        var lineData = _Store__WEBPACK_IMPORTED_MODULE_4__["default"].state.lines[line.id];
        var res;

        if (lineData.sideIn.filter(function (sideInItem) {
          return sideInItem === curLineData;
        }).length !== 0 || curLineData.sideIn.filter(function (sideInItem) {
          return sideInItem === lineData;
        }).length !== 0) {
          res = _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].lineCollision(curLine, line, "lite");
        } else {
          res = _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].lineCollision(curLine, line);
        }

        if (res.result) {
          isCollision = true;

          if (SHOW_COLLISION_LINES) {
            res.target.classList.add("lineWarning");
            line.classList.add("lineWarning");
          }

          collisionCount += 1;
        }
      });
    }
  });
  _analyzeGraph_analyzeState__WEBPACK_IMPORTED_MODULE_6__["default"].analyzeInfo.number_of_collision = collisionCount / 2;
  return ALLOW_COLLISIONS === true ? false : isCollision;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lineCollision);

/***/ }),

/***/ "./tasks/streams/js/analyzeGraph/analyze.js":
/*!**************************************************!*\
  !*** ./tasks/streams/js/analyzeGraph/analyze.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_number_is_integer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.number.is-integer.js */ "./node_modules/core-js/modules/es.number.is-integer.js");
/* harmony import */ var core_js_modules_es_number_is_integer_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_is_integer_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../CNV/library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _Fraction__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../Fraction */ "./tasks/streams/js/Fraction.js");
/* harmony import */ var _analyzeState__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./analyzeState */ "./tasks/streams/js/analyzeGraph/analyzeState.js");
/* harmony import */ var _priority__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./priority */ "./tasks/streams/js/analyzeGraph/priority.js");
/* harmony import */ var _SETTINGS__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../SETTINGS */ "./tasks/streams/js/SETTINGS.js");
/* harmony import */ var _gause__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../gause */ "./tasks/streams/js/gause.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./text */ "./tasks/streams/js/analyzeGraph/text.js");
/* harmony import */ var _storage_save__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../storage/save */ "./tasks/streams/js/storage/save.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../Store */ "./tasks/streams/js/Store.js");
/* harmony import */ var _showCycles__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./showCycles */ "./tasks/streams/js/analyzeGraph/showCycles.js");
/* harmony import */ var _step__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./step */ "./tasks/streams/js/analyzeGraph/step.js");
/* harmony import */ var _allCollision__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../allCollision */ "./tasks/streams/js/allCollision.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




































function double(int) {
  var count = 0;

  while (int / 2 >= 1) {
    int /= 2;
    count += 1;
  }

  return count;
}

function show_warning(text) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var warning = document.querySelector(".warning");
  warning.innerHTML = text;
  warning.classList.remove("hidden");

  if (duration !== false) {
    if (duration === 0) {
      warning.classList.add("hidden");
    } else {
      setTimeout(function () {
        warning.classList.add("hidden");
      }, duration);
    }
  }
}

var fakeLine = {
  // line: CNV.createLine({
  //     x0: -100,
  //     y0: -100,
  //     x1: -100,
  //     y1: -100,
  // }),
  // startCircle: CNV.createCircle({
  //     x0: -100,
  //     y0: -100,
  // }),
  // endCircle: CNV.createCircle({
  //     x0: -100,
  //     y0: -100,
  // }),
  sideIn: [],
  parents: [],
  children: []
};

function setFakeLine(allLies, startLine) {
  if (startLine) {
    //Добавляем фейковую линию;
    allLies.push(fakeLine);
    startLine.parents.push(fakeLine);
    fakeLine.children.push(startLine);
  }
}

function removeFakeLine(allLies, startLine) {
  if (startLine) {
    allLies.pop();
    startLine.parents.pop();
    fakeLine.children.pop();
  }
}

function analyze(lines) {
  var _SETTINGS$getAll = _SETTINGS__WEBPACK_IMPORTED_MODULE_26__["default"].getAll(),
      CONTROL_SUM_WARNING = _SETTINGS$getAll.CONTROL_SUM_WARNING,
      FINISH_LIMITS = _SETTINGS$getAll.FINISH_LIMITS,
      LINE_DIVISION = _SETTINGS$getAll.LINE_DIVISION,
      LINE_WIDTH = _SETTINGS$getAll.LINE_WIDTH,
      LINE_WIDTH_MIN = _SETTINGS$getAll.LINE_WIDTH_MIN,
      LOOPS = _SETTINGS$getAll.LOOPS,
      MERGES = _SETTINGS$getAll.MERGES,
      NUMERIC_POWER = _SETTINGS$getAll.NUMERIC_POWER,
      SHOW_CYCLES = _SETTINGS$getAll.SHOW_CYCLES,
      START_POWER = _SETTINGS$getAll.START_POWER,
      TASK = _SETTINGS$getAll.TASK,
      REDUCING_LINES = _SETTINGS$getAll.REDUCING_LINES;

  _CNV_library__WEBPACK_IMPORTED_MODULE_22__["default"].combineRender(function () {
    _CNV_library__WEBPACK_IMPORTED_MODULE_22__["default"].querySelectorAll(".finishLine").forEach(function (item) {
      return item.classList.remove("finishLine");
    });
    _CNV_library__WEBPACK_IMPORTED_MODULE_22__["default"].querySelectorAll(".finishText").forEach(function (item) {
      return item.remove();
    });
    _CNV_library__WEBPACK_IMPORTED_MODULE_22__["default"].querySelectorAll(".red").forEach(function (item) {
      return item.classList.remove("red");
    });
  });
  _analyzeState__WEBPACK_IMPORTED_MODULE_24__["default"].results = {};
  var newLines = Object.keys(lines).map(function (key) {
    return lines[key];
  });
  var startLines = [];
  var finishLines = [];
  var controlSum = new _Fraction__WEBPACK_IMPORTED_MODULE_23__["default"](0);

  for (var key in lines) {
    //Считаем количество точек входа
    if (lines[key].parents.length === 0) {
      startLines.push(lines[key]);
    }

    if (lines[key].children.length === 0) {
      finishLines.push(lines[key]);
    }
  }

  _analyzeState__WEBPACK_IMPORTED_MODULE_24__["default"].startLines = startLines;

  if (startLines.length > 1) {
    show_warning("Путь имеет разрывы. Анализ невозможен");
    startLines.forEach(function (item) {
      item.line.classList.add("red");
    });
    return;
  } else {
    show_warning("", 0); //warning.classList.add("hidden");
  } //setFakeLine(newLines, startLines[0]);


  var m = [];
  newLines.forEach(function (item, index) {
    var arr = [];

    for (var i = 0; i <= newLines.length; i++) {
      arr.push(new _Fraction__WEBPACK_IMPORTED_MODULE_23__["default"](0));
    }

    item.parents.forEach(function (parent) {
      arr[newLines.indexOf(parent)] = new _Fraction__WEBPACK_IMPORTED_MODULE_23__["default"](1, -parent.children.length);
    });
    arr[newLines.indexOf(item)] = new _Fraction__WEBPACK_IMPORTED_MODULE_23__["default"](1);

    if (item === startLines[0]) {
      arr[arr.length - 1] = new _Fraction__WEBPACK_IMPORTED_MODULE_23__["default"](1);
    }

    m.push(arr);
  }); //АНАЛИЗ

  if (newLines.length > 0) {
    _analyzeState__WEBPACK_IMPORTED_MODULE_24__["default"].analyzeInfo = (0,_priority__WEBPACK_IMPORTED_MODULE_25__.collecting_statistics)(lines, startLines[0], finishLines.length); //state.analyzeInfo = collecting_statistics(lines, fakeLine, finishLines.length);
  }

  if ((0,_allCollision__WEBPACK_IMPORTED_MODULE_33__["default"])()) {
    show_warning("Потоки пересекаются"); //removeFakeLine(newLines, startLines[0]);

    return;
  }

  if (LOOPS === false) {
    if (_analyzeState__WEBPACK_IMPORTED_MODULE_24__["default"].analyzeInfo.number_of_loops > 0) {
      show_warning("Присутвует недопустимый элемент: петля. Анализ невозможен"); //removeFakeLine(newLines, startLines[0]);

      return;
    }
  }

  if (MERGES === false) {
    if (_analyzeState__WEBPACK_IMPORTED_MODULE_24__["default"].analyzeInfo.number_of_mergers > 0) {
      show_warning("Присутвует недопустимый элемент: слияние. Анализ невозможен"); //removeFakeLine(newLines, startLines[0]);

      return;
    }
  }

  if (FINISH_LIMITS) {
    if (FINISH_LIMITS instanceof Array) {
      if (!(finishLines.length >= FINISH_LIMITS[0] && finishLines.length <= FINISH_LIMITS[1])) {
        show_warning("\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0442\u043E\u043A\u043E\u0432: ".concat(finishLines.length, ".\n                          \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u043E\u0442 ").concat(FINISH_LIMITS[0], " \u0434\u043E ").concat(FINISH_LIMITS[1], "\n                "));
      }
    } else if (Number.isInteger(FINISH_LIMITS)) {
      if (finishLines.length !== FINISH_LIMITS) {
        show_warning("\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0442\u043E\u043A\u043E\u0432: ".concat(finishLines.length, ".\n                          \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F ").concat(FINISH_LIMITS, "\n                "));
      }
    }
  }

  var answers;

  try {
    answers = (0,_gause__WEBPACK_IMPORTED_MODULE_27__["default"])(m);
  } catch (e) {
    if (newLines.length > 0) {
      show_warning("Ошибка построения пути. Анализ невозможен");
    } //removeFakeLine(newLines, startLines[0]);


    return;
  } //removeFakeLine(newLines, startLines[0]);


  console.log("NUMERIC_POWER", NUMERIC_POWER);

  if (!NUMERIC_POWER) {
    _CNV_library__WEBPACK_IMPORTED_MODULE_22__["default"].combineRender(function () {
      newLines.forEach(function (line, index) {
        line.power = answers[index];

        if (REDUCING_LINES) {
          var newWidth = LINE_WIDTH / Math.pow(LINE_DIVISION, double(line.power.getDet() / line.power.getNum()));

          if (newWidth >= LINE_WIDTH_MIN) {
            line.line.style.lineWidth = newWidth; //line.endCircle.style.radius = newWidth / 2;
          } else {
            line.line.style.lineWidth = LINE_WIDTH_MIN;
          }
        }
      });
    });
  } else {
    (0,_step__WEBPACK_IMPORTED_MODULE_32__["default"])(startLines[0], new _Fraction__WEBPACK_IMPORTED_MODULE_23__["default"](START_POWER));
    console.log("step");

    if (REDUCING_LINES) {
      _CNV_library__WEBPACK_IMPORTED_MODULE_22__["default"].combineRender(function () {
        newLines.forEach(function (line, index) {
          var power = answers[index];
          var newWidth = LINE_WIDTH / Math.pow(LINE_DIVISION, double(power.getDet() / power.getNum()));

          if (newWidth >= LINE_WIDTH_MIN) {
            line.line.style.lineWidth = newWidth; //line.endCircle.style.radius = newWidth / 2;
          } else {
            line.line.style.lineWidth = LINE_WIDTH_MIN;
          }
        });
      });
    }
  } //console.log(collecting_statistics(lines, startLines[0]));


  finishLines.forEach(function (line) {
    //line.line.classList.add("finishLine");
    (0,_text__WEBPACK_IMPORTED_MODULE_28__["default"])({
      target: line,
      output: _analyzeState__WEBPACK_IMPORTED_MODULE_24__["default"].results
    });
  });
  _CNV_library__WEBPACK_IMPORTED_MODULE_22__["default"].render(); //Отрисовываем изменения, проишедшие во время анализа графа

  for (var _key in _analyzeState__WEBPACK_IMPORTED_MODULE_24__["default"].results) {
    //Отрисовываем значения у выходов графа
    if (!_analyzeState__WEBPACK_IMPORTED_MODULE_24__["default"].results[_key].auxiliary) {
      controlSum.plus(_analyzeState__WEBPACK_IMPORTED_MODULE_24__["default"].results[_key].data.num, _analyzeState__WEBPACK_IMPORTED_MODULE_24__["default"].results[_key].data.det);
    }

    _CNV_library__WEBPACK_IMPORTED_MODULE_22__["default"].createText(_objectSpread(_objectSpread({}, _analyzeState__WEBPACK_IMPORTED_MODULE_24__["default"].results[_key]), {}, {
      className: "finishText",
      id: _key + "_finishText"
    }));
    _CNV_library__WEBPACK_IMPORTED_MODULE_22__["default"].render(); //CNV.text(state.results[key])
  } //removeFakeLine(newLines, startLines[0]);


  if (NUMERIC_POWER && controlSum.getStr() !== String(START_POWER) || !NUMERIC_POWER && controlSum.getStr() !== "1") {
    if (CONTROL_SUM_WARNING) {
      warning.innerHTML = "Критическая ошибка анализа пути: сумма выходов равна: " + controlSum.getStr();
      warning.classList.remove("hidden");
    } else {
      warning.classList.add("hidden");
    }
  }

  var task = _toConsumableArray(TASK);

  task = TASK.map(function (item) {
    if (!(item instanceof _Fraction__WEBPACK_IMPORTED_MODULE_23__["default"])) {
      return new _Fraction__WEBPACK_IMPORTED_MODULE_23__["default"](item.split("/")[0], item.split("/")[1]);
    } else {
      return item;
    }
  });
  var resCount = 0;
  finishLines.forEach(function (line) {
    for (var i = 0; i < task.length; i++) {
      if (line.power.getStr() === task[i].getStr()) {
        resCount += 1;
        task.splice(i, 1);
        break;
      }
    }
  });
  _analyzeState__WEBPACK_IMPORTED_MODULE_24__["default"].analyzeInfo.number_of_results = Math.round(resCount / TASK.length * 100);
  _Store__WEBPACK_IMPORTED_MODULE_30__["default"].API.loadSolution((0,_storage_save__WEBPACK_IMPORTED_MODULE_29__["default"])({
    dont_save: true,
    dont_stringify: true
  }));

  if (SHOW_CYCLES) {
    (0,_showCycles__WEBPACK_IMPORTED_MODULE_31__["default"])(startLines[0]);
  } // console.log(CNV.querySelectorAll("line"));

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (analyze);

/***/ }),

/***/ "./tasks/streams/js/analyzeGraph/analyzeState.js":
/*!*******************************************************!*\
  !*** ./tasks/streams/js/analyzeGraph/analyzeState.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var state = {
  mode: "analyze",
  // analyze | follow,
  count: 0,
  //Для выделения линии пути ,
  path: undefined,
  results: {},
  analyzeInfo: {
    number_of_branches: 0,
    number_of_loops: 0,
    number_of_mergers: 0,
    number_of_finish: 0,
    number_of_results: "0",
    number_of_collision: 0
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ }),

/***/ "./tasks/streams/js/analyzeGraph/arnold.js":
/*!*************************************************!*\
  !*** ./tasks/streams/js/analyzeGraph/arnold.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _exactCycle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./exactCycle */ "./tasks/streams/js/analyzeGraph/exactCycle.js");
/* harmony import */ var _Fraction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Fraction */ "./tasks/streams/js/Fraction.js");








function arnold(target, lastTarget, power) {
  console.log("Арнольд");
  var cycle = (0,_exactCycle__WEBPACK_IMPORTED_MODULE_5__["default"])(target, lastTarget)[0];
  cycle = cycle.slice(1, cycle.length - 1);
  var lastTargetPower = lastTarget.power.clone();
  var sideInSum = new _Fraction__WEBPACK_IMPORTED_MODULE_6__["default"](0);

  var _loop = function _loop(i) {
    var line = cycle[i];

    if (line.sideIn.length > 0) {
      for (var j = 0; j < line.sideIn.length; j++) {
        if (line.sideIn[j].loop_powers && line.sideIn[j].loop_powers.length > 0) {
          //Если линия выходит из какого-то арнольда
          //console.log("LOOP POWERS", line.sideIn[j].loop_powers);
          var findSuccess = false; //Пробегаемся по всем мощностям входящей ветки и ищем ту,что является петлёй для текущего арнольда

          for (var k = 0; k < line.sideIn[j].loop_powers.length; k++) {
            var loop_child = line.sideIn[j].loop_powers[k];
            var flag = false; //пробегаемся по всем id мощности и находим совпадение с веткой арнольда (проверям, петля ли это)

            for (var l = 0; l < loop_child.ids.length; l++) {
              if (line.__CYCLEPATH_IDS.includes(loop_child.ids[l])) {
                console.log("ПЕТЛЯ!!!!!!!!!!", loop_child.power.getStr());
                flag = true;
                break;
              }
            }

            if (flag) {
              //Значит это петля.
              //1) Вычитаем из мощности петли мощность родителя - арнольда. - это плюсуем в sideInSum
              //2) Мощность родителя арнольда плюсуем в line.power
              console.log("loop_child.power", loop_child.power.getStr());
              console.log("line.sideIn[j].power", line.sideIn[j].power.getStr());
              console.log("sideInSum before plus", sideInSum.getStr());
              console.log("line.power before plus", line.power.getStr());
              sideInSum.plus(line.sideIn[j].power.clone().minus(loop_child.power)); // side += петля - вх.арнод;
              //line.power.plus(loop_child.power); //line += вх.арнольд

              console.log("line power after loop IN", line.power.getStr());
              console.log("sideInSum after loop IN", line.power.getStr());
              findSuccess = true;
              break;
            }
          }

          if (!findSuccess) {
            //Если не одна из линий не оказалась для текущего арнольда петлёй, просто складываем в sideInSum
            sideInSum.plus(line.sideIn[j].power);
          }
        } else {
          sideInSum.plus(line.sideIn[j].power);
        }
      }
    }

    line.power.minus(sideInSum);

    if (line.children.length > 1) {
      line.__SIDEINPOWER_STEMP = sideInSum.clone();
      sideInSum.divide(line.children.length); //Передаём всем элемпентам петли мощность родителя - арнольда

      if (line.loop_children) {
        line.loop_children.forEach(function (child, index) {
          var formPower = line.power.clone().divide(line.children.length);
          var division;
          child.target.loop_powers.forEach(function (power) {
            if (power.power === child.power && power.division) {
              //console.log("child.division", power.division);
              division = power.division;
            }
          });

          if (division && division.getNum() !== 0) {
            console.log("GOT DIVISION in ARNOLD", division.getStr());
            formPower.divide(division);
          }

          child.power.plus(formPower); //Изначально child.power = 0;
          // console.log("SET POWER (line.power)", line.power.getStr());
          // console.log("SET POWER (setted power)", child.power.getStr());
          //
          // console.log("AFTER SET child.target.loop_powers", child.target.loop_powers[0].power.getStr());
          // console.log("child.power === child.target.loop_powers[0].power", child.power ===  child.target.loop_powers[0].power);
          // line.line.classList.add("a5");
          // child.target.line.classList.add("a6");
        });
      }
    }

    console.log("line power", line.power.getStr(), sideInSum.getStr());
  };

  for (var i = 0; i < cycle.length; i++) {
    _loop(i);
  }

  target.power.minus(lastTargetPower);
  power = lastTarget.power;
  lastTarget.cycle = true; //Сразу ставим флаг взодящей грани в значение true, чтобы больше по нему не проходить
  //Вычитаем из общей мощности переданную от входящей грани, потому что сейчас будет арнольд, а не простое сложение
  //target.power.minus(power.getNum(), power.getDet());

  console.log("target power: ", target.power.getStr());
  console.log("income power: ", power.getStr()); //1.5

  var kx = target.power.clone().divide(power).minus(1); //2

  console.log('sideInSum', sideInSum.getStr());
  target.power.plus(sideInSum); //3

  var tmp = target.power.clone().divide(power); //4

  var x = tmp.clone().divide(kx); //5

  power.multiply(x);
  console.log("final income power", power.getStr()); //6

  target.power.plus(power); //Меняем мощность у текущей грани, арнольд готов
  //Изменяем мощности у всего цикла

  for (var _i = 0; _i < cycle.length - 1; _i++) {
    var line = cycle[_i];
    line.power.multiply(x);

    if (line.__SIDEINPOWER_STEMP) {
      line.power.plus(line.__SIDEINPOWER_STEMP);
    }

    if (line.loop_children) {
      line.loop_children.forEach(function (child) {
        //1) Вычитаем из линии петли мощность родителя - арнольда
        //2) Умножаем переданную родителем арнольдом мощность на x
        if (child.target.power) {
          child.target.power.minus(child.power);
          child.power.multiply(x);
          child.target.power.plus(child.power);
        }
      });
    }
  }

  console.log("x", x.getStr());
  console.log("final target power", target.power.getStr());
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arnold);

/***/ }),

/***/ "./tasks/streams/js/analyzeGraph/calcPower.js":
/*!****************************************************!*\
  !*** ./tasks/streams/js/analyzeGraph/calcPower.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SETTINGS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SETTINGS */ "./tasks/streams/js/SETTINGS.js");
 // function calcPower(parent){
//     if(NUMERIC_POWER){
//         let power = parent.power.clone().divide(parent.children.length);
//         if(power.getDet() === 2){
//             if(parent.__MINUS_ONE){
//                 power = parent.power.clone().minus(parent.power.clone().minus(1).divide(parent.children.length));
//             } else {
//                 power = parent.power.clone().minus(1).divide(parent.children.length);
//                 parent.__MINUS_ONE = true;
//             }
//         }
//         console.log("calcPower result", power.getStr());
//         return power;
//     } else{
//         return parent.power.clone().divide(parent.children.length);
//     }
//
// }

function calcPower(parent, children) {
  var _SETTINGS$getAll = _SETTINGS__WEBPACK_IMPORTED_MODULE_0__["default"].getAll(),
      NUMERIC_POWER = _SETTINGS$getAll.NUMERIC_POWER;

  if (NUMERIC_POWER) {
    var power = parent.power.clone().divide(parent.children.length);

    if (power.getDet() === 2) {
      if (parent.__MINUS_ONE && parent.__MINUS_ONE === children) {
        power = parent.power.clone().minus(1).divide(parent.children.length);
      } else if (parent.__MINUS_ONE && parent.__MINUS_ONE !== children) {
        power = parent.power.clone().minus(parent.power.clone().minus(1).divide(parent.children.length));
      } else {
        power = parent.power.clone().minus(1).divide(parent.children.length);
        parent.__MINUS_ONE = children;
      }
    }

    return power;
  } else {
    return parent.power.clone().divide(parent.children.length);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calcPower);

/***/ }),

/***/ "./tasks/streams/js/analyzeGraph/canGo.js":
/*!************************************************!*\
  !*** ./tasks/streams/js/analyzeGraph/canGo.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.link.js */ "./node_modules/core-js/modules/es.string.link.js");
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Fraction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Fraction */ "./tasks/streams/js/Fraction.js");
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CNV/library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Store */ "./tasks/streams/js/Store.js");




var count = 0;

function canGo(target, incoming) {
  console.warn("start canGo");
  console.log("step"); // console.log("target", target);
  // console.log("incoming", incoming);

  var toFix2 = {}; //{was, link}

  function step(curTarget, lastTarget) {
    //let power = lastTarget.power ? new Fraction(lastTarget.power.getNum(), lastTarget.power.getDet() * lastTarget.children.length) : curTarget.power;
    var power = lastTarget ? new _Fraction__WEBPACK_IMPORTED_MODULE_1__["default"](lastTarget.power.getNum(), lastTarget.power.getDet() * lastTarget.children.length) : new _Fraction__WEBPACK_IMPORTED_MODULE_1__["default"](1); // if(target.line.classList.contains("a7")) target.line.classList.add("a3");
    // target.line.classList.add("a7")

    var res;
    var fullPower = new _Fraction__WEBPACK_IMPORTED_MODULE_1__["default"](0);

    if (curTarget === incoming) {
      console.log("PREFOUND");
    } //Чтобы предотвратить зацикливаине. Этот флаг даёт функция findCycles;


    if (curTarget.__CYCLEEND) return false; //Считаем полную мощность

    for (var i = 0; i < curTarget.parents.length; i++) {
      var item = curTarget.parents[i];

      if (!item.power) {
        return false;
      } else {
        fullPower.plus(item.power.getNum(), item.power.getDet() * item.children.length);
      }
    } //


    if (!toFix2.hasOwnProperty(curTarget.id)) {
      toFix2[curTarget.id] = {
        was: curTarget.power === undefined ? undefined : [curTarget.power.getNum(), curTarget.power.getDet()],
        link: curTarget
      };
    }

    curTarget.power = fullPower;

    if (curTarget.__CANGO__CHECKED && power.getStr() !== fullPower.getStr()) {
      //Логи дебага
      console.log("CANGO !!!АРНОЛЬД!!!");
      console.log("curTarget.power before ARNOLD CANGO", curTarget.power.getStr()); //console.log("In Arnold power incoming", "fullpower", power.getStr(), fullPower.getStr());

      lastTarget.__CYCLEEND = true;
      fullPower.minus(power.getNum(), power.getDet());
      var kx = curTarget.power.clone().divide(power.getNum(), power.getDet()); //console.log("kx here", kx.getStr());

      kx.minus(1);
      var x = fullPower.clone().divide(kx.getNum(), kx.getDet()); //console.log("x here", x.getStr());

      curTarget.power.plus(x.getNum(), x.getDet());
      console.log("curTarget.power after ARNOLD CANGO", curTarget.power.getStr()); //console.log("fullPower here", fullPower.getStr());
      //console.log("x, kx, fullPower is", x.getStr(), kx.getStr(), fullPower.getStr());
    }

    curTarget.__CANGO__CHECKED = true;

    if (curTarget === incoming) {
      console.log("found!!!");
      return true;
    }

    for (var _i = 0; _i < curTarget.children.length; _i++) {
      var _item = curTarget.children[_i]; //item !== lastTarget чтобы не попасть на элемент, по которому уже проходили, то есть не пробешать целую ветку снова

      if (_item !== lastTarget) {
        if (step(_item, curTarget)) {
          return true;
        }
      }
    }

    return false;
  }

  function root(target) {
    for (var i = 0; i < target.parents.length; i++) {
      var item = target.parents[i]; //if(item === incoming) console.log("root PREFOUND", item.power)
      //item.power && item !== incoming

      if (item.power && item !== incoming) {
        if (step(item, target)) {
          isPossible = true;
          console.log("IS POSSIBLE");
          return;
        }
      }

      if (!item.__CYCLEEND) root(item);
    } //Старая версия
    // for(let i = 0; i < target.parents.length; i++) {
    //     let item = target.parents[i];
    //     if(item.power && item !== incoming){
    //         if(step(item, target)){
    //             isPossible = true;
    //             return;
    //         }
    //     }
    //     return root(item);
    // }
    //Новая версия
    // if(target === incoming){
    //     console.log("FOUND!");
    //     isPossible = true;
    //     return;
    // }
    //

    /*if(!target.__CANGO__CHECKED)*/

  }

  var isPossible = false;
  root(target);

  for (var key in toFix2) {
    toFix2[key].link.power = toFix2[key].was === undefined ? undefined : new _Fraction__WEBPACK_IMPORTED_MODULE_1__["default"](toFix2[key].was[0], toFix2[key].was[1]);
  }

  console.warn("end canGo", isPossible);
  return isPossible;
}

function canGo2(target, incoming) {
  var mainRes = false;

  function step() {}

  function root(target) {
    if (!mainRes) {
      for (var i = 0; i < target.parents.length; i++) {
        //Не так! Тут сразу родители, а нужно на детей.
        var item = target.parents[i];

        if (item.power) {
          if (step(item, target)) {
            mainRes = true;
            console.log("IS POSSIBLE");
            return;
          }
        }

        if (!item.__CYCLEEND) root(item);
      }

      target.__CANGO__CHECKED = true;
      return mainRes;
    } else {
      return mainRes;
    }
  }

  return mainRes;
}

function canGo3(target, incoming) {
  var state = _Store__WEBPACK_IMPORTED_MODULE_3__["default"].getState();

  if (state.cycles) {
    for (var i = 0; i < state.cycles.length; i++) {
      var cycle = state.cycles[i];

      if (cycle[0] === target && cycle[cycle.length - 2] === incoming) {
        return false;
      }
    }
  }

  return true;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (canGo3);

/***/ }),

/***/ "./tasks/streams/js/analyzeGraph/exactCycle.js":
/*!*****************************************************!*\
  !*** ./tasks/streams/js/analyzeGraph/exactCycle.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _analyzeState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./analyzeState */ "./tasks/streams/js/analyzeGraph/analyzeState.js");


function exactCycle(first, end) {
  var cycles = _analyzeState__WEBPACK_IMPORTED_MODULE_0__["default"].cycles;
  var res = [];

  for (var i = 0; i < cycles.length; i++) {
    if (cycles[i][0] === first && cycles[i][cycles[i].length - 2] === end) {
      res.push(cycles[i]);
    }
  }

  return res;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (exactCycle);

/***/ }),

/***/ "./tasks/streams/js/analyzeGraph/fincCycles.js":
/*!*****************************************************!*\
  !*** ./tasks/streams/js/analyzeGraph/fincCycles.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CNV_uniqueId__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CNV/uniqueId */ "./tasks/streams/js/CNV/uniqueId.js");






function findCycles(start) {
  var cycles = []; //[[line, line, line], [line, line, line], [line, line, line]];

  var curPath = [];

  function check(target, lastTarget) {
    curPath.push(target);

    if (target.__CHECKED) {
      lastTarget.__CYCLEEND = true;
      var index = curPath.indexOf(target);
      cycles.push(curPath.slice(index, curPath.length));
      var id = (0,_CNV_uniqueId__WEBPACK_IMPORTED_MODULE_4__["default"])(); //Обрабатыаем цикл

      cycles[cycles.length - 1].forEach(function (line, index) {
        if (line.__CYCLEPATH_IDS) {
          line.__CYCLEPATH_IDS.push(id);
        } else {
          line.__CYCLEPATH_IDS = [id];
        }

        line.__CYCLEPATH = true;

        if (line.parents.length > 1 && index !== 0 && index !== cycles[cycles.length - 1].length - 1) {
          line.sideIn.forEach(function (parent) {
            if (parent !== cycles[cycles.length - 1][index - 1]) {
              parent.__CYCLEIN = true;
            }
          });
        }
      }); //Не убираем checked, потому что у нас a1, a2, ...., a1 - мы на a1 и в конце, уберём, когда дойдём до начала

      curPath.pop();
      return;
    }

    target.__CHECKED = true;
    target.children.forEach(function (item) {
      check(item, target);
    }); //После завершения вызова детей убираем из пути элемент

    curPath.pop();
    target.__CHECKED = false;
  }

  if (start) {
    check(start);
  } //Проверка на одинаковые циклы


  for (var i = 0; i < cycles.length; i++) {
    var mainCycle = cycles[i];

    for (var j = i + 1; j < cycles.length; j++) {
      var curCycle = cycles[j];
      var flag = true;

      for (var k = 0; k < mainCycle.length; k++) {
        if (mainCycle[k] !== curCycle[k]) {
          flag = false;
          break;
        }
      }

      if (mainCycle.length !== curCycle.length) {
        flag = false;
      }

      if (flag === true) {
        cycles.splice(j, 1); //console.log("before splice", cycles);

        j--;
      }
    }
  }

  return cycles;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findCycles);

/***/ }),

/***/ "./tasks/streams/js/analyzeGraph/priority.js":
/*!***************************************************!*\
  !*** ./tasks/streams/js/analyzeGraph/priority.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "collecting_statistics": () => (/* binding */ collecting_statistics)
/* harmony export */ });
/* harmony import */ var _analyzeState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./analyzeState */ "./tasks/streams/js/analyzeGraph/analyzeState.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text */ "./tasks/streams/js/analyzeGraph/text.js");
/* harmony import */ var _SETTINGS__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SETTINGS */ "./tasks/streams/js/SETTINGS.js");
/* harmony import */ var _showCycles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./showCycles */ "./tasks/streams/js/analyzeGraph/showCycles.js");
/* harmony import */ var _fincCycles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fincCycles */ "./tasks/streams/js/analyzeGraph/fincCycles.js");






var _SETTINGS$getAll = _SETTINGS__WEBPACK_IMPORTED_MODULE_2__["default"].getAll(),
    SHOW_CYCLES = _SETTINGS$getAll.SHOW_CYCLES,
    SHOW_PRIORITIES = _SETTINGS$getAll.SHOW_PRIORITIES;

var test_1;

function collecting_statistics(lines, startLine, finishCount) {
  console.log("collecting_statistics");
  var flag = false;
  var start_key = -1;
  var count = 0;
  var index = 1;
  var i = 0;
  var loop = 0;

  for (var key in lines) {
    if (start_key === -1) start_key = key;
    lines[key].branch_index = -1;
  }

  var count_loops = (0,_fincCycles__WEBPACK_IMPORTED_MODULE_4__["default"])(startLine).length;
  var statistic_obj = {
    number_of_branches: 1,
    number_of_plots: 0,
    number_of_mergers: 0,
    number_of_loops: count_loops
  };
  test_1 = lines[start_key];

  while (flag === false) {
    while (test_1.children[0] != undefined && test_1.children[0].branch_index === -1) {
      if (test_1.children[1] !== undefined) count++;
      test_1 = test_1.children[0];
      test_1.branch_index = index;

      if (test_1.parents[1] !== undefined) {
        while (test_1.parents[i] !== undefined) {
          if (test_1.parents[i].__CYCLEEND) {
            loop += 1;
          }

          i++;
        }

        i = 0;
        statistic_obj.number_of_mergers += test_1.parents.length - loop - 1;
      }

      loop = 0;
    }

    while ((test_1.children[1] === undefined || test_1.children[1].branch_index != -1) && test_1.parents[0] != undefined) {
      test_1 = test_1.parents[0];
    }

    if (test_1.children[1] === undefined && test_1.parents[0] === undefined) flag = true;else if (test_1.parents[0] === undefined && test_1.children[1].branch_index != -1) flag = true;

    if (!flag) {
      index += 1;
      test_1 = test_1.children[1];
      test_1.branch_index = index;

      if (test_1.parents[1] !== undefined) {
        while (test_1.parents[i] !== undefined) {
          if (test_1.parents[i].__CYCLEEND) {
            loop += 1;
          }

          i++;
        }

        i = 0;
        statistic_obj.number_of_mergers += test_1.parents.length - loop - 1;
        loop = 0;
      }
    }
  }

  statistic_obj.number_of_branches = count;
  statistic_obj.number_of_finish = finishCount;
  return statistic_obj;
}



/***/ }),

/***/ "./tasks/streams/js/analyzeGraph/showCycles.js":
/*!*****************************************************!*\
  !*** ./tasks/streams/js/analyzeGraph/showCycles.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CNV/library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _fincCycles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fincCycles */ "./tasks/streams/js/analyzeGraph/fincCycles.js");





function showCycles(start) {
  console.log("showCycles");
  var cycles = (0,_fincCycles__WEBPACK_IMPORTED_MODULE_3__["default"])(start);
  var colors = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9"];
  colors.forEach(function (color) {
    _CNV_library__WEBPACK_IMPORTED_MODULE_2__["default"].querySelectorAll("." + color).forEach(function (item) {
      item.classList.remove(color);
    });
  });
  cycles.forEach(function (cycle, index) {
    cycle.forEach(function (target) {
      target.line.classList.add("a" + (index + 1));
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showCycles);

/***/ }),

/***/ "./tasks/streams/js/analyzeGraph/step.js":
/*!***********************************************!*\
  !*** ./tasks/streams/js/analyzeGraph/step.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _Fraction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Fraction */ "./tasks/streams/js/Fraction.js");
/* harmony import */ var _analyzeState__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./analyzeState */ "./tasks/streams/js/analyzeGraph/analyzeState.js");
/* harmony import */ var _canGo__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./canGo */ "./tasks/streams/js/analyzeGraph/canGo.js");
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../CNV/library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./text */ "./tasks/streams/js/analyzeGraph/text.js");
/* harmony import */ var _SETTINGS__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../SETTINGS */ "./tasks/streams/js/SETTINGS.js");
/* harmony import */ var _arnold__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./arnold */ "./tasks/streams/js/analyzeGraph/arnold.js");
/* harmony import */ var _calcPower__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./calcPower */ "./tasks/streams/js/analyzeGraph/calcPower.js");











function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }










function step(target, power, lastTarget) {
  var _SETTINGS$getAll = _SETTINGS__WEBPACK_IMPORTED_MODULE_15__["default"].getAll(),
      SHOW_PATH = _SETTINGS$getAll.SHOW_PATH;

  var canGOres;
  target.power = power; //Если этот элемент является циклом и мы уже о нём знаем - игнорируем.

  if (target.cycle) return;
  var fullPower = new _Fraction__WEBPACK_IMPORTED_MODULE_10__["default"](0); //Выделение пути обхода - раскоменти и увидишь, как шёл обход по графу

  if (SHOW_PATH) {
    setTimeout(function () {
      for (var i = 1; i < 10; i++) {
        if (!target.line.classList.contains("a" + i)) {
          target.line.classList.add("a" + i);
          break;
        }
      }
    }, 1000 * _analyzeState__WEBPACK_IMPORTED_MODULE_11__["default"].count);
  }

  _analyzeState__WEBPACK_IMPORTED_MODULE_11__["default"].count += 1; //Считаем полную мощность

  var _loop = function _loop(i) {
    var item = target.parents[i];

    if (!item.power) {
      //Если у входной грани нет мощности, проверяем, возможно ли в него попасть из этой грани
      canGOres = (0,_canGo__WEBPACK_IMPORTED_MODULE_12__["default"])(target, item);

      if (_analyzeState__WEBPACK_IMPORTED_MODULE_11__["default"].mode === "analyze") {
        if (canGOres) {
          //Если да, то сворачиваем лавочку и идём другим путём
          return {
            v: void 0
          };
        } else {
          // Если нет, значит мы наткнулись на цикл и нам нужно его обойти как можно скорее
          _analyzeState__WEBPACK_IMPORTED_MODULE_11__["default"].cycles.forEach(function (cycle) {
            if (cycle[0] === target && cycle[cycle.length - 2] === item) {
              _analyzeState__WEBPACK_IMPORTED_MODULE_11__["default"].path = cycle; //Находим нужный нам цикл и сохраняем его
            }
          });
        }
      } else {
        //Спортное решение. Выйдет ошибка, если войдёт undefined и это НЕ цикл. А если сложный цикл?..
        if (canGOres) {
          console.error("В режиме follow встретилась ветка (подсвечена зелёным) с мощность undefined"); //item.line.classList.add("a7");

          target.power = undefined;
          return {
            v: false
          };
        }
      }
    } //Флаг break нужен для того, чтобы обратывать множественные Арнольды. Ставится в функции optimizeCycles


    if (item.power && !item.__BREAK) {
      //Если мощность была, складываем её
      //console.log("PARENT POWER", new Fraction(item.power.getNum(), item.power.getDet() * item.children.length).getStr());
      //fullPower.plus(item.power.getNum(), item.power.getDet() * item.children.length);
      if (item !== lastTarget) {
        fullPower.plus((0,_calcPower__WEBPACK_IMPORTED_MODULE_17__["default"])(item, target));
      } else {
        fullPower.plus(power);
      }
    }
  };

  for (var i = 0; i < target.parents.length; i++) {
    var _ret = _loop(i);

    if (_typeof(_ret) === "object") return _ret.v;
  }

  if (target.__GET_POWER_FOR) {
    //Если есть этот массив, значит заберём все мощности из элементов массива (подробнее в файле)
    target.__GET_POWER_FOR.forEach(function (item) {
      fullPower.plus(item.power.clone().divide(item.children.length));
    });
  }

  if (fullPower.getNum() !== 0) {
    target.power = fullPower;
  } //Если элемент является элементов мыходной ветки из цикла


  if (target.loop_powers && target.loop_powers.length > 0) {
    if (target.children.length > 1) {
      target.children.forEach(function (targetChild) {
        //Пробегаемся по всем детям
        targetChild.loop_powers.forEach(function (tch_child) {
          //Пробегаемся по всем мощностям ребёнка
          //console.log("targetChild.loop_powers.length", targetChild.loop_powers.length);
          if (!tch_child.__BLOCK) {
            target.loop_powers.forEach(function (t_child) {
              //Пробегаемся по всем мощностям родителя
              //Если мощноти принадлежат к одному циклу и начальное ребро одно - делим мощность на количество детей
              if (tch_child.ids === t_child.ids && t_child.start_line === tch_child.start_line) {
                tch_child.division.multiply(target.children.length * t_child.division.getNum());
                tch_child.__BLOCK = true;
              }
            });
          }
        });
      });
    } else if (target.children.length === 1) {
      if (target.children[0].loop_powers) {
        target.children[0].loop_powers.forEach(function (child) {
          target.loop_powers.forEach(function (parent) {
            if (!child.__BLOCK) {
              //target.children[0].line.classList.add("a5");
              if (target.children[0].sideIn.includes(target)) {
                child.division.plus(parent.division).divide(Math.pow(target.children[0].parents.length, target.children[0].parents.length));
                child.__BLOCK = true;
              } else {
                if (child.ids === parent.ids && child.start_line === parent.start_line) {
                  //&& parent.division.getNum() > child.division.getNum()
                  child.division = parent.division.clone();
                }
              }
            }
          });
        });
      }
    }
  } //Уравнение арнольда


  if (target.already && power.getStr() !== fullPower.getStr()) {
    (0,_arnold__WEBPACK_IMPORTED_MODULE_16__["default"])(target, lastTarget, power);
  }

  target.already = true; //Ставим флаг, что мы прошли эту грань

  if (target.children.length === 0) {
    //Если детей нет, значит это выход и нужно записать результат
    // console.log("FINISH ZONE ", target.power.getStr());
    // console.log("FINISH last target power ", lastTarget.children[0].power.getStr());
    //CNV.preventRender(() => target.line.classList.add("finishLine"));
    (0,_text__WEBPACK_IMPORTED_MODULE_14__["default"])({
      target: target,
      output: _analyzeState__WEBPACK_IMPORTED_MODULE_11__["default"].results
    });
  } //Функционал работает плохо, потому что мы не идём по пути, а просто начинаем идти его сторону. Но это работает,
  //на простых примерах. Нужно дописать нормально.


  if (_analyzeState__WEBPACK_IMPORTED_MODULE_11__["default"].mode === "analyze") {
    if (canGOres === false && _analyzeState__WEBPACK_IMPORTED_MODULE_11__["default"].path) {
      //Вариант, если в нас входит цикл. Значит нужно пойти в его сторону. Вот мы и идём
      // follow(state.path);
      var transmittingPower = new _Fraction__WEBPACK_IMPORTED_MODULE_10__["default"](target.power.getNum(), target.power.getDet() * target.children.length);
      step(_analyzeState__WEBPACK_IMPORTED_MODULE_11__["default"].path[1], transmittingPower, target); // target.children.forEach(item => {
      //     let transmittingPower= new Fraction(target.power.getNum(), target.power.getDet() * target.children.length)
      //     step(item, transmittingPower, target);
      // })
    } else {
      //Иначе просто идём по всем нашим детям
      target.children.forEach(function (item) {
        //new Fraction(target.power.getNum(), target.power.getDet() * target.children.length)
        var transmittingPower = (0,_calcPower__WEBPACK_IMPORTED_MODULE_17__["default"])(target, item);
        step(item, transmittingPower, target);
      });
    }

    target.already = false; //Как только по всем детям прошлись, уходим назад и убираем флаг
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (step);

/***/ }),

/***/ "./tasks/streams/js/analyzeGraph/text.js":
/*!***********************************************!*\
  !*** ./tasks/streams/js/analyzeGraph/text.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.link.js */ "./node_modules/core-js/modules/es.string.link.js");
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CNV/library */ "./tasks/streams/js/CNV/library.js");



function text(options) {
  options.auxiliary = options.aux || options.auxiliary;
  options.aux = options.auxiliary || options.aux;
  options.output[options.target.ids.line] = {
    text: options.auxiliary ? options.text : options.target.power.getStr(),
    x0: options.target.endCircle.link.start.x + 10,
    y0: options.target.endCircle.link.start.y - 10,
    fontSize: "14",
    color: "green",
    data: options.auxiliary ? undefined : {
      num: options.target.power.getNum(),
      det: options.target.power.getDet()
    },
    auxiliary: options.auxiliary || false
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (text);

/***/ }),

/***/ "./tasks/streams/js/css.js":
/*!*********************************!*\
  !*** ./tasks/streams/js/css.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var css = {
  red: {
    color: "red",
    lineWidth: 3
  },
  lineWarning: {
    color: "red"
  },
  line: {
    color: "#99D9EA",
    lineWidth: 10
  },
  innerLine: {
    color: "black",
    lineWidth: "1"
  },
  black: {
    color: "black"
  },
  pointer: {
    color: "black",
    radius: 3
  },
  startCircle: {
    color: "#99D9EA"
  },
  endCircle: {
    color: "#99D9EA",
    radius: 8,
    zIndex: 1
  },
  endCircleActive: {
    color: "black"
  },
  stickyCircle: {
    radius: 10,
    color: "blue"
  },
  finishLine: {
    color: "blue"
  },
  finishText: {
    color: "green",
    fontFamily: "sans-serif",
    backgroundColor: "white",
    padding: 2
  },
  finishText2: {
    color: "green",
    fontSize: "14px",
    fontFamily: "Arial bold",
    backgroundColor: "white",
    zIndex: 999,
    padding: 4
  },
  stickyLine: {
    color: "gray"
  },
  startCircleActive: {
    color: "gray"
  },
  hidden: {
    visibility: "hidden"
  },
  ignore: {},
  smallCircle: {
    radius: 3,
    color: "yellow"
  },
  orange: {
    color: "#FF4E39FF"
  },
  a1: {
    color: "#EE82EE"
  },
  a2: {
    color: "green"
  },
  a3: {
    color: "#CD853F"
  },
  a4: {
    color: "#8A2BE2"
  },
  a5: {
    color: "#00CED1"
  },
  a6: {
    color: "#DAA520"
  },
  a7: {
    color: "#98FB98"
  },
  a8: {
    color: "#00FF7F"
  },
  a9: {
    color: "brown"
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (css);

/***/ }),

/***/ "./tasks/streams/js/drawingLine.js":
/*!*****************************************!*\
  !*** ./tasks/streams/js/drawingLine.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./CNV/library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _eventHandlers__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./eventHandlers */ "./tasks/streams/js/eventHandlers.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Store */ "./tasks/streams/js/Store.js");
/* harmony import */ var _storage_save__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./storage/save */ "./tasks/streams/js/storage/save.js");
/* harmony import */ var _SETTINGS__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./SETTINGS */ "./tasks/streams/js/SETTINGS.js");
/* harmony import */ var _analyzeGraph_analyze__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./analyzeGraph/analyze */ "./tasks/streams/js/analyzeGraph/analyze.js");
/* harmony import */ var _innerLine__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./innerLine */ "./tasks/streams/js/innerLine.js");
/* harmony import */ var _lineCollision__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./lineCollision */ "./tasks/streams/js/lineCollision.js");
/* harmony import */ var _storage_recover__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./storage/recover */ "./tasks/streams/js/storage/recover.js");
/* harmony import */ var _mousePosition__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./mousePosition */ "./tasks/streams/js/mousePosition.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

























function drawingLine(data) {
  var finishCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  var _SETTINGS$getAll = _SETTINGS__WEBPACK_IMPORTED_MODULE_16__["default"].getAll(),
      STACK = _SETTINGS$getAll.STACK;

  function stopDrawing(e) {
    // if(lineCollision(data.line, Store.collisionIgnore)) {
    //     Store.isCollision = true;
    // }
    e.preventDefault(); //убирает событие рисования

    _Store__WEBPACK_IMPORTED_MODULE_14__["default"].canvas.removeEventListener("mousemove", drawing); //самоуничножается

    _Store__WEBPACK_IMPORTED_MODULE_14__["default"].canvas.removeEventListener("click", stopDrawing);

    data.endCircle.onclick = function (e) {
      return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_13__.endCircleClick)(data, e);
    };

    finishCallback();
    (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_13__.resetStickToTailHandler)();

    if (STACK) {
      //Сохраняем изменения в стек
      _Store__WEBPACK_IMPORTED_MODULE_14__["default"].addToStack((0,_storage_save__WEBPACK_IMPORTED_MODULE_15__["default"])({
        dont_save: true
      }));
    }

    (0,_innerLine__WEBPACK_IMPORTED_MODULE_18__["default"])(data.line);
    (0,_analyzeGraph_analyze__WEBPACK_IMPORTED_MODULE_17__["default"])(_Store__WEBPACK_IMPORTED_MODULE_14__["default"].state.lines);
    _CNV_library__WEBPACK_IMPORTED_MODULE_12__["default"].querySelectorAll(".black").forEach(function (item) {
      item.classList.remove("black");
    });
  }

  function drawing(e) {
    var _mousePosition = (0,_mousePosition__WEBPACK_IMPORTED_MODULE_21__["default"])(e),
        _mousePosition2 = _slicedToArray(_mousePosition, 2),
        clientX = _mousePosition2[0],
        clientY = _mousePosition2[1];

    data.line.update.endPosition.x = clientX - _CNV_library__WEBPACK_IMPORTED_MODULE_12__["default"].state.shift.x;
    data.line.update.endPosition.y = clientY - _CNV_library__WEBPACK_IMPORTED_MODULE_12__["default"].state.shift.y;
    data.endCircle.update.startPosition.x = clientX - _CNV_library__WEBPACK_IMPORTED_MODULE_12__["default"].state.shift.x;
    data.endCircle.update.startPosition.y = clientY - _CNV_library__WEBPACK_IMPORTED_MODULE_12__["default"].state.shift.y;
  }

  _Store__WEBPACK_IMPORTED_MODULE_14__["default"].canvas.addEventListener("mousemove", drawing);
  _Store__WEBPACK_IMPORTED_MODULE_14__["default"].canvas.addEventListener("click", stopDrawing);
  (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_13__.setStickToTailHandler)(data);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (drawingLine);

/***/ }),

/***/ "./tasks/streams/js/eventHandlers.js":
/*!*******************************************!*\
  !*** ./tasks/streams/js/eventHandlers.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lineMouseEnter": () => (/* binding */ lineMouseEnter),
/* harmony export */   "lineMouseLeave": () => (/* binding */ lineMouseLeave),
/* harmony export */   "endCircleMouseEnter": () => (/* binding */ endCircleMouseEnter),
/* harmony export */   "endCircleMouseLeave": () => (/* binding */ endCircleMouseLeave),
/* harmony export */   "setAllEndCircleClick": () => (/* binding */ setAllEndCircleClick),
/* harmony export */   "resetAllEndCircleClick": () => (/* binding */ resetAllEndCircleClick),
/* harmony export */   "endCircleClick": () => (/* binding */ endCircleClick),
/* harmony export */   "setStickToTailHandler": () => (/* binding */ setStickToTailHandler),
/* harmony export */   "resetStickToTailHandler": () => (/* binding */ resetStickToTailHandler),
/* harmony export */   "getCheckCoords": () => (/* binding */ getCheckCoords),
/* harmony export */   "getBlackPointCoord": () => (/* binding */ getBlackPointCoord)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.link.js */ "./node_modules/core-js/modules/es.string.link.js");
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CNV/library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Store */ "./tasks/streams/js/Store.js");
/* harmony import */ var _graphHandlers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./graphHandlers */ "./tasks/streams/js/graphHandlers.js");
/* harmony import */ var _drawingLine__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./drawingLine */ "./tasks/streams/js/drawingLine.js");
/* harmony import */ var _SETTINGS__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SETTINGS */ "./tasks/streams/js/SETTINGS.js");
/* harmony import */ var _lineCollision__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lineCollision */ "./tasks/streams/js/lineCollision.js");
/* harmony import */ var _analyzeGraph_analyzeState__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./analyzeGraph/analyzeState */ "./tasks/streams/js/analyzeGraph/analyzeState.js");













function getBlackPointCoord(line) {
  var t = 0.5;
  var x = 0;
  var y = 0;
  var black_point_coord = {
    x: undefined,
    y: undefined
  };
  x = Math.pow(1 - t, 2) * line.start.x + 2 * (1 - t) * t * line.check.x + Math.pow(t, 2) * line.end.x;
  y = Math.pow(1 - t, 2) * line.start.y + 2 * (1 - t) * t * line.check.y + Math.pow(t, 2) * line.end.y;
  x = Math.round(x);
  y = Math.round(y);
  black_point_coord.x = x;
  black_point_coord.y = y;
  return black_point_coord;
}

function getCheckCoords(line, mouse) {
  var t = 0.5;
  var x = 0;
  var y = 0;
  var check_line_coord = {
    x: undefined,
    y: undefined
  };
  var flag = false;
  x = (mouse.x - Math.pow(1 - t, 2) * line.start.x - Math.pow(t, 2) * line.end.x) / (2 * (1 - t) * t);
  y = (mouse.y - Math.pow(1 - t, 2) * line.start.y - Math.pow(t, 2) * line.end.y) / (2 * (1 - t) * t);
  x = Math.round(x);
  y = Math.round(y);
  check_line_coord.x = x;
  check_line_coord.y = y;
  return check_line_coord;
}

function resetAllEndCircleClick() {
  Object.keys(_Store__WEBPACK_IMPORTED_MODULE_5__["default"].state.lines).forEach(function (key) {
    _Store__WEBPACK_IMPORTED_MODULE_5__["default"].state.lines[key].endCircle.onclick = undefined;
  });
}

function setAllEndCircleClick() {
  Object.keys(_Store__WEBPACK_IMPORTED_MODULE_5__["default"].state.lines).forEach(function (key) {
    _Store__WEBPACK_IMPORTED_MODULE_5__["default"].state.lines[key].endCircle.onclick = function (e) {
      return endCircleClick(_Store__WEBPACK_IMPORTED_MODULE_5__["default"].state.lines[key], e);
    };
  });
}

function lineMouseEnter(data, e) {
  var _store$state$lines$e$, _store$state$lines$e$2;

  e.target.classList.add("black");

  if (data.children.length === 0) {
    data.endCircle.classList.remove("hidden");
  }

  var _e$target$system$coor = e.target.system.coordinates,
      x1 = _e$target$system$coor.x1,
      x3 = _e$target$system$coor.x3,
      y1 = _e$target$system$coor.y1,
      y3 = _e$target$system$coor.y3;
  var x0, y0;

  if (x1 === x3 && y1 === y3) {
    var coordinates = e.target.system.moveTo(e.target.system.length / 2, e.target.system.coordinates.x1);
    x0 = coordinates.x;
    y0 = coordinates.y;
  } else {
    var _getBlackPointCoord = getBlackPointCoord(e.target.link),
        x = _getBlackPointCoord.x,
        y = _getBlackPointCoord.y;

    x0 = x;
    y0 = y;
  }

  if ((_store$state$lines$e$ = _Store__WEBPACK_IMPORTED_MODULE_5__["default"].state.lines[e.target.id]) !== null && _store$state$lines$e$ !== void 0 && (_store$state$lines$e$2 = _store$state$lines$e$.power) !== null && _store$state$lines$e$2 !== void 0 && _store$state$lines$e$2.getStr()) {
    var _store$state$lines$e$3, _store$state$lines$e$4;

    _CNV_library__WEBPACK_IMPORTED_MODULE_4__["default"].createText({
      x0: x0,
      y0: y0,
      text: (_store$state$lines$e$3 = _Store__WEBPACK_IMPORTED_MODULE_5__["default"].state.lines[e.target.id]) === null || _store$state$lines$e$3 === void 0 ? void 0 : (_store$state$lines$e$4 = _store$state$lines$e$3.power) === null || _store$state$lines$e$4 === void 0 ? void 0 : _store$state$lines$e$4.getStr(),
      id: e.target.id + "_text",
      className: "finishText2"
    });
  }
}

function lineMouseLeave(data, e) {
  var _CNV$querySelector;

  e.target.classList.remove("black");

  if (data.children.length === 0) {
    data.endCircle.classList.add("hidden");
  }

  (_CNV$querySelector = _CNV_library__WEBPACK_IMPORTED_MODULE_4__["default"].querySelector("#" + e.target.id + "_text")) === null || _CNV$querySelector === void 0 ? void 0 : _CNV$querySelector.remove();
}

function endCircleMouseEnter(e) {
  e.target.classList.add("endCircleActive");
}

function endCircleMouseLeave(e) {
  e.target.classList.remove("endCircleActive");
}

function endCircleClick(data, e) {
  var _SETTINGS$getAll = _SETTINGS__WEBPACK_IMPORTED_MODULE_8__["default"].getAll(),
      BRANCHES = _SETTINGS$getAll.BRANCHES;

  if (!data.endCircle.classList.contains("stickyCircle")) {
    _CNV_library__WEBPACK_IMPORTED_MODULE_4__["default"].settings.draggableCanvas = false;
    _CNV_library__WEBPACK_IMPORTED_MODULE_4__["default"].querySelectorAll(".finishLine").forEach(function (el) {
      return el.classList.remove("finishLine");
    }); //Против бага, что после нажатия линия остаётся чёрной

    data.line.classList.remove("black"); //вести можно только 2 линии, не больше

    if (data.children.length < BRANCHES) {
      _CNV_library__WEBPACK_IMPORTED_MODULE_4__["default"].querySelectorAll(".finishText").forEach(function (el) {
        return el.remove();
      });
      _CNV_library__WEBPACK_IMPORTED_MODULE_4__["default"].querySelectorAll(".finishText2").forEach(function (el) {
        return el.remove();
      }); //после того, как начали вести линию сбрасываем у всех круглешков событие нажатия

      resetAllEndCircleClick(); //создаём новуб линию и указываем ей коорлинаты начала как у круга, по которому кликнули

      var newData = (0,_graphHandlers__WEBPACK_IMPORTED_MODULE_6__.createEdge)(e, {
        x0: data.endCircle.link.start.x,
        y0: data.endCircle.link.start.y
      });
      newData.parents.push(data);
      (0,_graphHandlers__WEBPACK_IMPORTED_MODULE_6__.addEdge)(data, newData);
      newData.line.onmouseenter = undefined;
      newData.line.onmouseleave = undefined; //запускаем процесс построения линии за движением мыши;

      (0,_drawingLine__WEBPACK_IMPORTED_MODULE_7__["default"])(newData, function () {
        setAllEndCircleClick();

        newData.line.onmouseenter = function (e) {
          return lineMouseEnter(newData, e);
        };

        newData.line.onmouseleave = function (e) {
          return lineMouseLeave(newData, e);
        };

        setTimeout(function () {
          _CNV_library__WEBPACK_IMPORTED_MODULE_4__["default"].settings.draggableCanvas = true;
        }, 100);
      });
    }
  }
}

function resetStickToTailHandler() {
  var _loop = function _loop(key) {
    var data = _Store__WEBPACK_IMPORTED_MODULE_5__["default"].state.lines[key];

    data.line.onmouseenter = function (e) {
      return lineMouseEnter(data, e);
    };

    data.line.onmouseleave = function (e) {
      return lineMouseLeave(data, e);
    }; //data.startCircle.classList.add("hidden");
    //data.startCircle.classList.remove("startCircleActive");


    data.line.onclick = function (e) {
      return undefined;
    };
  };

  for (var key in _Store__WEBPACK_IMPORTED_MODULE_5__["default"].state.lines) {
    _loop(key);
  }
}

function setStickToTailHandler(currentData) {
  currentData.line.onmouseenter = undefined;
  currentData.line.onmouseleave = undefined;
  currentData.line.onclick = undefined;
  currentData.startCircle.onmouseenter = undefined;
  currentData.startCircle.onmouseleave = undefined;
  currentData.startCircle.onclick = undefined;

  var _loop2 = function _loop2(key) {
    var data = _Store__WEBPACK_IMPORTED_MODULE_5__["default"].state.lines[key];

    if (data.ids.line !== currentData.ids.line) {
      if (data.parents.length > 0) {
        data.line.onmouseenter = function (e) {
          e.target.classList.add("stickyLine");
        };

        data.line.onmouseleave = function (e) {
          e.target.classList.remove("stickyLine");
        };

        setTimeout(function () {
          data.line.onclick = function (e) {
            data.line.classList.remove("stickyLine");
            var coords;

            if (data.line.link.start.x === data.line.link.check.x && data.line.link.start.y === data.line.link.check.y) {
              coords = data.line.system.moveTo(data.line.system.length / 2, data.line.system.coordinates.x1);
            } else {
              coords = getBlackPointCoord({
                start: data.line.link.start,
                end: data.line.link.end,
                check: data.line.link.check
              });
            }

            currentData.line.update.endPosition.x = coords.x;
            currentData.line.update.endPosition.y = coords.y;
            currentData.endCircle.update.startPosition.x = coords.x;
            currentData.endCircle.update.startPosition.y = coords.y;
            currentData.endCircle.classList.add("hidden");
            currentData.__NOT_CIRCLE = true;
            data.parents.push(currentData);
            data.sideIn.push(currentData);
            (0,_graphHandlers__WEBPACK_IMPORTED_MODULE_6__.addEdge)(currentData, data);
          };
        }, 0);
      } else if (_analyzeGraph_analyzeState__WEBPACK_IMPORTED_MODULE_10__["default"].startLines.length !== 1) {
        data.startCircle.onmouseenter = function (e) {
          e.target.classList.add("startCircleActive");
          e.target.classList.remove("hidden");
        };

        data.startCircle.onmouseleave = function (e) {
          e.target.classList.remove("startCircleActive");
          e.target.classList.add("hidden");
        };

        setTimeout(function () {
          data.line.onclick = function (e) {
            data.line.classList.remove("stickyLine");
            var coords = data.line.system.coordinates;
            currentData.line.update.endPosition.x = coords.x1;
            currentData.line.update.endPosition.y = coords.y1;
            currentData.endCircle.update.startPosition.x = coords.x1;
            currentData.endCircle.update.startPosition.y = coords.y1;
            currentData.endCircle.classList.remove("hidden");
            data.parents.push(currentData);
            (0,_graphHandlers__WEBPACK_IMPORTED_MODULE_6__.addEdge)(currentData, data);
          };
        }, 10);
      }
    }
  };

  for (var key in _Store__WEBPACK_IMPORTED_MODULE_5__["default"].state.lines) {
    _loop2(key);
  }
}



/***/ }),

/***/ "./tasks/streams/js/firstDraw.js":
/*!***************************************!*\
  !*** ./tasks/streams/js/firstDraw.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _graphHandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graphHandlers */ "./tasks/streams/js/graphHandlers.js");
/* harmony import */ var _drawingLine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawingLine */ "./tasks/streams/js/drawingLine.js");
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CNV/library */ "./tasks/streams/js/CNV/library.js");




function firstDraw(canvas) {
  _CNV_library__WEBPACK_IMPORTED_MODULE_2__["default"].settings.draggableCanvas = false;

  canvas.onclick = function (e) {
    var data = (0,_graphHandlers__WEBPACK_IMPORTED_MODULE_0__.createEdge)(e);
    canvas.onclick = undefined;
    (0,_drawingLine__WEBPACK_IMPORTED_MODULE_1__["default"])(data, function () {
      canvas.onclick = undefined;
      _CNV_library__WEBPACK_IMPORTED_MODULE_2__["default"].settings.draggableCanvas = true;
    });
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (firstDraw);

/***/ }),

/***/ "./tasks/streams/js/gause.js":
/*!***********************************!*\
  !*** ./tasks/streams/js/gause.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Fraction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Fraction */ "./tasks/streams/js/Fraction.js");


function gauss(m) {
  var n = m.length; //prompt("Введите число уравнений системы:"); //Ввод данных

  var l = new Array(n); //Массив ответов

  var i, j, k;

  for (i = 0; i < n; ++i) {
    l[i] = new Array(n);
  }

  function Iteration(iter_item) {
    //Функция итеррация
    for (iter_item = 0; iter_item < n - 1; iter_item++) {
      //Цикл выполнения итерраций
      if (m[iter_item][iter_item].getNum() === 0) SwapRows(iter_item); //Проверка на ноль

      for (j = n; j >= iter_item; j--) {
        m[iter_item][j].divide(m[iter_item][iter_item]); //Делим строку i на а[i][i]
      }

      for (i = iter_item + 1; i < n; i++) {
        //Выполнение операций со строками
        for (j = n; j >= iter_item; j--) {
          m[i][j].minus(m[iter_item][j].clone().multiply(m[i][iter_item]));
        }
      }
    }

    Answers();
    return l;
  }

  function SwapRows(iter_item) {
    //Функция перемены строк
    for (i = iter_item + 1; i < n; i++) {
      if (m[i][iter_item] !== 0) {
        for (j = 0; j <= n; j++) {
          k = m[i - 1][j];
          m[i - 1][j] = m[i][j];
          m[i][j] = k;
        }
      }
    }
  }

  function Answers() {
    //Функция поиска и вывода корней
    l[n - 1] = m[n - 1][n].clone().divide(m[n - 1][n - 1]);

    for (i = n - 2; i >= 0; i--) {
      k = new _Fraction__WEBPACK_IMPORTED_MODULE_0__["default"](0);

      for (j = n - 1; j > i; j--) {
        k.plus(m[i][j].clone().multiply(l[j])); //k = (m[i][j]*l[j]) + k;
      }

      l[i] = m[i][n].clone().minus(k);
    }
  }

  return Iteration(n);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gauss);

/***/ }),

/***/ "./tasks/streams/js/graphHandlers.js":
/*!*******************************************!*\
  !*** ./tasks/streams/js/graphHandlers.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addEdge": () => (/* binding */ addEdge),
/* harmony export */   "removeEdge": () => (/* binding */ removeEdge),
/* harmony export */   "createEdge": () => (/* binding */ createEdge)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Store */ "./tasks/streams/js/Store.js");
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./CNV/library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _CNV_uniqueId__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./CNV/uniqueId */ "./tasks/streams/js/CNV/uniqueId.js");
/* harmony import */ var _eventHandlers__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./eventHandlers */ "./tasks/streams/js/eventHandlers.js");
/* harmony import */ var _SETTINGS__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./SETTINGS */ "./tasks/streams/js/SETTINGS.js");
/* harmony import */ var _mousePosition__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./mousePosition */ "./tasks/streams/js/mousePosition.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





















 //функция для добавбления ребёнка к родителю

function addEdge(parent, children) {
  parent.children.push(children);

  if (children.sideIn.includes(parent)) {
    parent.endCircle.classList.remove("hidden");
    parent.endCircle.classList.add("stickyCircle");
  } else {
    parent.endCircle.classList.remove("hidden");
  } // if(!parent.__NOT_CIRCLE){
  //     parent.endCircle.classList.remove("hidden");
  // } else {
  //     parent.endCircle.classList.remove("hidden");
  //     parent.endCircle.classList.add("stickyCircle");
  // }

}

function removeEdge(key) {
  var _CNV$querySelector;

  var data = _Store__WEBPACK_IMPORTED_MODULE_15__["default"].state.lines[key]; //при удалении элемента CNV удаляет и его слушатели событий

  data.line.remove();
  (_CNV$querySelector = _CNV_library__WEBPACK_IMPORTED_MODULE_16__["default"].querySelector("#" + data.line.id + "_innerLine")) === null || _CNV$querySelector === void 0 ? void 0 : _CNV$querySelector.remove();
  data.startCircle.remove();
  data.endCircle.remove();
  console.log(" removeEdge data", data); //Удаляем у sideIn stickyCircle

  data.sideIn.forEach(function (item) {
    item.endCircle.classList.remove("stickyCircle");
  }); //удаляем у родителей в детях этот элемент

  if (data.parents.length > 0) {
    data.parents.forEach(function (item) {
      item.children.splice(item.children.indexOf(data), 1);

      if (item.children.length === 0) {
        //если у родителя кончились дети, скрываем его кружочек
        item.endCircle.classList.add("hidden");
      }
    });
  } //удаляем у детей в родителях этот элемент


  if (data.children.length > 0) {
    data.children.forEach(function (item) {
      item.parents.splice(item.parents.indexOf(data), 1);

      if (item.sideIn.includes(data)) {
        item.sideIn.splice(item.sideIn.indexOf(data), 1);
      }
    });
  }

  delete _Store__WEBPACK_IMPORTED_MODULE_15__["default"].state.lines[key];
}

function createEdge(e) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _mousePosition = (0,_mousePosition__WEBPACK_IMPORTED_MODULE_20__["default"])(e),
      _mousePosition2 = _slicedToArray(_mousePosition, 2),
      clientX = _mousePosition2[0],
      clientY = _mousePosition2[1];

  var line = _CNV_library__WEBPACK_IMPORTED_MODULE_16__["default"].createLine({
    x0: option.x0 || clientX,
    y0: option.y0 || clientY,
    x1: option.x0 || clientX,
    y1: option.y0 || clientY,
    className: "line"
  });

  var _SETTINGS$getAll = _SETTINGS__WEBPACK_IMPORTED_MODULE_19__["default"].getAll(),
      LINE_WIDTH = _SETTINGS$getAll.LINE_WIDTH;

  line.style.lineWidth = LINE_WIDTH;
  var startCircle = _CNV_library__WEBPACK_IMPORTED_MODULE_16__["default"].createCircle({
    x0: option.x0 || clientX,
    y0: option.y0 || clientY,
    className: ["startCircle", "hidden"]
  });
  var endCircle = _CNV_library__WEBPACK_IMPORTED_MODULE_16__["default"].createCircle({
    x0: option.x0 || clientX,
    y0: option.y0 || clientY,
    className: ["endCircle", "hidden"]
  });
  endCircle.style.radius = line.style.lineWidth / 2;
  startCircle.style.radius = line.style.lineWidth / 2; //line.pointer = true;

  var data = {
    line: line,
    startCircle: startCircle,
    endCircle: endCircle,
    parents: [],
    children: [],
    sideIn: [],
    ids: {
      line: line.id,
      endCircle: endCircle.id,
      startCircle: startCircle.id
    },
    id: (0,_CNV_uniqueId__WEBPACK_IMPORTED_MODULE_17__["default"])()
  };

  line.onmouseenter = function (e) {
    return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_18__.lineMouseEnter)(data, e);
  };

  line.onmouseleave = function (e) {
    return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_18__.lineMouseLeave)(data, e);
  };

  endCircle.onmouseenter = function (e) {
    return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_18__.endCircleMouseEnter)(e);
  };

  endCircle.onmouseleave = function (e) {
    return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_18__.endCircleMouseLeave)(e);
  };

  _Store__WEBPACK_IMPORTED_MODULE_15__["default"].state.lines[line.id] = data;
  return data;
}



/***/ }),

/***/ "./tasks/streams/js/innerLine.js":
/*!***************************************!*\
  !*** ./tasks/streams/js/innerLine.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.link.js */ "./node_modules/core-js/modules/es.string.link.js");
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_number_is_nan_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.number.is-nan.js */ "./node_modules/core-js/modules/es.number.is-nan.js");
/* harmony import */ var core_js_modules_es_number_is_nan_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_is_nan_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CNV/library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _eventHandlers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./eventHandlers */ "./tasks/streams/js/eventHandlers.js");






function innerLine(line) {
  var x0, y0, x1, y1, x2, y2, mv1, mv2; //line.link.start.x === line.link.check.x && line.link.start.y === line.link.check.y

  if (line.isLine) {
    mv1 = line.system.moveTo(5, line.system.coordinates.x1);
    mv2 = line.system.moveTo(-5, line.system.coordinates.x2);
    x0 = mv1.x;
    y0 = mv1.y;
    x1 = mv2.x;
    y1 = mv2.y;
    x2 = x0;
    y2 = y0;
  } else {
    var point = (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_4__.getBlackPointCoord)(line.link);
    var line1, line2;
    _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].preventRender(function () {
      line1 = _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].createLine({
        x0: line.link.start.x,
        y0: line.link.start.y,
        x1: point.x,
        y1: point.y
      });
      line2 = _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].createLine({
        x1: line.link.end.x,
        y1: line.link.end.y,
        x0: point.x,
        y0: point.y
      });
      var start = line1.system.moveTo(5, line.link.start.x);
      var end = line2.system.moveTo(-5, line.link.end.x);
      x0 = start.x;
      y0 = !Number.isNaN(start.y) ? start.y : line1.link.start.y + 3;
      x1 = end.x;
      y1 = end.y;
      x2 = line.link.check.x;
      y2 = line.link.check.y;
      _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].render();
      line1.remove();
      line2.remove();
    });
  }

  var innerLine = _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].querySelector("#" + line.id + "_innerLine");

  if (line.system.length > 15) {
    if (innerLine) {
      _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].combineRender(function () {
        innerLine.update.start.x = x0;
        innerLine.update.start.y = y0;
        innerLine.update.end.x = x1;
        innerLine.update.end.y = y1;
        innerLine.update.check.x = x2;
        innerLine.update.check.y = y2;
      });
    } else {
      innerLine = _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].createLine({
        x0: x0,
        y0: y0,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        className: "innerLine",
        id: line.id + "_innerLine"
      });
      innerLine.pointer = true;
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (innerLine);

/***/ }),

/***/ "./tasks/streams/js/lineCollision.js":
/*!*******************************************!*\
  !*** ./tasks/streams/js/lineCollision.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CNV/library */ "./tasks/streams/js/CNV/library.js");





function lineCollision(target) {
  var notThis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var isCollision;

  if (notThis instanceof Array === false) {
    notThis = [notThis];
  }

  _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].querySelectorAll(".line").forEach(function (line) {
    if (target !== line && notThis.filter(function (item) {
      return item === line;
    }).length === 0) {
      var res = _CNV_library__WEBPACK_IMPORTED_MODULE_3__["default"].lineCollision(target, line);

      if (res.result) {
        isCollision = true;
        var warning = setInterval(function () {
          res.target.classList.toggle("lineWarning");
        }, 100);
        setTimeout(function () {
          clearInterval(warning);
          res.target.classList.remove("lineWarning");
        }, 1000);
      }
    }
  });
  return isCollision;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lineCollision);

/***/ }),

/***/ "./tasks/streams/js/mousePosition.js":
/*!*******************************************!*\
  !*** ./tasks/streams/js/mousePosition.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mousePosition)
/* harmony export */ });
function mousePosition(evt) {
  var rect = canvas.getBoundingClientRect(); // abs. size of element

  var scaleX = canvas.width / rect.width; // relationship bitmap vs. element for X

  var scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

  return [(evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
  (evt.clientY - rect.top) * scaleY // been adjusted to be relative to element
  ];
}

/***/ }),

/***/ "./tasks/streams/js/shiftHandlers.js":
/*!*******************************************!*\
  !*** ./tasks/streams/js/shiftHandlers.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shiftUpHandler": () => (/* binding */ shiftUpHandler),
/* harmony export */   "shiftDownHandler": () => (/* binding */ shiftDownHandler)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.link.js */ "./node_modules/core-js/modules/es.string.link.js");
/* harmony import */ var core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_link_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./CNV/library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _eventHandlers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./eventHandlers */ "./tasks/streams/js/eventHandlers.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Store */ "./tasks/streams/js/Store.js");
/* harmony import */ var _storage_save__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./storage/save */ "./tasks/streams/js/storage/save.js");
/* harmony import */ var _analyzeGraph_analyze__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./analyzeGraph/analyze */ "./tasks/streams/js/analyzeGraph/analyze.js");
/* harmony import */ var _innerLine__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./innerLine */ "./tasks/streams/js/innerLine.js");
/* harmony import */ var _lineCollision__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./lineCollision */ "./tasks/streams/js/lineCollision.js");
/* harmony import */ var _storage_recover__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./storage/recover */ "./tasks/streams/js/storage/recover.js");
/* harmony import */ var _mousePosition__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./mousePosition */ "./tasks/streams/js/mousePosition.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
























var lastDrag;

function resetAllBut(item) {
  for (var key in _Store__WEBPACK_IMPORTED_MODULE_15__["default"].state.lines) {
    var curItem = _Store__WEBPACK_IMPORTED_MODULE_15__["default"].state.lines[key];

    if (curItem !== item) {
      curItem.line.onmouseenter = undefined;
      curItem.line.onmouseleave = undefined;
      curItem.endCircle.onmouseenter = undefined;
      curItem.endCircle.onmouseleave = undefined;
    }
  }
}

function setAllBut(item, lineHandler, circleHandler, leaveHandler) {
  for (var key in _Store__WEBPACK_IMPORTED_MODULE_15__["default"].state.lines) {
    var curItem = _Store__WEBPACK_IMPORTED_MODULE_15__["default"].state.lines[key];
    lineHandler(curItem);
    circleHandler(curItem);
    leaveHandler(curItem);
  }
}

var moveTimeout;
var stopMoving = false;

var shiftDownHandler = function shiftDownHandler(e) {
  if (e.key === "Shift") {
    _CNV_library__WEBPACK_IMPORTED_MODULE_13__["default"].settings.draggableCanvas = false;
    window.removeEventListener("keydown", shiftDownHandler);
    window.addEventListener("keyup", shiftUpHandler);

    function set() {
      var _loop = function _loop(key) {
        var obj = _Store__WEBPACK_IMPORTED_MODULE_15__["default"].state.lines[key];
        var item = obj.endCircle;
        item.onclick = undefined;

        function onMouseMove3(event, obj) {
          stopMoving = true;
          clearTimeout(moveTimeout); //setStickToTailHandler(obj);

          var item = obj.endCircle;
          lastDrag = obj.line;
          _CNV_library__WEBPACK_IMPORTED_MODULE_13__["default"].combineRender(function () {
            item.update.startPosition.x = item.link.start.x + event.movementX;
            item.update.startPosition.y = item.link.start.y + event.movementY;
            obj.line.update.endPosition.x = item.link.start.x;
            obj.line.update.endPosition.y = item.link.start.y;
            (0,_innerLine__WEBPACK_IMPORTED_MODULE_18__["default"])(obj.line);
            var finishText = _CNV_library__WEBPACK_IMPORTED_MODULE_13__["default"].querySelector("#" + obj.line.id + "_finishText");

            if (finishText) {
              finishText.update.startPosition.x = item.link.start.x + event.movementX + 10;
              finishText.update.startPosition.y = item.link.start.y + event.movementY + 10;
            }

            var objects = [obj];
            obj.children.forEach(function (children) {
              children.line.link.start.x += event.movementX;
              children.line.link.start.y += event.movementY; // if(children.line.isLine){
              //     children.line.link.check.x = children.line.link.start.x;
              //     children.line.link.check.y = children.line.link.start.y;
              // } else {
              //     children.line.link.check.x += event.movementX;
              //     children.line.link.check.y += event.movementY;
              // }

              children.line.link.check.x += event.movementX;
              children.line.link.check.y += event.movementY;
              children.startCircle.link.start.x += event.movementX;
              children.startCircle.link.start.y += event.movementY;
              objects.push(children);
              (0,_innerLine__WEBPACK_IMPORTED_MODULE_18__["default"])(children.line);
            });
            stopMoving = false;
            moveTimeout = setTimeout(function () {
              var _loop2 = function _loop2() {
                var curObj = objects[0];
                if (!curObj) return "break";
                console.log("mouseMove 3 endCircle loop");
                var sideInCoors = void 0;

                if (!curObj.line.isLine) {
                  sideInCoors = (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_14__.getBlackPointCoord)({
                    start: curObj.line.link.start,
                    end: curObj.line.link.end,
                    check: curObj.line.link.check
                  });
                } else {
                  sideInCoors = curObj.line.system.moveTo(curObj.line.system.length / 2, curObj.line.system.coordinates.x1);
                } //innerLine(curObj.line);


                curObj.sideIn.forEach(function (item) {
                  item.line.update.endPosition.x = sideInCoors.x;
                  item.line.update.endPosition.y = sideInCoors.y;
                  item.endCircle.update.startPosition.x = sideInCoors.x;
                  item.endCircle.update.startPosition.y = sideInCoors.y;
                  (0,_innerLine__WEBPACK_IMPORTED_MODULE_18__["default"])(item.line);
                  objects.push(item);
                });
                objects.shift();
              };

              while (!stopMoving) {
                var _ret = _loop2();

                if (_ret === "break") break;
              }
            }, 70);
          });
        }

        function onMouseMove4(event, obj) {
          var _mousePosition = (0,_mousePosition__WEBPACK_IMPORTED_MODULE_21__["default"])(event),
              _mousePosition2 = _slicedToArray(_mousePosition, 2),
              clientX = _mousePosition2[0],
              clientY = _mousePosition2[1];

          lastDrag = obj.line;
          _CNV_library__WEBPACK_IMPORTED_MODULE_13__["default"].combineRender(function () {
            var _getCheckCoords = (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_14__.getCheckCoords)({
              start: obj.line.link.start,
              end: obj.line.link.end,
              check: obj.line.link.check
            }, {
              x: clientX - _CNV_library__WEBPACK_IMPORTED_MODULE_13__["default"].state.shift.x,
              y: clientY - _CNV_library__WEBPACK_IMPORTED_MODULE_13__["default"].state.shift.y
            }),
                x = _getCheckCoords.x,
                y = _getCheckCoords.y;

            obj.line.link.check.x = x;
            obj.line.link.check.y = y;
            var objects = [obj];

            var _loop3 = function _loop3() {
              var curObj = objects[0];
              if (!curObj) return "break";
              console.log("mouseMove 4 line loop");
              var sideInCoors = (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_14__.getBlackPointCoord)({
                start: curObj.line.link.start,
                end: curObj.line.link.end,
                check: curObj.line.link.check
              });
              (0,_innerLine__WEBPACK_IMPORTED_MODULE_18__["default"])(obj.line);
              curObj.sideIn.forEach(function (item) {
                item.line.update.endPosition.x = sideInCoors.x;
                item.line.update.endPosition.y = sideInCoors.y;
                item.endCircle.update.startPosition.x = sideInCoors.x;
                item.endCircle.update.startPosition.y = sideInCoors.y;
                (0,_innerLine__WEBPACK_IMPORTED_MODULE_18__["default"])(item.line);
                objects.push(item);
              });
              objects.shift();
            };

            while (true) {
              var _ret2 = _loop3();

              if (_ret2 === "break") break;
            }
          });
        }

        function mouseLeave(e) {
          e.target.classList.remove("black");
          _Store__WEBPACK_IMPORTED_MODULE_15__["default"].canvas.style.cursor = "default";
          document.onmousemove = undefined; //resetStickToTailHandler();

          _Store__WEBPACK_IMPORTED_MODULE_15__["default"].canvas.onmousedown = undefined;
          _Store__WEBPACK_IMPORTED_MODULE_15__["default"].canvas.onmouseup = undefined;
          set();
        }

        function lineMouseEnter(obj) {
          obj.line.onmouseenter = function (e) {
            resetAllBut(obj);
            obj.line.classList.add("black");
            _Store__WEBPACK_IMPORTED_MODULE_15__["default"].canvas.style.cursor = "move";

            _Store__WEBPACK_IMPORTED_MODULE_15__["default"].canvas.onmousedown = function (e) {
              _CNV_library__WEBPACK_IMPORTED_MODULE_13__["default"].querySelectorAll(".finishText2").forEach(function (item) {
                return item.remove();
              }); // resetAllBut(obj);

              document.onmousemove = function (e) {
                return onMouseMove4(e, obj);
              };

              obj.line.onmouseleave = undefined;
            };

            _Store__WEBPACK_IMPORTED_MODULE_15__["default"].canvas.onmouseup = function (e) {
              if (e.button === 0) {
                set(); //setAllBut(obj, lineMouseEnter, circleMouseEnter, leaveHandler);

                document.onmousemove = undefined; //resetStickToTailHandler();

                obj.line.onmouseleave = mouseLeave;
                setTimeout(function () {
                  console.log("shiftUpSave");
                  (0,_analyzeGraph_analyze__WEBPACK_IMPORTED_MODULE_17__["default"])(_Store__WEBPACK_IMPORTED_MODULE_15__["default"].state.lines);
                  _Store__WEBPACK_IMPORTED_MODULE_15__["default"].addToStack((0,_storage_save__WEBPACK_IMPORTED_MODULE_16__["default"])({
                    dont_save: true
                  }));
                }, 150);
              }
            };
          };
        }

        function circleMouseEnter(obj) {
          var item = obj.endCircle;

          item.onmouseenter = function (e) {
            resetAllBut(obj);
            item.classList.add("black");
            item.classList.remove("hidden");
            obj.children.forEach(function (child) {
              child.line.mouseenter = undefined;
              child.line.classList.remove("black");
            });
            obj.line.onmouseenter = undefined;
            _Store__WEBPACK_IMPORTED_MODULE_15__["default"].canvas.style.cursor = "move";

            if (!item.classList.contains("stickyCircle")) {
              _Store__WEBPACK_IMPORTED_MODULE_15__["default"].canvas.onmousedown = function (e) {
                _CNV_library__WEBPACK_IMPORTED_MODULE_13__["default"].querySelectorAll(".finishText2").forEach(function (item) {
                  return item.remove();
                }); // resetAllBut(obj);

                document.onmousemove = function (e) {
                  return onMouseMove3(e, obj);
                };

                item.onmouseleave = undefined;
              };

              _Store__WEBPACK_IMPORTED_MODULE_15__["default"].canvas.onmouseup = function (e) {
                item.classList.remove("black");
                set();

                if (e.button === 0) {
                  document.onmousemove = undefined; //resetStickToTailHandler();

                  item.onmouseleave = mouseLeave;
                }

                (0,_analyzeGraph_analyze__WEBPACK_IMPORTED_MODULE_17__["default"])(_Store__WEBPACK_IMPORTED_MODULE_15__["default"].state.lines);
                _Store__WEBPACK_IMPORTED_MODULE_15__["default"].addToStack((0,_storage_save__WEBPACK_IMPORTED_MODULE_16__["default"])({
                  dont_save: true
                }));
              };
            }
          };
        }

        function leaveHandler(obj) {
          item.onmouseleave = mouseLeave;
          obj.line.onmouseleave = mouseLeave;
        } //Для линии


        lineMouseEnter(obj); //Для конечной точки

        circleMouseEnter(obj);
        leaveHandler(obj);
      };

      for (var key in _Store__WEBPACK_IMPORTED_MODULE_15__["default"].state.lines) {
        _loop(key);
      }
    }

    set();
    return function () {
      document.removeEventListener('mousemove', onMouseMove3);
      _Store__WEBPACK_IMPORTED_MODULE_15__["default"].canvas.onmousedown = undefined;
      _Store__WEBPACK_IMPORTED_MODULE_15__["default"].canvas.onmouseup = undefined;
    };
  }
};

var shiftUpHandler = function shiftUpHandler(e) {
  if (e.key === "Shift" && !_Store__WEBPACK_IMPORTED_MODULE_15__["default"].zMode) {
    _CNV_library__WEBPACK_IMPORTED_MODULE_13__["default"].settings.draggableCanvas = true;
    _Store__WEBPACK_IMPORTED_MODULE_15__["default"].canvas.style.cursor = "default";
    window.removeEventListener("keyup", shiftUpHandler);
    window.addEventListener("keydown", shiftDownHandler); //resetStickToTailHandler();

    _Store__WEBPACK_IMPORTED_MODULE_15__["default"].canvas.onmousedown = undefined;
    _Store__WEBPACK_IMPORTED_MODULE_15__["default"].canvas.onmouseup = undefined;
    document.onmousemove = undefined;

    var _loop4 = function _loop4(key) {
      var obj = _Store__WEBPACK_IMPORTED_MODULE_15__["default"].state.lines[key];
      var item = obj.endCircle;
      obj.line.classList.remove("black");

      obj.line.onmouseenter = function (e) {
        return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_14__.lineMouseEnter)(obj, e);
      };

      obj.line.onmouseleave = function (e) {
        return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_14__.lineMouseLeave)(obj, e);
      };

      item.onmouseenter = _eventHandlers__WEBPACK_IMPORTED_MODULE_14__.endCircleMouseEnter;
      item.onmouseleave = _eventHandlers__WEBPACK_IMPORTED_MODULE_14__.endCircleMouseLeave;

      item.onclick = function (e) {
        return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_14__.endCircleClick)(obj, e);
      };
    };

    for (var key in _Store__WEBPACK_IMPORTED_MODULE_15__["default"].state.lines) {
      _loop4(key);
    }

    (0,_analyzeGraph_analyze__WEBPACK_IMPORTED_MODULE_17__["default"])(_Store__WEBPACK_IMPORTED_MODULE_15__["default"].state.lines);
    lastDrag = undefined;
  }
};



/***/ }),

/***/ "./tasks/streams/js/storage/recover.js":
/*!*********************************************!*\
  !*** ./tasks/streams/js/storage/recover.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CNV/library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _eventHandlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../eventHandlers */ "./tasks/streams/js/eventHandlers.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Store */ "./tasks/streams/js/Store.js");
/* harmony import */ var _innerLine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../innerLine */ "./tasks/streams/js/innerLine.js");
/* harmony import */ var _firstDraw__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../firstDraw */ "./tasks/streams/js/firstDraw.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./save */ "./tasks/streams/js/storage/save.js");









function recover(data) {
  var disk = JSON.parse(data || localStorage.getItem("__saved"));
  _CNV_library__WEBPACK_IMPORTED_MODULE_2__["default"].recover(disk.CNV);
  var script = JSON.parse(disk.SCRIPT);

  var _loop = function _loop(key) {
    var item = script.lines[key];
    item.line = _CNV_library__WEBPACK_IMPORTED_MODULE_2__["default"].getElementByUniqueId(item.line);
    item.endCircle = _CNV_library__WEBPACK_IMPORTED_MODULE_2__["default"].getElementByUniqueId(item.endCircle);
    item.startCircle = _CNV_library__WEBPACK_IMPORTED_MODULE_2__["default"].getElementByUniqueId(item.startCircle);
    (0,_innerLine__WEBPACK_IMPORTED_MODULE_5__["default"])(item.line);
    item.children = item.children.map(function (id) {
      return script.lines[id];
    });
    item.parents = item.parents.map(function (id) {
      return script.lines[id];
    });
    item.sideIn = item.sideIn.map(function (id) {
      return script.lines[id];
    });

    item.line.onmouseenter = function (e) {
      return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_3__.lineMouseEnter)(item, e);
    };

    item.line.onmouseleave = function (e) {
      return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_3__.lineMouseLeave)(item, e);
    };

    item.endCircle.onmouseenter = function (e) {
      return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_3__.endCircleMouseEnter)(e);
    };

    item.endCircle.onmouseleave = function (e) {
      return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_3__.endCircleMouseLeave)(e);
    };

    item.endCircle.onclick = function (e) {
      return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_3__.endCircleClick)(item, e);
    };
  };

  for (var key in script.lines) {
    _loop(key);
  }

  if (Object.keys(script.lines).length > 0) {
    _Store__WEBPACK_IMPORTED_MODULE_4__["default"].canvas.onclick = undefined;
  } else {
    (0,_firstDraw__WEBPACK_IMPORTED_MODULE_6__["default"])(_Store__WEBPACK_IMPORTED_MODULE_4__["default"].canvas);
  }

  _Store__WEBPACK_IMPORTED_MODULE_4__["default"].state = script;
  _CNV_library__WEBPACK_IMPORTED_MODULE_2__["default"].settings.draggableCanvas = true; //store.addToStack(save({dont_save: true}))

  _CNV_library__WEBPACK_IMPORTED_MODULE_2__["default"].render();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (recover);

/***/ }),

/***/ "./tasks/streams/js/storage/save.js":
/*!******************************************!*\
  !*** ./tasks/streams/js/storage/save.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _CNV_library__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../CNV/library */ "./tasks/streams/js/CNV/library.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Store */ "./tasks/streams/js/Store.js");
/* harmony import */ var _analyzeGraph_analyzeState__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../analyzeGraph/analyzeState */ "./tasks/streams/js/analyzeGraph/analyzeState.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












function saveData(state, visualData, dontSave) {
  _CNV_library__WEBPACK_IMPORTED_MODULE_7__["default"].querySelectorAll(".lineWarning").forEach(function (item) {
    return item.classList.remove("lineWarning");
  });

  function clearLine(line) {
    line.__MINUS_ONE = undefined;
    line.already = undefined;
    line.power = undefined;
  }

  var prepData = _objectSpread(_objectSpread({}, state), {}, {
    lines: {}
  });

  var _loop = function _loop(key) {
    var data = state.lines[key];
    clearLine(data);
    var children = [];
    var parents = [];
    var sideIn = [];
    data.children.forEach(function (item) {
      children.push(item.line.id);
    });
    data.parents.forEach(function (item) {
      parents.push(item.line.id);
    });
    data.sideIn.forEach(function (item) {
      sideIn.push(item.line.id);
    });
    prepData.lines[key] = _objectSpread(_objectSpread({}, data), {}, {
      line: data.line.id,
      endCircle: data.endCircle.id,
      startCircle: data.startCircle.id,
      children: children,
      parents: parents,
      sideIn: sideIn
    });
  };

  for (var key in state.lines) {
    _loop(key);
  }

  var saved = JSON.stringify(_objectSpread({
    SCRIPT: JSON.stringify(prepData),
    CNV: visualData
  }, _analyzeGraph_analyzeState__WEBPACK_IMPORTED_MODULE_9__["default"].analyzeInfo));

  if (!dontSave) {
    localStorage.setItem("__saved", saved);
  }

  return saved;
}

function save(options) {
  //Убираем синие линии, чтобы сохранились стили без них
  _CNV_library__WEBPACK_IMPORTED_MODULE_7__["default"].preventRender(function () {
    _CNV_library__WEBPACK_IMPORTED_MODULE_7__["default"].querySelectorAll(".finishLine").forEach(function (item) {
      item.classList.remove("finishLine");
      item.classList.add("__PLACE_FOR_FINISH_LINE");
    });
    _CNV_library__WEBPACK_IMPORTED_MODULE_7__["default"].querySelectorAll(".black").forEach(function (item) {
      item.classList.remove("black");
    });
  });
  var saved = saveData(_Store__WEBPACK_IMPORTED_MODULE_8__["default"].state, _CNV_library__WEBPACK_IMPORTED_MODULE_7__["default"].save(), options.dont_save); //Восстанавливаем синие линии, чтобы продолжить разработку

  _CNV_library__WEBPACK_IMPORTED_MODULE_7__["default"].preventRender(function () {
    _CNV_library__WEBPACK_IMPORTED_MODULE_7__["default"].querySelectorAll(".__PLACE_FOR_FINISH_LINE").forEach(function (item) {
      item.classList.remove("__PLACE_FOR_FINISH_LINE");
      item.classList.add("finishLine");
    });
  });

  if (options.dont_stringify) {
    return JSON.parse(saved);
  } else {
    return saved;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (save);

/***/ }),

/***/ "./tasks/streams/js/zHandlers.js":
/*!***************************************!*\
  !*** ./tasks/streams/js/zHandlers.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _storage_recover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage/recover */ "./tasks/streams/js/storage/recover.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Store */ "./tasks/streams/js/Store.js");
/* harmony import */ var _analyzeGraph_analyze__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./analyzeGraph/analyze */ "./tasks/streams/js/analyzeGraph/analyze.js");




function ctrlZHandler() {
  var nextBtn = document.querySelector("#btn_next");
  var prevBtn = document.querySelector("#btn_prev");

  nextBtn.onclick = function (e) {
    (0,_storage_recover__WEBPACK_IMPORTED_MODULE_0__["default"])(_Store__WEBPACK_IMPORTED_MODULE_1__["default"].getStackNext());
    (0,_analyzeGraph_analyze__WEBPACK_IMPORTED_MODULE_2__["default"])(_Store__WEBPACK_IMPORTED_MODULE_1__["default"].state.lines);
  };

  prevBtn.onclick = function (e) {
    _Store__WEBPACK_IMPORTED_MODULE_1__["default"].showStack();
    (0,_storage_recover__WEBPACK_IMPORTED_MODULE_0__["default"])(_Store__WEBPACK_IMPORTED_MODULE_1__["default"].getStackPrev());
    (0,_analyzeGraph_analyze__WEBPACK_IMPORTED_MODULE_2__["default"])(_Store__WEBPACK_IMPORTED_MODULE_1__["default"].state.lines);
  };

  window.addEventListener("keydown", function (e) {
    if ((e.key === "Z" || e.key === "Я") && e.ctrlKey && e.shiftKey) {
      (0,_storage_recover__WEBPACK_IMPORTED_MODULE_0__["default"])(_Store__WEBPACK_IMPORTED_MODULE_1__["default"].getStackNext());
      (0,_analyzeGraph_analyze__WEBPACK_IMPORTED_MODULE_2__["default"])(_Store__WEBPACK_IMPORTED_MODULE_1__["default"].state.lines);
    } else if ((e.key === "z" || e.key === "я") && e.ctrlKey) {
      (0,_storage_recover__WEBPACK_IMPORTED_MODULE_0__["default"])(_Store__WEBPACK_IMPORTED_MODULE_1__["default"].getStackPrev());
      (0,_analyzeGraph_analyze__WEBPACK_IMPORTED_MODULE_2__["default"])(_Store__WEBPACK_IMPORTED_MODULE_1__["default"].state.lines);
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ctrlZHandler);

/***/ }),

/***/ "./node_modules/browserslist/browser.js":
/*!**********************************************!*\
  !*** ./node_modules/browserslist/browser.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var BrowserslistError = __webpack_require__(/*! ./error */ "./node_modules/browserslist/error.js")

function noop() {}

module.exports = {
  loadQueries: function loadQueries() {
    throw new BrowserslistError(
      'Sharable configs are not supported in client-side build of Browserslist'
    )
  },

  getStat: function getStat(opts) {
    return opts.stats
  },

  loadConfig: function loadConfig(opts) {
    if (opts.config) {
      throw new BrowserslistError(
        'Browserslist config are not supported in client-side build'
      )
    }
  },

  loadCountry: function loadCountry() {
    throw new BrowserslistError(
      'Country statistics are not supported ' +
        'in client-side build of Browserslist'
    )
  },

  loadFeature: function loadFeature() {
    throw new BrowserslistError(
      'Supports queries are not available in client-side build of Browserslist'
    )
  },

  currentNode: function currentNode(resolve, context) {
    return resolve(['maintained node versions'], context)[0]
  },

  parseConfig: noop,

  readConfig: noop,

  findConfig: noop,

  clearCaches: noop,

  oldDataWarning: noop
}


/***/ }),

/***/ "./node_modules/browserslist/error.js":
/*!********************************************!*\
  !*** ./node_modules/browserslist/error.js ***!
  \********************************************/
/***/ ((module) => {

function BrowserslistError(message) {
  this.name = 'BrowserslistError'
  this.message = message
  this.browserslist = true
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, BrowserslistError)
  }
}

BrowserslistError.prototype = Error.prototype

module.exports = BrowserslistError


/***/ }),

/***/ "./node_modules/browserslist/index.js":
/*!********************************************!*\
  !*** ./node_modules/browserslist/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var jsReleases = __webpack_require__(/*! node-releases/data/processed/envs.json */ "./node_modules/node-releases/data/processed/envs.json")
var agents = (__webpack_require__(/*! caniuse-lite/dist/unpacker/agents */ "./node_modules/caniuse-lite/dist/unpacker/agents.js").agents)
var jsEOL = __webpack_require__(/*! node-releases/data/release-schedule/release-schedule.json */ "./node_modules/node-releases/data/release-schedule/release-schedule.json")
var path = __webpack_require__(/*! path */ "?3465")
var e2c = __webpack_require__(/*! electron-to-chromium/versions */ "./node_modules/electron-to-chromium/versions.js")

var BrowserslistError = __webpack_require__(/*! ./error */ "./node_modules/browserslist/error.js")
var env = __webpack_require__(/*! ./node */ "./node_modules/browserslist/browser.js") // Will load browser.js in webpack

var YEAR = 365.259641 * 24 * 60 * 60 * 1000
var ANDROID_EVERGREEN_FIRST = 37

var QUERY_OR = 1
var QUERY_AND = 2

function isVersionsMatch(versionA, versionB) {
  return (versionA + '.').indexOf(versionB + '.') === 0
}

function isEolReleased(name) {
  var version = name.slice(1)
  return jsReleases.some(function (i) {
    return isVersionsMatch(i.version, version)
  })
}

function normalize(versions) {
  return versions.filter(function (version) {
    return typeof version === 'string'
  })
}

function normalizeElectron(version) {
  var versionToUse = version
  if (version.split('.').length === 3) {
    versionToUse = version.split('.').slice(0, -1).join('.')
  }
  return versionToUse
}

function nameMapper(name) {
  return function mapName(version) {
    return name + ' ' + version
  }
}

function getMajor(version) {
  return parseInt(version.split('.')[0])
}

function getMajorVersions(released, number) {
  if (released.length === 0) return []
  var majorVersions = uniq(released.map(getMajor))
  var minimum = majorVersions[majorVersions.length - number]
  if (!minimum) {
    return released
  }
  var selected = []
  for (var i = released.length - 1; i >= 0; i--) {
    if (minimum > getMajor(released[i])) break
    selected.unshift(released[i])
  }
  return selected
}

function uniq(array) {
  var filtered = []
  for (var i = 0; i < array.length; i++) {
    if (filtered.indexOf(array[i]) === -1) filtered.push(array[i])
  }
  return filtered
}

// Helpers

function fillUsage(result, name, data) {
  for (var i in data) {
    result[name + ' ' + i] = data[i]
  }
}

function generateFilter(sign, version) {
  version = parseFloat(version)
  if (sign === '>') {
    return function (v) {
      return parseFloat(v) > version
    }
  } else if (sign === '>=') {
    return function (v) {
      return parseFloat(v) >= version
    }
  } else if (sign === '<') {
    return function (v) {
      return parseFloat(v) < version
    }
  } else {
    return function (v) {
      return parseFloat(v) <= version
    }
  }
}

function generateSemverFilter(sign, version) {
  version = version.split('.').map(parseSimpleInt)
  version[1] = version[1] || 0
  version[2] = version[2] || 0
  if (sign === '>') {
    return function (v) {
      v = v.split('.').map(parseSimpleInt)
      return compareSemver(v, version) > 0
    }
  } else if (sign === '>=') {
    return function (v) {
      v = v.split('.').map(parseSimpleInt)
      return compareSemver(v, version) >= 0
    }
  } else if (sign === '<') {
    return function (v) {
      v = v.split('.').map(parseSimpleInt)
      return compareSemver(version, v) > 0
    }
  } else {
    return function (v) {
      v = v.split('.').map(parseSimpleInt)
      return compareSemver(version, v) >= 0
    }
  }
}

function parseSimpleInt(x) {
  return parseInt(x)
}

function compare(a, b) {
  if (a < b) return -1
  if (a > b) return +1
  return 0
}

function compareSemver(a, b) {
  return (
    compare(parseInt(a[0]), parseInt(b[0])) ||
    compare(parseInt(a[1] || '0'), parseInt(b[1] || '0')) ||
    compare(parseInt(a[2] || '0'), parseInt(b[2] || '0'))
  )
}

// this follows the npm-like semver behavior
function semverFilterLoose(operator, range) {
  range = range.split('.').map(parseSimpleInt)
  if (typeof range[1] === 'undefined') {
    range[1] = 'x'
  }
  // ignore any patch version because we only return minor versions
  // range[2] = 'x'
  switch (operator) {
    case '<=':
      return function (version) {
        version = version.split('.').map(parseSimpleInt)
        return compareSemverLoose(version, range) <= 0
      }
    case '>=':
    default:
      return function (version) {
        version = version.split('.').map(parseSimpleInt)
        return compareSemverLoose(version, range) >= 0
      }
  }
}

// this follows the npm-like semver behavior
function compareSemverLoose(version, range) {
  if (version[0] !== range[0]) {
    return version[0] < range[0] ? -1 : +1
  }
  if (range[1] === 'x') {
    return 0
  }
  if (version[1] !== range[1]) {
    return version[1] < range[1] ? -1 : +1
  }
  return 0
}

function resolveVersion(data, version) {
  if (data.versions.indexOf(version) !== -1) {
    return version
  } else if (browserslist.versionAliases[data.name][version]) {
    return browserslist.versionAliases[data.name][version]
  } else {
    return false
  }
}

function normalizeVersion(data, version) {
  var resolved = resolveVersion(data, version)
  if (resolved) {
    return resolved
  } else if (data.versions.length === 1) {
    return data.versions[0]
  } else {
    return false
  }
}

function filterByYear(since, context) {
  since = since / 1000
  return Object.keys(agents).reduce(function (selected, name) {
    var data = byName(name, context)
    if (!data) return selected
    var versions = Object.keys(data.releaseDate).filter(function (v) {
      var date = data.releaseDate[v]
      return date !== null && date >= since
    })
    return selected.concat(versions.map(nameMapper(data.name)))
  }, [])
}

function cloneData(data) {
  return {
    name: data.name,
    versions: data.versions,
    released: data.released,
    releaseDate: data.releaseDate
  }
}

function mapVersions(data, map) {
  data.versions = data.versions.map(function (i) {
    return map[i] || i
  })
  data.released = data.versions.map(function (i) {
    return map[i] || i
  })
  var fixedDate = {}
  for (var i in data.releaseDate) {
    fixedDate[map[i] || i] = data.releaseDate[i]
  }
  data.releaseDate = fixedDate
  return data
}

function byName(name, context) {
  name = name.toLowerCase()
  name = browserslist.aliases[name] || name
  if (context.mobileToDesktop && browserslist.desktopNames[name]) {
    var desktop = browserslist.data[browserslist.desktopNames[name]]
    if (name === 'android') {
      return normalizeAndroidData(cloneData(browserslist.data[name]), desktop)
    } else {
      var cloned = cloneData(desktop)
      cloned.name = name
      if (name === 'op_mob') {
        cloned = mapVersions(cloned, { '10.0-10.1': '10' })
      }
      return cloned
    }
  }
  return browserslist.data[name]
}

function normalizeAndroidVersions(androidVersions, chromeVersions) {
  var firstEvergreen = ANDROID_EVERGREEN_FIRST
  var last = chromeVersions[chromeVersions.length - 1]
  return androidVersions
    .filter(function (version) {
      return /^(?:[2-4]\.|[34]$)/.test(version)
    })
    .concat(chromeVersions.slice(firstEvergreen - last - 1))
}

function normalizeAndroidData(android, chrome) {
  android.released = normalizeAndroidVersions(android.released, chrome.released)
  android.versions = normalizeAndroidVersions(android.versions, chrome.versions)
  return android
}

function checkName(name, context) {
  var data = byName(name, context)
  if (!data) throw new BrowserslistError('Unknown browser ' + name)
  return data
}

function unknownQuery(query) {
  return new BrowserslistError(
    'Unknown browser query `' +
      query +
      '`. ' +
      'Maybe you are using old Browserslist or made typo in query.'
  )
}

function filterAndroid(list, versions, context) {
  if (context.mobileToDesktop) return list
  var released = browserslist.data.android.released
  var last = released[released.length - 1]
  var diff = last - ANDROID_EVERGREEN_FIRST - versions
  if (diff > 0) {
    return list.slice(-1)
  } else {
    return list.slice(diff - 1)
  }
}

/**
 * Resolves queries into a browser list.
 * @param {string|string[]} queries Queries to combine.
 * Either an array of queries or a long string of queries.
 * @param {object} [context] Optional arguments to
 * the select function in `queries`.
 * @returns {string[]} A list of browsers
 */
function resolve(queries, context) {
  if (Array.isArray(queries)) {
    queries = flatten(queries.map(parse))
  } else {
    queries = parse(queries)
  }

  return queries.reduce(function (result, query, index) {
    var selection = query.queryString

    var isExclude = selection.indexOf('not ') === 0
    if (isExclude) {
      if (index === 0) {
        throw new BrowserslistError(
          'Write any browsers query (for instance, `defaults`) ' +
            'before `' +
            selection +
            '`'
        )
      }
      selection = selection.slice(4)
    }

    for (var i = 0; i < QUERIES.length; i++) {
      var type = QUERIES[i]
      var match = selection.match(type.regexp)
      if (match) {
        var args = [context].concat(match.slice(1))
        var array = type.select.apply(browserslist, args).map(function (j) {
          var parts = j.split(' ')
          if (parts[1] === '0') {
            return parts[0] + ' ' + byName(parts[0], context).versions[0]
          } else {
            return j
          }
        })

        switch (query.type) {
          case QUERY_AND:
            if (isExclude) {
              return result.filter(function (j) {
                return array.indexOf(j) === -1
              })
            } else {
              return result.filter(function (j) {
                return array.indexOf(j) !== -1
              })
            }
          case QUERY_OR:
          default:
            if (isExclude) {
              var filter = {}
              array.forEach(function (j) {
                filter[j] = true
              })
              return result.filter(function (j) {
                return !filter[j]
              })
            }
            return result.concat(array)
        }
      }
    }

    throw unknownQuery(selection)
  }, [])
}

var cache = {}

/**
 * Return array of browsers by selection queries.
 *
 * @param {(string|string[])} [queries=browserslist.defaults] Browser queries.
 * @param {object} [opts] Options.
 * @param {string} [opts.path="."] Path to processed file.
 *                                 It will be used to find config files.
 * @param {string} [opts.env="production"] Processing environment.
 *                                         It will be used to take right
 *                                         queries from config file.
 * @param {string} [opts.config] Path to config file with queries.
 * @param {object} [opts.stats] Custom browser usage statistics
 *                              for "> 1% in my stats" query.
 * @param {boolean} [opts.ignoreUnknownVersions=false] Do not throw on unknown
 *                                                     version in direct query.
 * @param {boolean} [opts.dangerousExtend] Disable security checks
 *                                         for extend query.
 * @param {boolean} [opts.mobileToDesktop] Alias mobile browsers to the desktop
 *                                         version when Can I Use doesn't have
 *                                         data about the specified version.
 * @returns {string[]} Array with browser names in Can I Use.
 *
 * @example
 * browserslist('IE >= 10, IE 8') //=> ['ie 11', 'ie 10', 'ie 8']
 */
function browserslist(queries, opts) {
  if (typeof opts === 'undefined') opts = {}

  if (typeof opts.path === 'undefined') {
    opts.path = path.resolve ? path.resolve('.') : '.'
  }

  if (typeof queries === 'undefined' || queries === null) {
    var config = browserslist.loadConfig(opts)
    if (config) {
      queries = config
    } else {
      queries = browserslist.defaults
    }
  }

  if (!(typeof queries === 'string' || Array.isArray(queries))) {
    throw new BrowserslistError(
      'Browser queries must be an array or string. Got ' + typeof queries + '.'
    )
  }

  var context = {
    ignoreUnknownVersions: opts.ignoreUnknownVersions,
    dangerousExtend: opts.dangerousExtend,
    mobileToDesktop: opts.mobileToDesktop,
    path: opts.path,
    env: opts.env
  }

  env.oldDataWarning(browserslist.data)
  var stats = env.getStat(opts, browserslist.data)
  if (stats) {
    context.customUsage = {}
    for (var browser in stats) {
      fillUsage(context.customUsage, browser, stats[browser])
    }
  }

  var cacheKey = JSON.stringify([queries, context])
  if (cache[cacheKey]) return cache[cacheKey]

  var result = uniq(resolve(queries, context)).sort(function (name1, name2) {
    name1 = name1.split(' ')
    name2 = name2.split(' ')
    if (name1[0] === name2[0]) {
      // assumptions on caniuse data
      // 1) version ranges never overlaps
      // 2) if version is not a range, it never contains `-`
      var version1 = name1[1].split('-')[0]
      var version2 = name2[1].split('-')[0]
      return compareSemver(version2.split('.'), version1.split('.'))
    } else {
      return compare(name1[0], name2[0])
    }
  })
  if (!process.env.BROWSERSLIST_DISABLE_CACHE) {
    cache[cacheKey] = result
  }
  return result
}

function parse(queries) {
  var qs = []
  do {
    queries = doMatch(queries, qs)
  } while (queries)
  return qs
}

function doMatch(string, qs) {
  var or = /^(?:,\s*|\s+or\s+)(.*)/i
  var and = /^\s+and\s+(.*)/i

  return find(string, function (parsed, n, max) {
    if (and.test(parsed)) {
      qs.unshift({ type: QUERY_AND, queryString: parsed.match(and)[1] })
      return true
    } else if (or.test(parsed)) {
      qs.unshift({ type: QUERY_OR, queryString: parsed.match(or)[1] })
      return true
    } else if (n === max) {
      qs.unshift({ type: QUERY_OR, queryString: parsed.trim() })
      return true
    }
    return false
  })
}

function find(string, predicate) {
  for (var n = 1, max = string.length; n <= max; n++) {
    var parsed = string.substr(-n, n)
    if (predicate(parsed, n, max)) {
      return string.slice(0, -n)
    }
  }
  return ''
}

function flatten(array) {
  if (!Array.isArray(array)) return [array]
  return array.reduce(function (a, b) {
    return a.concat(flatten(b))
  }, [])
}

// Will be filled by Can I Use data below
browserslist.cache = {}
browserslist.data = {}
browserslist.usage = {
  global: {},
  custom: null
}

// Default browsers query
browserslist.defaults = ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead']

// Browser names aliases
browserslist.aliases = {
  fx: 'firefox',
  ff: 'firefox',
  ios: 'ios_saf',
  explorer: 'ie',
  blackberry: 'bb',
  explorermobile: 'ie_mob',
  operamini: 'op_mini',
  operamobile: 'op_mob',
  chromeandroid: 'and_chr',
  firefoxandroid: 'and_ff',
  ucandroid: 'and_uc',
  qqandroid: 'and_qq'
}

// Can I Use only provides a few versions for some browsers (e.g. and_chr).
// Fallback to a similar browser for unknown versions
browserslist.desktopNames = {
  and_chr: 'chrome',
  and_ff: 'firefox',
  ie_mob: 'ie',
  op_mob: 'opera',
  android: 'chrome' // has extra processing logic
}

// Aliases to work with joined versions like `ios_saf 7.0-7.1`
browserslist.versionAliases = {}

browserslist.clearCaches = env.clearCaches
browserslist.parseConfig = env.parseConfig
browserslist.readConfig = env.readConfig
browserslist.findConfig = env.findConfig
browserslist.loadConfig = env.loadConfig

/**
 * Return browsers market coverage.
 *
 * @param {string[]} browsers Browsers names in Can I Use.
 * @param {string|object} [stats="global"] Which statistics should be used.
 *                                         Country code or custom statistics.
 *                                         Pass `"my stats"` to load statistics
 *                                         from Browserslist files.
 *
 * @return {number} Total market coverage for all selected browsers.
 *
 * @example
 * browserslist.coverage(browserslist('> 1% in US'), 'US') //=> 83.1
 */
browserslist.coverage = function (browsers, stats) {
  var data
  if (typeof stats === 'undefined') {
    data = browserslist.usage.global
  } else if (stats === 'my stats') {
    var opts = {}
    opts.path = path.resolve ? path.resolve('.') : '.'
    var customStats = env.getStat(opts)
    if (!customStats) {
      throw new BrowserslistError('Custom usage statistics was not provided')
    }
    data = {}
    for (var browser in customStats) {
      fillUsage(data, browser, customStats[browser])
    }
  } else if (typeof stats === 'string') {
    if (stats.length > 2) {
      stats = stats.toLowerCase()
    } else {
      stats = stats.toUpperCase()
    }
    env.loadCountry(browserslist.usage, stats, browserslist.data)
    data = browserslist.usage[stats]
  } else {
    if ('dataByBrowser' in stats) {
      stats = stats.dataByBrowser
    }
    data = {}
    for (var name in stats) {
      for (var version in stats[name]) {
        data[name + ' ' + version] = stats[name][version]
      }
    }
  }

  return browsers.reduce(function (all, i) {
    var usage = data[i]
    if (usage === undefined) {
      usage = data[i.replace(/ \S+$/, ' 0')]
    }
    return all + (usage || 0)
  }, 0)
}

function nodeQuery(context, version) {
  var nodeReleases = jsReleases.filter(function (i) {
    return i.name === 'nodejs'
  })
  var matched = nodeReleases.filter(function (i) {
    return isVersionsMatch(i.version, version)
  })
  if (matched.length === 0) {
    if (context.ignoreUnknownVersions) {
      return []
    } else {
      throw new BrowserslistError('Unknown version ' + version + ' of Node.js')
    }
  }
  return ['node ' + matched[matched.length - 1].version]
}

function sinceQuery(context, year, month, date) {
  year = parseInt(year)
  month = parseInt(month || '01') - 1
  date = parseInt(date || '01')
  return filterByYear(Date.UTC(year, month, date, 0, 0, 0), context)
}

function coverQuery(context, coverage, statMode) {
  coverage = parseFloat(coverage)
  var usage = browserslist.usage.global
  if (statMode) {
    if (statMode.match(/^my\s+stats$/i)) {
      if (!context.customUsage) {
        throw new BrowserslistError('Custom usage statistics was not provided')
      }
      usage = context.customUsage
    } else {
      var place
      if (statMode.length === 2) {
        place = statMode.toUpperCase()
      } else {
        place = statMode.toLowerCase()
      }
      env.loadCountry(browserslist.usage, place, browserslist.data)
      usage = browserslist.usage[place]
    }
  }
  var versions = Object.keys(usage).sort(function (a, b) {
    return usage[b] - usage[a]
  })
  var coveraged = 0
  var result = []
  var version
  for (var i = 0; i <= versions.length; i++) {
    version = versions[i]
    if (usage[version] === 0) break
    coveraged += usage[version]
    result.push(version)
    if (coveraged >= coverage) break
  }
  return result
}

var QUERIES = [
  {
    regexp: /^last\s+(\d+)\s+major\s+versions?$/i,
    select: function (context, versions) {
      return Object.keys(agents).reduce(function (selected, name) {
        var data = byName(name, context)
        if (!data) return selected
        var list = getMajorVersions(data.released, versions)
        list = list.map(nameMapper(data.name))
        if (data.name === 'android') {
          list = filterAndroid(list, versions, context)
        }
        return selected.concat(list)
      }, [])
    }
  },
  {
    regexp: /^last\s+(\d+)\s+versions?$/i,
    select: function (context, versions) {
      return Object.keys(agents).reduce(function (selected, name) {
        var data = byName(name, context)
        if (!data) return selected
        var list = data.released.slice(-versions)
        list = list.map(nameMapper(data.name))
        if (data.name === 'android') {
          list = filterAndroid(list, versions, context)
        }
        return selected.concat(list)
      }, [])
    }
  },
  {
    regexp: /^last\s+(\d+)\s+electron\s+major\s+versions?$/i,
    select: function (context, versions) {
      var validVersions = getMajorVersions(Object.keys(e2c), versions)
      return validVersions.map(function (i) {
        return 'chrome ' + e2c[i]
      })
    }
  },
  {
    regexp: /^last\s+(\d+)\s+(\w+)\s+major\s+versions?$/i,
    select: function (context, versions, name) {
      var data = checkName(name, context)
      var validVersions = getMajorVersions(data.released, versions)
      var list = validVersions.map(nameMapper(data.name))
      if (data.name === 'android') {
        list = filterAndroid(list, versions, context)
      }
      return list
    }
  },
  {
    regexp: /^last\s+(\d+)\s+electron\s+versions?$/i,
    select: function (context, versions) {
      return Object.keys(e2c)
        .slice(-versions)
        .map(function (i) {
          return 'chrome ' + e2c[i]
        })
    }
  },
  {
    regexp: /^last\s+(\d+)\s+(\w+)\s+versions?$/i,
    select: function (context, versions, name) {
      var data = checkName(name, context)
      var list = data.released.slice(-versions).map(nameMapper(data.name))
      if (data.name === 'android') {
        list = filterAndroid(list, versions, context)
      }
      return list
    }
  },
  {
    regexp: /^unreleased\s+versions$/i,
    select: function (context) {
      return Object.keys(agents).reduce(function (selected, name) {
        var data = byName(name, context)
        if (!data) return selected
        var list = data.versions.filter(function (v) {
          return data.released.indexOf(v) === -1
        })
        list = list.map(nameMapper(data.name))
        return selected.concat(list)
      }, [])
    }
  },
  {
    regexp: /^unreleased\s+electron\s+versions?$/i,
    select: function () {
      return []
    }
  },
  {
    regexp: /^unreleased\s+(\w+)\s+versions?$/i,
    select: function (context, name) {
      var data = checkName(name, context)
      return data.versions
        .filter(function (v) {
          return data.released.indexOf(v) === -1
        })
        .map(nameMapper(data.name))
    }
  },
  {
    regexp: /^last\s+(\d*.?\d+)\s+years?$/i,
    select: function (context, years) {
      return filterByYear(Date.now() - YEAR * years, context)
    }
  },
  {
    regexp: /^since (\d+)$/i,
    select: sinceQuery
  },
  {
    regexp: /^since (\d+)-(\d+)$/i,
    select: sinceQuery
  },
  {
    regexp: /^since (\d+)-(\d+)-(\d+)$/i,
    select: sinceQuery
  },
  {
    regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%$/,
    select: function (context, sign, popularity) {
      popularity = parseFloat(popularity)
      var usage = browserslist.usage.global
      return Object.keys(usage).reduce(function (result, version) {
        if (sign === '>') {
          if (usage[version] > popularity) {
            result.push(version)
          }
        } else if (sign === '<') {
          if (usage[version] < popularity) {
            result.push(version)
          }
        } else if (sign === '<=') {
          if (usage[version] <= popularity) {
            result.push(version)
          }
        } else if (usage[version] >= popularity) {
          result.push(version)
        }
        return result
      }, [])
    }
  },
  {
    regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%\s+in\s+my\s+stats$/,
    select: function (context, sign, popularity) {
      popularity = parseFloat(popularity)
      if (!context.customUsage) {
        throw new BrowserslistError('Custom usage statistics was not provided')
      }
      var usage = context.customUsage
      return Object.keys(usage).reduce(function (result, version) {
        if (sign === '>') {
          if (usage[version] > popularity) {
            result.push(version)
          }
        } else if (sign === '<') {
          if (usage[version] < popularity) {
            result.push(version)
          }
        } else if (sign === '<=') {
          if (usage[version] <= popularity) {
            result.push(version)
          }
        } else if (usage[version] >= popularity) {
          result.push(version)
        }
        return result
      }, [])
    }
  },
  {
    regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%\s+in\s+(\S+)\s+stats$/,
    select: function (context, sign, popularity, name) {
      popularity = parseFloat(popularity)
      var stats = env.loadStat(context, name, browserslist.data)
      if (stats) {
        context.customUsage = {}
        for (var browser in stats) {
          fillUsage(context.customUsage, browser, stats[browser])
        }
      }
      if (!context.customUsage) {
        throw new BrowserslistError('Custom usage statistics was not provided')
      }
      var usage = context.customUsage
      return Object.keys(usage).reduce(function (result, version) {
        if (sign === '>') {
          if (usage[version] > popularity) {
            result.push(version)
          }
        } else if (sign === '<') {
          if (usage[version] < popularity) {
            result.push(version)
          }
        } else if (sign === '<=') {
          if (usage[version] <= popularity) {
            result.push(version)
          }
        } else if (usage[version] >= popularity) {
          result.push(version)
        }
        return result
      }, [])
    }
  },
  {
    regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%\s+in\s+((alt-)?\w\w)$/,
    select: function (context, sign, popularity, place) {
      popularity = parseFloat(popularity)
      if (place.length === 2) {
        place = place.toUpperCase()
      } else {
        place = place.toLowerCase()
      }
      env.loadCountry(browserslist.usage, place, browserslist.data)
      var usage = browserslist.usage[place]
      return Object.keys(usage).reduce(function (result, version) {
        if (sign === '>') {
          if (usage[version] > popularity) {
            result.push(version)
          }
        } else if (sign === '<') {
          if (usage[version] < popularity) {
            result.push(version)
          }
        } else if (sign === '<=') {
          if (usage[version] <= popularity) {
            result.push(version)
          }
        } else if (usage[version] >= popularity) {
          result.push(version)
        }
        return result
      }, [])
    }
  },
  {
    regexp: /^cover\s+(\d+|\d+\.\d+|\.\d+)%$/i,
    select: coverQuery
  },
  {
    regexp: /^cover\s+(\d+|\d+\.\d+|\.\d+)%\s+in\s+(my\s+stats|(alt-)?\w\w)$/i,
    select: coverQuery
  },
  {
    regexp: /^supports\s+([\w-]+)$/,
    select: function (context, feature) {
      env.loadFeature(browserslist.cache, feature)
      var features = browserslist.cache[feature]
      return Object.keys(features).reduce(function (result, version) {
        var flags = features[version]
        if (flags.indexOf('y') >= 0 || flags.indexOf('a') >= 0) {
          result.push(version)
        }
        return result
      }, [])
    }
  },
  {
    regexp: /^electron\s+([\d.]+)\s*-\s*([\d.]+)$/i,
    select: function (context, from, to) {
      var fromToUse = normalizeElectron(from)
      var toToUse = normalizeElectron(to)
      if (!e2c[fromToUse]) {
        throw new BrowserslistError('Unknown version ' + from + ' of electron')
      }
      if (!e2c[toToUse]) {
        throw new BrowserslistError('Unknown version ' + to + ' of electron')
      }
      from = parseFloat(from)
      to = parseFloat(to)
      return Object.keys(e2c)
        .filter(function (i) {
          var parsed = parseFloat(i)
          return parsed >= from && parsed <= to
        })
        .map(function (i) {
          return 'chrome ' + e2c[i]
        })
    }
  },
  {
    regexp: /^node\s+([\d.]+)\s*-\s*([\d.]+)$/i,
    select: function (context, from, to) {
      var nodeVersions = jsReleases
        .filter(function (i) {
          return i.name === 'nodejs'
        })
        .map(function (i) {
          return i.version
        })
      return nodeVersions
        .filter(semverFilterLoose('>=', from))
        .filter(semverFilterLoose('<=', to))
        .map(function (v) {
          return 'node ' + v
        })
    }
  },
  {
    regexp: /^(\w+)\s+([\d.]+)\s*-\s*([\d.]+)$/i,
    select: function (context, name, from, to) {
      var data = checkName(name, context)
      from = parseFloat(normalizeVersion(data, from) || from)
      to = parseFloat(normalizeVersion(data, to) || to)
      function filter(v) {
        var parsed = parseFloat(v)
        return parsed >= from && parsed <= to
      }
      return data.released.filter(filter).map(nameMapper(data.name))
    }
  },
  {
    regexp: /^electron\s*(>=?|<=?)\s*([\d.]+)$/i,
    select: function (context, sign, version) {
      var versionToUse = normalizeElectron(version)
      return Object.keys(e2c)
        .filter(generateFilter(sign, versionToUse))
        .map(function (i) {
          return 'chrome ' + e2c[i]
        })
    }
  },
  {
    regexp: /^node\s*(>=?|<=?)\s*([\d.]+)$/i,
    select: function (context, sign, version) {
      var nodeVersions = jsReleases
        .filter(function (i) {
          return i.name === 'nodejs'
        })
        .map(function (i) {
          return i.version
        })
      return nodeVersions
        .filter(generateSemverFilter(sign, version))
        .map(function (v) {
          return 'node ' + v
        })
    }
  },
  {
    regexp: /^(\w+)\s*(>=?|<=?)\s*([\d.]+)$/,
    select: function (context, name, sign, version) {
      var data = checkName(name, context)
      var alias = browserslist.versionAliases[data.name][version]
      if (alias) {
        version = alias
      }
      return data.released
        .filter(generateFilter(sign, version))
        .map(function (v) {
          return data.name + ' ' + v
        })
    }
  },
  {
    regexp: /^(firefox|ff|fx)\s+esr$/i,
    select: function () {
      return ['firefox 78', 'firefox 91']
    }
  },
  {
    regexp: /(operamini|op_mini)\s+all/i,
    select: function () {
      return ['op_mini all']
    }
  },
  {
    regexp: /^electron\s+([\d.]+)$/i,
    select: function (context, version) {
      var versionToUse = normalizeElectron(version)
      var chrome = e2c[versionToUse]
      if (!chrome) {
        throw new BrowserslistError(
          'Unknown version ' + version + ' of electron'
        )
      }
      return ['chrome ' + chrome]
    }
  },
  {
    regexp: /^node\s+(\d+)$/i,
    select: nodeQuery
  },
  {
    regexp: /^node\s+(\d+\.\d+)$/i,
    select: nodeQuery
  },
  {
    regexp: /^node\s+(\d+\.\d+\.\d+)$/i,
    select: nodeQuery
  },
  {
    regexp: /^current\s+node$/i,
    select: function (context) {
      return [env.currentNode(resolve, context)]
    }
  },
  {
    regexp: /^maintained\s+node\s+versions$/i,
    select: function (context) {
      var now = Date.now()
      var queries = Object.keys(jsEOL)
        .filter(function (key) {
          return (
            now < Date.parse(jsEOL[key].end) &&
            now > Date.parse(jsEOL[key].start) &&
            isEolReleased(key)
          )
        })
        .map(function (key) {
          return 'node ' + key.slice(1)
        })
      return resolve(queries, context)
    }
  },
  {
    regexp: /^phantomjs\s+1.9$/i,
    select: function () {
      return ['safari 5']
    }
  },
  {
    regexp: /^phantomjs\s+2.1$/i,
    select: function () {
      return ['safari 6']
    }
  },
  {
    regexp: /^(\w+)\s+(tp|[\d.]+)$/i,
    select: function (context, name, version) {
      if (/^tp$/i.test(version)) version = 'TP'
      var data = checkName(name, context)
      var alias = normalizeVersion(data, version)
      if (alias) {
        version = alias
      } else {
        if (version.indexOf('.') === -1) {
          alias = version + '.0'
        } else {
          alias = version.replace(/\.0$/, '')
        }
        alias = normalizeVersion(data, alias)
        if (alias) {
          version = alias
        } else if (context.ignoreUnknownVersions) {
          return []
        } else {
          throw new BrowserslistError(
            'Unknown version ' + version + ' of ' + name
          )
        }
      }
      return [data.name + ' ' + version]
    }
  },
  {
    regexp: /^browserslist config$/i,
    select: function (context) {
      return browserslist(undefined, context)
    }
  },
  {
    regexp: /^extends (.+)$/i,
    select: function (context, name) {
      return resolve(env.loadQueries(context, name), context)
    }
  },
  {
    regexp: /^defaults$/i,
    select: function (context) {
      return resolve(browserslist.defaults, context)
    }
  },
  {
    regexp: /^dead$/i,
    select: function (context) {
      var dead = [
        'ie <= 10',
        'ie_mob <= 11',
        'bb <= 10',
        'op_mob <= 12.1',
        'samsung 4'
      ]
      return resolve(dead, context)
    }
  },
  {
    regexp: /^(\w+)$/i,
    select: function (context, name) {
      if (byName(name, context)) {
        throw new BrowserslistError(
          'Specify versions in Browserslist query for browser ' + name
        )
      } else {
        throw unknownQuery(name)
      }
    }
  }
]

// Get and convert Can I Use data

;(function () {
  for (var name in agents) {
    var browser = agents[name]
    browserslist.data[name] = {
      name: name,
      versions: normalize(agents[name].versions),
      released: normalize(agents[name].versions.slice(0, -3)),
      releaseDate: agents[name].release_date
    }
    fillUsage(browserslist.usage.global, name, browser.usage_global)

    browserslist.versionAliases[name] = {}
    for (var i = 0; i < browser.versions.length; i++) {
      var full = browser.versions[i]
      if (!full) continue

      if (full.indexOf('-') !== -1) {
        var interval = full.split('-')
        for (var j = 0; j < interval.length; j++) {
          browserslist.versionAliases[name][interval[j]] = full
        }
      }
    }
  }

  browserslist.versionAliases.op_mob['59'] = '58'
})()

module.exports = browserslist


/***/ }),

/***/ "./node_modules/caniuse-lite/data/agents.js":
/*!**************************************************!*\
  !*** ./node_modules/caniuse-lite/data/agents.js ***!
  \**************************************************/
/***/ ((module) => {

module.exports={A:{A:{J:0.0131217,E:0.00621152,F:0.0376392,G:0.0903341,A:0.0225835,B:0.700089,lB:0.009298},B:"ms",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","lB","J","E","F","G","A","B","","",""],E:"IE",F:{lB:962323200,J:998870400,E:1161129600,F:1237420800,G:1300060800,A:1346716800,B:1381968000}},B:{A:{C:0.008636,K:0.004267,L:0.004318,D:0.008636,M:0.008636,N:0.012954,O:0.038862,P:0,Q:0.004298,R:0.00944,U:0.004043,V:0.008636,W:0.008636,X:0.008636,Y:0.012954,Z:0.004318,a:0.017272,b:0.008636,c:0.017272,d:0.034544,e:0.164084,S:2.75057,f:0.898144,H:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","C","K","L","D","M","N","O","P","Q","R","U","V","W","X","Y","Z","a","b","c","d","e","S","f","H","","",""],E:"Edge",F:{C:1438128000,K:1447286400,L:1470096000,D:1491868800,M:1508198400,N:1525046400,O:1542067200,P:1579046400,Q:1581033600,R:1586736000,U:1590019200,V:1594857600,W:1598486400,X:1602201600,Y:1605830400,Z:1611360000,a:1614816000,b:1618358400,c:1622073600,d:1626912000,e:1630627200,S:1632441600,f:1634774400,H:1637539200},D:{C:"ms",K:"ms",L:"ms",D:"ms",M:"ms",N:"ms",O:"ms"}},C:{A:{"0":0.004271,"1":0.004783,"2":0.00487,"3":0.005029,"4":0.0047,"5":0.038862,"6":0.004318,"7":0.004318,"8":0.004525,"9":0.004293,mB:0.004318,eB:0.004271,I:0.017272,g:0.004879,J:0.020136,E:0.005725,F:0.004525,G:0.00533,A:0.004283,B:0.004318,C:0.004471,K:0.004486,L:0.00453,D:0.004293,M:0.004417,N:0.004425,O:0.004293,h:0.004443,i:0.004283,j:0.004293,k:0.013698,l:0.004293,m:0.008786,n:0.004318,o:0.004317,p:0.004393,q:0.004418,r:0.008834,s:0.004293,t:0.008928,u:0.004471,v:0.009284,w:0.004707,x:0.009076,y:0.004425,z:0.004783,AB:0.008636,BB:0.004538,CB:0.008282,DB:0.004318,EB:0.069088,FB:0.004335,GB:0.008586,HB:0.004318,IB:0.008636,JB:0.004425,KB:0.004318,fB:0.004318,LB:0.008636,gB:0.004318,MB:0.004425,NB:0.008636,T:0.00415,OB:0.004267,PB:0.004318,QB:0.004267,RB:0.008636,SB:0.00415,TB:0.004293,UB:0.004425,VB:0.008636,WB:0.00415,XB:0.00415,YB:0.004318,ZB:0.004043,aB:0.008636,bB:0.142494,P:0.008636,Q:0.008636,R:0.017272,nB:0.008636,U:0.008636,V:0.017272,W:0.008636,X:0.008636,Y:0.008636,Z:0.025908,a:0.025908,b:0.025908,c:0.051816,d:0.75565,e:1.90424,S:0.025908,f:0,H:0,oB:0.008786,pB:0.00487},B:"moz",C:["mB","eB","oB","pB","I","g","J","E","F","G","A","B","C","K","L","D","M","N","O","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","AB","BB","CB","DB","EB","FB","GB","HB","IB","JB","KB","fB","LB","gB","MB","NB","T","OB","PB","QB","RB","SB","TB","UB","VB","WB","XB","YB","ZB","aB","bB","P","Q","R","nB","U","V","W","X","Y","Z","a","b","c","d","e","S","f","H",""],E:"Firefox",F:{"0":1431475200,"1":1435881600,"2":1439251200,"3":1442880000,"4":1446508800,"5":1450137600,"6":1453852800,"7":1457395200,"8":1461628800,"9":1465257600,mB:1161648000,eB:1213660800,oB:1246320000,pB:1264032000,I:1300752000,g:1308614400,J:1313452800,E:1317081600,F:1317081600,G:1320710400,A:1324339200,B:1327968000,C:1331596800,K:1335225600,L:1338854400,D:1342483200,M:1346112000,N:1349740800,O:1353628800,h:1357603200,i:1361232000,j:1364860800,k:1368489600,l:1372118400,m:1375747200,n:1379376000,o:1386633600,p:1391472000,q:1395100800,r:1398729600,s:1402358400,t:1405987200,u:1409616000,v:1413244800,w:1417392000,x:1421107200,y:1424736000,z:1428278400,AB:1470096000,BB:1474329600,CB:1479168000,DB:1485216000,EB:1488844800,FB:1492560000,GB:1497312000,HB:1502150400,IB:1506556800,JB:1510617600,KB:1516665600,fB:1520985600,LB:1525824000,gB:1529971200,MB:1536105600,NB:1540252800,T:1544486400,OB:1548720000,PB:1552953600,QB:1558396800,RB:1562630400,SB:1567468800,TB:1571788800,UB:1575331200,VB:1578355200,WB:1581379200,XB:1583798400,YB:1586304000,ZB:1588636800,aB:1591056000,bB:1593475200,P:1595894400,Q:1598313600,R:1600732800,nB:1603152000,U:1605571200,V:1607990400,W:1611619200,X:1614038400,Y:1616457600,Z:1618790400,a:1622505600,b:1626134400,c:1628553600,d:1630972800,e:1633392000,S:1635811200,f:null,H:null}},D:{A:{"0":0.02159,"1":0.004464,"2":0.012954,"3":0.0236,"4":0.004293,"5":0.008636,"6":0.004465,"7":0.004642,"8":0.004891,"9":0.012954,I:0.004706,g:0.004879,J:0.004879,E:0.005591,F:0.005591,G:0.005591,A:0.004534,B:0.004464,C:0.010424,K:0.0083,L:0.004706,D:0.015087,M:0.004393,N:0.004393,O:0.008652,h:0.004293,i:0.004393,j:0.004317,k:0.008636,l:0.008786,m:0.008636,n:0.004461,o:0.004141,p:0.004326,q:0.0047,r:0.004538,s:0.004293,t:0.008596,u:0.004566,v:0.004318,w:0.008636,x:0.012954,y:0.004335,z:0.004464,AB:0.02159,BB:0.177038,CB:0.004293,DB:0.004318,EB:0.004318,FB:0.012954,GB:0.008636,HB:0.008636,IB:0.047498,JB:0.008636,KB:0.008636,fB:0.008636,LB:0.008636,gB:0.060452,MB:0.008636,NB:0.012954,T:0.02159,OB:0.02159,PB:0.02159,QB:0.017272,RB:0.012954,SB:0.06477,TB:0.047498,UB:0.02159,VB:0.047498,WB:0.012954,XB:0.056134,YB:0.077724,ZB:0.056134,aB:0.02159,bB:0.047498,P:0.164084,Q:0.073406,R:0.047498,U:0.077724,V:0.099314,W:0.112268,X:0.10795,Y:0.319532,Z:0.094996,a:0.177038,b:0.116586,c:0.32385,d:0.617474,e:1.66243,S:17.5829,f:4.74116,H:0.02159,qB:0.012954,rB:0,sB:0},B:"webkit",C:["","","","I","g","J","E","F","G","A","B","C","K","L","D","M","N","O","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","AB","BB","CB","DB","EB","FB","GB","HB","IB","JB","KB","fB","LB","gB","MB","NB","T","OB","PB","QB","RB","SB","TB","UB","VB","WB","XB","YB","ZB","aB","bB","P","Q","R","U","V","W","X","Y","Z","a","b","c","d","e","S","f","H","qB","rB","sB"],E:"Chrome",F:{"0":1412640000,"1":1416268800,"2":1421798400,"3":1425513600,"4":1429401600,"5":1432080000,"6":1437523200,"7":1441152000,"8":1444780800,"9":1449014400,I:1264377600,g:1274745600,J:1283385600,E:1287619200,F:1291248000,G:1296777600,A:1299542400,B:1303862400,C:1307404800,K:1312243200,L:1316131200,D:1316131200,M:1319500800,N:1323734400,O:1328659200,h:1332892800,i:1337040000,j:1340668800,k:1343692800,l:1348531200,m:1352246400,n:1357862400,o:1361404800,p:1364428800,q:1369094400,r:1374105600,s:1376956800,t:1384214400,u:1389657600,v:1392940800,w:1397001600,x:1400544000,y:1405468800,z:1409011200,AB:1453248000,BB:1456963200,CB:1460592000,DB:1464134400,EB:1469059200,FB:1472601600,GB:1476230400,HB:1480550400,IB:1485302400,JB:1489017600,KB:1492560000,fB:1496707200,LB:1500940800,gB:1504569600,MB:1508198400,NB:1512518400,T:1516752000,OB:1520294400,PB:1523923200,QB:1527552000,RB:1532390400,SB:1536019200,TB:1539648000,UB:1543968000,VB:1548720000,WB:1552348800,XB:1555977600,YB:1559606400,ZB:1564444800,aB:1568073600,bB:1571702400,P:1575936000,Q:1580860800,R:1586304000,U:1589846400,V:1594684800,W:1598313600,X:1601942400,Y:1605571200,Z:1611014400,a:1614556800,b:1618272000,c:1621987200,d:1626739200,e:1630368000,S:1632268800,f:1634601600,H:1637020800,qB:null,rB:null,sB:null}},E:{A:{I:0,g:0.004293,J:0.004656,E:0.004465,F:0.004043,G:0.004891,A:0.004425,B:0.004318,C:0.008636,K:0.069088,L:0.375666,D:0.90678,tB:0,hB:0.008692,uB:0.012954,vB:0.00456,wB:0.004283,xB:0.025908,iB:0.012954,cB:0.04318,dB:0.077724,yB:0.526796,zB:1.98196,"0B":0,"1B":0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","tB","hB","I","g","uB","J","vB","E","wB","F","G","xB","A","iB","B","cB","C","dB","K","yB","L","zB","D","0B","1B","",""],E:"Safari",F:{tB:1205798400,hB:1226534400,I:1244419200,g:1275868800,uB:1311120000,J:1343174400,vB:1382400000,E:1382400000,wB:1410998400,F:1413417600,G:1443657600,xB:1458518400,A:1474329600,iB:1490572800,B:1505779200,cB:1522281600,C:1537142400,dB:1553472000,K:1568851200,yB:1585008000,L:1600214400,zB:1619395200,D:1632096000,"0B":1635292800,"1B":null}},F:{A:{"0":0.004367,"1":0.004534,"2":0.008636,"3":0.004227,"4":0.004418,"5":0.004293,"6":0.004227,"7":0.004725,"8":0.008636,"9":0.008942,G:0.0082,B:0.016581,C:0.004317,D:0.00685,M:0.00685,N:0.00685,O:0.005014,h:0.006015,i:0.004879,j:0.006597,k:0.006597,l:0.013434,m:0.006702,n:0.006015,o:0.005595,p:0.004393,q:0.008652,r:0.004879,s:0.004879,t:0.004318,u:0.005152,v:0.005014,w:0.009758,x:0.004879,y:0.008636,z:0.004283,AB:0.004707,BB:0.004827,CB:0.004707,DB:0.004707,EB:0.004326,FB:0.008922,GB:0.014349,HB:0.004425,IB:0.00472,JB:0.004425,KB:0.004425,LB:0.00472,MB:0.004532,NB:0.004566,T:0.02283,OB:0.00867,PB:0.004656,QB:0.004642,RB:0.004318,SB:0.00944,TB:0.004293,UB:0.004293,VB:0.004298,WB:0.096692,XB:0.004201,YB:0.004141,ZB:0.004043,aB:0.004318,bB:0.060452,P:0.695198,Q:0.358394,R:0,"2B":0.00685,"3B":0,"4B":0.008392,"5B":0.004706,cB:0.006229,jB:0.004879,"6B":0.008786,dB:0.00472},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","G","2B","3B","4B","5B","B","cB","jB","6B","C","dB","D","M","N","O","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","AB","BB","CB","DB","EB","FB","GB","HB","IB","JB","KB","LB","MB","NB","T","OB","PB","QB","RB","SB","TB","UB","VB","WB","XB","YB","ZB","aB","bB","P","Q","R","","",""],E:"Opera",F:{"0":1465344000,"1":1470096000,"2":1474329600,"3":1477267200,"4":1481587200,"5":1486425600,"6":1490054400,"7":1494374400,"8":1498003200,"9":1502236800,G:1150761600,"2B":1223424000,"3B":1251763200,"4B":1267488000,"5B":1277942400,B:1292457600,cB:1302566400,jB:1309219200,"6B":1323129600,C:1323129600,dB:1352073600,D:1372723200,M:1377561600,N:1381104000,O:1386288000,h:1390867200,i:1393891200,j:1399334400,k:1401753600,l:1405987200,m:1409616000,n:1413331200,o:1417132800,p:1422316800,q:1425945600,r:1430179200,s:1433808000,t:1438646400,u:1442448000,v:1445904000,w:1449100800,x:1454371200,y:1457308800,z:1462320000,AB:1506470400,BB:1510099200,CB:1515024000,DB:1517961600,EB:1521676800,FB:1525910400,GB:1530144000,HB:1534982400,IB:1537833600,JB:1543363200,KB:1548201600,LB:1554768000,MB:1561593600,NB:1566259200,T:1570406400,OB:1573689600,PB:1578441600,QB:1583971200,RB:1587513600,SB:1592956800,TB:1595894400,UB:1600128000,VB:1603238400,WB:1613520000,XB:1612224000,YB:1616544000,ZB:1619568000,aB:1623715200,bB:1627948800,P:1631577600,Q:1633392000,R:1635984000},D:{G:"o",B:"o",C:"o","2B":"o","3B":"o","4B":"o","5B":"o",cB:"o",jB:"o","6B":"o",dB:"o"}},G:{A:{F:0.00145527,D:3.10555,hB:0,"7B":0,kB:0.00291054,"8B":0.00727635,"9B":0.0713083,AC:0.0232843,BC:0.0116422,CC:0.0203738,DC:0.106235,EC:0.037837,FC:0.129519,GC:0.0771293,HC:0.0480239,IC:0.0509345,JC:0.665059,KC:0.0422029,LC:0.0203738,MC:0.10769,NC:0.343444,OC:1.27918,PC:8.40273},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","hB","7B","kB","8B","9B","AC","F","BC","CC","DC","EC","FC","GC","HC","IC","JC","KC","LC","MC","NC","OC","PC","D","","",""],E:"Safari on iOS",F:{hB:1270252800,"7B":1283904000,kB:1299628800,"8B":1331078400,"9B":1359331200,AC:1394409600,F:1410912000,BC:1413763200,CC:1442361600,DC:1458518400,EC:1473724800,FC:1490572800,GC:1505779200,HC:1522281600,IC:1537142400,JC:1553472000,KC:1568851200,LC:1572220800,MC:1580169600,NC:1585008000,OC:1600214400,PC:1619395200,D:1632096000}},H:{A:{QC:1.08682},B:"o",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","QC","","",""],E:"Opera Mini",F:{QC:1426464000}},I:{A:{eB:0,I:0.0202897,H:0,RC:0,SC:0,TC:0,UC:0.0112721,kB:0.0428338,VC:0,WC:0.198388},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","RC","SC","TC","eB","I","UC","kB","VC","WC","H","","",""],E:"Android Browser",F:{RC:1256515200,SC:1274313600,TC:1291593600,eB:1298332800,I:1318896000,UC:1341792000,kB:1374624000,VC:1386547200,WC:1401667200,H:1636934400}},J:{A:{E:0,A:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","E","A","","",""],E:"Blackberry Browser",F:{E:1325376000,A:1359504000}},K:{A:{A:0,B:0,C:0,T:0.0111391,cB:0,jB:0,dB:0},B:"o",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","A","B","cB","jB","C","dB","T","","",""],E:"Opera Mobile",F:{A:1287100800,B:1300752000,cB:1314835200,jB:1318291200,C:1330300800,dB:1349740800,T:1613433600},D:{T:"webkit"}},L:{A:{H:37.6597},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","H","","",""],E:"Chrome for Android",F:{H:1637020800}},M:{A:{S:0.278467},B:"moz",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","S","","",""],E:"Firefox for Android",F:{S:1635811200}},N:{A:{A:0.0115934,B:0.022664},B:"ms",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","A","B","","",""],E:"IE Mobile",F:{A:1340150400,B:1353456000}},O:{A:{XC:0.977476},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","XC","","",""],E:"UC Browser for Android",F:{XC:1471392000},D:{XC:"webkit"}},P:{A:{I:0.232512,YC:0.0103543,ZC:0.010304,aC:0.0739812,bC:0.0103584,cC:0.0317062,iB:0.0105043,dC:0.0951187,eC:0.042275,fC:0.147962,gC:0.211375,hC:2.10318},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","I","YC","ZC","aC","bC","cC","iB","dC","eC","fC","gC","hC","","",""],E:"Samsung Internet",F:{I:1461024000,YC:1481846400,ZC:1509408000,aC:1528329600,bC:1546128000,cC:1554163200,iB:1567900800,dC:1582588800,eC:1593475200,fC:1605657600,gC:1618531200,hC:1629072000}},Q:{A:{iC:0.164807},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","iC","","",""],E:"QQ Browser",F:{iC:1589846400}},R:{A:{jC:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","jC","","",""],E:"Baidu Browser",F:{jC:1491004800}},S:{A:{kC:0.062513},B:"moz",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","kC","","",""],E:"KaiOS Browser",F:{kC:1527811200}}};


/***/ }),

/***/ "./node_modules/caniuse-lite/data/browserVersions.js":
/*!***********************************************************!*\
  !*** ./node_modules/caniuse-lite/data/browserVersions.js ***!
  \***********************************************************/
/***/ ((module) => {

module.exports={"0":"38","1":"39","2":"40","3":"41","4":"42","5":"43","6":"44","7":"45","8":"46","9":"47",A:"10",B:"11",C:"12",D:"15",E:"7",F:"8",G:"9",H:"96",I:"4",J:"6",K:"13",L:"14",M:"16",N:"17",O:"18",P:"79",Q:"80",R:"81",S:"94",T:"64",U:"83",V:"84",W:"85",X:"86",Y:"87",Z:"88",a:"89",b:"90",c:"91",d:"92",e:"93",f:"95",g:"5",h:"19",i:"20",j:"21",k:"22",l:"23",m:"24",n:"25",o:"26",p:"27",q:"28",r:"29",s:"30",t:"31",u:"32",v:"33",w:"34",x:"35",y:"36",z:"37",AB:"48",BB:"49",CB:"50",DB:"51",EB:"52",FB:"53",GB:"54",HB:"55",IB:"56",JB:"57",KB:"58",LB:"60",MB:"62",NB:"63",OB:"65",PB:"66",QB:"67",RB:"68",SB:"69",TB:"70",UB:"71",VB:"72",WB:"73",XB:"74",YB:"75",ZB:"76",aB:"77",bB:"78",cB:"11.1",dB:"12.1",eB:"3",fB:"59",gB:"61",hB:"3.2",iB:"10.1",jB:"11.5",kB:"4.2-4.3",lB:"5.5",mB:"2",nB:"82",oB:"3.5",pB:"3.6",qB:"97",rB:"98",sB:"99",tB:"3.1",uB:"5.1",vB:"6.1",wB:"7.1",xB:"9.1",yB:"13.1",zB:"14.1","0B":"15.1","1B":"TP","2B":"9.5-9.6","3B":"10.0-10.1","4B":"10.5","5B":"10.6","6B":"11.6","7B":"4.0-4.1","8B":"5.0-5.1","9B":"6.0-6.1",AC:"7.0-7.1",BC:"8.1-8.4",CC:"9.0-9.2",DC:"9.3",EC:"10.0-10.2",FC:"10.3",GC:"11.0-11.2",HC:"11.3-11.4",IC:"12.0-12.1",JC:"12.2-12.5",KC:"13.0-13.1",LC:"13.2",MC:"13.3",NC:"13.4-13.7",OC:"14.0-14.4",PC:"14.5-14.8",QC:"all",RC:"2.1",SC:"2.2",TC:"2.3",UC:"4.1",VC:"4.4",WC:"4.4.3-4.4.4",XC:"12.12",YC:"5.0-5.4",ZC:"6.2-6.4",aC:"7.2-7.4",bC:"8.2",cC:"9.2",dC:"11.1-11.2",eC:"12.0",fC:"13.0",gC:"14.0",hC:"15.0",iC:"10.4",jC:"7.12",kC:"2.5"};


/***/ }),

/***/ "./node_modules/caniuse-lite/data/browsers.js":
/*!****************************************************!*\
  !*** ./node_modules/caniuse-lite/data/browsers.js ***!
  \****************************************************/
/***/ ((module) => {

module.exports={A:"ie",B:"edge",C:"firefox",D:"chrome",E:"safari",F:"opera",G:"ios_saf",H:"op_mini",I:"android",J:"bb",K:"op_mob",L:"and_chr",M:"and_ff",N:"ie_mob",O:"and_uc",P:"samsung",Q:"and_qq",R:"baidu",S:"kaios"};


/***/ }),

/***/ "./node_modules/caniuse-lite/dist/unpacker/agents.js":
/*!***********************************************************!*\
  !*** ./node_modules/caniuse-lite/dist/unpacker/agents.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const browsers = (__webpack_require__(/*! ./browsers */ "./node_modules/caniuse-lite/dist/unpacker/browsers.js").browsers)
const versions = (__webpack_require__(/*! ./browserVersions */ "./node_modules/caniuse-lite/dist/unpacker/browserVersions.js").browserVersions)
const agentsData = __webpack_require__(/*! ../../data/agents */ "./node_modules/caniuse-lite/data/agents.js")

function unpackBrowserVersions(versionsData) {
  return Object.keys(versionsData).reduce((usage, version) => {
    usage[versions[version]] = versionsData[version]
    return usage
  }, {})
}

module.exports.agents = Object.keys(agentsData).reduce((map, key) => {
  let versionsData = agentsData[key]
  map[browsers[key]] = Object.keys(versionsData).reduce((data, entry) => {
    if (entry === 'A') {
      data.usage_global = unpackBrowserVersions(versionsData[entry])
    } else if (entry === 'C') {
      data.versions = versionsData[entry].reduce((list, version) => {
        if (version === '') {
          list.push(null)
        } else {
          list.push(versions[version])
        }
        return list
      }, [])
    } else if (entry === 'D') {
      data.prefix_exceptions = unpackBrowserVersions(versionsData[entry])
    } else if (entry === 'E') {
      data.browser = versionsData[entry]
    } else if (entry === 'F') {
      data.release_date = Object.keys(versionsData[entry]).reduce(
        (map2, key2) => {
          map2[versions[key2]] = versionsData[entry][key2]
          return map2
        },
        {}
      )
    } else {
      // entry is B
      data.prefix = versionsData[entry]
    }
    return data
  }, {})
  return map
}, {})


/***/ }),

/***/ "./node_modules/caniuse-lite/dist/unpacker/browserVersions.js":
/*!********************************************************************!*\
  !*** ./node_modules/caniuse-lite/dist/unpacker/browserVersions.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports.browserVersions = __webpack_require__(/*! ../../data/browserVersions */ "./node_modules/caniuse-lite/data/browserVersions.js")


/***/ }),

/***/ "./node_modules/caniuse-lite/dist/unpacker/browsers.js":
/*!*************************************************************!*\
  !*** ./node_modules/caniuse-lite/dist/unpacker/browsers.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports.browsers = __webpack_require__(/*! ../../data/browsers */ "./node_modules/caniuse-lite/data/browsers.js")


/***/ }),

/***/ "./node_modules/core-js/internals/a-callable.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-callable.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "./node_modules/core-js/internals/try-to-string.js");

var TypeError = global.TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "./node_modules/core-js/internals/a-constructor.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/a-constructor.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isConstructor = __webpack_require__(/*! ../internals/is-constructor */ "./node_modules/core-js/internals/is-constructor.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "./node_modules/core-js/internals/try-to-string.js");

var TypeError = global.TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a constructor');
};


/***/ }),

/***/ "./node_modules/core-js/internals/a-possible-prototype.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/a-possible-prototype.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var String = global.String;
var TypeError = global.TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};


/***/ }),

/***/ "./node_modules/core-js/internals/add-to-unscopables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/add-to-unscopables.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/internals/advance-string-index.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/advance-string-index.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = (__webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").charAt);

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var String = global.String;
var TypeError = global.TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-fill.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/array-fill.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = lengthOfArrayLike(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-for-each.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-for-each.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $forEach = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").forEach);
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ "./node_modules/core-js/internals/array-from.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/array-from.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js");
var isConstructor = __webpack_require__(/*! ../internals/is-constructor */ "./node_modules/core-js/internals/is-constructor.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var getIterator = __webpack_require__(/*! ../internals/get-iterator */ "./node_modules/core-js/internals/get-iterator.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");

var Array = global.Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-iteration.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/array-iteration.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-method-has-species-support.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-has-species-support.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-method-is-strict.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-is-strict.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-slice-simple.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/array-slice-simple.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");

var Array = global.Array;
var max = Math.max;

module.exports = function (O, start, end) {
  var length = lengthOfArrayLike(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = Array(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-slice.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/array-slice.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

module.exports = uncurryThis([].slice);


/***/ }),

/***/ "./node_modules/core-js/internals/array-sort.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/array-sort.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arraySlice = __webpack_require__(/*! ../internals/array-slice-simple */ "./node_modules/core-js/internals/array-slice-simple.js");

var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice(array, 0, middle), comparefn),
    mergeSort(arraySlice(array, middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = (lindex < llength && rindex < rlength)
      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
      : lindex < llength ? left[lindex++] : right[rindex++];
  } return array;
};

module.exports = mergeSort;


/***/ }),

/***/ "./node_modules/core-js/internals/array-species-constructor.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-constructor.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var isConstructor = __webpack_require__(/*! ../internals/is-constructor */ "./node_modules/core-js/internals/is-constructor.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');
var Array = global.Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-species-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-create.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arraySpeciesConstructor = __webpack_require__(/*! ../internals/array-species-constructor */ "./node_modules/core-js/internals/array-species-constructor.js");

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ "./node_modules/core-js/internals/iterator-close.js");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/check-correctness-of-iteration.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/check-correctness-of-iteration.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/correct-is-regexp-logic.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-is-regexp-logic.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "./node_modules/core-js/internals/create-html.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/create-html.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");

var quot = /"/g;
var replace = uncurryThis(''.replace);

// `CreateHTML` abstract operation
// https://tc39.es/ecma262/#sec-createhtml
module.exports = function (string, tag, attribute, value) {
  var S = toString(requireObjectCoercible(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + replace(toString(value), quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-iterator-constructor.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IteratorPrototype = (__webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js").IteratorPrototype);
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/create-property.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/define-iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-iterator.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var FunctionName = __webpack_require__(/*! ../internals/function-name */ "./node_modules/core-js/internals/function-name.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js");

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          redefine(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    redefine(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/internals/define-well-known-symbol.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/define-well-known-symbol.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/well-known-symbol-wrapped */ "./node_modules/core-js/internals/well-known-symbol-wrapped.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f);

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/internals/dom-iterables.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/dom-iterables.js ***!
  \*********************************************************/
/***/ ((module) => {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "./node_modules/core-js/internals/dom-token-list-prototype.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/dom-token-list-prototype.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ "./node_modules/core-js/internals/engine-ff-version.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-ff-version.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

var firefox = userAgent.match(/firefox\/(\d+)/i);

module.exports = !!firefox && +firefox[1];


/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-ie-or-edge.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-ie-or-edge.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var UA = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

module.exports = /MSIE|Trident/.test(UA);


/***/ }),

/***/ "./node_modules/core-js/internals/engine-user-agent.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-user-agent.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "./node_modules/core-js/internals/engine-v8-version.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-v8-version.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ "./node_modules/core-js/internals/engine-webkit-version.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-webkit-version.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

module.exports = !!webkit && +webkit[1];


/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(/*! ../modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine(String.prototype, KEY, methods[0]);
    redefine(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-apply.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/function-apply.js ***!
  \**********************************************************/
/***/ ((module) => {

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (bind ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ "./node_modules/core-js/internals/function-bind-context.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-context.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js");

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : bind ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-bind.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var arraySlice = __webpack_require__(/*! ../internals/array-slice */ "./node_modules/core-js/internals/array-slice.js");

var Function = global.Function;
var concat = uncurryThis([].concat);
var join = uncurryThis([].join);
var factories = {};

var construct = function (C, argsLength, args) {
  if (!hasOwn(factories, argsLength)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    factories[argsLength] = Function('C,a', 'return new C(' + join(list, ',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var F = aCallable(this);
  var Prototype = F.prototype;
  var partArgs = arraySlice(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = concat(partArgs, arraySlice(arguments));
    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
  };
  if (isObject(Prototype)) boundFunction.prototype = Prototype;
  return boundFunction;
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-call.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-call.js ***!
  \*********************************************************/
/***/ ((module) => {

var call = Function.prototype.call;

module.exports = call.bind ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-name.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-name.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-uncurry-this.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-uncurry-this.js ***!
  \*****************************************************************/
/***/ ((module) => {

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var callBind = bind && bind.bind(call);

module.exports = bind ? function (fn) {
  return fn && callBind(call, fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-iterator-method.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "./node_modules/core-js/internals/get-method.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-iterator.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "./node_modules/core-js/internals/try-to-string.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");

var TypeError = global.TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-method.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/get-method.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-substitution.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/get-substitution.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ "./node_modules/core-js/internals/has-own-property.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/has-own-property.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var Object = global.Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "./node_modules/core-js/internals/inherit-if-required.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/inherit-if-required.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "./node_modules/core-js/internals/inspect-source.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var shared = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array-iterator-method.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-callable.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/is-callable.js ***!
  \*******************************************************/
/***/ ((module) => {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-constructor.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/is-constructor.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function (argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function (argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
    // we can't check .prototype since constructors produced by .bind haven't it
  } return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
};

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js/internals/is-integral-number.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/is-integral-number.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var floor = Math.floor;

// `IsIntegralNumber` abstract operation
// https://tc39.es/ecma262/#sec-isintegralnumber
// eslint-disable-next-line es/no-number-isinteger -- safe
module.exports = Number.isInteger || function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/***/ ((module) => {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/internals/is-regexp.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-regexp.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-symbol.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-symbol.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "./node_modules/core-js/internals/object-is-prototype-of.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterator-close.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterator-close.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "./node_modules/core-js/internals/get-method.js");

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterators-core.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterators-core.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  redefine(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterators.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/iterators.js ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/length-of-array-like.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/length-of-array-like.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "./node_modules/core-js/internals/not-a-regexp.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/not-a-regexp.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "./node_modules/core-js/internals/is-regexp.js");

var TypeError = global.TypeError;

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");

var TypeError = global.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names-external.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names-external.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var $getOwnPropertyNames = (__webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js").f);
var arraySlice = __webpack_require__(/*! ../internals/array-slice-simple */ "./node_modules/core-js/internals/array-slice-simple.js");

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var Object = global.Object;
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-is-prototype-of.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-is-prototype-of.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var indexOf = (__webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "./node_modules/core-js/internals/a-possible-prototype.js");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "./node_modules/core-js/internals/object-to-string.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/object-to-string.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "./node_modules/core-js/internals/ordinary-to-primitive.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/ordinary-to-primitive.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var TypeError = global.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = global;


/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(/*! ../internals/function-name */ "./node_modules/core-js/internals/function-name.js").CONFIGURABLE);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec-abstract.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

var TypeError = global.TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw TypeError('RegExp#exec called on incompatible receiver');
};


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var regexpFlags = __webpack_require__(/*! ../internals/regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");
var stickyHelpers = __webpack_require__(/*! ../internals/regexp-sticky-helpers */ "./node_modules/core-js/internals/regexp-sticky-helpers.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var getInternalState = (__webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js").get);
var UNSUPPORTED_DOT_ALL = __webpack_require__(/*! ../internals/regexp-unsupported-dot-all */ "./node_modules/core-js/internals/regexp-unsupported-dot-all.js");
var UNSUPPORTED_NCG = __webpack_require__(/*! ../internals/regexp-unsupported-ncg */ "./node_modules/core-js/internals/regexp-unsupported-ncg.js");

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-flags.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-flags.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-sticky-helpers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-sticky-helpers.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

var UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
  return !$RegExp('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

module.exports = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y
};


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-unsupported-dot-all.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-unsupported-dot-all.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-unsupported-ncg.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-unsupported-ncg.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var TypeError = global.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-to-string-tag.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !hasOwn(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.19.2',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/internals/species-constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/species-constructor.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var aConstructor = __webpack_require__(/*! ../internals/a-constructor */ "./node_modules/core-js/internals/a-constructor.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};


/***/ }),

/***/ "./node_modules/core-js/internals/string-html-forced.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/string-html-forced.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// check the existence of a method, lowercase
// of a tag and escaping quotes in arguments
module.exports = function (METHOD_NAME) {
  return fails(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/string-multibyte.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/string-multibyte.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "./node_modules/core-js/internals/string-trim.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/string-trim.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "./node_modules/core-js/internals/whitespaces.js");

var replace = uncurryThis(''.replace);
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "./node_modules/core-js/internals/this-number-value.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/this-number-value.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);


/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-integer-or-infinity.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer-or-infinity.js ***!
  \******************************************************************/
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "./node_modules/core-js/internals/get-method.js");
var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ "./node_modules/core-js/internals/ordinary-to-primitive.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-property-key.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/to-property-key.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-string-tag-support.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "./node_modules/core-js/internals/to-string.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-string.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");

var String = global.String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/try-to-string.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/try-to-string.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol-wrapped.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol-wrapped.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "./node_modules/core-js/internals/whitespaces.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/whitespaces.js ***!
  \*******************************************************/
/***/ ((module) => {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.concat.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.concat.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var TypeError = global.TypeError;

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.fill.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.fill.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var fill = __webpack_require__(/*! ../internals/array-fill */ "./node_modules/core-js/internals/array-fill.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");

// `Array.prototype.fill` method
// https://tc39.es/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.filter.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.filter.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $filter = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").filter);
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.from.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.from.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var from = __webpack_require__(/*! ../internals/array-from */ "./node_modules/core-js/internals/array-from.js");
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js");

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.includes.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.includes.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $includes = (__webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").includes);
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.iterator.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.map.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.map.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $map = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").map);
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.slice.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.slice.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var isConstructor = __webpack_require__(/*! ../internals/is-constructor */ "./node_modules/core-js/internals/is-constructor.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");
var un$Slice = __webpack_require__(/*! ../internals/array-slice */ "./node_modules/core-js/internals/array-slice.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var Array = global.Array;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return un$Slice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.sort.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.sort.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var internalSort = __webpack_require__(/*! ../internals/array-sort */ "./node_modules/core-js/internals/array-sort.js");
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");
var FF = __webpack_require__(/*! ../internals/engine-ff-version */ "./node_modules/core-js/internals/engine-ff-version.js");
var IE_OR_EDGE = __webpack_require__(/*! ../internals/engine-is-ie-or-edge */ "./node_modules/core-js/internals/engine-is-ie-or-edge.js");
var V8 = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");
var WEBKIT = __webpack_require__(/*! ../internals/engine-webkit-version */ "./node_modules/core-js/internals/engine-webkit-version.js");

var test = [];
var un$Sort = uncurryThis(test.sort);
var push = uncurryThis(test.push);

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT = !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 70;
  if (FF && FF > 3) return;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }

  test.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString(x) > toString(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);

    var array = toObject(this);

    if (STABLE_SORT) return comparefn === undefined ? un$Sort(array) : un$Sort(array, comparefn);

    var items = [];
    var arrayLength = lengthOfArrayLike(array);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) push(items, array[index]);
    }

    internalSort(items, getSortCompare(comparefn));

    itemsLength = items.length;
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) delete array[index++];

    return array;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.splice.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.splice.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var TypeError = global.TypeError;
var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.function.name.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.function.name.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var FUNCTION_NAME_EXISTS = (__webpack_require__(/*! ../internals/function-name */ "./node_modules/core-js/internals/function-name.js").EXISTS);
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f);

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis(FunctionPrototype.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec = uncurryThis(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.number.constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.number.constructor.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "./node_modules/core-js/internals/inherit-if-required.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "./node_modules/core-js/internals/object-is-prototype-of.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var getOwnPropertyNames = (__webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js").f);
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f);
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f);
var thisNumberValue = __webpack_require__(/*! ../internals/this-number-value */ "./node_modules/core-js/internals/this-number-value.js");
var trim = (__webpack_require__(/*! ../internals/string-trim */ "./node_modules/core-js/internals/string-trim.js").trim);

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError = global.TypeError;
var arraySlice = uncurryThis(''.slice);
var charCodeAt = uncurryThis(''.charCodeAt);

// `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric
var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
};

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw TypeError('Cannot convert a Symbol value to a number');
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = charCodeAt(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = arraySlice(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt(digits, index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    var dummy = this;
    // check on 1..constructor(foo) case
    return isPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy); })
      ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.number.is-integer.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es.number.is-integer.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var isIntegralNumber = __webpack_require__(/*! ../internals/is-integral-number */ "./node_modules/core-js/internals/is-integral-number.js");

// `Number.isInteger` method
// https://tc39.es/ecma262/#sec-number.isinteger
$({ target: 'Number', stat: true }, {
  isInteger: isIntegralNumber
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.number.is-nan.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.number.is-nan.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

// `Number.isNaN` method
// https://tc39.es/ecma262/#sec-number.isnan
$({ target: 'Number', stat: true }, {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return number != number;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var nativeGetOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f);
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js":
/*!********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.get-prototype-of.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.get-prototype-of.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var nativeGetPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});



/***/ }),

/***/ "./node_modules/core-js/modules/es.object.keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.keys.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var nativeKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.to-string.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var toString = __webpack_require__(/*! ../internals/object-to-string */ "./node_modules/core-js/internals/object-to-string.js");

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.reflect.construct.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es.reflect.construct.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var apply = __webpack_require__(/*! ../internals/function-apply */ "./node_modules/core-js/internals/function-apply.js");
var bind = __webpack_require__(/*! ../internals/function-bind */ "./node_modules/core-js/internals/function-bind.js");
var aConstructor = __webpack_require__(/*! ../internals/a-constructor */ "./node_modules/core-js/internals/a-constructor.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var nativeConstruct = getBuiltIn('Reflect', 'construct');
var ObjectPrototype = Object.prototype;
var push = [].push;

// `Reflect.construct` method
// https://tc39.es/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});

var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});

var FORCED = NEW_TARGET_BUG || ARGS_BUG;

$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aConstructor(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      apply(push, $args, args);
      return new (apply(bind, Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : ObjectPrototype);
    var result = apply(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.exec.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.exec.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var exec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.includes.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.includes.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var notARegExp = __webpack_require__(/*! ../internals/not-a-regexp */ "./node_modules/core-js/internals/not-a-regexp.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ "./node_modules/core-js/internals/correct-is-regexp-logic.js");

var stringIndexOf = uncurryThis(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString(requireObjectCoercible(this)),
      toString(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.iterator.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = (__webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").charAt);
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.link.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.link.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var createHTML = __webpack_require__(/*! ../internals/create-html */ "./node_modules/core-js/internals/create-html.js");
var forcedStringHTMLMethod = __webpack_require__(/*! ../internals/string-html-forced */ "./node_modules/core-js/internals/string-html-forced.js");

// `String.prototype.link` method
// https://tc39.es/ecma262/#sec-string.prototype.link
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('link') }, {
  link: function link(url) {
    return createHTML(this, 'a', 'href', url);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.replace.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.replace.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var apply = __webpack_require__(/*! ../internals/function-apply */ "./node_modules/core-js/internals/function-apply.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "./node_modules/core-js/internals/advance-string-index.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "./node_modules/core-js/internals/get-method.js");
var getSubstitution = __webpack_require__(/*! ../internals/get-substitution */ "./node_modules/core-js/internals/get-substitution.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          var replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.split.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.split.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var apply = __webpack_require__(/*! ../internals/function-apply */ "./node_modules/core-js/internals/function-apply.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "./node_modules/core-js/internals/is-regexp.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "./node_modules/core-js/internals/advance-string-index.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "./node_modules/core-js/internals/get-method.js");
var arraySlice = __webpack_require__(/*! ../internals/array-slice-simple */ "./node_modules/core-js/internals/array-slice-simple.js");
var callRegExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");
var stickyHelpers = __webpack_require__(/*! ../internals/regexp-sticky-helpers */ "./node_modules/core-js/internals/regexp-sticky-helpers.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 0xFFFFFFFF;
var min = Math.min;
var $push = [].push;
var exec = uncurryThis(/./.exec);
var push = uncurryThis($push);
var stringSlice = uncurryThis(''.slice);

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return call(nativeSplit, string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = call(regexpExec, separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          push(output, stringSlice(string, lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) apply($push, output, arraySlice(match, 1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !exec(separatorCopy, '')) push(output, '');
      } else push(output, stringSlice(string, lastLastIndex));
      return output.length > lim ? arraySlice(output, 0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
      return splitter
        ? call(splitter, separator, O, limit)
        : call(internalSplit, toString(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          push(A, stringSlice(S, p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push(A, z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      push(A, stringSlice(S, p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);


/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.description.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.description.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "./node_modules/core-js/internals/object-is-prototype-of.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f);
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");

var NativeSymbol = global.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
    var result = isPrototypeOf(SymbolPrototype, this)
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  SymbolWrapper.prototype = SymbolPrototype;
  SymbolPrototype.constructor = SymbolWrapper;

  var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
  var symbolToString = uncurryThis(SymbolPrototype.toString);
  var symbolValueOf = uncurryThis(SymbolPrototype.valueOf);
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  var replace = uncurryThis(''.replace);
  var stringSlice = uncurryThis(''.slice);

  defineProperty(SymbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = symbolValueOf(this);
      var string = symbolToString(symbol);
      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.iterator.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "./node_modules/core-js/internals/define-well-known-symbol.js");

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var apply = __webpack_require__(/*! ../internals/function-apply */ "./node_modules/core-js/internals/function-apply.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "./node_modules/core-js/internals/object-is-prototype-of.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");
var $toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var nativeObjectCreate = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertyNamesExternal = __webpack_require__(/*! ../internals/object-get-own-property-names-external */ "./node_modules/core-js/internals/object-get-own-property-names-external.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var arraySlice = __webpack_require__(/*! ../internals/array-slice */ "./node_modules/core-js/internals/array-slice.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/well-known-symbol-wrapped */ "./node_modules/core-js/internals/well-known-symbol-wrapped.js");
var defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ "./node_modules/core-js/internals/define-well-known-symbol.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var $forEach = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").forEach);

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);

var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
var TypeError = global.TypeError;
var QObject = global.QObject;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push = uncurryThis([].push);

var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (hasOwn(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
      push(result, AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (isPrototypeOf(SymbolPrototype, this)) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
      if (hasOwn(this, HIDDEN) && hasOwn(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  SymbolPrototype = $Symbol[PROTOTYPE];

  redefine(SymbolPrototype, 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = $toString(key);
    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (isCallable($replacer)) value = call($replacer, this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return apply($stringify, null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!SymbolPrototype[TO_PRIMITIVE]) {
  var valueOf = SymbolPrototype.valueOf;
  // eslint-disable-next-line no-unused-vars -- required for .length
  redefine(SymbolPrototype, TO_PRIMITIVE, function (hint) {
    // TODO: improve hint logic
    return call(valueOf, this);
  });
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.for-each.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.for-each.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js/internals/dom-iterables.js");
var DOMTokenListPrototype = __webpack_require__(/*! ../internals/dom-token-list-prototype */ "./node_modules/core-js/internals/dom-token-list-prototype.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js/internals/array-for-each.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.iterator.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.iterator.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js/internals/dom-iterables.js");
var DOMTokenListPrototype = __webpack_require__(/*! ../internals/dom-token-list-prototype */ "./node_modules/core-js/internals/dom-token-list-prototype.js");
var ArrayIteratorMethods = __webpack_require__(/*! ../modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');


/***/ }),

/***/ "./node_modules/electron-to-chromium/versions.js":
/*!*******************************************************!*\
  !*** ./node_modules/electron-to-chromium/versions.js ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = {
	"0.20": "39",
	"0.21": "41",
	"0.22": "41",
	"0.23": "41",
	"0.24": "41",
	"0.25": "42",
	"0.26": "42",
	"0.27": "43",
	"0.28": "43",
	"0.29": "43",
	"0.30": "44",
	"0.31": "45",
	"0.32": "45",
	"0.33": "45",
	"0.34": "45",
	"0.35": "45",
	"0.36": "47",
	"0.37": "49",
	"1.0": "49",
	"1.1": "50",
	"1.2": "51",
	"1.3": "52",
	"1.4": "53",
	"1.5": "54",
	"1.6": "56",
	"1.7": "58",
	"1.8": "59",
	"2.0": "61",
	"2.1": "61",
	"3.0": "66",
	"3.1": "66",
	"4.0": "69",
	"4.1": "69",
	"4.2": "69",
	"5.0": "73",
	"6.0": "76",
	"6.1": "76",
	"7.0": "78",
	"7.1": "78",
	"7.2": "78",
	"7.3": "78",
	"8.0": "80",
	"8.1": "80",
	"8.2": "80",
	"8.3": "80",
	"8.4": "80",
	"8.5": "80",
	"9.0": "83",
	"9.1": "83",
	"9.2": "83",
	"9.3": "83",
	"9.4": "83",
	"10.0": "85",
	"10.1": "85",
	"10.2": "85",
	"10.3": "85",
	"10.4": "85",
	"11.0": "87",
	"11.1": "87",
	"11.2": "87",
	"11.3": "87",
	"11.4": "87",
	"11.5": "87",
	"12.0": "89",
	"12.1": "89",
	"12.2": "89",
	"13.0": "91",
	"13.1": "91",
	"13.2": "91",
	"13.3": "91",
	"13.4": "91",
	"13.5": "91",
	"13.6": "91",
	"14.0": "93",
	"14.1": "93",
	"14.2": "93",
	"15.0": "94",
	"15.1": "94",
	"15.2": "94",
	"15.3": "94",
	"16.0": "96",
	"17.0": "98"
};

/***/ }),

/***/ "./tasks/streams/css/style.scss":
/*!**************************************!*\
  !*** ./tasks/streams/css/style.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/semver/semver.js":
/*!***************************************!*\
  !*** ./node_modules/semver/semver.js ***!
  \***************************************/
/***/ ((module, exports) => {

exports = module.exports = SemVer

var debug
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift('SEMVER')
    console.log.apply(console, args)
  }
} else {
  debug = function () {}
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0'

var MAX_LENGTH = 256
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16

// The actual regexps go on exports.re
var re = exports.re = []
var src = exports.src = []
var t = exports.tokens = {}
var R = 0

function tok (n) {
  t[n] = R++
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

tok('NUMERICIDENTIFIER')
src[t.NUMERICIDENTIFIER] = '0|[1-9]\\d*'
tok('NUMERICIDENTIFIERLOOSE')
src[t.NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

tok('NONNUMERICIDENTIFIER')
src[t.NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

tok('MAINVERSION')
src[t.MAINVERSION] = '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[t.NUMERICIDENTIFIER] + ')'

tok('MAINVERSIONLOOSE')
src[t.MAINVERSIONLOOSE] = '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

tok('PRERELEASEIDENTIFIER')
src[t.PRERELEASEIDENTIFIER] = '(?:' + src[t.NUMERICIDENTIFIER] +
                            '|' + src[t.NONNUMERICIDENTIFIER] + ')'

tok('PRERELEASEIDENTIFIERLOOSE')
src[t.PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[t.NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[t.NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

tok('PRERELEASE')
src[t.PRERELEASE] = '(?:-(' + src[t.PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[t.PRERELEASEIDENTIFIER] + ')*))'

tok('PRERELEASELOOSE')
src[t.PRERELEASELOOSE] = '(?:-?(' + src[t.PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[t.PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

tok('BUILDIDENTIFIER')
src[t.BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

tok('BUILD')
src[t.BUILD] = '(?:\\+(' + src[t.BUILDIDENTIFIER] +
             '(?:\\.' + src[t.BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

tok('FULL')
tok('FULLPLAIN')
src[t.FULLPLAIN] = 'v?' + src[t.MAINVERSION] +
                  src[t.PRERELEASE] + '?' +
                  src[t.BUILD] + '?'

src[t.FULL] = '^' + src[t.FULLPLAIN] + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
tok('LOOSEPLAIN')
src[t.LOOSEPLAIN] = '[v=\\s]*' + src[t.MAINVERSIONLOOSE] +
                  src[t.PRERELEASELOOSE] + '?' +
                  src[t.BUILD] + '?'

tok('LOOSE')
src[t.LOOSE] = '^' + src[t.LOOSEPLAIN] + '$'

tok('GTLT')
src[t.GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
tok('XRANGEIDENTIFIERLOOSE')
src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
tok('XRANGEIDENTIFIER')
src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + '|x|X|\\*'

tok('XRANGEPLAIN')
src[t.XRANGEPLAIN] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[t.PRERELEASE] + ')?' +
                   src[t.BUILD] + '?' +
                   ')?)?'

tok('XRANGEPLAINLOOSE')
src[t.XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[t.PRERELEASELOOSE] + ')?' +
                        src[t.BUILD] + '?' +
                        ')?)?'

tok('XRANGE')
src[t.XRANGE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAIN] + '$'
tok('XRANGELOOSE')
src[t.XRANGELOOSE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
tok('COERCE')
src[t.COERCE] = '(^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'
tok('COERCERTL')
re[t.COERCERTL] = new RegExp(src[t.COERCE], 'g')

// Tilde ranges.
// Meaning is "reasonably at or greater than"
tok('LONETILDE')
src[t.LONETILDE] = '(?:~>?)'

tok('TILDETRIM')
src[t.TILDETRIM] = '(\\s*)' + src[t.LONETILDE] + '\\s+'
re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

tok('TILDE')
src[t.TILDE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAIN] + '$'
tok('TILDELOOSE')
src[t.TILDELOOSE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
tok('LONECARET')
src[t.LONECARET] = '(?:\\^)'

tok('CARETTRIM')
src[t.CARETTRIM] = '(\\s*)' + src[t.LONECARET] + '\\s+'
re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], 'g')
var caretTrimReplace = '$1^'

tok('CARET')
src[t.CARET] = '^' + src[t.LONECARET] + src[t.XRANGEPLAIN] + '$'
tok('CARETLOOSE')
src[t.CARETLOOSE] = '^' + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
tok('COMPARATORLOOSE')
src[t.COMPARATORLOOSE] = '^' + src[t.GTLT] + '\\s*(' + src[t.LOOSEPLAIN] + ')$|^$'
tok('COMPARATOR')
src[t.COMPARATOR] = '^' + src[t.GTLT] + '\\s*(' + src[t.FULLPLAIN] + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
tok('COMPARATORTRIM')
src[t.COMPARATORTRIM] = '(\\s*)' + src[t.GTLT] +
                      '\\s*(' + src[t.LOOSEPLAIN] + '|' + src[t.XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
tok('HYPHENRANGE')
src[t.HYPHENRANGE] = '^\\s*(' + src[t.XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[t.XRANGEPLAIN] + ')' +
                   '\\s*$'

tok('HYPHENRANGELOOSE')
src[t.HYPHENRANGELOOSE] = '^\\s*(' + src[t.XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[t.XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
tok('STAR')
src[t.STAR] = '(<|>)?=?\\s*\\*'

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i])
  if (!re[i]) {
    re[i] = new RegExp(src[i])
  }
}

exports.parse = parse
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[t.LOOSE] : re[t.FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid
function valid (version, options) {
  var v = parse(version, options)
  return v ? v.version : null
}

exports.clean = clean
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}

exports.SemVer = SemVer

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options)
  this.options = options
  this.loose = !!options.loose

  var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version

  // these are actually numbers
  this.major = +m[1]
  this.minor = +m[2]
  this.patch = +m[3]

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = []
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    })
  }

  this.build = m[5] ? m[5].split('.') : []
  this.format()
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.')
  }
  return this.version
}

SemVer.prototype.toString = function () {
  return this.version
}

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other)
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return this.compareMain(other) || this.comparePre(other)
}

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
}

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0
  do {
    var a = this.prerelease[i]
    var b = other.prerelease[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

SemVer.prototype.compareBuild = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  var i = 0
  do {
    var a = this.build[i]
    var b = other.build[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor = 0
      this.major++
      this.inc('pre', identifier)
      break
    case 'preminor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor++
      this.inc('pre', identifier)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0
      this.inc('patch', identifier)
      this.inc('pre', identifier)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier)
      }
      this.inc('pre', identifier)
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++
      }
      this.minor = 0
      this.patch = 0
      this.prerelease = []
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++
      }
      this.patch = 0
      this.prerelease = []
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++
      }
      this.prerelease = []
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0]
      } else {
        var i = this.prerelease.length
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0]
          }
        } else {
          this.prerelease = [identifier, 0]
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format()
  this.raw = this.version
  return this
}

exports.inc = inc
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose
    loose = undefined
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1)
    var v2 = parse(version2)
    var prefix = ''
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre'
      var defaultResult = 'prerelease'
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers

var numeric = /^[0-9]+$/
function compareIdentifiers (a, b) {
  var anum = numeric.test(a)
  var bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.compareBuild = compareBuild
function compareBuild (a, b, loose) {
  var versionA = new SemVer(a, loose)
  var versionB = new SemVer(b, loose)
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(b, a, loose)
  })
}

exports.gt = gt
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options)
  this.options = options
  this.loose = !!options.loose
  this.parse(comp)

  if (this.semver === ANY) {
    this.value = ''
  } else {
    this.value = this.operator + this.semver.version
  }

  debug('comp', this)
}

var ANY = {}
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1] !== undefined ? m[1] : ''
  if (this.operator === '=') {
    this.operator = ''
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY
  } else {
    this.semver = new SemVer(m[2], this.options.loose)
  }
}

Comparator.prototype.toString = function () {
  return this.value
}

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose)

  if (this.semver === ANY || version === ANY) {
    return true
  }

  if (typeof version === 'string') {
    try {
      version = new SemVer(version, this.options)
    } catch (er) {
      return false
    }
  }

  return cmp(version, this.operator, this.semver, this.options)
}

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  var rangeTmp

  if (this.operator === '') {
    if (this.value === '') {
      return true
    }
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    if (comp.value === '') {
      return true
    }
    rangeTmp = new Range(this.value, options)
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>')
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<')
  var sameSemVer = this.semver.version === comp.semver.version
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=')
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'))
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'))

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
}

exports.Range = Range
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options
  this.loose = !!options.loose
  this.includePrerelease = !!options.includePrerelease

  // First, split based on boolean or ||
  this.raw = range
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  })

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format()
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim()
  return this.range
}

Range.prototype.toString = function () {
  return this.range
}

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose
  range = range.trim()
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[t.COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[t.TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[t.CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/)
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    })
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this)

  return set
}

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return (
      isSatisfiable(thisComparators, options) &&
      range.set.some(function (rangeComparators) {
        return (
          isSatisfiable(rangeComparators, options) &&
          thisComparators.every(function (thisComparator) {
            return rangeComparators.every(function (rangeComparator) {
              return thisComparator.intersects(rangeComparator, options)
            })
          })
        )
      })
    )
  })
}

// take a set of comparators and determine whether there
// exists a version which can satisfy it
function isSatisfiable (comparators, options) {
  var result = true
  var remainingComparators = comparators.slice()
  var testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every(function (otherComparator) {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0'
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options)
  var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0'
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'
      }
    }

    debug('caret return', ret)
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim()
  var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : ''

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      ret = gtlt + M + '.' + m + '.' + p + pr
    } else if (xm) {
      ret = '>=' + M + '.0.0' + pr + ' <' + (+M + 1) + '.0.0' + pr
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0' + pr +
        ' <' + M + '.' + (+m + 1) + '.0' + pr
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[t.STAR], '')
}

// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0'
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0'
  } else {
    from = '>=' + from
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0'
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0'
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr
  } else {
    to = '<=' + to
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    try {
      version = new SemVer(version, this.options)
    } catch (er) {
      return false
    }
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
}

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies
function satisfies (version, range, options) {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying
function maxSatisfying (versions, range, options) {
  var max = null
  var maxSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}

exports.minSatisfying = minSatisfying
function minSatisfying (versions, range, options) {
  var min = null
  var minSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}

exports.minVersion = minVersion
function minVersion (range, loose) {
  range = new Range(range, loose)

  var minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    })
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside
function outside (version, range, hilo, options) {
  version = new SemVer(version, options)
  range = new Range(range, options)

  var gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    var high = null
    var low = null

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease
function prerelease (version, options) {
  var parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects
function intersects (r1, r2, options) {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}

exports.coerce = coerce
function coerce (version, options) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version === 'number') {
    version = String(version)
  }

  if (typeof version !== 'string') {
    return null
  }

  options = options || {}

  var match = null
  if (!options.rtl) {
    match = version.match(re[t.COERCE])
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    var next
    while ((next = re[t.COERCERTL].exec(version)) &&
      (!match || match.index + match[0].length !== version.length)
    ) {
      if (!match ||
          next.index + next[0].length !== match.index + match[0].length) {
        match = next
      }
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length
    }
    // leave it in a clean state
    re[t.COERCERTL].lastIndex = -1
  }

  if (match === null) {
    return null
  }

  return parse(match[2] +
    '.' + (match[3] || '0') +
    '.' + (match[4] || '0'), options)
}


/***/ }),

/***/ "?3465":
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "./node_modules/@babel/compat-data/data/native-modules.json":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/compat-data/data/native-modules.json ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"es6.module":{"chrome":"61","and_chr":"61","edge":"16","firefox":"60","and_ff":"60","node":"13.2.0","opera":"48","op_mob":"48","safari":"10.1","ios":"10.3","samsung":"8.2","android":"61","electron":"2.0","ios_saf":"10.3"}}');

/***/ }),

/***/ "./node_modules/@babel/compat-data/data/plugins.json":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/compat-data/data/plugins.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"proposal-class-static-block":{"chrome":"94","opera":"80","edge":"94","firefox":"93","node":"16.11"},"proposal-private-property-in-object":{"chrome":"91","opera":"77","edge":"91","firefox":"90","safari":"15","node":"16.9","ios":"15","electron":"13.0"},"proposal-class-properties":{"chrome":"74","opera":"62","edge":"79","firefox":"90","safari":"14.1","node":"12","ios":"15","samsung":"11","electron":"6.0"},"proposal-private-methods":{"chrome":"84","opera":"70","edge":"84","firefox":"90","safari":"15","node":"14.6","ios":"15","samsung":"14","electron":"10.0"},"proposal-numeric-separator":{"chrome":"75","opera":"62","edge":"79","firefox":"70","safari":"13","node":"12.5","ios":"13","samsung":"11","electron":"6.0"},"proposal-logical-assignment-operators":{"chrome":"85","opera":"71","edge":"85","firefox":"79","safari":"14","node":"15","ios":"14","samsung":"14","electron":"10.0"},"proposal-nullish-coalescing-operator":{"chrome":"80","opera":"67","edge":"80","firefox":"72","safari":"13.1","node":"14","ios":"13.4","samsung":"13","electron":"8.0"},"proposal-optional-chaining":{"chrome":"91","opera":"77","edge":"91","firefox":"74","safari":"13.1","node":"16.9","ios":"13.4","electron":"13.0"},"proposal-json-strings":{"chrome":"66","opera":"53","edge":"79","firefox":"62","safari":"12","node":"10","ios":"12","samsung":"9","electron":"3.0"},"proposal-optional-catch-binding":{"chrome":"66","opera":"53","edge":"79","firefox":"58","safari":"11.1","node":"10","ios":"11.3","samsung":"9","electron":"3.0"},"transform-parameters":{"chrome":"49","opera":"36","edge":"18","firefox":"53","node":"6","samsung":"5","electron":"0.37"},"proposal-async-generator-functions":{"chrome":"63","opera":"50","edge":"79","firefox":"57","safari":"12","node":"10","ios":"12","samsung":"8","electron":"3.0"},"proposal-object-rest-spread":{"chrome":"60","opera":"47","edge":"79","firefox":"55","safari":"11.1","node":"8.3","ios":"11.3","samsung":"8","electron":"2.0"},"transform-dotall-regex":{"chrome":"62","opera":"49","edge":"79","firefox":"78","safari":"11.1","node":"8.10","ios":"11.3","samsung":"8","electron":"3.0"},"proposal-unicode-property-regex":{"chrome":"64","opera":"51","edge":"79","firefox":"78","safari":"11.1","node":"10","ios":"11.3","samsung":"9","electron":"3.0"},"transform-named-capturing-groups-regex":{"chrome":"64","opera":"51","edge":"79","firefox":"78","safari":"11.1","node":"10","ios":"11.3","samsung":"9","electron":"3.0"},"transform-async-to-generator":{"chrome":"55","opera":"42","edge":"15","firefox":"52","safari":"11","node":"7.6","ios":"11","samsung":"6","electron":"1.6"},"transform-exponentiation-operator":{"chrome":"52","opera":"39","edge":"14","firefox":"52","safari":"10.1","node":"7","ios":"10.3","samsung":"6","electron":"1.3"},"transform-template-literals":{"chrome":"41","opera":"28","edge":"13","firefox":"34","safari":"13","node":"4","ios":"13","samsung":"3.4","electron":"0.21"},"transform-literals":{"chrome":"44","opera":"31","edge":"12","firefox":"53","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"transform-function-name":{"chrome":"51","opera":"38","edge":"79","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-arrow-functions":{"chrome":"47","opera":"34","edge":"13","firefox":"43","safari":"10","node":"6","ios":"10","samsung":"5","rhino":"1.7.13","electron":"0.36"},"transform-block-scoped-functions":{"chrome":"41","opera":"28","edge":"12","firefox":"46","safari":"10","node":"4","ie":"11","ios":"10","samsung":"3.4","electron":"0.21"},"transform-classes":{"chrome":"46","opera":"33","edge":"13","firefox":"45","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-object-super":{"chrome":"46","opera":"33","edge":"13","firefox":"45","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-shorthand-properties":{"chrome":"43","opera":"30","edge":"12","firefox":"33","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.27"},"transform-duplicate-keys":{"chrome":"42","opera":"29","edge":"12","firefox":"34","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.25"},"transform-computed-properties":{"chrome":"44","opera":"31","edge":"12","firefox":"34","safari":"7.1","node":"4","ios":"8","samsung":"4","electron":"0.30"},"transform-for-of":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-sticky-regex":{"chrome":"49","opera":"36","edge":"13","firefox":"3","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"transform-unicode-escapes":{"chrome":"44","opera":"31","edge":"12","firefox":"53","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"transform-unicode-regex":{"chrome":"50","opera":"37","edge":"13","firefox":"46","safari":"12","node":"6","ios":"12","samsung":"5","electron":"1.1"},"transform-spread":{"chrome":"46","opera":"33","edge":"13","firefox":"45","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-destructuring":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-block-scoping":{"chrome":"49","opera":"36","edge":"14","firefox":"51","safari":"11","node":"6","ios":"11","samsung":"5","electron":"0.37"},"transform-typeof-symbol":{"chrome":"38","opera":"25","edge":"12","firefox":"36","safari":"9","node":"0.12","ios":"9","samsung":"3","rhino":"1.7.13","electron":"0.20"},"transform-new-target":{"chrome":"46","opera":"33","edge":"14","firefox":"41","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-regenerator":{"chrome":"50","opera":"37","edge":"13","firefox":"53","safari":"10","node":"6","ios":"10","samsung":"5","electron":"1.1"},"transform-member-expression-literals":{"chrome":"7","opera":"12","edge":"12","firefox":"2","safari":"5.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"transform-property-literals":{"chrome":"7","opera":"12","edge":"12","firefox":"2","safari":"5.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"transform-reserved-words":{"chrome":"13","opera":"10.50","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4.4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"proposal-export-namespace-from":{"chrome":"72","and_chr":"72","edge":"79","firefox":"80","and_ff":"80","node":"13.2","opera":"60","op_mob":"51","samsung":"11.0","android":"72","electron":"5.0"}}');

/***/ }),

/***/ "./node_modules/node-releases/data/processed/envs.json":
/*!*************************************************************!*\
  !*** ./node_modules/node-releases/data/processed/envs.json ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"name":"nodejs","version":"0.2.0","date":"2011-08-26","lts":false,"security":false},{"name":"nodejs","version":"0.3.0","date":"2011-08-26","lts":false,"security":false},{"name":"nodejs","version":"0.4.0","date":"2011-08-26","lts":false,"security":false},{"name":"nodejs","version":"0.5.0","date":"2011-08-26","lts":false,"security":false},{"name":"nodejs","version":"0.6.0","date":"2011-11-04","lts":false,"security":false},{"name":"nodejs","version":"0.7.0","date":"2012-01-17","lts":false,"security":false},{"name":"nodejs","version":"0.8.0","date":"2012-06-22","lts":false,"security":false},{"name":"nodejs","version":"0.9.0","date":"2012-07-20","lts":false,"security":false},{"name":"nodejs","version":"0.10.0","date":"2013-03-11","lts":false,"security":false},{"name":"nodejs","version":"0.11.0","date":"2013-03-28","lts":false,"security":false},{"name":"nodejs","version":"0.12.0","date":"2015-02-06","lts":false,"security":false},{"name":"nodejs","version":"4.0.0","date":"2015-09-08","lts":false,"security":false},{"name":"nodejs","version":"4.1.0","date":"2015-09-17","lts":false,"security":false},{"name":"nodejs","version":"4.2.0","date":"2015-10-12","lts":"Argon","security":false},{"name":"nodejs","version":"4.3.0","date":"2016-02-09","lts":"Argon","security":false},{"name":"nodejs","version":"4.4.0","date":"2016-03-08","lts":"Argon","security":false},{"name":"nodejs","version":"4.5.0","date":"2016-08-16","lts":"Argon","security":false},{"name":"nodejs","version":"4.6.0","date":"2016-09-27","lts":"Argon","security":true},{"name":"nodejs","version":"4.7.0","date":"2016-12-06","lts":"Argon","security":false},{"name":"nodejs","version":"4.8.0","date":"2017-02-21","lts":"Argon","security":false},{"name":"nodejs","version":"4.9.0","date":"2018-03-28","lts":"Argon","security":true},{"name":"nodejs","version":"5.0.0","date":"2015-10-29","lts":false,"security":false},{"name":"nodejs","version":"5.1.0","date":"2015-11-17","lts":false,"security":false},{"name":"nodejs","version":"5.2.0","date":"2015-12-09","lts":false,"security":false},{"name":"nodejs","version":"5.3.0","date":"2015-12-15","lts":false,"security":false},{"name":"nodejs","version":"5.4.0","date":"2016-01-06","lts":false,"security":false},{"name":"nodejs","version":"5.5.0","date":"2016-01-21","lts":false,"security":false},{"name":"nodejs","version":"5.6.0","date":"2016-02-09","lts":false,"security":false},{"name":"nodejs","version":"5.7.0","date":"2016-02-23","lts":false,"security":false},{"name":"nodejs","version":"5.8.0","date":"2016-03-09","lts":false,"security":false},{"name":"nodejs","version":"5.9.0","date":"2016-03-16","lts":false,"security":false},{"name":"nodejs","version":"5.10.0","date":"2016-04-01","lts":false,"security":false},{"name":"nodejs","version":"5.11.0","date":"2016-04-21","lts":false,"security":false},{"name":"nodejs","version":"5.12.0","date":"2016-06-23","lts":false,"security":false},{"name":"nodejs","version":"6.0.0","date":"2016-04-26","lts":false,"security":false},{"name":"nodejs","version":"6.1.0","date":"2016-05-05","lts":false,"security":false},{"name":"nodejs","version":"6.2.0","date":"2016-05-17","lts":false,"security":false},{"name":"nodejs","version":"6.3.0","date":"2016-07-06","lts":false,"security":false},{"name":"nodejs","version":"6.4.0","date":"2016-08-12","lts":false,"security":false},{"name":"nodejs","version":"6.5.0","date":"2016-08-26","lts":false,"security":false},{"name":"nodejs","version":"6.6.0","date":"2016-09-14","lts":false,"security":false},{"name":"nodejs","version":"6.7.0","date":"2016-09-27","lts":false,"security":true},{"name":"nodejs","version":"6.8.0","date":"2016-10-12","lts":false,"security":false},{"name":"nodejs","version":"6.9.0","date":"2016-10-18","lts":"Boron","security":false},{"name":"nodejs","version":"6.10.0","date":"2017-02-21","lts":"Boron","security":false},{"name":"nodejs","version":"6.11.0","date":"2017-06-06","lts":"Boron","security":false},{"name":"nodejs","version":"6.12.0","date":"2017-11-06","lts":"Boron","security":false},{"name":"nodejs","version":"6.13.0","date":"2018-02-10","lts":"Boron","security":false},{"name":"nodejs","version":"6.14.0","date":"2018-03-28","lts":"Boron","security":true},{"name":"nodejs","version":"6.15.0","date":"2018-11-27","lts":"Boron","security":true},{"name":"nodejs","version":"6.16.0","date":"2018-12-26","lts":"Boron","security":false},{"name":"nodejs","version":"6.17.0","date":"2019-02-28","lts":"Boron","security":true},{"name":"nodejs","version":"7.0.0","date":"2016-10-25","lts":false,"security":false},{"name":"nodejs","version":"7.1.0","date":"2016-11-08","lts":false,"security":false},{"name":"nodejs","version":"7.2.0","date":"2016-11-22","lts":false,"security":false},{"name":"nodejs","version":"7.3.0","date":"2016-12-20","lts":false,"security":false},{"name":"nodejs","version":"7.4.0","date":"2017-01-04","lts":false,"security":false},{"name":"nodejs","version":"7.5.0","date":"2017-01-31","lts":false,"security":false},{"name":"nodejs","version":"7.6.0","date":"2017-02-21","lts":false,"security":false},{"name":"nodejs","version":"7.7.0","date":"2017-02-28","lts":false,"security":false},{"name":"nodejs","version":"7.8.0","date":"2017-03-29","lts":false,"security":false},{"name":"nodejs","version":"7.9.0","date":"2017-04-11","lts":false,"security":false},{"name":"nodejs","version":"7.10.0","date":"2017-05-02","lts":false,"security":false},{"name":"nodejs","version":"8.0.0","date":"2017-05-30","lts":false,"security":false},{"name":"nodejs","version":"8.1.0","date":"2017-06-08","lts":false,"security":false},{"name":"nodejs","version":"8.2.0","date":"2017-07-19","lts":false,"security":false},{"name":"nodejs","version":"8.3.0","date":"2017-08-08","lts":false,"security":false},{"name":"nodejs","version":"8.4.0","date":"2017-08-15","lts":false,"security":false},{"name":"nodejs","version":"8.5.0","date":"2017-09-12","lts":false,"security":false},{"name":"nodejs","version":"8.6.0","date":"2017-09-26","lts":false,"security":false},{"name":"nodejs","version":"8.7.0","date":"2017-10-11","lts":false,"security":false},{"name":"nodejs","version":"8.8.0","date":"2017-10-24","lts":false,"security":false},{"name":"nodejs","version":"8.9.0","date":"2017-10-31","lts":"Carbon","security":false},{"name":"nodejs","version":"8.10.0","date":"2018-03-06","lts":"Carbon","security":false},{"name":"nodejs","version":"8.11.0","date":"2018-03-28","lts":"Carbon","security":true},{"name":"nodejs","version":"8.12.0","date":"2018-09-10","lts":"Carbon","security":false},{"name":"nodejs","version":"8.13.0","date":"2018-11-20","lts":"Carbon","security":false},{"name":"nodejs","version":"8.14.0","date":"2018-11-27","lts":"Carbon","security":true},{"name":"nodejs","version":"8.15.0","date":"2018-12-26","lts":"Carbon","security":false},{"name":"nodejs","version":"8.16.0","date":"2019-04-16","lts":"Carbon","security":false},{"name":"nodejs","version":"8.17.0","date":"2019-12-17","lts":"Carbon","security":true},{"name":"nodejs","version":"9.0.0","date":"2017-10-31","lts":false,"security":false},{"name":"nodejs","version":"9.1.0","date":"2017-11-07","lts":false,"security":false},{"name":"nodejs","version":"9.2.0","date":"2017-11-14","lts":false,"security":false},{"name":"nodejs","version":"9.3.0","date":"2017-12-12","lts":false,"security":false},{"name":"nodejs","version":"9.4.0","date":"2018-01-10","lts":false,"security":false},{"name":"nodejs","version":"9.5.0","date":"2018-01-31","lts":false,"security":false},{"name":"nodejs","version":"9.6.0","date":"2018-02-21","lts":false,"security":false},{"name":"nodejs","version":"9.7.0","date":"2018-03-01","lts":false,"security":false},{"name":"nodejs","version":"9.8.0","date":"2018-03-07","lts":false,"security":false},{"name":"nodejs","version":"9.9.0","date":"2018-03-21","lts":false,"security":false},{"name":"nodejs","version":"9.10.0","date":"2018-03-28","lts":false,"security":true},{"name":"nodejs","version":"9.11.0","date":"2018-04-04","lts":false,"security":false},{"name":"nodejs","version":"10.0.0","date":"2018-04-24","lts":false,"security":false},{"name":"nodejs","version":"10.1.0","date":"2018-05-08","lts":false,"security":false},{"name":"nodejs","version":"10.2.0","date":"2018-05-23","lts":false,"security":false},{"name":"nodejs","version":"10.3.0","date":"2018-05-29","lts":false,"security":false},{"name":"nodejs","version":"10.4.0","date":"2018-06-06","lts":false,"security":false},{"name":"nodejs","version":"10.5.0","date":"2018-06-20","lts":false,"security":false},{"name":"nodejs","version":"10.6.0","date":"2018-07-04","lts":false,"security":false},{"name":"nodejs","version":"10.7.0","date":"2018-07-18","lts":false,"security":false},{"name":"nodejs","version":"10.8.0","date":"2018-08-01","lts":false,"security":false},{"name":"nodejs","version":"10.9.0","date":"2018-08-15","lts":false,"security":false},{"name":"nodejs","version":"10.10.0","date":"2018-09-06","lts":false,"security":false},{"name":"nodejs","version":"10.11.0","date":"2018-09-19","lts":false,"security":false},{"name":"nodejs","version":"10.12.0","date":"2018-10-10","lts":false,"security":false},{"name":"nodejs","version":"10.13.0","date":"2018-10-30","lts":"Dubnium","security":false},{"name":"nodejs","version":"10.14.0","date":"2018-11-27","lts":"Dubnium","security":true},{"name":"nodejs","version":"10.15.0","date":"2018-12-26","lts":"Dubnium","security":false},{"name":"nodejs","version":"10.16.0","date":"2019-05-28","lts":"Dubnium","security":false},{"name":"nodejs","version":"10.17.0","date":"2019-10-22","lts":"Dubnium","security":false},{"name":"nodejs","version":"10.18.0","date":"2019-12-17","lts":"Dubnium","security":true},{"name":"nodejs","version":"10.19.0","date":"2020-02-05","lts":"Dubnium","security":true},{"name":"nodejs","version":"10.20.0","date":"2020-03-26","lts":"Dubnium","security":false},{"name":"nodejs","version":"10.21.0","date":"2020-06-02","lts":"Dubnium","security":true},{"name":"nodejs","version":"10.22.0","date":"2020-07-21","lts":"Dubnium","security":false},{"name":"nodejs","version":"10.23.0","date":"2020-10-27","lts":"Dubnium","security":false},{"name":"nodejs","version":"10.24.0","date":"2021-02-23","lts":"Dubnium","security":true},{"name":"nodejs","version":"11.0.0","date":"2018-10-23","lts":false,"security":false},{"name":"nodejs","version":"11.1.0","date":"2018-10-30","lts":false,"security":false},{"name":"nodejs","version":"11.2.0","date":"2018-11-15","lts":false,"security":false},{"name":"nodejs","version":"11.3.0","date":"2018-11-27","lts":false,"security":true},{"name":"nodejs","version":"11.4.0","date":"2018-12-07","lts":false,"security":false},{"name":"nodejs","version":"11.5.0","date":"2018-12-18","lts":false,"security":false},{"name":"nodejs","version":"11.6.0","date":"2018-12-26","lts":false,"security":false},{"name":"nodejs","version":"11.7.0","date":"2019-01-17","lts":false,"security":false},{"name":"nodejs","version":"11.8.0","date":"2019-01-24","lts":false,"security":false},{"name":"nodejs","version":"11.9.0","date":"2019-01-30","lts":false,"security":false},{"name":"nodejs","version":"11.10.0","date":"2019-02-14","lts":false,"security":false},{"name":"nodejs","version":"11.11.0","date":"2019-03-05","lts":false,"security":false},{"name":"nodejs","version":"11.12.0","date":"2019-03-14","lts":false,"security":false},{"name":"nodejs","version":"11.13.0","date":"2019-03-28","lts":false,"security":false},{"name":"nodejs","version":"11.14.0","date":"2019-04-10","lts":false,"security":false},{"name":"nodejs","version":"11.15.0","date":"2019-04-30","lts":false,"security":false},{"name":"nodejs","version":"12.0.0","date":"2019-04-23","lts":false,"security":false},{"name":"nodejs","version":"12.1.0","date":"2019-04-29","lts":false,"security":false},{"name":"nodejs","version":"12.2.0","date":"2019-05-07","lts":false,"security":false},{"name":"nodejs","version":"12.3.0","date":"2019-05-21","lts":false,"security":false},{"name":"nodejs","version":"12.4.0","date":"2019-06-04","lts":false,"security":false},{"name":"nodejs","version":"12.5.0","date":"2019-06-26","lts":false,"security":false},{"name":"nodejs","version":"12.6.0","date":"2019-07-03","lts":false,"security":false},{"name":"nodejs","version":"12.7.0","date":"2019-07-23","lts":false,"security":false},{"name":"nodejs","version":"12.8.0","date":"2019-08-06","lts":false,"security":false},{"name":"nodejs","version":"12.9.0","date":"2019-08-20","lts":false,"security":false},{"name":"nodejs","version":"12.10.0","date":"2019-09-04","lts":false,"security":false},{"name":"nodejs","version":"12.11.0","date":"2019-09-25","lts":false,"security":false},{"name":"nodejs","version":"12.12.0","date":"2019-10-11","lts":false,"security":false},{"name":"nodejs","version":"12.13.0","date":"2019-10-21","lts":"Erbium","security":false},{"name":"nodejs","version":"12.14.0","date":"2019-12-17","lts":"Erbium","security":true},{"name":"nodejs","version":"12.15.0","date":"2020-02-05","lts":"Erbium","security":true},{"name":"nodejs","version":"12.16.0","date":"2020-02-11","lts":"Erbium","security":false},{"name":"nodejs","version":"12.17.0","date":"2020-05-26","lts":"Erbium","security":false},{"name":"nodejs","version":"12.18.0","date":"2020-06-02","lts":"Erbium","security":true},{"name":"nodejs","version":"12.19.0","date":"2020-10-06","lts":"Erbium","security":false},{"name":"nodejs","version":"12.20.0","date":"2020-11-24","lts":"Erbium","security":false},{"name":"nodejs","version":"12.21.0","date":"2021-02-23","lts":"Erbium","security":true},{"name":"nodejs","version":"12.22.0","date":"2021-03-30","lts":"Erbium","security":false},{"name":"nodejs","version":"13.0.0","date":"2019-10-22","lts":false,"security":false},{"name":"nodejs","version":"13.1.0","date":"2019-11-05","lts":false,"security":false},{"name":"nodejs","version":"13.2.0","date":"2019-11-21","lts":false,"security":false},{"name":"nodejs","version":"13.3.0","date":"2019-12-03","lts":false,"security":false},{"name":"nodejs","version":"13.4.0","date":"2019-12-17","lts":false,"security":true},{"name":"nodejs","version":"13.5.0","date":"2019-12-18","lts":false,"security":false},{"name":"nodejs","version":"13.6.0","date":"2020-01-07","lts":false,"security":false},{"name":"nodejs","version":"13.7.0","date":"2020-01-21","lts":false,"security":false},{"name":"nodejs","version":"13.8.0","date":"2020-02-05","lts":false,"security":true},{"name":"nodejs","version":"13.9.0","date":"2020-02-18","lts":false,"security":false},{"name":"nodejs","version":"13.10.0","date":"2020-03-04","lts":false,"security":false},{"name":"nodejs","version":"13.11.0","date":"2020-03-12","lts":false,"security":false},{"name":"nodejs","version":"13.12.0","date":"2020-03-26","lts":false,"security":false},{"name":"nodejs","version":"13.13.0","date":"2020-04-14","lts":false,"security":false},{"name":"nodejs","version":"13.14.0","date":"2020-04-29","lts":false,"security":false},{"name":"nodejs","version":"14.0.0","date":"2020-04-21","lts":false,"security":false},{"name":"nodejs","version":"14.1.0","date":"2020-04-29","lts":false,"security":false},{"name":"nodejs","version":"14.2.0","date":"2020-05-05","lts":false,"security":false},{"name":"nodejs","version":"14.3.0","date":"2020-05-19","lts":false,"security":false},{"name":"nodejs","version":"14.4.0","date":"2020-06-02","lts":false,"security":true},{"name":"nodejs","version":"14.5.0","date":"2020-06-30","lts":false,"security":false},{"name":"nodejs","version":"14.6.0","date":"2020-07-20","lts":false,"security":false},{"name":"nodejs","version":"14.7.0","date":"2020-07-29","lts":false,"security":false},{"name":"nodejs","version":"14.8.0","date":"2020-08-11","lts":false,"security":false},{"name":"nodejs","version":"14.9.0","date":"2020-08-27","lts":false,"security":false},{"name":"nodejs","version":"14.10.0","date":"2020-09-08","lts":false,"security":false},{"name":"nodejs","version":"14.11.0","date":"2020-09-15","lts":false,"security":true},{"name":"nodejs","version":"14.12.0","date":"2020-09-22","lts":false,"security":false},{"name":"nodejs","version":"14.13.0","date":"2020-09-29","lts":false,"security":false},{"name":"nodejs","version":"14.14.0","date":"2020-10-15","lts":false,"security":false},{"name":"nodejs","version":"14.15.0","date":"2020-10-27","lts":"Fermium","security":false},{"name":"nodejs","version":"14.16.0","date":"2021-02-23","lts":"Fermium","security":true},{"name":"nodejs","version":"14.17.0","date":"2021-05-11","lts":"Fermium","security":false},{"name":"nodejs","version":"14.18.0","date":"2021-09-28","lts":"Fermium","security":false},{"name":"nodejs","version":"15.0.0","date":"2020-10-20","lts":false,"security":false},{"name":"nodejs","version":"15.1.0","date":"2020-11-04","lts":false,"security":false},{"name":"nodejs","version":"15.2.0","date":"2020-11-10","lts":false,"security":false},{"name":"nodejs","version":"15.3.0","date":"2020-11-24","lts":false,"security":false},{"name":"nodejs","version":"15.4.0","date":"2020-12-09","lts":false,"security":false},{"name":"nodejs","version":"15.5.0","date":"2020-12-22","lts":false,"security":false},{"name":"nodejs","version":"15.6.0","date":"2021-01-14","lts":false,"security":false},{"name":"nodejs","version":"15.7.0","date":"2021-01-25","lts":false,"security":false},{"name":"nodejs","version":"15.8.0","date":"2021-02-02","lts":false,"security":false},{"name":"nodejs","version":"15.9.0","date":"2021-02-18","lts":false,"security":false},{"name":"nodejs","version":"15.10.0","date":"2021-02-23","lts":false,"security":true},{"name":"nodejs","version":"15.11.0","date":"2021-03-03","lts":false,"security":false},{"name":"nodejs","version":"15.12.0","date":"2021-03-17","lts":false,"security":false},{"name":"nodejs","version":"15.13.0","date":"2021-03-31","lts":false,"security":false},{"name":"nodejs","version":"15.14.0","date":"2021-04-06","lts":false,"security":false},{"name":"nodejs","version":"16.0.0","date":"2021-04-20","lts":false,"security":false},{"name":"nodejs","version":"16.1.0","date":"2021-05-04","lts":false,"security":false},{"name":"nodejs","version":"16.2.0","date":"2021-05-19","lts":false,"security":false},{"name":"nodejs","version":"16.3.0","date":"2021-06-03","lts":false,"security":false},{"name":"nodejs","version":"16.4.0","date":"2021-06-23","lts":false,"security":false},{"name":"nodejs","version":"16.5.0","date":"2021-07-14","lts":false,"security":false},{"name":"nodejs","version":"16.6.0","date":"2021-07-29","lts":false,"security":true},{"name":"nodejs","version":"16.7.0","date":"2021-08-18","lts":false,"security":false},{"name":"nodejs","version":"16.8.0","date":"2021-08-25","lts":false,"security":false},{"name":"nodejs","version":"16.9.0","date":"2021-09-07","lts":false,"security":false},{"name":"nodejs","version":"16.10.0","date":"2021-09-22","lts":false,"security":false},{"name":"nodejs","version":"16.11.0","date":"2021-10-08","lts":false,"security":false},{"name":"nodejs","version":"16.12.0","date":"2021-10-20","lts":false,"security":false},{"name":"nodejs","version":"17.0.0","date":"2021-10-19","lts":false,"security":false}]');

/***/ }),

/***/ "./node_modules/node-releases/data/release-schedule/release-schedule.json":
/*!********************************************************************************!*\
  !*** ./node_modules/node-releases/data/release-schedule/release-schedule.json ***!
  \********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"v0.8":{"start":"2012-06-25","end":"2014-07-31"},"v0.10":{"start":"2013-03-11","end":"2016-10-31"},"v0.12":{"start":"2015-02-06","end":"2016-12-31"},"v4":{"start":"2015-09-08","lts":"2015-10-12","maintenance":"2017-04-01","end":"2018-04-30","codename":"Argon"},"v5":{"start":"2015-10-29","maintenance":"2016-04-30","end":"2016-06-30"},"v6":{"start":"2016-04-26","lts":"2016-10-18","maintenance":"2018-04-30","end":"2019-04-30","codename":"Boron"},"v7":{"start":"2016-10-25","maintenance":"2017-04-30","end":"2017-06-30"},"v8":{"start":"2017-05-30","lts":"2017-10-31","maintenance":"2019-01-01","end":"2019-12-31","codename":"Carbon"},"v9":{"start":"2017-10-01","maintenance":"2018-04-01","end":"2018-06-30"},"v10":{"start":"2018-04-24","lts":"2018-10-30","maintenance":"2020-05-19","end":"2021-04-30","codename":"Dubnium"},"v11":{"start":"2018-10-23","maintenance":"2019-04-22","end":"2019-06-01"},"v12":{"start":"2019-04-23","lts":"2019-10-21","maintenance":"2020-11-30","end":"2022-04-30","codename":"Erbium"},"v13":{"start":"2019-10-22","maintenance":"2020-04-01","end":"2020-06-01"},"v14":{"start":"2020-04-21","lts":"2020-10-27","maintenance":"2021-10-19","end":"2023-04-30","codename":"Fermium"},"v15":{"start":"2020-10-20","maintenance":"2021-04-01","end":"2021-06-01"},"v16":{"start":"2021-04-20","lts":"2021-10-26","maintenance":"2022-10-18","end":"2024-04-30","codename":""},"v17":{"start":"2021-10-19","maintenance":"2022-04-01","end":"2022-06-01"},"v18":{"start":"2022-04-19","lts":"2022-10-25","maintenance":"2023-10-18","end":"2025-04-30","codename":""}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************************!*\
  !*** ./tasks/streams/streams.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Streams": () => (/* reexport safe */ _API__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./API */ "./tasks/streams/API.js");


})();

streams = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=streams.js.map