import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateExpenseDto {
    @IsNumber()
    amount: number;

    @IsString()
    description: string;

    @IsDate()
    @Type(() => Date)
    transactionDate: Date;

    @IsNumber()
    monthId: number;

    @IsNumber()
    typeId: number;

}
