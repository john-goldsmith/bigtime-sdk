import { BaseApi, SessionsApi } from '.'

class BigTimeSdk extends BaseApi {

  public sessionsApi: SessionsApi
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

  constructor() {
    super()
    this.sessionsApi = new SessionsApi(/* configuration: Configuration */)
    // this.picklistsApi = new PicklistsApi(/* configuration: Configuration */)
    // this.timeEntryApi = new TimeEntriesApi(/* configuration: Configuration */)
    // this.expenseEntryApi = new ExpenseEntriesApi(/* configuration: Configuration */)
    // this.projectsApi = new ProjectsApi(/* configuration: Configuration */)
    // this.clientsApi = new ClientsApi(/* configuration: Configuration */)
    // this.tasksApi = new TasksApi(/* configuration: Configuration */)
    // this.invoicesApi = new InvoicesApi(/* configuration: Configuration */)
    // this.reportsApi = new ReportsApi(/* configuration: Configuration */)
    // this.usersApi = new StaffApi(/* configuration: Configuration */)
    // this.settingsApi = new SettingsApi(/* configuration: Configuration */)
    // this.transactionsApi = new TransactionsApi(/* configuration: Configuration */)
    // this.oauthApi = new OauthApi(/* configuration: Configuration */)
  }
}

export default BigTimeSdk
