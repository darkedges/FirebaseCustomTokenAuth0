import { FirebaseCustomPage } from './app.po';

describe('firebase-custom App', function() {
  let page: FirebaseCustomPage;

  beforeEach(() => {
    page = new FirebaseCustomPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
