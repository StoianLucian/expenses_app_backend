import { IsDate, IsNumber, isNumber, IsString } from "class-validator";

export class CreateExpenseDto {
    @IsNumber()
    amount: number;

    @IsString()
    description: string;

    @IsDate()
    transactionDate: Date;

    @IsNumber()
    monthId: number;

    @IsNumber()
    typeId: number;

    @IsNumber()
    user_id: number;

}
