import { LoginApi, MonodoseApi, UserApi } from "./apis"
import { Configuration } from "./runtime"

const configuration = new Configuration({
  basePath: 'http://167.99.83.46:8080'
})

export const MonodoseApiClient: MonodoseApi = new MonodoseApi(configuration)
export const UserApiClient: UserApi = new UserApi(configuration)
export const LoginApiClient: LoginApi = new LoginApi(configuration)