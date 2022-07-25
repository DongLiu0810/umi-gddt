export default (api) => {
  api.addHTMLHeadScripts(() => {
    return {
      type: 'text/javascript',
      content: `window._AMapSecurityConfig = {
        securityJsCode: '14329d8cf420003f06e04fc87fc32844',
      }`,
    };
  });
};
