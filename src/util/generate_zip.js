import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Parser } from '@json2csv/plainjs';
import { extractXpData } from './xp_data';

async function generateZip(attendants, xpConfig) {
    const zip = new JSZip();
    const parser = new Parser();

    attendants.forEach((attendant, i) => {
        const attendatData = extractXpData(attendant);
        zip.file(`${xpConfig.alias}/${attendant.username}.csv`, parser.parse(attendatData));
    });
    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, `${xpConfig.alias}.zip`)
}

export { generateZip };