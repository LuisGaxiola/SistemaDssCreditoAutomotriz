export default async (req: IncomingMessage, res: ServerResponse) => {
    await createPersonasTable()
    await insertDummyPersonas()
    const curp = await useBody(req)
    return selectPersonaByCurp(curp)
  }