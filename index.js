import crypto from "crypto";
import fetch from "node-fetch";

function generateSignature(payload, endpoint, privateApiKey) {
    let content = payload + endpoint + privateApiKey;
    let hash = crypto.createHash("sha256");
    return hash.update(content).digest("base64");
}

async function example() {
    let data = {
        id: "new-transaction-000",
        amount: 100,
        user: {
            name: "Shyam",
            phoneNumber: "+919840013290",
            email: "m.shyam.tnj@gmail.com"
        }
    };
    let endpoint = "/api/transaction";
    let partnerId = "testPartnerId";
    let privateApiKey = "testPrivateKey";

    let payload = JSON.stringify(data);
    let signature = generateSignature(payload, endpoint, privateApiKey);

    let baseUrl = "https://web.bharatx.tech";

    let response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "x-partner-id": partnerId,
            "x-signature": signature,
        },
        body: payload,
    });

    if (response.ok) {
        console.log(await response.text());
    } else {
        console.error(`API called failed with status=${response.status}:`);
        console.error(await response.text());
    }
}


example().then(() => {
    console.log("done!")
}).catch((e) => {
    console.error("some error occured!");
    console.error(e);
})
