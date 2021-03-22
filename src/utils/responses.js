const success = (
  response,
  { data = null, message = 'Okay!', statusCode = 200 } = {}
) => {
  var json = { success: true, message: message };
  if (data)
    if (data instanceof Array) json.items = data;
    else json.item = data;
  response.status(statusCode).json(json);
};

const error = (
  response,
  { data = null, message = 'Error!', statusCode = 400 } = {}
) => {
  var json = { success: false, message: message };
  if (data)
    if (data instanceof Array) json.items = data;
    else json.item = data;
  response.status(statusCode).json(json);
};

module.exports = {
  success,
  error,
};
