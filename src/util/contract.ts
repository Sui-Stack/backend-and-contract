import { callGraphql } from "./graphql";

export const parseCode = (code: string): [string[], string[]] => {
    const arr = code.split('entry public ');
      const function_names = arr.map((item, index) => {
        if(index !== 0)
        return item.split('(')[0];
      }).filter(item => item !== undefined);

      const function_args = arr.map((item, index) => {
        if(index !== 0)
          return item.split('(')[1].split(')')[0];
      }).filter(item => item !== undefined);

      return [function_names, function_args];
}



export const getModuleFunctions =  async () => {
  const packageId = '0x246af8c9d832724171508b33ea982b9ee26a0a1c96d88b866feeaed83286dd7b'
    // const string = 'Move bytecode v6\nmodule 246af8c9d832724171508b33ea982b9ee26a0a1c96d88b866feeaed83286dd7b.contract {\nuse 0000000000000000000000000000000000000000000000000000000000000001::ascii;\nuse 0000000000000000000000000000000000000000000000000000000000000001::string;\nuse 0000000000000000000000000000000000000000000000000000000000000002::object;\nuse 0000000000000000000000000000000000000000000000000000000000000002::package;\nuse 0000000000000000000000000000000000000000000000000000000000000002::transfer;\nuse 0000000000000000000000000000000000000000000000000000000000000002::tx_context;\nuse 0000000000000000000000000000000000000000000000000000000000000002::url;\n\n\nstruct AdminCap has store, key {\n\tid: UID\n}\nstruct OwnerCap has store, key {\n\tid: UID\n}\nstruct CorbaGameFi has key {\n\tid: UID,\n\tversion: String,\n\tdescription: String\n}\nstruct CorbaPlayer has store, key {\n\tid: UID,\n\tlevel: u16,\n\texp: u32,\n\tmax_exp: u32,\n\tgold: u32,\n\twood: u32,\n\tmeat: u32\n}\nstruct Hero has store, key {\n\tid: UID,\n\tname: String,\n\tdescription: String,\n\turl: Url\n}\nstruct CONTRACT has drop {\n\tdummy_field: bool\n}\n\n\n\ninit(Arg0: CONTRACT, Arg1: &mut TxContext) {\nB0:\n\t0: MoveLoc[0](Arg0: CONTRACT)\n\t1: CopyLoc[1](Arg1: &mut TxContext)\n\t2: Call package::claim<CONTRACT>(CONTRACT, &mut TxContext): Publisher\n\t3: StLoc[3](loc1: Publisher)\n\t4: CopyLoc[1](Arg1: &mut TxContext)\n\t5: Call object::new(&mut TxContext): UID\n\t6: Pack[0](AdminCap)\n\t7: StLoc[2](loc0: AdminCap)\n\t8: MoveLoc[1](Arg1: &mut TxContext)\n\t9: Call object::new(&mut TxContext): UID\n\t10: LdConst[0](vector<u8>: \"1.0..)\n\t11: Call string::utf8(vector<u8>): String\n\t12: LdConst[1](vector<u8>: \"Cor..)\n\t13: Call string::utf8(vector<u8>): String\n\t14: Pack[2](CorbaGameFi)\n\t15: Call transfer::share_object<CorbaGameFi>(CorbaGameFi)\n\t16: MoveLoc[2](loc0: AdminCap)\n\t17: LdConst[2](address: 0x8d..)\n\t18: Call transfer::public_transfer<AdminCap>(AdminCap, address)\n\t19: MoveLoc[3](loc1: Publisher)\n\t20: LdConst[2](address: 0x8d..)\n\t21: Call transfer::public_transfer<Publisher>(Publisher, address)\n\t22: Ret\n\n}\npublic mint_hero(Arg0: String, Arg1: String, Arg2: Url, Arg3: &mut TxContext): Hero {\nB0:\n\t0: MoveLoc[3](Arg3: &mut TxContext)\n\t1: Call object::new(&mut TxContext): UID\n\t2: MoveLoc[0](Arg0: String)\n\t3: MoveLoc[1](Arg1: String)\n\t4: MoveLoc[2](Arg2: Url)\n\t5: Pack[4](Hero)\n\t6: Ret\n\n}\nentry public new_herro(Arg0: String, Arg1: String, Arg2: String, Arg3: &mut TxContext) {\nB0:\n\t0: MoveLoc[0](Arg0: String)\n\t1: MoveLoc[1](Arg1: String)\n\t2: MoveLoc[2](Arg2: String)\n\t3: Call url::new_unsafe(String): Url\n\t4: CopyLoc[3](Arg3: &mut TxContext)\n\t5: Call mint_hero(String, String, Url, &mut TxContext): Hero\n\t6: MoveLoc[3](Arg3: &mut TxContext)\n\t7: FreezeRef\n\t8: Call tx_context::sender(&TxContext): address\n\t9: Call transfer::public_transfer<Hero>(Hero, address)\n\t10: Ret\n\n}\n\nConstants [\n\t0 => vector<u8>: \"1.0\" // interpreted as UTF8 string\n\t1 => vector<u8>: \"Corba game\" // interpreted as UTF8 string\n\t2 => address: 0x8d9f68271c525e6a35d75bc7afb552db1bf2f44bb65e860b356e08187cb9fa3d\n]\n}'
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
    const code = data.data.package.module.disassembly;
    const [function_names, function_args] = parseCode(code);
    const compile = function_names.map((item, index) => {
      return {
        name: `${packageId}::contract::${item}`,
        args: function_args[index].split(',').map(item => item.split(':')[1].trim()).filter(item => item !== '&mut TxContext')
      }
    })

    return compile;
  }