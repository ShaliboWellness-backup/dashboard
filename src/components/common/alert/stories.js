import React from 'react';
import { storiesOf } from '@storybook/react';
import Alert from './index';

storiesOf('Alert', module)
  .add('Alert success', () => (
    <Alert type="success" content="I'm the content" />
  ))
  .add('Alert error', () => (
    <Alert type="error" content="I'm the content" />
  ))
  .add('Alert no content', () => (
    <Alert type="error" content="" />
  ));
