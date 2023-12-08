import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  const queries = [
    { id: 'inbursa', name: 'Inbursa' },
    { id: 'banamex', name: 'Banamex' },
    { id: 'bbva', name: 'BBVA' },
    { id: 'banxico', name: 'Banxico' },
    { id: 'billdotcom', name: 'Bill.com' },
    { id: 'intercam', name: 'Intercam' },
  ].map((bank) => {
    return prisma.bank.upsert({
      where: { id: bank.id },
      update: {},
      create: {
        id: bank.id,
        name: bank.name,
        published: true,
      },
    })
  })

  await Promise.all(queries)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
