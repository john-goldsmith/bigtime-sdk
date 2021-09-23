import * as errors from '../errors'
// import { SessionsApi } from '.'

class BaseApi implements IBaseApi {

  protected baseUrl: string = 'https://iq.bigtime.net/BigtimeData/api/v2'
  // public configuration: IConfiguration
  private sessionToken: string | null
  private firm: string | null
  private staffSid: number | null
  private userId: number | null
  // public sessionsApi: SessionsApi
  // public picklistsApi: PicklistsApi
  // public timeEntryApi: TimeEntriesApi
  // public expenseEntryApi: ExpenseEntriesApi
  // public projectsApi: ProjectsApi
  // public clientsApi: ClientsApi
  // public tasksApi: TasksApi
  // public invoicesApi: InvoicesApi
  // public reportsApi: ReportsApi
  // public staffApi: StaffApi
  // public settingsApi: SettingsApi
  // public transactionsApi: TransactionsApi
  // public oauthApi: OAuthApi

  /**
   * Instantiates a new instance of the BaseApi class.
   *
   * @constructor
   * @param  {Object} configuration
   * @return {BaseApi}
   */
  constructor(/* configuration: IConfiguration */) {
    // this.configuration = configuration
    this.sessionToken = null
    this.firm = null
    this.staffSid = null
    this.userId = null
    // this.sessionsApi = new SessionsApi(/* configuration: IConfiguration */)
    // this.picklistsApi = new PicklistsApi(/* configuration: IConfiguration */)
    // this.timeEntryApi = new TimeEntriesApi(/* configuration: IConfiguration */)
    // this.expenseEntryApi = new ExpenseEntriesApi(/* configuration: IConfiguration */)
    // this.projectsApi = new ProjectsApi(/* configuration: IConfiguration */)
    // this.clientsApi = new ClientsApi(/* configuration: IConfiguration */)
    // this.tasksApi = new TasksApi(/* configuration: IConfiguration */)
    // this.invoicesApi = new InvoicesApi(/* configuration: IConfiguration */)
    // this.reportsApi = new ReportsApi(/* configuration: IConfiguration */)
    // this.usersApi = new StaffApi(/* configuration: IConfiguration */)
    // this.settingsApi = new SettingsApi(/* configuration: IConfiguration */)
    // this.transactionsApi = new TransactionsApi(/* configuration: IConfiguration */)
    // this.oauthApi = new OauthApi(/* configuration: IConfiguration */)
  }

  /**
   * Determines if the SDK instance is in a logged-in state.
   *
   * @public
   * @method isLoggedIn
   * @memberOf BaseApi
   * @return {Boolean}
   */
  isLoggedIn(): boolean {
    return !!this.sessionToken && !!this.firm && !!this.staffSid && !!this.userId
  }

  /**
   * Determines if the SDK instance is in a logged-out state.
   *
   * @public
   * @method isLoggedOut
   * @memberOf BaseApi
   * @return {Boolean}
   */
  isLoggedOut(): boolean {
    return !this.isLoggedIn()
  }

  /**
   * [authHeaders description]
   *
   * @public
   * @method authHeaders
   * @memberOf BaseApi
   * @return {Object}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Session
   */
  get authHeaders(): AuthHeaders {
    if (!this.sessionToken) throw new errors.session.TokenMissingError()
    if (!this.firm) throw new errors.session.FirmIdMissingError()
    return {
      'X-Auth-Token': this.sessionToken,
      'X-Auth-Realm': this.firm
    }
  }

  /**
   * [logout description]
   *
   * @public
   * @method logout
   * @memberOf BaseApi
   * @return {Object}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Session
   */
  logout(): void {
    this.sessionToken = null
    this.firm = null
    this.staffSid = null
    this.userId = null
  }

  setSessionToken(sessionToken: string) {
    this.sessionToken = sessionToken
  }

  setFirm(firm: string) {
    this.firm = firm
  }

  setStaffSid(staffSid: number) {
    this.staffSid = staffSid
  }

  setUserId(userId: number) {
    this.userId = userId
  }

}

export default BaseApi
