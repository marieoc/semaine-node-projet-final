const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export default function validateInput(inputs) {
  const { civility, firstName, lastName, phone, email, birthdate } = inputs;
  console.log(inputs);

  if (
    !civility ||
    !firstName ||
    !lastName ||
    !phone ||
    !validateEmail(email) ||
    !birthdate
  ) {
    return false;
  }

  return true;
}
