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
import { StudentInput } from '../types/StudentInput'
import { SkillInput } from '../types/SkillInput'

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
          _id: ctx.res.locals.user.studentId,
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
        studentId: newStudent._id,
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

  @Mutation(() => Student)
  @UseMiddleware(isAuth)
  async updateStudent(
    @Ctx()
    ctx: MyContext,
    @Arg('input') input: StudentInput
  ): Promise<Student> {
    const { title, description, skills } = input

    const updateValues: {
      username?: string
      title?: string
      description?: string
      skills?: SkillInput[]
    } = {}

    if (title) {
      updateValues.title = title
    }
    if (description) {
      updateValues.description = description
    }
    if (skills) {
      updateValues.skills = skills
    }

    const student = await StudentModel.findOneAndUpdate(
      { userId: ctx.res.locals.user._id },
      updateValues,
      { new: true }
    )

    if (!student) {
      throw new Error('Student does not exist')
    }
    return student
  }
}
