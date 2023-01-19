const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function setup() {
  try {
    // Get version of tool to be installed
    let version = core.getInput('version');
    if(version === 'main'){
      version = 'latest'
    }
    // Download the specific version of the tool, e.g. as a tarball/zipball
    const pathToBin = await tc.downloadTool(`https://cndi-binaries.s3.amazonaws.com/cndi/${version}/cndi-linux`, `bin/cndi`);
    core.debug(`Downloaded tool to ${pathToBin}`);
    
    // Expose the tool by adding it to the PATH
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
