module.exports = function(api) {
  api.cache(true);
  let presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ];

  return {
    presets
  };
};
