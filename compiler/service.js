const fs = require('fs');
const stream = require('stream');
const finalStream = require('final-stream');
const Dockerode = require('dockerode');
const docker = new Dockerode();

function convertlanguage(language){
  switch (language) {
    case 'cpp':
      return 'cpp';
    case 'py':
      return 'python';
    case 'java':
      return 'java';
    case 'js':
      return 'javascript';
    default:
      return;
  }
}

const dockerCreation = (data) => {
  return new Promise((resolve, reject) => {
    const language = data.filename.split('.')[1];
    let lang = convertlanguage(language);
    const problemid = data.filename.split('_')[0];
    const stdout = new stream.PassThrough();

    // Loop through each test case and set it as a separate environment variable
    const inputLength = data.input.length;
    const envVariables = [
      `LANG=${lang}`,
      `FILENAME=${data.filename.split('.')[0]}`,
      `CODE=${data.code}`,
      `EXPECTED_OUTPUT=${data.output}`,
      `TIMELIMIT=5`,
      `INPUT_LENGTH=${inputLength}`
    ];

    for (let i = 0; i < inputLength; i++) {
      envVariables.push(`INPUT_${i}=${data.input[i]}`);
    }

    docker.run(
      'compilers', // Replace with the appropriate Docker image name
      null,
      stdout, // Attach to stdout and stderr
      {
        Tty: true,
        Env: envVariables,
        HostConfig: {
          Binds: [`${__dirname}/../backend/usersubmissions:/usersubmissions`], // Replace with the actual path to the host directory
        },
        OpenStdin: true,
        StdinOnce: true,
      }
    ).then(([data, container]) => {
        const containerID = container.id;
        console.log('Container ID:', containerID);

        finalStream(stdout)
          .then(buffer => {
            const output = buffer.toString();
            console.log("output >>", output);
            resolve(output);

            // stop and restart loop

            // Remove the container after capturing the output
            container.remove()
              .then(() => console.log('Container removed successfully'))
              .catch(err => console.error('Error while removing container:', err));
          })
          .catch(err => {
            reject(err);
            // Remove the container in case of an error
            container.remove()
              .then(() => console.log('Container removed successfully'))
              .catch(err => console.error('Error while removing container:', err));
          });
      })
    }).catch(err => {
      reject(err);
    });
  ;
};

module.exports = { dockerCreation };
