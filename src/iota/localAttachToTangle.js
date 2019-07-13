import curlTransaction from "curl-transaction-core";
import curlImpl from "curl-transaction-webgl2-impl";

const curl = curlTransaction({ curlImpl });

export const localAttachToTangle = async function(trunkTransaction, branchTransaction, minWeightMagnitude, trytesArray) {

    return await curl.curl({
        trunkTransaction,
        branchTransaction,
        minWeightMagnitude,
        trytesArray
    }).then((processedTrytes) => {
        return processedTrytes
    }).catch((error) => {
        throw error;
    });
};