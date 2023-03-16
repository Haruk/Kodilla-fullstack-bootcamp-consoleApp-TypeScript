const consola = require('consola');

export enum ColorOption {
    Success = `success`,
    Error = `error`,
    Info = `info`,
}

class Message {
    private content: string;

    constructor(content: string) {
        this.content = content;
    }

    public show(): void { console.log(this.content) }

    public capitalize(): void {
        this.content = this.content.toLowerCase();
        this.content =
            `${this.content.substring(0, 1).toUpperCase()}${this.content.substring(1, this.content.length)}`
    }

    public toLowerCase(): void { this.content = this.content.toLowerCase() }

    public toUpperCase(): void { this.content = this.content.toUpperCase() }

    static showColorized(variant: ColorOption, text: string): void {
        switch (variant) {
            case ColorOption.Success:
                consola.success(text)
                break;
            case ColorOption.Error:
                consola.error(text)
                break;
            default:
                consola.info(text)
                break;
        }
    }

}


export default Message;