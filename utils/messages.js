import moment from "moment";

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm:ss')
    }
}

export { formatMessage };