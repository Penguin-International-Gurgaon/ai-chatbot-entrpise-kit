import fs from 'node:fs';
import path from 'node:path';
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

    header: {
        favicon: string;
        title: string;
        subtitle: string;
    } & Record<string, string>;
    footer: {
        enabled: boolean;
        text: string;
        privacy_policy: string;
        usage_policy: string;
    };
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
