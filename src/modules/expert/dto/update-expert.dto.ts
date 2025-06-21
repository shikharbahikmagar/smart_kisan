import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateExpertDto {
  @IsNotEmpty()
  @IsString()
  bio: string;

  @IsNotEmpty()
  @IsString()
  expertise: string;

  @IsNotEmpty()
  @IsString()
  qualification?: string;

  @IsNotEmpty()
  experience_years?: number;

  @IsNotEmpty()
  availability?: boolean;
}
