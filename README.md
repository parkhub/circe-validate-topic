# Circe Validate Topic

A middleware that validates Kafka topic's messages for Circe.

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
On it's own, it creates a function that will accept an object with topic and message and find the right validating function for it.

```javascript
  import validateTopic from '@parkhub/circe-validate-topic';

  const validatorCfgs = [
    {
      topic: 'AKAME',
      validate(message) {
        // Validate here
      }
    }, {
      topic: 'Satsuki',
      validate(message) {
        // Validate here
      }
    }
  ];

  const validate = validateTopic(validatorCfgs);
  
  validate({ topic: 'AKAME', message: 'my message' });
```

## API

```javascript
const validate = validateTopic([ topicCfg, topicCfg, ...topicCfg ]);
validate(validateCfg);
```
 - topicCfg - Object 
	 - topic: topic to validate 
	 - validate: function to send message to if message is from this topic.
 - validate - function
	 - validateCfg - Object
		 - topic: topic this message belongs to
		 - message: message to validate

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
