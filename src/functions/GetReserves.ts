import { Contract } from "../../node_modules/web3-eth-contract/types/index";
import Web3 from "web3";

const web3 = new Web3("https://bsc-dataseed1.binance.org:443");

/**
 * Console logs the prices of input tokens on two different dex platform
 * @param token1 the symbol of token1
 * @param token2 the symbol of token2
 * @param contract1 a web3 contract
 * @param contract2 a web3 contract
 */
export async function checkPair(token1: string, token2: string, contract1: Contract, contract2: Contract) {
    const contract1Reserves = await contract1.methods.getReserves().call();
    const contract2Reserves = await contract2.methods.getReserves().call();

    const platform1 = await contract1.methods.symbol().call();
    const platform2 = await contract2.methods.symbol().call();

    const contract1Reserves0 = contract1Reserves[0];
    const contract1Reserves1 = contract1Reserves[1];

    const contract2Reserves0 = contract2Reserves[0];
    const contract2Reserves1 = contract2Reserves[1];

    console.table([
        {
            "Platform": platform1,
            "Token1 Reserves ": `${token1}: ${parseFloat(web3.utils.fromWei(contract1Reserves0)).toFixed(3)}`,
            "Token2 Reserves": `${token2}: ${parseFloat(web3.utils.fromWei(contract1Reserves1)).toFixed(3)}`,
            "Token1 Price": `${(parseFloat(web3.utils.fromWei(contract1Reserves1))/parseFloat(web3.utils.fromWei(contract1Reserves0, "ether"))).toFixed(10)} ${token2}/${token1}`,
            "Token2 Price": `${(parseFloat(web3.utils.fromWei(contract1Reserves0))/parseFloat(web3.utils.fromWei(contract1Reserves1, "ether"))).toFixed(10)} ${token1}/${token2}`
        },
        {
            "Platform": platform2,
            "Token1 Reserves ": `${token1}: ${parseFloat(web3.utils.fromWei(contract2Reserves0)).toFixed(3)}`,
            "Token2 Reserves": `${token2}: ${parseFloat(web3.utils.fromWei(contract2Reserves1)).toFixed(3)}`,
            "Token1 Price": `${(parseFloat(web3.utils.fromWei(contract2Reserves1))/parseFloat(web3.utils.fromWei(contract2Reserves0, "ether"))).toFixed(10)} ${token2}/${token1}`,
            "Token2 Price": `${(parseFloat(web3.utils.fromWei(contract2Reserves0))/parseFloat(web3.utils.fromWei(contract2Reserves1, "ether"))).toFixed(10)} ${token1}/${token2}`
        }
    ])
}