import { callGraphql } from "./graphql";

export const parseCode = (code: string, packageId: string) => {
    try {

      // split to get the entry functions
      const arr = code.split('entry public ');
      // get function names by handling string
      const function_names = arr.map((item, index) => {
        if(index !== 0)
          return item.split('(')[0];
    }).filter(item => item !== undefined);

    // get function arguments by handling string
    const function_args = arr.map((item, index) => {
      if(index !== 0)
        return item.split('(')[1].split(')')[0];
    }).filter(item => item !== undefined);


    // format function names and arguments
    const compile = function_names.map((item, index) => {
      return {
        name: `${packageId}::contract::${item}`,
        args: function_args[index]?.split(',').map(item => item.split(':')[1].trim()).filter(item => item !== '&mut TxContext')
      }
    })
    return compile;
    } catch (error) {
      console.log('parse code error', error)
      return [];
    }
}

export const getModuleFunctions =  async (packageId: string) => {
  // get modules from packageId string by graphql
      const query = `
      query Package {
        package(
            address: "${packageId}"
        ) {
          
            module(name: "contract") {
                name
                bytes
                disassembly
                
            }
            
        }
    }
    `;

    const data = await callGraphql(query);
    // get code from data
    const code = data.data.package.module.disassembly;
    // handle convert code to functions
    const compile = parseCode(code, packageId);
   

    return compile;
  }