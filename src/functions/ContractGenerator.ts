import Web3 from "web3";
import type { AbiItem } from "../../node_modules/web3-utils/types/index"

const web3 = new Web3("https://bsc-dataseed1.binance.org:443");

/// <reference path="TokenInfo.ts" />

export class ContractGenerator {

    readonly abi: AbiItem[];
    readonly address: string;

    /**
     * 
     * @param abi the abi of the contract of the pair
     * @param address the address of the contract of the pair
     */
    constructor(abi: AbiItem[], address: string) {
        this.abi = abi;
        this.address = address
    }

    /**
     * 
     * @returns a web3 contract
     */
    public getPairContract() {
        let contract = new web3.eth.Contract(
            this.abi,
            this.address
        )
        return contract;
    }
}
