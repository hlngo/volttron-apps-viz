import { PowerVizPage } from './app.po';

describe('power-viz App', () => {
  let page: PowerVizPage;

  beforeEach(() => {
    page = new PowerVizPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
