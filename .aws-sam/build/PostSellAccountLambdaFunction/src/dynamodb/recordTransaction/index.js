const { UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const { v4: uuidv4 } = require('uuid');
const ddb = require('..');

const recordTransaction = async (
  user,
  cashValue,
  transactionType,
  stockTransactionData,
  updatedPositions
) => {
  try {
    const transactionId = uuidv4();
    let date = new Date();
    date = date.toISOString();

    const marshallOptions = {
      convertClassInstanceToMap: true,
      convertEmptyValues: true,
      removeUndefinedValues: true,
    };

    const transaction = {
      transactionId: transactionId,
      transactionTimestamp: date,
      transactionType: transactionType,
      transactionAmount: cashValue,
    };

    if (updatedPositions) {
      transaction.symbol = stockTransactionData?.symbol;
      transaction.companyName = stockTransactionData?.companyName;
      transaction.sharePrice = stockTransactionData?.sharePrice;
      transaction.shares = stockTransactionData?.shares;
    }

    // TODO update user positions object and SET positions to positions in dynamo updateItem etc

    const updateCommandParams = updatedPositions
      ? {
          TableName: 'usersTable',
          Key: { username: { S: user } },
          UpdateExpression:
            'SET cash = cash + :cashValue, transactions = list_append(transactions, :transaction), positions = :positions',
          ExpressionAttributeValues: {
            ':cashValue': { N: cashValue.toString() },
            // wrap object literal in marshal()
            ':transaction': {
              L: marshall([transaction], marshallOptions),
            },
            ':positions': { M: marshall(updatedPositions, marshallOptions) },
          },
        }
      : {
          TableName: 'usersTable',
          Key: { username: { S: user } },
          UpdateExpression:
            'SET cash = cash + :cashValue, transactions = list_append(transactions, :transaction)',
          ExpressionAttributeValues: {
            ':cashValue': { N: cashValue.toString() },
            // wrap object literal in marshal()
            ':transaction': {
              L: marshall([transaction], marshallOptions),
            },
          },
        };

    const updateCommand = new UpdateItemCommand(updateCommandParams);

    const res = await ddb.send(updateCommand);

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = recordTransaction;

// const { UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
// const { unmarshall } = require('@aws-sdk/util-dynamodb');
// const { v4: uuidv4 } = require('uuid');
// const ddb = require('..');

// const recordTransaction = async (user, cashValue, transactionType) => {
//   const transactionId = uuidv4();
//   const date = new Date();

//   const updateCommandParams = {
//     TableName: 'usersTable',
//     Key: { username: { S: user } },
//     UpdateExpression:
//       'SET cash = cash + :cashValue, transactions = list_append(transactions, :transaction)',
//     ExpressionAttributeValues: {
//       ':cashValue': { N: cashValue.toString() },
//       ':transaction': {
//         L: [
//           {
//             M: {
//               transactionId: { S: transactionId },
//               transactionTimestamp: { S: date },
//               transactionType: { S: transactionType },
//               transactionAmount: { N: cashValue.toString() },
//             },
//           },
//         ],
//       },
//     },
//   };

//   const updateCommand = new UpdateItemCommand(updateCommandParams);

//   const res = await ddb.send(updateCommand);

//   return unmarshall(res);
// };

// module.exports = recordTransaction;
