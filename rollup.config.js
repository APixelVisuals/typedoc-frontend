import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import pluginDelete from "rollup-plugin-delete";
import sass from "rollup-plugin-sass";
import packageJSON from "./package.json";

export default {
    input: packageJSON.source,
    output: [
        { file: packageJSON.main, format: "cjs" },
        { file: packageJSON.module, format: "esm" }
    ],
    plugins: [
        external(),
        sass({
            insert: true
        }),
        babel({
            exclude: "node_modules/**",
            babelHelpers: "runtime"
        }),
        pluginDelete({ targets: ["dist/*"] })
    ],
    external: Object.keys(packageJSON.peerDependencies || {})
};