import fs from "fs/promises"
import path from "path";

export async function getData (filePath,fileName){
    const fileAddres = path.join(process.cwd(),filePath,fileName);
    try{
        const jsonData = await fs.readFile(fileAddres);
        return jsonData ;
    }catch(error){
        return error ;
    }
}
