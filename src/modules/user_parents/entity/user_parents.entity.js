export class UserParentsEntity {
  constructor(dto) {
    this.child_id = dto.childId;
    this.parent_id = dto.parentId;
  }
}
