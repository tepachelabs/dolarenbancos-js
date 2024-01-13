import prisma from '~/lib/prisma'

export async function GET () {
  const feed = await prisma.bank.findMany({
    where: { published: true },
  })

  return new Response(
    JSON.stringify({ feed }),
  )
}
