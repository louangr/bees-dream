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


import * as runtime from '../runtime';
import {
    Login404Response,
    Login404ResponseFromJSON,
    Login404ResponseToJSON,
    User,
    UserFromJSON,
    UserToJSON,
} from '../models';

export interface AddUserRequest {
    user: User;
}

export interface DeleteUserByIdRequest {
    id: string;
}

export interface GetUserByIdRequest {
    id: string;
}

export interface UpdateUserRequest {
    user: User;
}

/**
 * 
 */
export class UserApi extends runtime.BaseAPI {

    /**
     * If the request body format is not correct, a 400 status code will be returned
     * Create a new user
     */
    async addUserRaw(requestParameters: AddUserRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.user === null || requestParameters.user === undefined) {
            throw new runtime.RequiredError('user','Required parameter requestParameters.user was null or undefined when calling addUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/user`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserToJSON(requestParameters.user),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * If the request body format is not correct, a 400 status code will be returned
     * Create a new user
     */
    async addUser(requestParameters: AddUserRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.addUserRaw(requestParameters, initOverrides);
    }

    /**
     * If the user is not found, a 404 status code will be returned
     * Delete a user by Id
     */
    async deleteUserByIdRaw(requestParameters: DeleteUserByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteUserById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * If the user is not found, a 404 status code will be returned
     * Delete a user by Id
     */
    async deleteUserById(requestParameters: DeleteUserByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.deleteUserByIdRaw(requestParameters, initOverrides);
    }

    /**
     * If the are not users, an empty array will be returned
     * Return all users
     */
    async getAllUsersRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<User>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserFromJSON));
    }

    /**
     * If the are not users, an empty array will be returned
     * Return all users
     */
    async getAllUsers(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<User>> {
        const response = await this.getAllUsersRaw(initOverrides);
        return await response.value();
    }

    /**
     * If the user is not found, a 404 status code will be returned
     * Return a user by Id
     */
    async getUserByIdRaw(requestParameters: GetUserByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getUserById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * If the user is not found, a 404 status code will be returned
     * Return a user by Id
     */
    async getUserById(requestParameters: GetUserByIdRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.getUserByIdRaw(requestParameters, initOverrides);
    }

    /**
     * If the request body format is not correct or the target user Id is not found, a 400 status code will be returned
     * Update an existing user
     */
    async updateUserRaw(requestParameters: UpdateUserRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.user === null || requestParameters.user === undefined) {
            throw new runtime.RequiredError('user','Required parameter requestParameters.user was null or undefined when calling updateUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/user`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UserToJSON(requestParameters.user),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * If the request body format is not correct or the target user Id is not found, a 400 status code will be returned
     * Update an existing user
     */
    async updateUser(requestParameters: UpdateUserRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<void> {
        await this.updateUserRaw(requestParameters, initOverrides);
    }

}
