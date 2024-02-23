import { defineConfig } from "sanity";
import {deskTool} from "sanity/desk"
import schemas from "./sanity/schemas";

const config = defineConfig({
    projectId: 'orlz31si',
    dataset: "production",
    apiVersion: '2023-11-23',
    basePath:"/admin",
    useCdn: true,
    plugins: [
        deskTool()
    ],
    schema:{types:schemas},
})

export default config