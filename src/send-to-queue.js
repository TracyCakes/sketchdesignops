import sketch from 'sketch';
import { spawnSync } from '@skpm/child_process';

var UI = require("sketch/ui");

var exportLayer = function (layer, path) {

  if (layer.exportFormats && layer.exportFormats.length > 0) {
    var formats = new Array();
    var scales = new Array();
    var prefixes = new Array();
    layer.exportFormats.forEach(ef => {
      formats.push(ef.fileFormat);
      scales.push(ef.size);
    });
    if (layer.name)
      console.log("Exporting " + layer.name);

    const options = {
      output: path,
      formats: formats.join(","),
      scales: scales.join(","),
      prefixes: "md"
    };
    sketch.export(layer, options);
  }

  if (layer.layers) {
    layer.layers.forEach(child => exportLayer(child, path));

  }
}

export default function () {

  const doc = sketch.getSelectedDocument()
  var queuePath = '/Volumes/cable/DesignOpsQueue/'
  
  var branch = "";
  var build = "";
  var path = doc.path;
  var fileName = decodeURIComponent(doc.path).replace(/^.*[\\\/]/, '').trim();
  var firstIndex = fileName.indexOf("(");
  var lastIndex = fileName.lastIndexOf(")");

  if (firstIndex > 0 && lastIndex > 0 && lastIndex > firstIndex) {
    var withoutVersionPath = fileName.substr(0, firstIndex).trim() + ".sketch";
    var branchAndBuild = fileName.substr(firstIndex + 1, lastIndex - firstIndex - 1).trim();
    var items = branchAndBuild.split("@");
    if (items.length == 2) {
      branch = items[0].trim();
      build = items[1].trim();
      queuePath = queuePath + branch + "/" + build + "/";
      const mkdir = spawnSync('mkdir', [ "-p",
        queuePath
      ], { shell: true });
      fileName = withoutVersionPath;
    }
  }
  var imageFolder = queuePath + fileName.replace(".sketch", "Images");
  console.log("Images to :" + imageFolder)
  doc.pages.forEach(page => {
    page.layers.forEach(layer => {
      exportLayer(layer, imageFolder);
    })
  });
  console.log("Copying " + decodeURIComponent(path));
  console.log("To " + queuePath + fileName);


  const spawn = spawnSync('cp', [
    "'" + decodeURIComponent(path) + "'",
    "'" + queuePath + fileName + "'"
  ], { shell: true });



  if (spawn.status > 0) {
    console.log(Error(spawn.stderr));
    sketch.UI.message("😔 Some error occurs, see console for further details");
  }
  else
    sketch.UI.message("Copied to Design Ops Queue ! 💚")


}