import { NgrxUdemyPage } from './app.po';

describe('ngrx-udemy App', () => {
  let page: NgrxUdemyPage;

  beforeEach(() => {
    page = new NgrxUdemyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
