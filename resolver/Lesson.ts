import { Resolver, Query, Arg, Ctx, Mutation } from 'type-graphql'
import { ObjectId } from 'mongodb'
import { MyContext } from '../types/MyContext'
import { Lesson, LessonModel } from '../entity/Lesson'
import { ObjectIdScalar } from '../schema/object-id.scalar'
import { LessonInput } from '../types/LessonInput'

@Resolver(() => Lesson)
export class LessonResolver {
  @Query(() => Lesson, { nullable: true })
  async Lesson(@Arg('LessonId', () => ObjectIdScalar) LessonId: ObjectId) {
    return await LessonModel.findById(LessonId)
  }

  @Mutation(() => Lesson)
  async addLesson(@Arg('input') LessonInput: LessonInput): Promise<Lesson> {
    // 3. create a new user's Lesson
    const Lesson = new LessonModel({
      ...LessonInput,
    } as Lesson)

    await Lesson.save()

    return Lesson
  }

  @Query(() => Lesson, { nullable: true })
  async currentLesson(
    @Ctx()
    ctx: MyContext
  ): Promise<Lesson | null> {
    return await LessonModel.findById(ctx.res.locals.LessonId)
  }
}
