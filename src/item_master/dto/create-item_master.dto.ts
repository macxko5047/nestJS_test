import { ApiProperty } from '@nestjs/swagger';

export class CreateItemMasterDto {
  @ApiProperty({ example: 'XML-LUP-001' })
  item_code?: string;

  @ApiProperty({ example: 'Description here', required: false })
  description?: string;
}
