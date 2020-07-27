var globalThis=this,global=this;function __skpm_run(e,t){globalThis.context=t;try{var n=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=14)}([function(e,t){e.exports=require("sketch")},function(e,t,n){e.exports.exec=n(11),e.exports.execFile=n(4),e.exports.spawn=n(5),e.exports.spawnSync=n(3),e.exports.execFileSync=n(10),e.exports.execSync=n(13)},function(e,t){e.exports=require("sketch/settings")},function(e,t,n){var r=n(8),o=n(9);e.exports=function e(t,n,i){var a=o(t,n,i);if("."!==a.file[0]&&"/"!==a.file[0]&&"~"!==a.file[0]){var s=e("/bin/bash",["-l","-c","which "+a.file],{encoding:"utf8"});if(s.err)return s;var l=String(s.stdout).trim();return l.length?e(l,n,i):{err:new Error(String(a.file)+" ENOENT")}}var c=a.options,u=NSPipe.pipe(),d=NSPipe.pipe();try{var f=NSTask.alloc().init();f.setLaunchPath(NSString.stringWithString(a.file).stringByExpandingTildeInPath()),f.arguments=NSArray.arrayWithArray(a.args||[]),a.envPairs&&(f.environment=a.envPairs),c.cwd&&f.setCurrentDirectoryPath(NSString.stringWithString(c.cwd).stringByExpandingTildeInPath()),f.setStandardOutput(u),f.setStandardError(d),f.launch(),f.waitUntilExit();var p,g,h,m=!1,y=!1;return"ignored"===a.stdio[1]?m=!0:1===a.stdio[1]?(p=u.fileHandleForReading().readDataToEndOfFile(),g=r(p,c.encoding||"buffer"),console.log(g)):2===a.stdio[1]&&(p=u.fileHandleForReading().readDataToEndOfFile(),g=r(p,c.encoding||"buffer"),console.error(g)),"ignored"===a.stdio[2]?y=!0:1===a.stdio[2]?(p=d.fileHandleForReading().readDataToEndOfFile(),h=r(p,c.encoding||"buffer"),console.log(h)):2===a.stdio[2]&&(p=d.fileHandleForReading().readDataToEndOfFile(),h=r(p,c.encoding||"buffer"),console.error(h)),{pid:String(f.processIdentifier()),status:Number(f.terminationStatus()),get stdout(){return m?null:g||(p=u.fileHandleForReading().readDataToEndOfFile(),r(p,c.encoding||"buffer"))},get stderr(){return y?null:h?g:(p=d.fileHandleForReading().readDataToEndOfFile(),r(p,c.encoding||"buffer"))}}}catch(E){return{err:E}}}},function(e,t,n){var r=n(5),o=n(8);function i(e,t){return e.appendData(t),e}e.exports=function(e,t,n,a){var s={encoding:"utf8",timeout:0,maxBuffer:204800,killSignal:"SIGTERM",cwd:void 0,env:void 0,shell:!1};"function"==typeof t?(a=t,t=[],n=s):"object"!=typeof t||Array.isArray(t)?n=Object.assign(s,n):(a=n,n=Object.assign(s,t),t=[]),function(e){if(null!=e&&!(Number.isInteger(e)&&e>=0))throw new Error("ERR_OUT_OF_RANGE options.timeout")}(n.timeout),function(e){if(null!=e&&!("number"==typeof e&&e>=0))throw new Error("ERR_OUT_OF_RANGE options.maxBuffer")}(n.maxBuffer);var l,c=r(e,t,{cwd:n.cwd,env:n.env,gid:n.gid,uid:n.uid,shell:n.shell}),u=n.encoding,d=[],f=[],p=0,g=0,h=!1,m=!1,y=null,E=e;function v(e,n){if(!m&&(m=!0,l&&(clearTimeout(l),l=null),a)){var r=o(NSData.dataWithData(d.reduce(i,NSMutableData.data())),u),s=o(NSData.dataWithData(f.reduce(i,NSMutableData.data())),u);y||0!==e||null!==n?(0!==t.length&&(E+=" "+t.join(" ")),y||((y=new Error("Command failed: "+E+"\n"+s)).killed=c.killed||h,y.code=e,y.signal=n),y.cmd=E,a(y,r,s)):a(null,r,s)}}function S(){h=!0;try{c.kill(n.killSignal)}catch(e){y=e,v()}}return n.timeout>0&&(l=setTimeout((function(){S(),l=null}),n.timeout)),c.stdout&&(c.stdout.setEncoding("NSData"),c.stdout.on("data",(function(e){(p+=e.length())>n.maxBuffer?(y=new Error("ERR_CHILD_PROCESS_STDIO_MAXBUFFER stdout"),S()):d.push(e)}))),c.stderr&&(c.stderr.setEncoding("NSData"),c.stderr.on("data",(function(e){(g+=e.length())>n.maxBuffer?(y=new Error("ERR_CHILD_PROCESS_STDIO_MAXBUFFER stderr"),S()):f.push(e)}))),c.addListener("close",v),c.addListener("error",(function(e){y=e,v()})),c}},function(e,t,n){var r=n(6).Buffer,o=n(12),i=n(7).Readable,a=n(7).Writable,s=n(3),l=n(9);e.exports=function e(t,n,c){var u=l(t,n,c),d=new o;if("."!==u.file[0]&&"/"!==u.file[0]&&"~"!==u.file[0]){var f=s("/bin/bash",["-l","-c","which "+u.file],{encoding:"utf8"}),p=String(f.stdout||"").trim();return f.err||!p.length?(d.stderr=new o,d.stdout=new o,d.pid="-1",d.stderr.setEncoding=function(e){d.stderr.encoding=e},d.stdout.setEncoding=function(e){d.stdout.encoding=e},p.length?d.emit("error",f.err):d.emit("error",new Error(String(u.file)+" ENOENT")),d):e(p,n,c)}var g=u.options;d.killed=!1;var h,m=coscript.createFiber(),y=null,E=!1,v=!1;d.stderr=new i({read:function(){E=!0}}),d.stdout=new i({read:function(){v=!0}}),d.sdtin=new a({write:function(e,t,n){h.standardInput().fileHandleForWriting().writeData(e.toNSData()),n()},final:function(e){h.standardInput().fileHandleForWriting().closeFile(),e()}}),d.sdtio=[d.sdtin,d.sdtout,d.sdterr];try{h=NSTask.alloc().init();var S=NSPipe.pipe(),b=NSPipe.pipe(),x=NSPipe.pipe();h.setStandardInput(S),h.setStandardOutput(b),h.setStandardError(x),h.standardOutput().fileHandleForReading().setReadabilityHandler(__mocha__.createBlock_function('v16@?0@"NSFileHandle"8',(function(e){try{(t=e.availableData())&&t.length()&&v&&(d.stdout.push(r.from(t))||(v=!1,h.standardOutput().fileHandleForReading().setReadabilityHandler(null)))}catch(n){"undefined"!=typeof process&&process.listenerCount&&process.listenerCount("uncaughtException")?process.emit("uncaughtException",n,"uncaughtException"):console.error(n)}var t}))),h.standardError().fileHandleForReading().setReadabilityHandler(__mocha__.createBlock_function('v16@?0@"NSFileHandle"8',(function(e){try{(t=e.availableData())&&t.length()&&E&&(d.stderr.push(r.from(t))||(E=!1,h.standardError().fileHandleForReading().setReadabilityHandler(null)))}catch(n){"undefined"!=typeof process&&process.listenerCount&&process.listenerCount("uncaughtException")?process.emit("uncaughtException",n,"uncaughtException"):console.error(n)}var t}))),h.setLaunchPath(NSString.stringWithString(u.file).stringByExpandingTildeInPath()),h.arguments=NSArray.arrayWithArray(u.args||[]),u.envPairs&&(h.environment=u.envPairs),g.cwd&&h.setCurrentDirectoryPath(NSString.stringWithString(g.cwd).stringByExpandingTildeInPath()),h.setTerminationHandler(__mocha__.createBlock_function('v16@?0@"NSTask"8',(function(e){try{e.standardError().fileHandleForReading().setReadabilityHandler(null),e.standardOutput().fileHandleForReading().setReadabilityHandler(null),d.stderr.emit("close"),d.stdout.emit("close"),d.killed=!0,d.emit("close",Number(e.terminationStatus()),y)}catch(t){"undefined"!=typeof process&&process.listenerCount&&process.listenerCount("uncaughtException")?process.emit("uncaughtException",t,"uncaughtException"):console.error(t)}m.cleanup()}))),h.launch()}catch(_){return m.cleanup(),setImmediate((function(){d.emit("error",_)})),d}return d.kill=function(e){d.killed||(y=e,h.terminate())},d.pid=String(h.processIdentifier()),d}},function(e,t){e.exports=require("buffer")},function(e,t){e.exports=require("stream")},function(e,t,n){var r=n(6).Buffer;e.exports=function(e,t){return function(e,t){return"buffer"===t?e:"NSData"===t?e.toNSData():e.toString(t)}(r.from(e),t)}},function(e,t){e.exports=function(e,t,n){if("string"!=typeof e||0===e.length)throw new Error("ERR_INVALID_ARG_TYPE");if(Array.isArray(t))t=t.slice(0);else{if(void 0!==t&&(null===t||"object"!=typeof t))throw new Error("ERR_INVALID_ARG_TYPE args");n=t,t=[]}if(void 0===n)n={};else if(null===n||"object"!=typeof n)throw new Error("ERR_INVALID_ARG_TYPE options");if(null!=n.cwd&&"string"!=typeof n.cwd)throw new Error("ERR_INVALID_ARG_TYPE options.cwd");if(null!=n.detached&&"boolean"!=typeof n.detached)throw new Error("ERR_INVALID_ARG_TYPE options.detached");if(null!=n.uid&&!Number.isInteger(n.uid))throw new Error("ERR_INVALID_ARG_TYPE options.uid");if(null!=n.gid&&!Number.isInteger(n.gid))throw new Error("ERR_INVALID_ARG_TYPE options.gid");if(null!=n.shell&&"boolean"!=typeof n.shell&&"string"!=typeof n.shell)throw new Error("ERR_INVALID_ARG_TYPE options.shell");if(null!=n.argv0&&"string"!=typeof n.argv0)throw new Error("ERR_INVALID_ARG_TYPE options.argv0");if((n=Object.assign({},n)).shell){var r=[e].concat(t).join(" ");e="string"==typeof n.shell?n.shell:"/bin/bash",t=["-l","-c",r]}"string"==typeof n.argv0&&t.unshift(n.argv0);var o=["pipe","pipe","pipe"];return"string"==typeof n.stdio?o="inherit"===n.stdio?[0,1,2]:[n.stdio,n.stdio,n.stdio]:Array.isArray(n.stdio)&&((n.stdio[0]||0===n.stdio[0])&&("inherit"===n.stdio[0]?o[0]=0:o[0]=n.stdio[0]),(n.stdio[1]||0===n.stdio[1])&&("inherit"===n.stdio[1]?o[1]=1:o[1]=n.stdio[1]),(n.stdio[2]||0===n.stdio[2])&&("inherit"===n.stdio[2]?o[2]=2:o[2]=n.stdio[2])),{file:e,args:t,options:n,envPairs:n.env,stdio:o}}},function(e,t,n){var r=n(3);e.exports=function(e,t,n){var o={encoding:"buffer",timeout:0,maxBuffer:204800,killSignal:"SIGTERM",cwd:null,env:null,shell:!1};"object"!=typeof t||Array.isArray(t)?n=Object.assign(o,n||{}):(n=Object.assign(o,t),t=[]),function(e){if(null!=e&&!(Number.isInteger(e)&&e>=0))throw new Error("ERR_OUT_OF_RANGE options.timeout")}(n.timeout),function(e){if(null!=e&&!("number"==typeof e&&e>=0))throw new Error("ERR_OUT_OF_RANGE options.maxBuffer")}(n.maxBuffer);var i=r(e,t,{cwd:n.cwd,env:n.env,gid:n.gid,uid:n.uid,shell:n.shell,encoding:n.encoding,stdio:["pipe","pipe","inherit"]});if(0!==i.status){var a=new Error("Failed to run: "+String(i.stderr));throw a.pid=i.pid,a.status=i.status,a.stdout=i.stdout,a.stderr=i.stderr,a}return i.stdout}},function(e,t,n){var r=n(4);e.exports=function(e,t,n){var o=function(e,t,n){return"function"==typeof t&&(n=t,t=void 0),(t=Object.assign({},t)).shell="string"!=typeof t.shell||t.shell,{file:e,options:t,callback:n}}(e,t,n);return r(o.file,o.options,o.callback)}},function(e,t){e.exports=require("events")},function(e,t,n){var r=n(10);e.exports=function(e,t){var n=function(e,t){return(t=Object.assign({},t)).shell="string"!=typeof t.shell||t.shell,{file:e,options:t}}(e,t);return r(n.file,n.options)}},function(e,t,n){"use strict";n.r(t),n.d(t,"copyGxSketch",(function(){return g}));var r=n(0),o=n.n(r),i=n(1);function a(e,t,n){var r,i,a=e+t.replace(".sketch","Images");r=a,i=[],n.pages.forEach((function(e){e.layers.forEach((function(e){"Artboard"!=e.type||e.name.startsWith("_")||i.push(e)}));var t=r+e.name+"/";i.forEach((function(e){o.a.export(e,{output:t})}))})),console.log("Images to :"+a),n.pages.forEach((function(e){e.layers.forEach((function(e){!function e(t,n){if(t.exportFormats&&t.exportFormats.length>0){var r=new Array,i=new Array;new Array;t.exportFormats.forEach((function(e){r.push(e.fileFormat),i.push(e.size)})),t.name&&console.log("Exporting "+t.name);var a={output:n,formats:r.join(","),scales:i.join(","),prefixes:"md"};o.a.export(t,a)}t.layers&&t.layers.forEach((function(t){return e(t,n)}))}(e,a)}))}))}function s(){var e=o.a.Settings.settingForKey("DesignOpsQueue");return e||function(){var e=o.a.Settings.settingForKey("DesignOpsQueue");console.log("The actual queuePath is :"+e),void 0!==e||(e="/Volumes/cable/DesignOpsQueue/");return o.a.UI.getInputFromUser("Where is the Design Ops Queue",{initialValue:e},(function(t,n){if(t)return null;console.log(n),e=n,o.a.Settings.setSettingForKey("DesignOpsQueue",e)})),e}()}var l=n(2),c=n.n(l),u="gxBucket",d="gxS3SecretKey",f="gxS3AccessKey",p="gxS3Enabled";t.default=function(){var e=o.a.getSelectedDocument(),t=s();t&&g(t,e,!0)};function g(e,t,n){var r,s=1==c.a.settingForKey(p),l=c.a.settingForKey(u),g=c.a.settingForKey(d),h=c.a.settingForKey(f),m=e,y=function(e,t){var n=decodeURIComponent(e.path).replace(/^.*[\\\/]/,"").trim(),r=n.indexOf("("),o=n.lastIndexOf(")");if(n.substr(0,r),r>0&&o>0&&o>r){var i=n.substr(0,r).trim()+".sketch",a=n.substr(r+1,o-r-1).trim().split("@");2==a.length&&(t=t+a[0].trim()+"/"+a[1].trim()+"/",n=i)}return{fileName:n,queuePath:t}}(t,m);r=y.fileName,e=y.queuePath,s&&(e="/var/TMP"),console.log("copy to queue:"+e),0!=e.localeCompare(m)&&Object(i.spawnSync)("mkdir",["-p",e+"/gx/"],{shell:!0}),n&&a(e+"/gx/",r,t);var E=e+"/gx/"+r;(function(e,t){console.log("Copying "+e),console.log("To "+t);var n=Object(i.spawnSync)("cp",["'"+e+"'","'"+t+"'"],{shell:!0});return!(n.status>0)||(console.log(Error(n.stderr)),!1)})(decodeURIComponent(t.path),E)?(E=e+"/"+(r=r.replace(".sketch",".gxsketch")),console.log("File To Copy:"+E),Object(i.execSync)("pushd "+e+" && zip -r '"+E+"' gx && popd "+e,{shell:!0}),s&&(console.log("uploading "+E),console.log("fileName "+r),function(e,t,n,r,o){e=e.replace(/[^a-z0-9.]/gi,"_");var a=Object(i.execSync)("date -R").toString().replace(/\r?\n|\r/,"");console.log("Date:"+a);var s,l=n,c="/".concat(l,"/").concat(e),u='"PUT\n\napplication/x-compressed-tar\n'.concat(a,"\n").concat(c,'"');console.log(u);var d="echo -en ".concat(u," | openssl sha1 -hmac ").concat(r," -binary | base64");console.log(d);var f=Object(i.execSync)(d);f&&(s=f.toString().replace(/\r?\n|\r/,""),console.log("Signature: "+s.toString()));var p='curl -X PUT -T "'.concat(t,'" -H "Host: ').concat(l,'.s3.amazonaws.com" -H "Date: ').concat(a,'" -H "Content-Type: ').concat("application/x-compressed-tar",'" -H "Authorization: AWS ').concat(o,":").concat(s,'" https://').concat(l,".s3.amazonaws.com/").concat(e);console.log(p);var g=Object(i.execSync)(p);g&&console.log(g.toString())}(r,E,l,g,h)),o.a.UI.message("Copied to Design Ops Queue ! 💚")):o.a.UI.message("😔 Some error occurs, see console for further details")}}]);if("default"===e&&"function"==typeof n)n(t);else{if("function"!=typeof n[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');n[e](t)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");