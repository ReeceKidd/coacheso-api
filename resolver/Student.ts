import {
  Resolver,
  Query,
  Arg,
  Mutation,
  UseMiddleware,
  Ctx,
} from 'type-graphql'

import { isAuth } from '../graphql-middleware/isAuth'
import { Student, StudentModel } from '../entity/Student'
import { UserModel } from '../entity/User'
import { MyContext } from '../types/MyContext'
import { StudentResponse } from '../types/StudentResponse'

@Resolver(() => Student)
export class StudentResolver {
  @Query(() => StudentResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async currentStudent(
    @Ctx()
    ctx: MyContext
  ): Promise<StudentResponse | null> {
    const currentStudent: StudentResponse[] = await StudentModel.aggregate([
      {
        $match: {
          _id: ctx.res.locals.user.coachId,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'students',
          foreignField: '_id',
          as: 'students',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          userId: 1,
          username: '$user.username',
          name: '$user.name',
          picture: '$user.picture',
          title: 1,
          description: 1,
          skills: 1,
          students: 1,
          reviews: 1,
        },
      },
      {
        $limit: 1,
      },
    ])

    if (currentStudent.length > 0) {
      return currentStudent[0]
    }

    const newStudent = await StudentModel.create({
      userId: ctx.res.locals.user._id,
    })

    ctx.res.locals.user = await UserModel.findByIdAndUpdate(
      ctx.res.locals.user._id,
      {
        coachId: newStudent._id,
      },
      { new: true }
    ).lean()

    return {
      ...newStudent,
      coaches: [],
      username: ctx.res.locals.user.username,
      userId: ctx.res.locals.user._id,
    }
  }
}
