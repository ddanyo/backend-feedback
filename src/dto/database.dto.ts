export class CreateDatabaseDto {
    constructor(
        public readonly rating: number,
        public readonly feedback_text?: string,
    ) {}
}
