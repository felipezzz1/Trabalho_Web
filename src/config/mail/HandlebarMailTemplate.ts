import handlebar, { template } from 'handlebars'
import fs from 'fs'

interface ITemplateVariable{
    [key : string] : string | number;
}
interface IParseMailTemplate{
    file : string;
    variables : ITemplateVariable;
}

export default class HandlebarMailTemplate{
    public async parse({file, variables} : IParseMailTemplate) : Promise<string>{
        const templateFileContent = await fs.promises.readFile(file, {encoding:'utf-8'});
        const parseTemplate = handlebar.compile(templateFileContent);
        return parseTemplate(variables);
    }
}