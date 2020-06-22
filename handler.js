'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const s3 = new AWS.S3();

module.exports.hello = (event, context, done) => {
  let queryStringParameters = event.queryStringParameters;
  let key = queryStringParameters.filename || "defaultFilename";
  let body = queryStringParameters.content || "defaultContent";

  var params = {
    Body: body, 
    Bucket: "jim-ruppert-new-bucket-q3454", 
    Key: key, 
    Tagging: "key1=value1&key2=value2"
  };
  s3.putObject(params, (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
    done(err, 
      {
        statusCode: 200,
        body: JSON.stringify({ message: `Hello World, with thanks to JG`})
      }
    )
  });


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
