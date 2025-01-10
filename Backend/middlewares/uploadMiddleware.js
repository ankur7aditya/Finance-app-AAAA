const dotenv =require('dotenv');
dotenv.config()
const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } =require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


// Configure the S3 client with your AWS credentials and region
const s3Client = new S3Client();
const bucketName = process.env.MY_APP_BUCKET_NAME
function uploadFileToS3(fileBuffer, fileName, mimetype) {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype
  }

  return s3Client.send(new PutObjectCommand(uploadParams));
}

function deleteFile(fileName) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  }

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

async function getObjectSignedUrl(key) {
  const params = {
    Bucket: bucketName,
    Key: key
  }

  // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  const command = new GetObjectCommand(params);
  const seconds = 60
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url
}

// Export the function for use in your routes
module.exports = uploadFileToS3;
