
// This code snippet is based on https://github.com/antonputra/tutorials/tree/main/lessons/076

const crypto = require("crypto");
const tsscmp = require("tsscmp")

exports.validateSlackRequest = (event, signingSecret) => {

    // const requestBody = JSON.stringify(event["body"])
    // console.log("requestbody: ", requestBody);

    const headers = event.headers
    console.log("headers: ",headers);

    // const timestamp = headers["x-slack-request-timestamp"]
    // const slackSignature = headers["x-slack-signature"]
    // const baseString = 'v0:' + timestamp + ':' + requestBody

    // const hmac = crypto.createHmac("sha256", signingSecret)
    //     .update(baseString)
    //     .digest("hex")
    // const computedSlackSignature = "v0=" + hmac
    // console.log(`${computedSlackSignature} === ${slackSignature}`);
    // const isValid = computedSlackSignature === slackSignature

    // return isValid;

    const requestSignature = event.headers['x-slack-signature'];
    // console.log('signature', requestSignature);
    const requestTimestamp = event.headers['x-slack-request-timestamp'];
    // console.log(requestTimestamp);

    const hmac = crypto.createHmac('sha256', signingSecret);
    // console.log('hmac', hmac);

    const [version, hash] = requestSignature.split('=');
    const base = `${version}:${requestTimestamp}:${JSON.stringify(event.body)}`;
    hmac.update(base);
    // console.log('hmac', hmac.digest('hex'));

    return tsscmp(hash, hmac.digest('hex'));
};
