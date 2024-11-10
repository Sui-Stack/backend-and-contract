module contract::contract {
    use std::string::{Self, String};
    use sui::url::{Self, Url};
    use sui::package;
    use std::ascii;

    //admin 
    public struct AdminCap has key, store {
        id: UID
    }

    public struct OwnerCap has key, store {
        id: UID
    }

    public struct CorbaGameFi has key {
        id: UID,
        version: String,
        description: String
        //dof players
    }


    public struct Hero has key, store {
        id: UID,
        name: String,
        description: String,
        url: Url
    }

    public struct CONTRACT has drop{}

    fun init(otw: CONTRACT, ctx: &mut TxContext) 
    {
        //hero policy
        let publisher = package::claim<CONTRACT>(otw, ctx);
     

        let admin_cap = AdminCap {
            id: object::new(ctx)
        };
        transfer::share_object(CorbaGameFi {
            id: object::new(ctx),
            version: string::utf8(b"1.0"),
            description: string::utf8(b"Corba game")
        });
       
        transfer::public_transfer(admin_cap, @0x8d9f68271c525e6a35d75bc7afb552db1bf2f44bb65e860b356e08187cb9fa3d);
        transfer::public_transfer(publisher, @0x8d9f68271c525e6a35d75bc7afb552db1bf2f44bb65e860b356e08187cb9fa3d);
    }

    
    public fun mint_hero(
        _name: String,
        _history: String,
        _url: Url,
        ctx: &mut TxContext 
    ): Hero {
        Hero {
            id: object::new(ctx),
            name: _name,
            description: _history,
            url: _url
        }
    }

    public entry fun new_herro(
        _name: String,
        _description: String,
        _url: ascii::String,
        ctx: &mut TxContext 
    ) {
       
        let new_hero = mint_hero(
            _name,
            _description,
            url::new_unsafe(_url),
            ctx
        );
        transfer::public_transfer(new_hero, tx_context::sender(ctx));
    }


    
}

