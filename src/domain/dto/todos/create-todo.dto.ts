export class CreateTodoDto {

    private constructor(
        public readonly text: string
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {}

        if (this.text) returnObj.text = this.text

        return returnObj
    }

    static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
        const { text } = props

        if (!text) return ['Text property is required', undefined]

        return [undefined, new CreateTodoDto(text)]
    }
}