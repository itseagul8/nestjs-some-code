import { RoleCheckGuard } from './rolecheck.guard';

describe('RolecheckGuard', () => {
  it('should be defined', () => {
    expect(new RoleCheckGuard()).toBeDefined();
  });
});
