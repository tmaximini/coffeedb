const Mutation = {
  async createItem(parent, args, ctx, info) {
    // if (!ctx.request.userId) {
    //   throw new Error('You must be logged in to do that!')
    // }

    console.log({ args })

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          // This is how to create a relationship between the Item and the User
          // user: {
          //   connect: {
          //     id: ctx.request.userId
          //   }
          // },
          ...args
        }
      },
      info
    )

    console.log(item)

    return item
  },
  updateItem(parent, args, ctx, info) {
    // if (!ctx.request.userId) {
    //   throw new Error('You must be logged in to do that!')
    // }
    const updates = { ...args }
    delete updates.id
    return ctx.db.mutation.updateItem({
      data: {
        ...updates
        // user: {
        //   connect: {
        //     id: ctx.request.userId
        //   }
        // }
      },
      where: {
        id: args.id
      },
      info // how this updateItem knows what to return
    })
  }
}

module.exports = Mutation
