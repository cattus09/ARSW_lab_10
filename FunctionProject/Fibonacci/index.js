var bigInt = require("big-integer");

const memo = {};

module.exports = async function (context, req) {
  try {
    context.log('JavaScript HTTP trigger function processed a request.');
    let nth = req.body.nth;
    if (nth < 0) {
      throw new Error('must be greater than 0');
    }
    let result = fibonacciRecursiveMemo(nth);
    context.res = {
      body: result.toString()
    };
  } catch (error) {
    context.log.error(error);
    context.res = {
      status: 500,
      body: "Error en la ejecución de la función" //tenia un problema asi que coloque esto para una validación 
    };
  }
};

// Función recursiva sacada de AYED
function fibonacciRecursiveMemo(n) {
  if (n <= 0) {
    return bigInt.zero;
  } else if (n === 1) {
    return bigInt.one;
  } else if (memo.hasOwnProperty(n)) {
    return memo[n];
  } else {
    memo[n] = fibonacciRecursiveMemo(n - 1).add(fibonacciRecursiveMemo(n - 2));
    return memo[n];
  }
}