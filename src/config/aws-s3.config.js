import * as AWS from "aws-sdk";

const accessKeyId = process.env.REACT_APP_ACCESSKEYID.toString();
const secretAccessKey = process.env.REACT_APP_SECRETACCESSKEY.toString();

export const region = process.env.REACT_APP_REGION.toString();

export const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export const bucketName = process.env.REACT_APP_BUCKETNAME.toString();
