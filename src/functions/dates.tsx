export const nowTimeStamp = () => {
  return new Date()
    .toISOString()
    .replace("T", " ")
    .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
};
