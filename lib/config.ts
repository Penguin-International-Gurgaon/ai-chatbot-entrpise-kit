import fs from 'fs';
import path from 'path';
import toml from 'toml';

export interface AppConfig{
    greetings : {
        title : string;
        subtitle: string;
    };

    layout : {
        title : string;
        description : string;
    };

    theme : {
        LIGHT_THEME_COLOR: string;
        DARK_THEME_COLOR: string;
    };

    header:Record<string, string>;
    suggested_actions: {
        title:string;
        label:string;
        action:string;
    }[];
}

export function getAppConfig() : AppConfig {
    const filePath = path.join(process.cwd(), 'config.toml');
    const file = fs.readFileSync(filePath, 'utf-8');
    return toml.parse(file) as AppConfig;
}
