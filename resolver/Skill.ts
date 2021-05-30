import { Resolver, Query, Arg } from 'type-graphql'
import { Skill, SkillModel } from '../entity/Skill'

@Resolver(() => Skill)
export class SkillResolver {
  @Query(() => [Skill])
  async skills(
    @Arg('skill', { nullable: true }) skill?: string
  ): Promise<Skill[]> {
    return SkillModel.find(skill ? { skill: new RegExp(`${skill}`) } : {})
  }
}
