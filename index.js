const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function setup() {
  try {
    // Get version of tool to be installed
    let version = core.getInput('version');
    let downloadUrl = `https://cndi-binaries.s3.amazonaws.com/cndi/${version}/cndi-linux`;

    if(!version) {
      version = 'latest';
    }

    if(version ==='main'){
      downloadUrl = `https://cndi-binaries.s3.amazonaws.com/cndi/main/cndi-linux`;
    }

    // Download the specific version of the tool, e.g. as a tarball/zipball
    const pathToBin = await tc.downloadTool(downloadUrl);
    core.debug(`Downloaded tool to ${pathToBin}`);
    core.addPath(pathToBin)
    core.debug(`Added ${pathToBin} to PATH`);
  } catch (e) {
    core.setFailed(e);
  }
}

module.exports = setup

if (require.main === module) {
  setup();
}
