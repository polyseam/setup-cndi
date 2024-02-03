const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const exec = require('@actions/exec');

async function setup() {
  try {
    // Get version of tool to be installed
    let version = core.getInput('version') || 'latest';
    let downloadUrl = `https://github.com/polyseam/cndi/releases/${version}/download/cndi-linux.tar.gz`;

    if(version === 'main'){
      downloadUrl = `https://cndi-binaries.s3.amazonaws.com/cndi/main/cndi-linux.tar.gz`;
    }

    // Download the specific version of the tool, e.g. as a tarball/zipball
    const pathToTar = await tc.downloadTool(downloadUrl, "/usr/local/bin/cndi");
    const pathToBin = await tc.extractTar(pathToTar);
    core.debug(`Downloaded tool to ${pathToBin}`);
    core.addPath(pathToBin)
    core.debug(`Added ${pathToBin} to PATH`);
    exec.exec(`chmod +x ${pathToBin}`);
    core.debug('Set cndi to be executable');
  } catch (e) {
    core.setFailed(e);
  }
}

module.exports = setup

if (require.main === module) {
  setup();
}
