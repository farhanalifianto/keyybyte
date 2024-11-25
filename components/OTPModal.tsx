import React from "react";
type Proptypes = {
  email: any;
  accountId: any;
};
const OTPModal = (props: Proptypes) => {
  const { accountId, email } = props;
  console.log(email);
  return <div>{email}</div>;
};

export default OTPModal;
