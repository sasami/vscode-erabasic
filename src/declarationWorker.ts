import { readFile } from "fs";
import { decode } from "iconv-lite";
import { Range, Uri } from "vscode";
import { parentPort, workerData } from "worker_threads";
import { Declaration, readDeclarations } from "./declaration";

const wkdata:{dirty:[[string, Uri]], encode:string} = workerData;

Promise.all(Array.from(wkdata.dirty).map(async ([path, uri]):Promise<WorkerResponse>=>{
    const input = await new Promise<string | undefined>((resolve, reject) => {
        readFile(path, (err, data) => {
            if (err) {
                if (typeof err === "object" && err.code === "ENOENT") {
                    resolve(undefined);
                } else {
                    reject(err);
                }
            } else {
                const decoded = decode(data, wkdata.encode);
                resolve(decoded);
            }
        });
    });
    if (input === undefined) {
        return {path:path, uri:uri, declarations: undefined};
    }

    return {path: path, uri:uri, declarations: readDeclarations(input)};
})).then(res=>parentPort.postMessage(res));

export interface WorkerResponse{
    path:string,
    uri:Uri,
    declarations:Declaration[] | undefined;
}

type RangeObj = Pick<Range, "start"|"end">

interface DeclarationObj extends Omit<Declaration, "visible" | "isGlobal" | "container" | "bodyRange" | "nameRange">{
    container : DeclarationObj,
    bodyRange : RangeObj,
    nameRange : RangeObj
}
