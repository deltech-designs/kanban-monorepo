import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: 'Workspace ID is required' })
  workspaceId!: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
