import { registerMethod } from "./utils";
import { IPath } from "./index";

export const TAG_SUMMARY = Symbol("Summary");

const SUMMARIES: Map<Function, Map<string, string>> = new Map();

export const summary = (summaryString: string): MethodDecorator => (target: {}, key: string): void => {
  if (!SUMMARIES.has(target.constructor)) {
    SUMMARIES.set(target.constructor, new Map());
  }
  SUMMARIES.get(target.constructor).set(key, summaryString);
  registerMethod(target, key, (router: IPath): void => {
    router.summary = summaryString;
  });
  target[TAG_SUMMARY] = target.constructor[TAG_SUMMARY] = SUMMARIES.get(target.constructor);
};
