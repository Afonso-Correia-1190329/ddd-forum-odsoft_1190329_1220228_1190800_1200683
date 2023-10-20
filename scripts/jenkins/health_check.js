const axios = require('axios');

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function main() {
    while (true) {
        try {
            const res = await axios.get('http://localhost:5001/api/v1/posts/popular');
            console.log("Status Code: " + res.status);

            if (res.status == 200) {
                console.log("App is up and running!");
                process.exit(0);
            }
        } catch (err) {
            console.log("Request failed with " + err);
        }

        console.log("Retrying to connect...");
        await sleep(5000);
    }
}

// Timeout at 5 mins
setTimeout(() => {
    console.log("[TIMEOUT] The app took too long to start!");
    process.exit(1);
}, 300000);

main()
