abstract class Logger {
    private static enable = true

    public static setLoggerEnable(v: boolean) {
        this.enable = v
    }

    private static out(type: 'log' | 'warn' | 'error', arg: any[]) {
        if (Logger.enable) console[type](...arg)
    }

    public static log(...arg: any[]) {
        this.out('log', arg)
    }

    public static warn(...arg: any[]) {
        this.out('warn', arg)
    }

    public static error(...arg: any[]) {
        this.out('error', arg)
    }
}

export {
    Logger
}