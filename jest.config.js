module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts$": "ts-jest",
    ".*\\.(vue)$": "vue-jest",
  },
}
