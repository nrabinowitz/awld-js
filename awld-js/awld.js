(function(){Array.prototype.filter||(Array.prototype.filter=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;var d=[],e=arguments[1];for(var f=0;f<c;f++)if(f in b){var g=b[f];a.call(e,g,f,b)&&d.push(g)}return d}),Array.prototype.forEach||(Array.prototype.forEach=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;var d=arguments[1];for(var e=0;e<c;e++)e in b&&a.call(d,b[e],e,b)}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(c===0)return-1;var d=0;arguments.length>0&&(d=Number(arguments[1]),d!==d?d=0:d!==0&&d!==Infinity&&d!==-Infinity&&(d=(d>0||-1)*Math.floor(Math.abs(d))));if(d>=c)return-1;var e=d>=0?d:Math.max(c-Math.abs(d),0);for(;e<c;e++)if(e in b&&b[e]===a)return e;return-1}),Array.prototype.map||(Array.prototype.map=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;var d=new Array(c),e=arguments[1];for(var f=0;f<c;f++)f in b&&(d[f]=a.call(e,b[f],f,b));return d}),Array.prototype.reduce||(Array.prototype.reduce=function(a){"use strict";if(this===void 0||this===null)throw new TypeError;var b=Object(this),c=b.length>>>0;if(typeof a!="function")throw new TypeError;if(c==0&&arguments.length==1)throw new TypeError;var d=0,e;if(arguments.length>=2)e=arguments[1];else do{if(d in b){e=b[d++];break}if(++d>=c)throw new TypeError}while(!0);while(d<c)d in b&&(e=a.call(undefined,e,b[d],d,b)),d++;return e}),String.prototype.trim||(String.prototype.trim=function(){var a=/^\s+/,b=/\s+$/;return function(){return this.replace(a,"").replace(b,"")}}())})();var requirejs,require,define;(function(){function J(a){return N.call(a)==="[object Function]"}function F(a){return N.call(a)==="[object Array]"}function Z(a,b,c){for(var e in b)!(e in K)&&(!(e in a)||c)&&(a[e]=b[e]);return d}function O(a,b,c){return a=Error(b+"\nhttp://requirejs.org/docs/errors.html#"+a),c&&(a.originalError=c),a}function $(a,b,c){var d,e,f;for(d=0;f=b[d];d++)f=typeof f=="string"?{name:f}:f,e=f.location,c&&(!e||e.indexOf("/")!==0&&e.indexOf(":")===-1)&&(e=c+"/"+(e||f.name)),a[f.name]={name:f.name,location:e||f.name,main:(f.main||"main").replace(ea,"").replace(aa,"")}}function U(a,b){a.holdReady?a.holdReady(b):b?a.readyWait+=1:a.ready(!0)}function fa(a){function b(a,b){var c,d;if(a&&a.charAt(0)===".")if(b){u.pkgs[b]?b=[b]:(b=b.split("/"),b=b.slice(0,b.length-1)),c=a=b.concat(a.split("/"));var e;for(d=0;e=c[d];d++)if(e===".")c.splice(d,1),d-=1;else if(e===".."){if(d===1&&(c[2]===".."||c[0]===".."))break;d>0&&(c.splice(d-1,2),d-=2)}d=u.pkgs[c=a[0]],a=a.join("/"),d&&a===c+"/"+d.main&&(a=c)}else a.indexOf("./")===0&&(a=a.substring(2));return a}function c(a,c){var d=a?a.indexOf("!"):-1,e=null,f=c?c.name:null,g=a,h,i;return d!==-1&&(e=a.substring(0,d),a=a.substring(d+1,a.length)),e&&(e=b(e,f)),a&&(e?h=(d=y[e])&&d.normalize?d.normalize(a,function(a){return b(a,f)}):b(a,f):(h=b(a,f),i=x[h],i||(i=s.nameToUrl(a,null,c),x[h]=i))),{prefix:e,name:h,parentMap:c,url:i,originalName:g,fullName:e?e+"!"+(h||""):h}}function e(){var a=!0,b=u.priorityWait,c,d;if(b){for(d=0;c=b[d];d++)if(!z[c]){a=!1;break}a&&delete u.priorityWait}return a}function f(a,b,c){return function(){var d=ga.call(arguments,0),e;return c&&J(e=d[d.length-1])&&(e.__requireJsBuild=!0),d.push(b),a.apply(null,d)}}function g(a,b,c){return b=f(c||s.require,a,b),Z(b,{nameToUrl:f(s.nameToUrl,a),toUrl:f(s.toUrl,a),defined:f(s.requireDefined,a),specified:f(s.requireSpecified,a),isBrowser:d.isBrowser}),b}function h(a){var b,e,f,g=a.callback,h=a.map,i=h.fullName,j=a.deps;f=a.listeners;if(g&&J(g)){if(u.catchError.define)try{e=d.execCb(i,a.callback,j,y[i])}catch(k){b=k}else e=d.execCb(i,a.callback,j,y[i]);i&&((g=a.cjsModule)&&g.exports!==void 0&&g.exports!==y[i]?e=y[i]=a.cjsModule.exports:e===void 0&&a.usingExports?e=y[i]:(y[i]=e,G[i]&&(I[i]=!0)))}else i&&(e=y[i]=g,G[i]&&(I[i]=!0));A[a.id]&&(delete A[a.id],a.isDone=!0,s.waitCount-=1,s.waitCount===0&&(B=[])),delete E[i],d.onResourceLoad&&!a.placeholder&&d.onResourceLoad(s,h,a.depArray);if(b)return e=(i?c(i).url:"")||b.fileName||b.sourceURL,f=b.moduleTree,b=O("defineerror",'Error evaluating module "'+i+'" at location "'+e+'":\n'+b+"\nfileName:"+e+"\nlineNumber: "+(b.lineNumber||b.line),b),b.moduleName=i,b.moduleTree=f,d.onError(b);for(b=0;g=f[b];b++)g(e)}function i(a,b){return function(c){a.depDone[b]||(a.depDone[b]=!0,a.deps[b]=c,a.depCount-=1,a.depCount||h(a))}}function j(a,b){var e=b.map,f=e.fullName,i=e.name,j=F[a]||(F[a]=y[a]),k;b.loading||(b.loading=!0,k=function(a){b.callback=function(){return a},h(b),z[b.id]=!0,t()},k.fromText=function(a,b){var c=P;z[a]=!1,s.scriptCount+=1,s.fake[a]=!0,c&&(P=!1),d.exec(b),c&&(P=!0),s.completeLoad(a)},f in y?k(y[f]):j.load(i,g(e.parentMap,!0,function(a,d){var f=[],g,h;for(g=0;h=a[g];g++)h=c(h,e.parentMap),a[g]=h.fullName,h.prefix||f.push(a[g]);return b.moduleDeps=(b.moduleDeps||[]).concat(f),s.require(a,d)}),k,u))}function k(a){A[a.id]||(A[a.id]=a,B.push(a),s.waitCount+=1)}function l(a){this.listeners.push(a)}function m(a,b){var d=a.fullName,e=a.prefix,f=e?F[e]||(F[e]=y[e]):null,g,i;return d&&(g=E[d]),!g&&(i=!0,g={id:(e&&!f?D++ +"__p@:":"")+(d||"__r@"+D++),map:a,depCount:0,depDone:[],depCallbacks:[],deps:[],listeners:[],add:l},w[g.id]=!0,d&&(!e||F[e]))&&(E[d]=g),e&&!f?(d=c(e),e in y&&!y[e]&&(delete y[e],delete C[d.url]),e=m(d,!0),e.add(function(){var b=c(a.originalName,a.parentMap),b=m(b,!0);g.placeholder=!0,b.add(function(a){g.callback=function(){return a},h(g)})})):i&&b&&(z[g.id]=!1,s.paused.push(g),k(g)),g}function n(a,b,d,e){var a=c(a,e),f=a.name,j=a.fullName,l=m(a),n=l.id,o=l.deps,p;if(j){if(j in y||z[n]===!0||j==="jquery"&&u.jQuery&&u.jQuery!==d().fn.jquery)return;w[n]=!0,z[n]=!0,j==="jquery"&&d&&V(d())}l.depArray=b,l.callback=d;for(d=0;d<b.length;d++)if(n=b[d])n=c(n,f?a:e),p=n.fullName,b[d]=p,p==="require"?o[d]=g(a):p==="exports"?(o[d]=y[j]={},l.usingExports=!0):p==="module"?l.cjsModule=o[d]={id:f,uri:f?s.nameToUrl(f,null,e):void 0,exports:y[j]}:!(p in y)||p in A||j in G&&!(j in G&&I[p])?(j in G&&(G[p]=!0,delete y[p],C[n.url]=!1),l.depCount+=1,l.depCallbacks[d]=i(l,d),m(n,!0).add(l.depCallbacks[d])):o[d]=y[p];l.depCount?k(l):h(l)}function o(a){n.apply(null,a)}function p(a,b){var c=a.map.fullName,d=a.depArray,e=!0,f,g,h,i;if(a.isDone||!c||!z[c])return i;if(b[c])return a;b[c]=!0;if(d){for(f=0;f<d.length;f++){g=d[f];if(!z[g]&&!ha[g]){e=!1;break}if((h=A[g])&&!h.isDone&&z[g])if(i=p(h,b))break}e||(i=void 0,delete b[c])}return i}function q(a,b){var d=a.map.fullName,e=a.depArray,f,g,h,i;if(!a.isDone&&d&&z[d]){if(d){if(b[d])return y[d];b[d]=!0}if(e)for(f=0;f<e.length;f++)if(g=e[f])if((h=c(g).prefix)&&(i=A[h])&&q(i,b),(h=A[g])&&!h.isDone&&z[g])g=q(h,b),a.depCallbacks[f](g);return y[d]}}function r(){var a=u.waitSeconds*1e3,a=a&&s.startTime+a<(new Date).getTime(),b="",c=!1,f=!1,g=[],h,i;if(!(s.pausedCount>0)){if(u.priorityWait){if(!e())return;t()}for(h in z)if(!(h in K)&&(c=!0,!z[h]))if(a)b+=h+" ";else{if(f=!0,h.indexOf("!")===-1){g=[];break}(i=E[h]&&E[h].moduleDeps)&&g.push.apply(g,i)}if(c||s.waitCount){if(a&&b)return a=O("timeout","Load timeout for modules: "+b),a.requireType="timeout",a.requireModules=b,a.contextName=s.contextName,d.onError(a);if(f&&g.length)for(b=0;h=A[g[b]];b++)if(h=p(h,{})){q(h,{});break}if(!a&&(f||s.scriptCount))(H||ca)&&!W&&(W=setTimeout(function(){W=0,r()},50));else{if(s.waitCount){for(b=0;h=B[b];b++)q(h,{});s.paused.length&&t(),X<5&&(X+=1,r())}X=0,d.checkReadyState()}}}}var s,t,u={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},catchError:{}},v=[],w={require:!0,exports:!0,module:!0},x={},y={},z={},A={},B=[],C={},D=0,E={},F={},G={},I={},L=0;return V=function(a){!s.jQuery&&(a=a||(typeof jQuery!="undefined"?jQuery:null))&&(!u.jQuery||a.fn.jquery===u.jQuery)&&("holdReady"in a||"readyWait"in a)&&(s.jQuery=a,o(["jquery",[],function(){return jQuery}]),s.scriptCount)&&(U(a,!0),s.jQueryIncremented=!0)},t=function(){var a,b,c,f,g,h;s.takeGlobalQueue(),L+=1,s.scriptCount<=0&&(s.scriptCount=0);for(;v.length;){if(a=v.shift(),a[0]===null)return d.onError(O("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));o(a)}if(!u.priorityWait||e())for(;s.paused.length;){g=s.paused,s.pausedCount+=g.length,s.paused=[];for(f=0;a=g[f];f++)b=a.map,c=b.url,h=b.fullName,b.prefix?j(b.prefix,a):!C[c]&&!z[h]&&(d.load(s,h,c),c.indexOf("empty:")!==0&&(C[c]=!0));s.startTime=(new Date).getTime(),s.pausedCount-=g.length}L===1&&r(),L-=1},s={contextName:a,config:u,defQueue:v,waiting:A,waitCount:0,specified:w,loaded:z,urlMap:x,urlFetched:C,scriptCount:0,defined:y,paused:[],pausedCount:0,plugins:F,needFullExec:G,fake:{},fullExec:I,managerCallbacks:E,makeModuleMap:c,normalize:b,configure:function(a){var b,c,d;a.baseUrl&&a.baseUrl.charAt(a.baseUrl.length-1)!=="/"&&(a.baseUrl+="/"),b=u.paths,d=u.pkgs,Z(u,a,!0);if(a.paths){for(c in a.paths)c in K||(b[c]=a.paths[c]);u.paths=b}if((b=a.packagePaths)||a.packages){if(b)for(c in b)c in K||$(d,b[c],c);a.packages&&$(d,a.packages),u.pkgs=d}a.priority&&(c=s.requireWait,s.requireWait=!1,t(),s.require(a.priority),t(),s.requireWait=c,u.priorityWait=a.priority),(a.deps||a.callback)&&s.require(a.deps||[],a.callback)},requireDefined:function(a,b){return c(a,b).fullName in y},requireSpecified:function(a,b){return c(a,b).fullName in w},require:function(b,e,f){if(typeof b=="string")return J(e)?d.onError(O("requireargs","Invalid require call")):d.get?d.get(s,b,e):(e=c(b,e),b=e.fullName,b in y?y[b]:d.onError(O("notloaded","Module name '"+e.fullName+"' has not been loaded yet for context: "+a)));(b&&b.length||e)&&n(null,b,e,f);if(!s.requireWait)for(;!s.scriptCount&&s.paused.length;)t();return s.require},takeGlobalQueue:function(){T.length&&(ia.apply(s.defQueue,[s.defQueue.length-1,0].concat(T)),T=[])},completeLoad:function(a){var b;for(s.takeGlobalQueue();v.length;){if(b=v.shift(),b[0]===null){b[0]=a;break}if(b[0]===a)break;o(b),b=null}b?o(b):o([a,[],a==="jquery"&&typeof jQuery!="undefined"?function(){return jQuery}:null]),d.isAsync&&(s.scriptCount-=1),t(),d.isAsync||(s.scriptCount-=1)},toUrl:function(a,b){var c=a.lastIndexOf("."),d=null;return c!==-1&&(d=a.substring(c,a.length),a=a.substring(0,c)),s.nameToUrl(a,d,b)},nameToUrl:function(a,c,e){var f,g,h,i,j=s.config,a=b(a,e&&e.fullName);if(d.jsExtRegExp.test(a))c=a+(c?c:"");else{f=j.paths,g=j.pkgs,e=a.split("/");for(i=e.length;i>0;i--){if(h=e.slice(0,i).join("/"),f[h]){e.splice(0,i,f[h]);break}if(h=g[h]){a=a===h.name?h.location+"/"+h.main:h.location,e.splice(0,i,a);break}}c=e.join("/")+(c||".js"),c=(c.charAt(0)==="/"||c.match(/^\w+:/)?"":j.baseUrl)+c}return j.urlArgs?c+((c.indexOf("?")===-1?"?":"&")+j.urlArgs):c}},s.jQueryCheck=V,s.resume=t,s}function ja(){var a,b,c;if(B&&B.readyState==="interactive")return B;a=document.getElementsByTagName("script");for(b=a.length-1;b>-1&&(c=a[b]);b--)if(c.readyState==="interactive")return B=c;return null}var ka=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,la=/require\(\s*["']([^'"\s]+)["']\s*\)/g,ea=/^\.\//,aa=/\.js$/,N=Object.prototype.toString,t=Array.prototype,ga=t.slice,ia=t.splice,H=typeof window!="undefined"&&!!navigator&&!!document,ca=!H&&typeof importScripts!="undefined",ma=H&&navigator.platform==="PLAYSTATION 3"?/^complete$/:/^(complete|loaded)$/,da=typeof opera!="undefined"&&opera.toString()==="[object Opera]",K={},C={},T=[],B=null,X=0,P=!1,ha={require:!0,module:!0,exports:!0},d,t={},I,x,u,D,o,v,E,A,y,V,W;if(typeof define=="undefined"){if(typeof requirejs!="undefined"){if(J(requirejs))return;t=requirejs,requirejs=void 0}typeof require!="undefined"&&!J(require)&&(t=require,require=void 0),d=requirejs=function(a,b,c){var d="_",e;return!F(a)&&typeof a!="string"&&(e=a,F(b)?(a=b,b=c):a=[]),e&&e.context&&(d=e.context),c=C[d]||(C[d]=fa(d)),e&&c.configure(e),c.require(a,b)},d.config=function(a){return d(a)},require||(require=d),d.toUrl=function(a){return C._.toUrl(a)},d.version="1.0.7",d.jsExtRegExp=/^\/|:|\?|\.js$/,x=d.s={contexts:C,skipAsync:{}};if(d.isAsync=d.isBrowser=H)if(u=x.head=document.getElementsByTagName("head")[0],D=document.getElementsByTagName("base")[0])u=x.head=D.parentNode;d.onError=function(a){throw a},d.load=function(a,b,c){d.resourcesReady(!1),a.scriptCount+=1,d.attach(c,a,b),a.jQuery&&!a.jQueryIncremented&&(U(a.jQuery,!0),a.jQueryIncremented=!0)},define=function(a,b,c){var d,e;typeof a!="string"&&(c=b,b=a,a=null),F(b)||(c=b,b=[]),!b.length&&J(c)&&c.length&&(c.toString().replace(ka,"").replace(la,function(a,c){b.push(c)}),b=(c.length===1?["require"]:["require","exports","module"]).concat(b)),P&&(d=I||ja())&&(a||(a=d.getAttribute("data-requiremodule")),e=C[d.getAttribute("data-requirecontext")]),(e?e.defQueue:T).push([a,b,c])},define.amd={multiversion:!0,plugins:!0,jQuery:!0},d.exec=function(a){return eval(a)},d.execCb=function(a,b,c,d){return b.apply(d,c)},d.addScriptToDom=function(a){I=a,D?u.insertBefore(a,D):u.appendChild(a),I=null},d.onScriptLoad=function(a){var b=a.currentTarget||a.srcElement,c;if(a.type==="load"||b&&ma.test(b.readyState))B=null,a=b.getAttribute("data-requirecontext"),c=b.getAttribute("data-requiremodule"),C[a].completeLoad(c),b.detachEvent&&!da?b.detachEvent("onreadystatechange",d.onScriptLoad):b.removeEventListener("load",d.onScriptLoad,!1)},d.attach=function(a,b,c,e,f,g){var h;return H?(e=e||d.onScriptLoad,h=b&&b.config&&b.config.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),h.type=f||b&&b.config.scriptType||"text/javascript",h.charset="utf-8",h.async=!x.skipAsync[a],b&&h.setAttribute("data-requirecontext",b.contextName),h.setAttribute("data-requiremodule",c),h.attachEvent&&!da?(P=!0,g?h.onreadystatechange=function(){h.readyState==="loaded"&&(h.onreadystatechange=null,h.attachEvent("onreadystatechange",e),g(h))}:h.attachEvent("onreadystatechange",e)):h.addEventListener("load",e,!1),h.src=a,g||d.addScriptToDom(h),h):(ca&&(importScripts(a),b.completeLoad(c)),null)};if(H){o=document.getElementsByTagName("script");for(A=o.length-1;A>-1&&(v=o[A]);A--){u||(u=v.parentNode);if(E=v.getAttribute("data-main")){t.baseUrl||(o=E.split("/"),v=o.pop(),o=o.length?o.join("/")+"/":"./",t.baseUrl=o,E=v.replace(aa,"")),t.deps=t.deps?t.deps.concat(E):[E];break}}}d.checkReadyState=function(){var a=x.contexts,b;for(b in a)if(!(b in K)&&a[b].waitCount)return;d.resourcesReady(!0)},d.resourcesReady=function(a){var b,c;d.resourcesDone=a;if(d.resourcesDone)for(c in a=x.contexts,a)!(c in K)&&(b=a[c],b.jQueryIncremented)&&(U(b.jQuery,!1),b.jQueryIncremented=!1)},d.pageLoaded=function(){document.readyState!=="complete"&&(document.readyState="complete")},H&&document.addEventListener&&!document.readyState&&(document.readyState="loading",window.addEventListener("load",d.pageLoaded,!1)),d(t),d.isAsync&&typeof setTimeout!="undefined"&&(y=x.contexts[t.context||"_"],y.requireWait=!0,setTimeout(function(){y.requireWait=!1,y.scriptCount||y.resume(),d.checkReadyState()},0))}})(),define("registry",{"http://pleiades.stoa.org/places":"pleiades/place","http://lccn.loc.gov":"loc/lccn","http://www.worldcat.org/oclc":"worldcat/oclc","http://nomisma.org/id":"nomisma/nomisma","http://en.wikipedia.org/wiki":"wikipedia/page","http://fr.wikipedia.org/wiki":"wikipedia/page","http://wikipedia.org/wiki":"wikipedia/page","http://data.perseus.org/people/smith":"perseus/smith"}),define("text",{load:function(){}}),define("mustache",[],function(){var a=typeof module!="undefined"&&module.exports||{};return function(a){function b(a){return r.test(a)}function c(a){return String(a).replace(/&(?!\w+;)|[<>"']/g,function(a){return v[a]||a})}function d(a,b,c,d){d=d||"<template>";var e=b.split("\n"),f=Math.max(c-3,0),g=Math.min(e.length,c+3),h=e.slice(f,g),i;for(var j=0,k=h.length;j<k;++j)i=j+f+1,h[j]=(i===c?" >> ":"    ")+h[j];return a.template=b,a.line=c,a.file=d,a.message=[d+":"+c,h.join("\n"),"",a.message].join("\n"),a}function e(a,b,c){if(a===".")return b[b.length-1];var d=a.split("."),e=d.length-1,f=d[e],g,h,i=b.length,j,k;while(i){k=b.slice(0),h=b[--i],j=0;while(j<e){h=h[d[j++]];if(h==null)break;k.push(h)}if(h&&typeof h=="object"&&f in h){g=h[f];break}}return typeof g=="function"&&(g=g.call(k[k.length-1])),g==null?c:g}function f(a,b,c,d){var f="",g=e(a,b);if(d){if(g==null||g===!1||p(g)&&g.length===0)f+=c()}else if(p(g))q(g,function(a){b.push(a),f+=c(),b.pop()});else if(typeof g=="object")b.push(g),f+=c(),b.pop();else if(typeof g=="function"){var h=b[b.length-1],i=function(a){return k(a,h)};f+=g.call(h,c(),i)||""}else g&&(f+=c());return f}function g(c,e){e=e||{};var f=e.tags||a.tags,g=f[0],h=f[f.length-1],i=['var buffer = "";',"\nvar line = 1;","\ntry {",'\nbuffer += "'],j=[],k=!1,l=!1,m=function(){if(k&&!l&&!e.space)while(j.length)i.splice(j.pop(),1);else j=[];k=!1,l=!1},n=[],o,p,q,r=function(a){f=s(a).split(/\s+/),p=f[0],q=f[f.length-1]},t=function(a){i.push('";',o,'\nvar partial = partials["'+s(a)+'"];',"\nif (partial) {","\n  buffer += render(partial,stack[stack.length - 1],partials);","\n}",'\nbuffer += "')},u=function(a,b){var f=s(a);if(f==="")throw d(new Error("Section name may not be empty"),c,z,e.file);n.push({name:f,inverted:b}),i.push('";',o,'\nvar name = "'+f+'";',"\nvar callback = (function () {","\n  return function () {",'\n    var buffer = "";','\nbuffer += "')},v=function(a){u(a,!0)},w=function(a){var b=s(a),f=n.length!=0&&n[n.length-1].name;if(!f||b!=f)throw d(new Error('Section named "'+b+'" was never opened'),c,z,e.file);var g=n.pop();i.push('";',"\n    return buffer;","\n  };","\n})();"),g.inverted?i.push("\nbuffer += renderSection(name,stack,callback,true);"):i.push("\nbuffer += renderSection(name,stack,callback);"),i.push('\nbuffer += "')},x=function(a){i.push('";',o,'\nbuffer += lookup("'+s(a)+'",stack,"");','\nbuffer += "')},y=function(a){i.push('";',o,'\nbuffer += escapeHTML(lookup("'+s(a)+'",stack,""));','\nbuffer += "')},z=1,A,B;for(var C=0,D=c.length;C<D;++C)if(c.slice(C,C+g.length)===g){C+=g.length,A=c.substr(C,1),o="\nline = "+z+";",p=g,q=h,k=!0;switch(A){case"!":C++,B=null;break;case"=":C++,h="="+h,B=r;break;case">":C++,B=t;break;case"#":C++,B=u;break;case"^":C++,B=v;break;case"/":C++,B=w;break;case"{":h="}"+h;case"&":C++,l=!0,B=x;break;default:l=!0,B=y}var E=c.indexOf(h,C);if(E===-1)throw d(new Error('Tag "'+g+'" was not closed properly'),c,z,e.file);var F=c.substring(C,E);B&&B(F);var G=0;while(~(G=F.indexOf("\n",G)))z++,G++;C=E+h.length-1,g=p,h=q}else{A=c.substr(C,1);switch(A){case'"':case"\\":l=!0,i.push("\\"+A);break;case"\r":break;case"\n":j.push(i.length),i.push("\\n"),m(),z++;break;default:b(A)?j.push(i.length):l=!0,i.push(A)}}if(n.length!=0)throw d(new Error('Section "'+n[n.length-1].name+'" was not closed properly'),c,z,e.file);m(),i.push('";',"\nreturn buffer;","\n} catch (e) { throw {error: e, line: line}; }");var H=i.join("").replace(/buffer \+= "";\n/g,"");return e.debug&&(typeof console!="undefined"&&console.log?console.log(H):typeof print=="function"&&print(H)),H}function h(a,b){var h="view,partials,stack,lookup,escapeHTML,renderSection,render",i=g(a,b),j=new Function(h,i);return function(g,h){h=h||{};var i=[g];try{return j(g,h,i,e,c,f,k)}catch(l){throw d(l.error,a,l.line,b.file)}}}function i(){w={}}function j(a,b){return b=b||{},b.cache!==!1?(w[a]||(w[a]=h(a,b)),w[a]):h(a,b)}function k(a,b,c){return j(a)(b,c)}a.name="mustache.js",a.version="0.5.0-dev",a.tags=["{{","}}"],a.parse=g,a.compile=j,a.render=k,a.clearCache=i,a.to_html=function(a,b,c,d){var e=k(a,b,c);if(typeof d!="function")return e;d(e)};var l=Object.prototype.toString,m=Array.isArray,n=Array.prototype.forEach,o=String.prototype.trim,p;m?p=m:p=function(a){return l.call(a)==="[object Array]"};var q;n?q=function(a,b,c){return n.call(a,b,c)}:q=function(a,b,c){for(var d=0,e=a.length;d<e;++d)b.call(c,a[d],d,a)};var r=/^\s*$/,s;if(o)s=function(a){return a==null?"":o.call(a)};else{var t,u;b(" ")?(t=/^\s+/,u=/\s+$/):(t=/^[\s\xA0]+/,u=/[\s\xA0]+$/),s=function(a){return a==null?"":String(a).replace(t,"").replace(u,"")}}var v={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},w={}}(a),a}),define("types",[],function(){function a(a){return n[a]||a}function b(b){return l[a(b)]||"Unknown"}function c(b){return b=a(b),b in m?l[b]:l[b]+"s"}function d(b){var c=(b||"").split(/\s+/),d=c.length,e;while(d--)if(e=c[d].match(/awld-type-(.+)/))return a(e[1])}var e="person",f="place",g="event",h="citation",i="text",j="object",k=[h,g,e,f,j,i],l={},m={},n={};return l[e]="Person",l[f]="Place",l[g]="Event",l[h]="Bibliographic Citation",l[i]="Text",l[j]="Physical Object",n["dc:Agent"]=e,n["foaf:Person"]=e,n["dc:Location"]=f,n["dc:BibliographicResource"]=h,n["dcmi:PhysicalObject"]=j,n["dcmi:Event"]=g,n["dcmi:Text"]=i,{types:k,map:a,label:b,pluralLabel:c,fromClass:d}}),define("text!ui/core.css",[],function(){return".awld .aw-panel{font-family:Tahoma,Verdana,sans-serif;font-size:11px;border:1px solid #ccc;background:#fff;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-moz-box-shadow:1px 2px 2px 0 #666;-webkit-box-shadow:1px 2px 2px 0 #666;box-shadow:1px 2px 2px 0 #666;display:none;position:absolute;margin:13px 0 0 -1px;border-top:0;width:320px}.awld .aw-index{font-family:Tahoma,Verdana,sans-serif;font-size:11px;border:1px solid #ccc;background:#fff;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-moz-box-shadow:1px 2px 2px 0 #666;-webkit-box-shadow:1px 2px 2px 0 #666;box-shadow:1px 2px 2px 0 #666;position:relative;display:inline-block}.awld .aw-group{padding:2px 6px;display:none}.awld .aw-group:last-child{padding-bottom:.8em}.awld .aw-tab{padding:2px 6px;background:#fff}.awld .aw-ctrl{margin-top:.5em;padding:2px 6px;border-bottom:1px solid #ccc}.awld .aw-ctrl span{color:#999}.awld .aw-ctrl div{display:inline-block;border:1px solid #ccc;border-bottom:0;margin-bottom:-4px;padding:0 .3em 3px .3em;background:#fff;border-top-left-radius:3px;border-top-right-radius:3px}.awld .aw-ctrl div.off{background:#DDD;cursor:pointer}.awld .aw-modules{display:none}.awld hr{display:none;margin:14px 0 0 0;width:320px;position:absolute;border:0;border-top:1px solid #ccc;-moz-box-shadow:1px 2px 2px 0 #666;-webkit-box-shadow:1px 2px 2px 0 #666;box-shadow:1px 2px 2px 0 #666}.awld a,.awld .refs{color:#900;cursor:pointer}.awld a:hover,.awld .refs:hover{color:#D00}.awld h2{font-size:1em;margin:.5em 0 0 0}.awld p{margin:.3em 0}.awld-pop{position:absolute;top:0;left:0;display:none;padding:5px}.awld-pop.top{margin-top:-7px}.awld-pop.right{margin-left:12px}.awld-pop.bottom{margin-top:10px}.awld-pop.left{margin-left:-12px}.awld-pop.top .arrow{bottom:0;left:50%;margin-bottom:-9px}.awld-pop.right .arrow{top:50%;left:0;width:15px;height:28px;margin:-14px 0 0 -9px;background-position:-28px 0}.awld-pop.bottom .arrow{top:0;left:50%;margin-top:-9px;background-position:0 -15px}.awld-pop.left .arrow{top:50%;right:0;width:15px;height:28px;margin:-14px -9px 0 0;background-position:-43px 0}.awld-pop .arrow{position:absolute;margin-left:-14px;height:15px;width:28px;background:url(///ui/images/arrow.png) no-repeat 0 0}.awld-pop-inner{width:280px;height:180px;overflow-x:hidden;overflow-y:auto;font-family:Tahoma,Verdana,sans-serif;font-size:11px;border:1px solid #ccc;background:#fff;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-moz-box-shadow:1px 2px 2px 0 #666;-webkit-box-shadow:1px 2px 2px 0 #666;box-shadow:1px 2px 2px 0 #666;padding:2px 6px}.awld-pop-inner.loading{background-image:url(///ui/images/ajax-loader.gif);background-repeat:no-repeat;background-position:50% 50%}.awld-pop-inner .res-type{font-weight:normal;color:#33C}.awld-pop-inner .media{margin:1em 1em 0 0;float:left}.awld-pop-inner p{margin:1em 1em 0 0}"}),define("text!ui/index.htmlc",[],function(){return'<div id=aw-index class=awld> <hr/> <div class=aw-index> <div class=aw-panel> <div class=aw-ctrl> <span>Show by:</span> <div>Type</div> <div class=off>Source</div> </div> <div>{{#t}}{{> grp}}{{/t}}</div> <div style="display:none;">{{#m}}{{> grp}}{{/m}}</div> </div> <div class=aw-tab> Ancient World Data: <span class=refs>{{c}} Reference{{p}}</span> </div> </div> </div>'}),define("text!ui/index-grp.htmlc",[],function(){return'<div class=aw-group> <h2>{{name}}</h2> {{#res}} <p><a href="{{href}}" target=_blank>{{name}}</a></p> {{/res}} </div>'}),define("text!ui/pop.htmlc",[],function(){return'<div class=awld-pop> <div class=awld-pop-inner> <div class="awld-content awld"></div> <div class=arrow></div> </div> </div>'}),define("text!ui/details.htmlc",[],function(){return'<h2>{{#?.type}}<span class=res-type>{{type}}:</span>{{/?.type}} {{name}}</h2> <div><a href="{{href}}" target=_blank>{{href}}</a></div> {{#?.latlon}} <div class=media><img src="http://maps.google.com/maps/api/staticmap?size=120x120&amp;zoom=4&amp;markers=color:blue%7C{{latlon}}&amp;sensor=false&amp;maptype=terrain"></div> {{/?.latlon}} <p>{{{description}}}</p>'}),define("ui",["jquery","mustache","types","text!ui/core.css","text!ui/index.htmlc","text!ui/index-grp.htmlc","text!ui/pop.htmlc","text!ui/details.htmlc"],function(a,b,c,d,e,f,g,h){function i(b){var d=b.data||{},e=c.label(b.type);return a.extend({},d,{href:b.href,type:e,name:b.name(),"?":{latlon:!!d.latlon,type:e&&e!="Unknown"}})}function j(b){b=b.replace(/\/\/\//g,awld.baseUrl);var c=a("<style>"+b+"</style>").appendTo("head")}function k(){var c=r.map(function(a){return{name:a.name,res:a.resources.map(i)}}),d=c.reduce(function(a,b){return a.concat(b.res)},[]),g=d.length,h=g!=1?"s":"",j=[],k=d.reduce(function(a,b){var c=b.type;return c in a||(a[c]=j[j.length]={name:c,res:[]}),a[c].res.push(b),a},{}),l=a(b.render(e,{c:g,p:h,m:c,t:j.sort(function(a,b){return a.name>b.name?1:-1})},{grp:f})),m=a(".aw-panel",l).add("hr",l),o=m.find(".aw-group");return a(".refs",l).toggle(function(){n(),m.show(),o.slideToggle("fast")},function(){o.slideToggle("fast",function(){m.hide()})}),a(".aw-ctrl",l).delegate("div.off","click",function(){a(".aw-ctrl div",l).toggleClass("off"),a(".aw-panel > div",l).not(".aw-ctrl").toggle()}),r.forEach(function(a){a.resources.forEach(function(a){a.ready(function(){a.data&&l.find('a[href="'+a.href+'"]').text(a.name())})})}),l}function l(b){var c=a(b).first();c.length&&c.append(k())}function m(b,c){function d(b){a(".awld-content",s).html(b),a(".awld-pop-inner",s).toggleClass("loading",!b)}s=s||a(g),d(""),a.isFunction(c)?c(d):d(c),s.remove().css({top:0,left:0,display:"block"}).appendTo(document.body);var e=a.extend({},b.offset(),{width:b[0].offsetWidth,height:b[0].offsetHeight}),f=s[0].offsetWidth,h=s[0].offsetHeight,i=a(window).width(),j=5,k=e.left+e.width/2-f/2,l=e.top+e.height/2-h/2,m=k<j?{placement:"right",top:l,left:e.left+e.width}:k+f+j>i?{placement:"left",top:l,left:e.left-f}:e.top-h<j+window.scrollY?{placement:"bottom",top:e.top+e.height,left:k}:{placement:"top",top:e.top-h,left:k};s.css(m).removeClass("top bottom left right").addClass(m.placement)}function n(){s&&s.remove()}function o(a,b){var c=awld.popupClose;if(c=="manual")a.mouseover(function(){m(a,b)});else{var d=function(){t&&clearTimeout(t),t=0},e=function(){d(),t=setTimeout(function(){n(),t=0},c)};a.hover(function(){d(),m(a,b),s.bind("mouseover",d).bind("mouseleave",function(){d(),n(),s.unbind("mouseleave mouseover")})},function(){e()})}}function p(a){return b.render(h,i(a))}function q(a){r=a,r.length&&j(d),l(".awld-index")}var r,s,t;return{name:"core",loadStyles:j,addIndex:l,showPopup:m,hidePopup:n,addPopup:o,detailView:p,init:q}}),function(a){function h(a,b){for(var c in b)a[c]=b[c]}function i(a){return typeof a=="string"}var b={},c=document.getElementsByTagName("script"),d=c[c.length-1],e=d.src,f=e.replace(/awld\.js.*/,""),g=!!e.match(/autoinit/);awld={baseUrl:f,modulePath:"modules/",libPath:"lib/",paths:{},version:'0.1.0',modules:[],moduleMap:{},autoLoad:!0,popupClose:1500,registerModule:function(a,c){b[a]=c},extend:function(a){h(awld,a)}},init=awld.init=function(c){var d=i(c)||c&&(c.nodeType||c.jquery),e=c===Object(c)&&!d;e&&awld.extend(c);var f=d?c:awld.scope,g=a.jQuery,h=g&&!!g.fn.jquery.match(/^1\.[0-4]/),j=awld.paths,k=awld.libPath,l=awld.modulePath,m=awld.onLoad,n=k+"jquery/jquery-1.7.2.min",o;!g||h?(j.jquery=n,o=h):define("jquery",[],function(){return g}),j.handlebars=k+"handlebars.runtime",j.mustache=k+"mustache.0.5.0-dev",require.config({baseUrl:awld.baseUrl,paths:j}),require(["jquery","registry","ui","types"],function(a,c,d,e){a.extend(c,b),o&&a.noConflict(!0),awld.accessor=function(b){return $xml=a(b),function(b,c){var d=a(b,$xml).map(function(){return c?a(this).attr(c):a(this).text()}).toArray();return d.length>1?d:d[0]}};var g=awld.Resource=function(b){var c=[],d=b.module,f=d.noFetch,g=d.dataType,h=g=="jsonp",i=d.corsEnabled,j=d.parseData,k=!1,l=!1,m=function(a){return"http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20"+g+"%20where%20url%3D%22"+a+"%22&format="+g+"&diagnostics=false&callback=?"};return a.extend({ready:function(a){l||f?a():(c.push(a),this.fetch())},fetch:function(){if(!k&&!f){k=!0;var b=this,n=j,o=a.extend({url:b.uri,dataType:g,success:function(a){try{b.data=n(a),b.type||(b.type=e.map(d.getType(a)))}catch(f){}c.forEach(function(a){a(b)}),l=b.loaded=!0},error:function(){}},d.ajaxOptions),p=function(){o.url=m(o.url),o.dataType="jsonp",n=function(a){return a=a&&(a.results&&a.results[0]||a.query.results)||{},j(a)},a.ajax(o)};!h&&i&&(o.error=function(){p()}),h||i||d.local?a.ajax(o):p()}},name:function(){return this.data&&this.data.name||this.linkText}},b)},h=awld.Module=function(b){var c={},f=function(a){return a},h=function(){};return a.extend({init:function(){var b=this,c=b.resources=[];b.resourceMap=b.$refs.toArray().reduce(function(d,f){var h=a(f),i=h.attr("href"),j=e.fromClass(h.attr("class"))||e.map(b.type);return i in d||(d[i]=g({module:b,uri:b.toDataUri(i),href:i,linkText:h.attr("title")||h.text(),type:j}),c.push(d[i])),h.data("resource",d[i]),d},{}),awld.autoLoad&&c.forEach(function(a){a.fetch()}),b.$refs.each(function(){var c=a(this),e=c.data("resource");d.addPopup(c,function(a){e.ready(function(){a(b.detailView(e))})})}),b.initialize()},toDataUri:f,parseData:f,getType:h,dataType:"json",detailView:d.detailView,initialize:h},b)},i=0,j=0,k=awld.modules,m=function(a,b){awld.moduleMap[a]=b,k.push(b),++j==i&&(awld.loaded=!0,d.init(k))};a(function(){var b=".awld-scope";!f&&a(b).length&&(f=b),a.each(c,function(b,c){var d=a('a[href^="'+b+'"]',f),e=c.indexOf("http")===0?c:l+c;d.length&&(i++,require([e],function(a){a.$refs=d,a.moduleName=c,a=h(a),a.init(),m(c,a)}))})})})},a.awld=awld,g&&init()}(window);