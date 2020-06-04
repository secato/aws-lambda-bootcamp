import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'us-east-1' });

async function hello(event, context) {
  const params = {
    Source: 'felipe.secato@gmail.com',
    Destination: {
      ToAddresses: ['felipe.secato@gmail.com'],
    },
    Message: {
      Body: {
        Text: {
          Data: 'Hello from AWS Lambda',
        },
      },
      Subject: {
        Data: 'Test Mail',
      },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

export const handler = hello;
