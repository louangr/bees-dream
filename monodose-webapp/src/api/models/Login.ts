/* tslint:disable */
/* eslint-disable */
/**
 * Bee\'s Dream beekeepers and monodoses APIs
 * Bee\'s Dream beekeepers and monodoses APIs
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: by@carrier.pigeon
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Login
 */
export interface Login {
    /**
     * 
     * @type {string}
     * @memberof Login
     */
    login?: string;
    /**
     * 
     * @type {string}
     * @memberof Login
     */
    password?: string;
}

export function LoginFromJSON(json: any): Login {
    return LoginFromJSONTyped(json, false);
}

export function LoginFromJSONTyped(json: any, ignoreDiscriminator: boolean): Login {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'login': !exists(json, 'login') ? undefined : json['login'],
        'password': !exists(json, 'password') ? undefined : json['password'],
    };
}

export function LoginToJSON(value?: Login | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'login': value.login,
        'password': value.password,
    };
}

