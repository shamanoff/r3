import { R3Page } from './app.po';

describe('r3 App', () => {
  let page: R3Page;

  beforeEach(() => {
    page = new R3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
