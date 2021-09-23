/**
 * Returns the current date in YYYY-MM-DD format.
 *
 * @return {String} The current date in YYYY-MM-DD format.
 */
function getCurrentDate(): string {
  const now: Date = new Date()
  const year: number = now.getFullYear()
  const month: number = now.getMonth()
  const monthPadded: string = `0${month + 1}`.slice(-2)
  const date: number = now.getDate()
  const datePadded: string = `0${date}`.slice(-2)
  return `${year}-${monthPadded}-${datePadded}`
}

export default getCurrentDate
