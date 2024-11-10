import { execSync } from 'child_process';
import { getModuleFunctions } from './util/contract';
import { BuildResult, PublishResult } from './schema/contract-schema';



export async function publishContract(): Promise<PublishResult> {
  console.log('start to publish contract')
  // contract directory
  const contractPath = `${__dirname}/../contract`;
  try {
    // publish contract by cli command
    const buildResults = execSync(
      `sui client publish ${contractPath}`,
      { encoding: 'utf-8'}
    );
    // get packageId from buildResults string
    const packageId = buildResults.split('PackageID: ')[1].split('Version')[0].substring(0, 66)
    // get functions from packageId
    const functions = await getModuleFunctions(packageId);

    return {
      status: false,
      message: 'publish successfull',
      functions: functions
    }

  } catch (error: any) {
    console.log('publish fail! error', error)
    if (error.stderr != '') {
      return {
        status: true,
        message: error.stderr
      }
    } else {
      return {
        status: true,
        message: error.stdout
      }
    }
  }
}


async function saveCode(code: string) {
  // save code to contract/sources/contract.move
  const fs = require('fs');
  fs.writeFileSync(`${__dirname}/../contract/sources/contract.move`, code);
}

export async function buildContract(code: string): Promise<BuildResult> {
  console.log('start to build contract')
  await saveCode(code);
  // get contract directory
  const contractPath = `${__dirname}/../contract`;
  try {
    // build contract by cli command
    const buildResults = execSync(
      `sui move build --dump-bytecode-as-base64 --path ${contractPath}`,
      { encoding: 'utf-8'}
    );
    
    return {
      status: false,
      message: 'compile successfull',
      buildResults: JSON.parse(buildResults) //format buildResults
    }

  } catch (error: any) {
    console.log('compile fail! error', error)
    if (error.stderr != '') {
      return {
        status: true,
        message: error.stderr
      }
    } else {
      return {
        status: true,
        message: error.stdout
      }
    }
  }
}



