import * as Mam from "@iota/mam";
import {localAttachToTangle} from './localAttachToTangle';

/**
 * Set the URL of the IOTA node to use
 *
 * @param provider
 */
export const setMamProvider = (provider) => {
    Mam.init({
        provider: provider,
        attachToTangle: localAttachToTangle
    });
}