import md5 from "md5";

export const getAuthPassword = () =>
  md5(
    `${process.env.REACT_APP_API_PASSWORD}_${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}`
  );
