export default function getAppUrl(env, path) {
  return env.APP.restDestination + '/' + env.APP.restNameSpace + path;
}
