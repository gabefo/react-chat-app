import { faker } from '@faker-js/faker'
import { IContact } from '@/interfaces'

function createRandomContact(): IContact {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return {
    id: faker.string.uuid(),
    username: faker.internet.userName({ firstName, lastName }),
    displayName: `${firstName} ${lastName}`,
    about: faker.person.bio(),
    profilePhoto: faker.internet.avatar(),
    isOnline: faker.datatype.boolean(),
    lastSeen: faker.date.recent().toISOString(),
    isBlocked: false,
  }
}

export const contacts: IContact[] = faker.helpers
  .multiple(createRandomContact, { count: 200 })
  .sort((a, b) => a.displayName.localeCompare(b.displayName))
