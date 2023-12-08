import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  const feed = await prisma.bank.findMany({
    where: { published: true },
    // include: {
    //   author: {
    //     select: { name: true },
    //   },
    // },
  });

  return new Response(
    JSON.stringify({
      props: { feed },
      revalidate: 10,
    })
  )
}
