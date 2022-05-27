/*
    This file is the same one from
    https://github.com/shanalikhan/code-settings-sync
    with MIT license.
*/


import { existsSync, readFileSync } from "fs-extra";
import { resolve } from "path";
import { extensionPath } from "./extension";

interface ILanguagePack {
    [key: string]: string;
}

export class Localize {

    public static instance:Localize = new Localize();

    private bundle: ILanguagePack = undefined;
    private options: { locale: string };
    public localize(key: string, ...args: string[]): string {
        if (this.bundle === undefined) 
            this.bundle = this.resolveLanguagePack();
        const message = this.bundle[key] || key;
        return this.format(message, args);
    }
    public localizeUD(key: string, ...args: string[]): string|undefined {
        if (this.bundle === undefined) 
            this.bundle = this.resolveLanguagePack();
        const message = this.bundle[key];
        if (message!==undefined)
            return this.format(message, args);
        return undefined;
    }

    private init() {
        try {
            this.options = {
                ...this.options,
                ...JSON.parse(process.env.VSCODE_NLS_CONFIG || "{}")
            };
        } catch (err) {
            throw err;
        }
    }

    private format(message: string, args: string[] = []): string {
        return args.length
            ? message.replace(
                /\{(\d+)\}/g,
                (match, rest: any[]) => args[rest[0]] || match
            )
            : message;
    }

    private resolveLanguagePack(): ILanguagePack {
        this.init();

        const languageFormat = "package.nls{0}.json";
        const defaultLanguage = languageFormat.replace("{0}", "");
        const rootPath = extensionPath;

        const resolvedLanguage = this.recurseCandidates(
            rootPath,
            languageFormat,
            this.options.locale
        );

        const languageFilePath = resolve(rootPath, "lang", resolvedLanguage);

        try {
            const defaultLanguageBundle = JSON.parse(
                resolvedLanguage !== defaultLanguage
                    ? readFileSync(resolve(rootPath, defaultLanguage), "utf-8")
                    : "{}"
            );

            const resolvedLanguageBundle = JSON.parse(
                readFileSync(languageFilePath, "utf-8")
            );

            return { ...defaultLanguageBundle, ...resolvedLanguageBundle };
        } catch (err) {
            throw err;
        }
    }

    private recurseCandidates(
        rootPath: string,
        format: string,
        candidate: string
    ): string {
        const filename = format.replace("{0}", `.${candidate}`);
        const filepath = resolve(rootPath, filename);
        if (existsSync(filepath)) {
            return filename;
        }
        if (candidate.split("-")[0] !== candidate) {
            return this.recurseCandidates(rootPath, format, candidate.split("-")[0]);
        }
        return format.replace("{0}", "");
    }
}

export default Localize.prototype.localize.bind(Localize.instance);
export const LocalizeUD = Localize.prototype.localizeUD.bind(Localize.instance);