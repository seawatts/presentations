import Ember from 'ember';

const {
  $
} = Ember;

export function initialize() {
  const regex = new RegExp('index.html%3A.*?(?=/|$)', 'i');
  const locationPartToTest = location.hash ? location.hash : location.pathname;

  let result = regex.exec(locationPartToTest);

  if (result) {
    let [baseHref] = result;

    $('base').attr('href', `/${baseHref}/`);
  }
}

export default {
  name: 'preview-revisions',
  initialize
};
