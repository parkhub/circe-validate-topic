# Circe Validate Topic

A middleware factory. The function validates topics against specified validate methods. It also
gives you the option to short-circuit a middleware chain.

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![Dependencies][dependencyci-badge]][dependencyci]
[![version][version-badge]][package]
[![Apache License][license-badge]][LICENSE]
[![PRs Welcome][prs-badge]][prs]
[![Roadmap][roadmap-badge]][roadmap]
[![Semantic Release][semantic-release-badge]][sem-release-badge]
[![Commitizen][commitizen-friendly-badge]][comm-friendly-badge]


[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## Install
```bash
npm install @parkhub/circe-validate-topic
```

## Usage
A factory that generates a middleware function to be used with [circe-middleware]

```javascript
import validateTopic from '@parkhub/circe-validate-topic';

const validators = [
  {
    topic: 'AKAME',
    validate: message => console.log('VALIDATING MESSAGE', message),
    onInvalid: ({ topic, originalValue, reason }) =>
      console.log('DO YOUR THING', { topic, originalValue, reason })
  }
];

const onTopicValidatorNotFound = ({ topic, originalValue, reason }) =>
  console.log('DO YOUR OTHER THING', { topic, originalValue, reason });

const validateCfgs = {
  validators,
  onTopicValidatorNotFound
};

// USE THIS IN CIRCE!
const validateMiddleware = validateTopic(validateCfgs);

circe.use(validateMiddleware);

```

## Global Types
**ErrorHandler** A function that takes an object with the following properties

 - **topic(String)** The topic that is associated with this error
 - **originalValue(Object)** The FULL object passed into the validator middleware(**valueToValidate**) This is usually the kafka parameters associated with either a **Producer's publish parameters** or a **Consumer's handler message format**(see [circe])
 - **reason(String)** The reason generated by the validator as to why this failed
	
## API

**validateTopic({ validators, onTopicValidatorNotFound })** The factory function that will create a middleware function. 

 - **validators(validatorCfg[], REQUIRED)**
	 - **validatorCfg(Object)**
		 - **topic** The topic to validate
		 - **validate(Function, REQUIRED)** The function to pass the message to validate to. This function SHOULD to return an object with the following properties:
			 - **isValid(Boolean, REQUIRED)** Did this message pass validation
			 - **reason(String, optional)** Reason why this failed
		 - **onInvalid(Function, optional)** A function that should accept an **ErrorHandler** type . When this function is called, it effectively short-circuits the middleware chain.
 -  **onTopicValidatorNotFound(Function, optional)** A function that accepts an **ErrorHandler** type. This is called when a topic message is received for a topic that is not configured to be validated. When this is called, it effectively short-circuits the middleware chain.
	
		
**Returns** a function with the signature:

 - **function (valueToValidate, next)**
	 - **valueToValidate(Object, REQUIRED)** This object can be an object with any properties, but it must contain:
		 - **topic(String, REQUIRED)** The topic to validate
		 - **message(Object | String, REQUIRED)** The message to validate
	 - **next** The function injected by [circe-middleware]

**Next call** When a validation passes, it passes the full **valueToValidate** object to the next middleware.
			
### Caveats
Both the **onTopicValidatorNotFound** and the **onValid** configurations are optional but **BOTH** have a default handler that **THROWS ERRORS** 


[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[sem-release-badge]: https://github.com/semantic-release/semantic-release
[build-badge]:  https://g.codefresh.io/api/badges/build?repoOwner=parkhub&repoName=circe-validate-topic&branch=master&pipelineName=circe-validate-topic&accountName=loganbfisher&type=cf-1
[build]:  https://g.codefresh.io/repositories/parkhub/circe-validate-topic/builds?filter=trigger:build;branch:master;service:59821c960ae1710001fef83c~circe-validate-topic
[coverage-badge]: https://img.shields.io/codecov/c/github/parkhub/circe-validate-topic.svg?style=flat-square
[coverage]: https://codecov.io/gh/parkhub/circe-validate-topic
[dependencyci-badge]: https://dependencyci.com/github/parkhub/circe-validate-topic/badge?style=flat-square
[dependencyci]: https://dependencyci.com/github/parkhub/circe-validate-topic
[version-badge]: https://img.shields.io/npm/v/@parkhub/circe-validate-topic.svg?style=flat-square
[package]: https://www.npmjs.com/package/@parkhub/circe-validate-topic
[license-badge]: https://img.shields.io/npm/l/@parkhub/circe-validate-topic.svg?style=flat-square
[license]: https://github.com/parkhub/circe-validate-topic/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[roadmap-badge]: https://img.shields.io/badge/%F0%9F%93%94-roadmap-CD9523.svg?style=flat-square
[roadmap]: https://github.com/parkhub/circe-validate-topic/blob/master/ROADMAP.md
[github-watch-badge]: https://img.shields.io/github/watchers/parkhub/circe-validate-topic.svg?style=social
[github-watch]: https://github.com/parkhub/circe-validate-topic/watchers
[github-star-badge]: https://img.shields.io/github/stars/parkhub/circe-validate-topic.svg?style=social
[github-star]: https://github.com/parkhub/circe-validate-topic/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20prettier-eslint-cli!%20https://github.com/parkhub/circe-validate-topic%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/parkhub/circe-validate-topic.svg?style=social
[semantic-release]: https://github.com/semantic-release/semantic-release
[commitizen-friendly-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[comm-friendly-badge]: http://commitizen.github.io/cz-cli/
[circe-middleware]: https://github.com/parkhub/circe-middleware
[circe]: https://github.com/parkhub/circe
