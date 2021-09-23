interface IBaseApi {
  // new(): IBaseApi
  isLoggedIn(): boolean
  isLoggedOut(): boolean
  authHeaders: AuthHeaders
  logout(): void
}
