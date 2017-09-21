/* @flow */

export type ErrorArguments = {|
  topic: string,
  originalValue: Object,
  reason: string
|};

export default function defaultErrorThrower({ topic, originalValue, reason }: ErrorArguments) {
  throw new Error(`${topic} failed. Reason: ${reason}. Original Value: ${JSON.stringify(originalValue, null, 4)}`);
}
