
import { basename as pathBasename, join as pathJoin } from "path";
import { execSync } from "child_process";
import fs from "fs";
import { transformCodebase } from "../tools/transformCodebase";
import { rm_rf, rm, rm_r } from "./rm";

/** assert url ends with .zip */
export function downloadAndUnzip(
    params: {
        url: string;
        destDirPath: string;
    }
) {

    const { url, destDirPath } = params;

    const tmpDirPath = pathJoin(destDirPath, "..", "tmp_xxKdOxnEdx");

    rm_rf(tmpDirPath);

    fs.mkdirSync(tmpDirPath, { "recursive": true });

    execSync(`wget ${url}`, { "cwd": tmpDirPath })
    execSync(`unzip ${pathBasename(url)}`, { "cwd": tmpDirPath });
    rm(pathBasename(url), { "cwd": tmpDirPath });

    transformCodebase({
        "srcDirPath": tmpDirPath,
        "destDirPath": destDirPath,
    });

    rm_r(tmpDirPath);

}