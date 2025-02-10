import { parse, quote, type ParseEntry } from 'shell-quote';

export const replaceCommand = (command: string, newCommand: string): string => {
    const parsedArgs = parse(command);
    const [cmdName, ...cmdArgs]: (ParseEntry | undefined)[] = parsedArgs;
    const packageManagers = ['npm'];
    const finalCommand =
        (packageManagers.includes(cmdName?.toString() || '') ? newCommand : cmdName) || '';

    let finalCommandString = finalCommand.toString();

    // For Windows, wrap the entire command in single quotes to handle spaces in the command
    if (process.platform === 'win32') {
        finalCommandString = `& "${finalCommandString}"`;
    }
    return quote([finalCommandString, ...cmdArgs.map((arg) => arg?.toString() || '')]);
};
