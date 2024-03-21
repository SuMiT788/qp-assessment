import { MstRole } from '../../../entities/MstRole'

export async function getmstRoleList(): Promise<any> {
  const result = await MstRole.createQueryBuilder('mst_priority')
    .select(['mst_priority.id', 'mst_priority.name'])
    .getMany()

  return result
}

export async function getMstRoleById(id: number): Promise<MstRole | null> {
  const result = await MstRole.findOne({
    where: { id }
  })

  return result
}
