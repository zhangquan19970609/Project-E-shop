
// domain/.netlify/functions/hello

const array = [{id:0, name:'zero'},{id:1, name:'one'}]

exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify(array)
    }
}