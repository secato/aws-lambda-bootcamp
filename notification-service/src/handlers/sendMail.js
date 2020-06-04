import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'us-east-1' });

async function hello(event, context) {
  const record = event.Records[0];
  console.log('processing record: ', record);

  const email = JSON.parse(record.body);
  const { subject, body, recipient } = email;

  const params = {
    Source: 'felipe.secato@gmail.com',
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
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
