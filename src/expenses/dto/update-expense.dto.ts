import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';
import { IsNumber } from 'class-validator';


export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
    @IsNumber()
    id: number
}
