// import customError from "../utility/customError.js";

// const errorHandler = (err, req, res, next) => {
//   let msg = err.message || "Internal Server Error";
//   let sc = err.statusCode || 500;

//   const duplicateError = () => {
//     return new customError("Already student exists", 400);
//   };

//   const validationError = () => {
//     return new customError("Invalid data", 400);
//   };

//   const handledExpiredJwt = () => {
//     return new customError("JWT has expired. Please log in again", 401);
//   };

//   const handleJwtError = () => {
//     return new customError("Invalid Token. Please log in again", 401);
//   };

//   if (err.code == 11000) {
//     err = duplicateError();
//   } else if (err.name == "ValidationError") {
//     err = validationError();
//   } else if (err.name == "TokenExpiredError") {
//     err = handledExpiredJwt();
//   } else if (err.name == "JsonWebTokenError") {
//     err = handleJwtError();
//   }

//   res.status(sc || 500).json({
//     sucess: false,
//     err: msg,
//   });
// };

// export default errorHandler;

const errorHandler = (err, req, res, next) => {
  let msg = err.message || "Internal Server Error";
  let sc = err.statusCode || 500;

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    msg = `Duplicate value entered for ${field}: '${err.keyValue[field]}'`;
    sc = 400;
  } else if (err.name === "ValidationError") {
    msg = "Invalid data";
    sc = 400;
  } else if (err.name === "TokenExpiredError") {
    msg = "JWT has expired. Please log in again";
    sc = 401;
  } else if (err.name === "JsonWebTokenError") {
    msg = "Invalid Token. Please log in again";
    sc = 401;
  }

  res.status(sc).json({
    succes: false,
    err: msg,
  });
};

export default errorHandler;
