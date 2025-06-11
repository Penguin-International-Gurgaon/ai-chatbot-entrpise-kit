import { getAppConfig } from "@/lib/config";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req : NextApiRequest, res : NextApiResponse) {
    const config = getAppConfig();
    
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
    res.status(200).json(config);
}
