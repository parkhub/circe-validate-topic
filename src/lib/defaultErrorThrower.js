export default function defaultErrorThrower({ topic, originalValue, reason }) {
  throw new Error(
    `${topic} failed. Reason: ${reason}. Original Value: ${JSON.stringify(originalValue, null, 4)}`
  );
}
