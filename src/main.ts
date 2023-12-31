import { PORT } from "../config";
import buildApp from "./app";

const app = buildApp()

async function main() {
    try {
        await app.listen({port: PORT, host: '0.0.0.0'})
        console.log(`Server running at http://localhost:${PORT}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

main()