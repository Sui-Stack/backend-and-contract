import { execSync } from 'child_process';
import * as fs from 'fs';



type CompileResult = {
  error: boolean;
  errorMessage?: string;
  compileResults?: {modules: string[], dependencies: string[], digest: number[]};
}


export async function publishContract(): Promise<CompileResult> {
  console.log('start to publish contract')
  const contractPath = `${__dirname}/../contract`;
  try {
    const compileResults = execSync(
      `sui client publish ${contractPath}`,
      { encoding: 'utf-8'}
    );


    const packageId = compileResults.split('PackageID: ')[1].split('Version')[0]
    console.log('compileResults', packageId)
    
    return {
      error: false,
      errorMessage: 'publish successfull'
    }

  } catch (error: any) {
    console.log('publish fail! error', error)
    if (error.stderr != '') {
      return {
        error: true,
        errorMessage: error.stderr
      }
    } else {
      return {
        error: true,
        errorMessage: error.stdout
      }
    }
  }
}

export async function buildContract(): Promise<CompileResult> {
  console.log('start to build contract')
  const contractPath = `${__dirname}/../contract`;
  try {
    const compileResults = execSync(
      `sui move build --dump-bytecode-as-base64 --path ${contractPath}`,
      { encoding: 'utf-8'}
    );
    return {
      error: false,
      errorMessage: 'compile successfull',
      compileResults: JSON.parse(compileResults)
    }

  } catch (error: any) {
    console.log('compile fail! error', error)
    if (error.stderr != '') {
      return {
        error: true,
        errorMessage: error.stderr
      }
    } else {
      return {
        error: true,
        errorMessage: error.stdout
      }
    }
  }
}



