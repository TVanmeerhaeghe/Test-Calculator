module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest"
  }
}
