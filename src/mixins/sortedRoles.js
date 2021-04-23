export default {
  computed: {
    getRoles () {
      const roles = JSON.parse(JSON.stringify(this.Roles))
      const sortedRoles = []
      roles.forEach((element) => {
        if (element.mafia) {
          sortedRoles.push(element)
        }
      })
      roles.forEach((element) => {
        if (!element.mafia && !element.solo) {
          sortedRoles.push(element)
        }
      })
      roles.forEach((element) => {
        if (!element.mafia && element.solo) {
          sortedRoles.push(element)
        }
      })
      return sortedRoles
    }
  }
}
