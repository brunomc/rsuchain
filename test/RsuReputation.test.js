// @ts-nocheck

const { assert } = require("chai");

/* eslint-disable no-undef */
const OchainMusic = artifacts.require('../src/contracts/OchainMusic')

require("chai")
.use(require("chai-as-promised"))
.should()

contract(OchainMusic, (accounts)=>{
    let contract;
    before(async()=>{
        contract = await OchainMusic.deployed();
    })
    describe("deployment", async ()=>{
        it("deploy successfully",async ()=>{
            const address = contract.address;
            console.log(address)
            assert.notEqual(address,0x0)
            assert.notEqual(address,"")
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
        })
        it("has a name",async ()=>{
            const name = await contract.name();
            assert.equal(name,"OchainMusic")
        })
        it("has a symbol",async ()=>{
            const symbol = await contract.symbol();
            assert.equal(symbol,"OCM")
        })
    })
    describe("minting", async ()=>{
        it("create new token",async ()=>{
          const result = await contract.mint(
              '0xe1f1669cd26b8af3de0b7ca4d606c948ca2f9e688191d6f52e007d2061d4ad60',
              123123,
              "mp3",
              "nomefile",
              "descricao"
          );
          const totalSupply = await contract.totalSupply();
          assert.equal(totalSupply,1);
          const event = result.logs[0].args;
          assert.equal(Number(event.tokenId),1,'id is correct') 
          assert.equal(event.from,"0x0000000000000000000000000000000000000000", 'from is correct') 
          assert.equal(event.to,accounts[0]) 
        })
        it("create two tokens",async ()=>{
            const token1 = await contract.mint(
                '0xe1f1669cd26b8af3de0b7ca4d606c948ca2f9e688191d6f52e007d2061d4ad63',
                123123,
                "mp3",
                "nomefile",
                "descricao"
            );
            const token2 = await contract.mint(
                '0xe1f1669cd26b8af3de0b7ca4d606c948ca2f9e688191d6f52e007d2061d4ad61',
                123122,
                "mp3",
                "nomefile2",
                "descricao2"
            );
            const totalSupply = await contract.totalSupply();
            assert.equal(totalSupply,3);
            const event = token1.logs[0].args;
            const event2 = token2.logs[0].args;
            console.log(event)
            console.log(Number(event.tokenId))
            assert.equal(Number(event.tokenId),2,'id is correct') 
            assert.equal(Number(event2.tokenId),3,'id is correct') 
            assert.equal(event.to,accounts[0]) 
          })
    })
})