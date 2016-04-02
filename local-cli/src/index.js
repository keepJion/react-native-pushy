/**
 * Created by tdzl2003 on 2/13/16.
 */

const {loadSession} = require('./api');

function printUsage({args}) {
  // const commandName = args[0];
  // TODO: print usage of commandName, or print global usage.

  console.log('Usage is under development now.')
  console.log('Visit `https://github.com/reactnativecn/react-native-pushy` for early document.');
  process.exit(1);
}

const commands = {
  ...require('./user').commands,
  ...require('./bundle').commands,
  ...require('./app').commands,
  ...require('./package').commands,
  help: printUsage,
};

exports.run = function () {
  const argv = require('cli-arguments').parse(require('../cli.json'));

  loadSession()
    .then(()=>commands[argv.command](argv))
    .catch(err=>{
      if (err.status === 401) {
        console.log('Not loggined.\nRun `pushy login` at your project directory to login.');
        return;
      }
      console.log(err.message);
      setTimeout(()=>{
        throw err;
      });
    });
};
